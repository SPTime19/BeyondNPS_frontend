<template>
  <div class="columns is-multiline">
    <div class="column is-4">
      <p class="is-size-3 has-text-weight-bold highlight-hook is-family-sans-serif" style="margin-bottom: 2rem">Metric performance</p>
      <b-select v-model="selectedMetric" expanded placeholder="Select a metric">
        <option
          v-for="option in availableMetrics"
          :value="option"
          :key="option.id">
          {{ option.display }}
        </option>
      </b-select>
      <p class="is-size-6" style="margin-top: 1rem">{{selectedMetric.description}}</p>
    </div>
    <div class="column is-8">
      <b-loading :is-full-page="false" :active.sync="isLoadingBars" :can-cancel="false"></b-loading>
      <rankBarPlot
        v-if="distDataIsLoaded"
        :height="100"
        :chartData="formatDistPlot(benchmarkDist)"
        :options="distPlotOption"></rankBarPlot>
      <rankTSPlot
        v-if="tsDataIsLoaded"
        :height="100"
        :chartData="formatTsPlot(benchmarkTs)"
        :options="tsPlotOption"></rankTSPlot>
      <p class="is-size-7 has-text-weight-medium">*(Click on points to change the distribution plot))</p>

    </div>
  </div>
</template>

<script>
  import {formatTsPlot} from '@@/utils'
  import rankBarPlot from '~/components/analytics/widgets/sidebar/rankBarPlot'
  import rankTSPlot from '~/components/analytics/widgets/storeDetail/rankTSPlot'

  export default {
    name: "metricTs",
    methods: {
      formatTsPlot: formatTsPlot,
      formatDistPlot: function (storeData) {
        if (storeData) {
          let dataset = [{
            data: storeData.company,
            label: "Company",
            backgroundColor: "#575A89"
          }, {
            data: storeData.benchmark,
            label: "Benchmark",
            backgroundColor: "#EC4E20"
          }];

          return {
            labels: storeData.x_range,
            datasets: dataset
          }
        }
        return null
      },
      getPointIdx: function (evt, item) {
        if (item[0] && !this.isLoadingBars) {
          let clickedIdx = item[0]["_index"];
          this.activebarDate = this.benchmarkTs[clickedIdx].date_comment
        }
      }
    },
    components: {
      rankTSPlot,
      rankBarPlot
    },
    data: function () {
      return {
        isLoadingBars: false,
        tsDataIsLoaded: false,
        distDataIsLoaded: false,
        activebarDate: null,
        selectedMetric: {
          id: "rating",
          display: "Review Rating",
          description: "Average user review rating from all data sources."
        },
        tsPlotOption: {
          // responsive: false,
          legend: {display: true},
          title: {
            display: false,
          },
          onClick: this.getPointIdx,
        },
        distPlotOption: {
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
            description: "Average user review rating from all data sources."
          },
          {
            id: "product_issues",
            display: "(General) Product Issues",
            description: "Percentage of complaints related to products sold."
          },
          {
            id: "product_issues_Damaged",
            display: "Damaged Products",
            description: "Percentage of complaints related to damaged products."
          },
          {
            id: "product_issues_Quality",
            display: "Product Quality",
            description: "Percentage of complaints related to product quality."
          },
          {
            id: "business_issues",
            display: "(General) Business Issues",
            description: "Percentage of complaints related to business processes."
          },{
            id: "business_issues_Payment",
            display: "Payment issues",
            description: "Percentage of complaints related to payment."
          },{
            id: "business_issues_Maintenance",
            display: "Maintenance Issues",
            description: "Percentage of complaints related to maintenance services."
          },{
            id: "business_issues_Customer Services",
            display: "Customer Services issues",
            description: "Percentage of complaints related to customer services."
          },{
            id: "business_issues_Delivery",
            display: "Delivery Issues",
            description: "Percentage of complaints related to delivery."
          },],
      }
    },
    watch: {
      benchmarkTs(val) {
        if (val) {
          this.tsDataIsLoaded = true;
        }
      },
      benchmarkDist(val) {
        if (val) {
          this.distDataIsLoaded = true;
        }
      },
      selectedMetric: async function (val) {
        if (val) {
          let ref = this;
          this.isLoadingBars = true;
          let payload = {metric: val.id, company_id: this.$route.params["companyid"]};
          this.$store.dispatch('api/FETCH_COMPANY_BENCHMARK_METRIC', payload)
          await this.$store.dispatch('api/FETCH_COMPANY_BENCHMARK_METRIC_DISTRIBUTION', {
            company_id: this.$route.params["companyid"],
            metric: val.id,
            dt_com: "latest"
          }).finally(() => {
            ref.isLoadingBars = false
          });
        }
      },
      activebarDate: async function (val) {
        if (val) {
          let ref = this;
          this.isLoadingBars = true;
          this.$store.dispatch('api/FETCH_COMPANY_BENCHMARK_METRIC_DISTRIBUTION', {
            company_id: this.$route.params["companyid"],
            metric: this.selectedMetric.id,
            dt_com: val
          }).finally(() => {
            ref.isLoadingBars = false
          });
        }
      }
    },
    computed: {
      benchmarkTs: function () {
        return this.$store.getters["api/getBenchmarkCompanyTs"]
      },
      benchmarkDist: function () {
        return this.$store.getters["api/getBenchmarkCompanyDistribution"]
      }
    }
  }
</script>

<style scoped>

</style>
