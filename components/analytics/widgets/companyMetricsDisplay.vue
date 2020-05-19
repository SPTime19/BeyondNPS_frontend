<template>
  <div class="columns is-multiline is-vcentered">
    <div class="column is-12 columns is-vcentered is-multiline" v-if="companyDetails">
      <div class="column is-3">
        <figure class='image is-1by1'>
          <img alt="Image not available" style="border-radius: 1rem"
               :src="require('@/assets/images/'+ 'magazine-luiza' +'.jpg')">
        </figure>
      </div>
      <div class="column is-9">
          <span class="is-size-3 has-text-weight-medium" style="text-transform: capitalize">
            {{formatCompanyName(companyDetails["company_id"])}}
          </span>
        <p class="is-size-6 has-text-weight-medium">Company Rank:
          <span class="has-text-weight-normal">{{companyDetails['company_rank']}}</span>
        </p>
        <p class="is-size-6 has-text-weight-medium">Number of stores:
          <span class="has-text-weight-normal">{{companyDetails['num_stores']}}</span>
        </p>
      </div>
      <div class="column is-12 columns is-multiline">
        <div class="column is-6">
          <p class="is-size-4">Best Store</p>
          <b-button outlined size="is-medium" type="is-success">
            Store {{parseStoreIdNumber(companyDetails["highlight_stores"]["best_store"]["store_id"])}}
          </b-button>
        </div>
        <div class="column is-6">
          <p class="is-size-4">Worst Store</p>
          <b-button outlined size="is-medium" type="is-danger">
            Store {{parseStoreIdNumber(companyDetails["highlight_stores"]["worst_store"]["store_id"])}}
          </b-button>
        </div>
      </div>
      <div class="column is-12" style="padding: 1rem 3rem;">
        <div class="column is-12 columns is-multiline warning-background">
          <div class="column is-6 content">
            <p class="is-size-4 has-text-weight-medium">Warning!</p>
            <p>These stores are <b>getting worst</b> in at least one metric for 2 consecutive quarters!</p>
            <p class="is-size-7">*See store details to get more information</p>
          </div>
          <div class="column is-6 columns is-multiline has-text-centered" style="padding: 3rem">
            <div class="column is-12"
                 style="padding: 2px"
                 v-for="(store,idx) in companyDetails['perfomants']['worsening']"
                 :key="idx">
              <b-button outlined expanded size="is-medium" type="is-danger">
                Store {{parseStoreIdNumber(store.store_id)}}
              </b-button>
<!--              <b-icon style="font-size: small" size="is-small" type="is-danger" icon="exclamation"-->
<!--                      v-for="(level, j) in getWarningLevel(store.worsening)" :key="j"></b-icon>-->
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12" style="padding: 1rem 3rem;">
        <div class="column is-12 columns is-multiline praise-background">
          <div class="column is-6 content">
            <p class="is-size-4 has-text-weight-medium">Good Job!</p>
            <p>These stores are <b>getting <span class="has-text-primary">better</span></b> in at least one metric for 2 consecutive quarters!</p>
            <p class="is-size-7">*See store details to get more information</p>
          </div>
          <div class="column is-6 columns is-multiline has-text-centered" style="padding: 3rem">
            <div class="column is-12"
                 style="padding: 2px"
                 v-for="(store,idx) in companyDetails['perfomants']['improving']"
                 :key="idx">
              <b-button outlined size="is-medium" expanded type="is-primary">
                Store {{parseStoreIdNumber(store.store_id)}}
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <p class="is-size-3 has-text-weight-bold highlight-hook">Metric performance</p>
        <b-select v-model="selectedMetric" expanded placeholder="Select a metric">
          <option
            v-for="option in availableMetrics"
            :value="option"
            :key="option.id">
            {{ option.display }}
          </option>
        </b-select>
        <p class="is-size-12">{{selectedMetric.description}}</p>
      </div>
      <div class="column is-12">
        <rankTSPlot
          v-if="tsDataIsLoaded"
          :width="700" :height="300"
          :chartData="formatTsPlot(benchmarkTs)"
          :chartdata="formatTsPlot(benchmarkTs)"
          :options="tsPlotOption"></rankTSPlot>
      </div>

    </div>
<!--    {{companyDetails}}-->
  </div>
</template>

<script>
  import {formatCompanyName,parseStoreIdNumber, formatTsPlot} from '@@/utils'
  import rankTSPlot from '~/components/analytics/widgets/storeDetail/rankTSPlot'

  export default {
    name: "companyMetricsDisplay",
    props: {
      storeId: {
        type: String
      }
    },
    components: {
      rankTSPlot
    },
    data: function () {
      return {
        tsDataIsLoaded: false,
        selectedMetric: {
          id: "rating",
          display: "Review Rating",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
        },
        tsPlotOption: {
          responsive: false,
          legend: {display: true},
          title: {
            display: false,
          },
        },
        availableMetrics: [
          {
            id: "rating",
            display: "Review Rating",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
          },
          {
            id: "product_issues",
            display: "Product Issues",
            description: "Lorem  sed do eiusmod tempor incididunt ut labore et."
          }],
      }
    },
    methods: {
      formatCompanyName:formatCompanyName,
      parseStoreIdNumber:parseStoreIdNumber,
      getWarningLevel(worsening){
        if(worsening >=5){
          return [1,1,1]
        }else if(worsening >=3){
          return [1,1]
        }
        return [1]
      },
      formatTsPlot:formatTsPlot
    },
    watch: {
      benchmarkTs(val) {
        if (val) {
          this.tsDataIsLoaded = true;
        }
      },
      selectedMetric: async function (val) {
        if (val) {
          let ref = this;
          let payload = {metric: val.id, company_id: this.$route.params["companyid"]};
          await this.$store.dispatch('api/FETCH_COMPANY_BENCHMARK_METRIC', payload)
        }
      }
    },
    computed: {
      companyDetails: function () {
        return this.$store.getters["api/getCompanyDetails"]
      },
      benchmarkTs: function () {
        return this.$store.getters["api/getBenchmarkCompanyTs"]
      }
    }
  }
</script>

<style scoped lang="scss">
.warning-background{
  background-color: $link-light;
  border-radius: 1rem;
}
.praise-background{
  background-color: $success-light;
  border-radius: 1rem;
}
</style>
