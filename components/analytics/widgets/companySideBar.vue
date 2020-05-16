<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <p class="is-size-4">Metrics</p>
      </div>
      <div class="column is-12">
        <b-select v-model="selectedMetric" expanded placeholder="Select a metric">
          <option
            v-for="option in availableMetrics"
            :value="option"
            :key="option.id">
            {{ option.display }}
          </option>
        </b-select>
        <p class="is-size-5 has-text-weight-bold" style="margin-top: 1rem">{{selectedMetric.display}}</p>
        <p class="is-size-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
      </div>
      <div class="column is-12">
<!--        <b-loading :is-full-page="false" :active.sync="dataIsLoading" :can-cancel="false"></b-loading>-->
        <topKMarkers :markers="topMarkers"></topKMarkers>
      </div>
      <div class="column is-12">
<!--        <b-loading :is-full-page="false" :active.sync="dataIsLoading" :can-cancel="false"></b-loading>-->
        <rankBarPlot v-if="dataIsLoaded" :chartData="formatRankToPlot(rankedCompanies)" :chartdata="formatRankToPlot(rankedCompanies)" :options="rankPlotOption"></rankBarPlot>
      </div>
    </div>
  </section>
</template>

<script>
  import topKMarkers from '~/components/analytics/widgets/sidebar/topKMarkers'
  import rankBarPlot from '~/components/analytics/widgets/sidebar/rankBarPlot'

  export default {
    name: "companySideBar",
    components: {
      topKMarkers,
      rankBarPlot
    },
    data: function () {
      return {
        selectedMetric: {id: "rating", display: "Review Rating"},
        availableMetrics: [
          {id: "rating", display: "Review Rating"},
          {id: "product_issues", display: "Product Issues"}],
        rankPlotOption: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Average Ranking'
          }
        },
        dataIsLoaded: false
      }
    },
    methods: {
      formatRankToPlot: function (rankData) {
        if(rankData){
          let companies = Object.keys(rankData);
          let ranks = Object.values(rankData);

          let background = [];
          for(let idx in companies){
            background.push("#c45850")

          }
          let dataset = [{
            data: ranks,
            label:"sss",
            background: background
          }];

          return {
            labels: companies,
            datasets: dataset
          }
        }
        return null
      }
    },
    watch: {
      selectedMetric: async function(val){
        if(val){
          let ref = this;
          this.$store.dispatch('api/FETCH_MARKER_METRIC', {metric: val.id});
          await this.$store.dispatch('api/FETCH_COMPANY_METRICS', {metric: val.id}).then(()=>{
            ref.$store.commit("api/setDataLoading", false);
          })
        }
      },
      rankedCompanies(val) {
        this.dataIsLoaded = !!val;
      }
    },
    computed: {
      topMarkers: function () {
        if(this.rankedCompanies){
          let topk = [];
          let companyNames = Object.keys(this.rankedCompanies);
          for(let i = 0;i<=3;i++){
            topk.push(companyNames[i])
          }
          return topk
        }
        return []
      },
      rankedCompanies: function () {
        return this.$store.getters["api/getRankingData"];
      },
      dataIsLoading: function () {
        return this.$store.getters["api/getDataLoading"];
      }
    }
  }
</script>

<style scoped>

</style>
