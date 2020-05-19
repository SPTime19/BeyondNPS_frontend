<template>
  <div class="columns is-multiline">
    <div class="column is-4">
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
    <div class="column is-8">
      <rankTSPlot
        v-if="tsDataIsLoaded"
        :height="100"
        :chartData="formatTsPlot(benchmarkTs)"
        :chartdata="formatTsPlot(benchmarkTs)"
        :options="tsPlotOption"></rankTSPlot>
      <rankTSPlot
        v-if="tsDataIsLoaded"
        :height="100"
        :chartData="formatTsPlot(benchmarkTs)"
        :chartdata="formatTsPlot(benchmarkTs)"
        :options="tsPlotOption"></rankTSPlot>

    </div>
  </div>
</template>

<script>
  import {formatTsPlot} from '@@/utils'

  import rankTSPlot from '~/components/analytics/widgets/storeDetail/rankTSPlot'

  export default {
    name: "metricTs",
    methods: {
      formatTsPlot: formatTsPlot
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
          // responsive: false,
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
      benchmarkTs: function () {
        return this.$store.getters["api/getBenchmarkCompanyTs"]
      }
    }
  }
</script>

<style scoped>

</style>
