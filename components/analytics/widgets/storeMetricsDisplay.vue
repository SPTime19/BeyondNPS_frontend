<template>
  <div class="modal-card" style="width: 75vw; border-radius: 1rem">
    <div class="modal-card-body" style="padding: 2rem">
      <div class="columns is-multiline is-vcentered">
        <div class="column is-12">
          <div class="hero main-hero is-black is-bold has-background" style="border-radius: 1rem">
            <img alt="Fill Murray" class="hero-background is-transparent" src="~assets/images/back-0.jpg"/>
            <div class="hero-body" style="height: 300px"></div>
          </div>
        </div>

        <div class="column is-12" style="position: relative;top: -150px;padding: 1rem 3rem">
          <div class="container">
            <div class="card" style="border-radius: 1rem">
              <div class="card-content">
                <div class="columns is-mobile is-multiline is-vcentered">
                  <div class="column is-6 columns is-vcentered is-multiline">
                    <div class="column is-3">
                      <figure class='image is-1by1'>
                        <img alt="Image not available" style="border-radius: 1rem"
                             :src="require('@/assets/images/'+ parseCompanyName(storeDetails['store_id']) +'.jpg')">
                      </figure>
                    </div>
                    <div class="column is-9">
          <span class="is-size-3 has-text-weight-medium">
            <nuxt-link :to="'/company/' + parseCompanyName(storeDetails['store_id'])"
                       style="text-transform: capitalize">
              {{formatCompanyName(storeDetails["store_id"])}}
            </nuxt-link>
          </span>
                      <p class="is-size-6 has-text-weight-medium">Store number:
                        <span class="has-text-weight-normal">{{storeDetails['store_id'].split("_")[1]}}</span>
                      </p>
                      <p class="is-size-6 has-text-weight-medium">(Approx.) Address:
                        <span class="has-text-weight-normal">{{'[GET LOCATION FROM GEOCOORD]'}}</span>
                      </p>
                    </div>
                    <div class="column is-12 columns is-multiline">
                      <!--            <div class="column is-12">-->
                      <!--              <p class="is-size-4 has-text-weight-medium ">Summary</p>-->
                      <!--            </div>-->
                      <div class="column is-6">
                        <p>General Rank</p>
                        <p class="is-size-4 has-text-weight-bold">{{storeDetails["rankings"]["type_ranking"]["result"]}}
                          <b-tooltip
                            :label="formatRankPercentile(storeDetails['rankings']['type_ranking']['rank'])"
                            size="is-small"
                            class="asterisk-rank"
                            position="is-right"
                            multilined>
                            <b-icon style="font-size: small" size="is-small" icon="asterisk"></b-icon>
                          </b-tooltip>
                        </p>
                      </div>
                      <div class="column is-6">
                        <p>Company Rank
                          <b-tooltip
                            label="Average rank within same company"
                            size="is-small"
                            multilined>
                            <b-icon pack="fas" size="is-small" icon="question-circle"></b-icon>
                          </b-tooltip>
                        </p>
                        <p class="is-size-4 has-text-weight-bold">
                          {{storeDetails["rankings"]["company_ranking"]["result"]}}
                          <b-tooltip
                            class="asterisk-rank"
                            :label="formatRankPercentile(storeDetails['rankings']['company_ranking']['rank'])"
                            size="is-small"
                            position="is-right"
                            multilined>
                            <b-icon style="font-size: small" size="is-small" icon="asterisk"></b-icon>
                          </b-tooltip>
                        </p>
                      </div>
                      <div class="column is-6">
                        <p>Improving in
                          <b-icon class="has-text-centered" icon="thumbs-up"></b-icon>
                        </p>
                        <p class="is-size-3 has-text-weight-bold">{{getPerformanceNum(storeDetails,
                          'positive')[0]}}<span
                            class="is-size-6 has-text-weight-normal">{{getPerformanceNum(storeDetails, 'positive')[1]}} metrics</span>
                        </p>
                      </div>
                      <div class="column is-6">
                        <p>Worsening in
                          <b-icon class="has-text-centered" icon="thumbs-down"></b-icon>
                        </p>
                        <p class="is-size-3 has-text-weight-bold">{{getPerformanceNum(storeDetails,
                          'negative')[0]}}<span
                            class="is-size-6 has-text-weight-normal">{{getPerformanceNum(storeDetails, 'negative')[1]}} metrics</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <rankRadarPlot
                      v-if="radarDataIsLoaded"
                      :width="500" :height="300"
                      :chartData="formatRadarPlot(storeDetails)"
                      :chartdata="formatRadarPlot(storeDetails)"
                      :options="rankPlotOption"></rankRadarPlot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-12 columns is-multiline" style="position: relative;top: -150px;padding: 1rem 3rem">
          <div class="column is-12">
            <p id="good-points" class="is-size-4 has-text-weight-bold highlight-hook">What is this store good at?</p>
            <p class="is-size-5 has-text-weight-light" v-for="(issue, idx) in storeDetails['highlights']['best']"
               :key="idx">

              <span v-if="issue.index !== 'rating'">
              <b-tooltip
                :label="Math.round(issue.rank_val*100).toString() +' percentile'"
                size="is-small"
                multilined>
                <span class="has-text-weight-bold" :style="{'color': colorWatch[issue.performance]}">({{issue.performance}})*</span>
              </b-tooltip>

              The store have <span :style="{'color': colorWatch[issue.performance]}" class="has-text-weight-medium">{{performanceMap[issue.performance]}}</span>
              problems with <span class="has-text-weight-medium">{{problemParser[issue.index]}}</span> when compared to
              similar stores.
            </span>
              <span v-else>
                          <b-tooltip
                            :label="Math.round(issue.rank_val*100).toString() +' percentile'"
                            size="is-small"
                            multilined>
              <span class="has-text-weight-bold" :style="{'color': colorWatch[issue.performance]}">({{issue.performance}})*</span>
            </b-tooltip>

            The store has <span :style="{'color': colorWatch[issue.performance]}" class="has-text-weight-medium">{{issue.performance.toLowerCase()}}</span>
            rating among similar stores.
            </span>

            </p>
          </div>

          <div class="column is-12">
            <p id="problems" class="is-size-4 has-text-weight-bold highlight-hook">What kind of problem should I expect
              when buying from this store?</p>
            <p class="is-size-5 has-text-weight-light" v-for="(issue, idx) in storeDetails['highlights']['worst']"
               :key="idx">
            <span v-if="issue.index !== 'rating'">
                          <b-tooltip
                            :label="Math.round(issue.rank_val*100).toString() +' percentile'"
                            size="is-small"
                            multilined>
              <span class="has-text-weight-bold" :style="{'color': colorWatch[issue.performance]}">({{issue.performance}})*</span>
            </b-tooltip>

            The store has <span :style="{'color': colorWatch[issue.performance]}" class="has-text-weight-medium">{{performanceMap[issue.performance]}}</span>
            problems with <span class="has-text-weight-medium">{{problemParser[issue.index]}}</span> when compared to similar stores.
            </span>
              <span v-else>
                          <b-tooltip
                            :label="Math.round(issue.rank_val*100).toString() +' percentile'"
                            size="is-small"
                            multilined>
              <span class="has-text-weight-bold" :style="{'color': colorWatch[issue.performance]}">({{issue.performance}})*</span>
            </b-tooltip>

            The store has <span :style="{'color': colorWatch[issue.performance]}" class="has-text-weight-medium">{{issue.performance.toLowerCase()}}</span>
            rating among similar stores.
            </span>
            </p>
          </div>

          <div class="column is-12">
            <p id="improving" class="is-size-4 has-text-weight-bold highlight-hook">Is this store improving their
              customer support metrics?</p>
            <p v-if="storeDetails['performance']['positive'].length === 0" class="is-size-5 has-text-weight-light">This
              store is not improving in any metric.</p>
            <p class="is-size-5 has-text-weight-light" v-for="(issue, idx) in storeDetails['performance']['positive']"
               :key="idx">
              The store is
              <b-tooltip
                :label="improvMap[issue.performance]"
                size="is-small"
                multilined>
                <span :style="{'color': colorWatch[issue.performance]}" class="has-text-weight-medium">{{issue.performance.toLowerCase()}}*</span>
              </b-tooltip>
              with problems related to <span class="has-text-weight-medium">{{problemParser[issue.metric]}}</span>.
            </p>
          </div>

          <div class="column is-12">
            <p id="worsening" class="is-size-4 has-text-weight-bold highlight-hook">Are there any aspect that this store
              is getting worse at?</p>
            <p v-if="storeDetails['performance']['negative'].length === 0" class="is-size-5 has-text-weight-light">This
              store is not getting worst in any metric.</p>
            <p class="is-size-5 has-text-weight-light"

               v-for="(issue, idx) in storeDetails['performance']['negative']"
               :key="idx">
              The store is
              <b-tooltip
                :label="improvMap[issue.performance]"
                size="is-small"
                multilined>
                <span :style="{'color': colorWatch[issue.performance]}" class="has-text-weight-medium">{{issue.performance.toLowerCase()}}*</span>
              </b-tooltip>
              with problems related to <span class="has-text-weight-medium">{{problemParser[issue.metric]}}</span>.
            </p>
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
            <p class="is-size-6">{{selectedMetric.description}}</p>
          </div>
          <div class="column is-6">
            <rankTSPlot
              v-if="tsDataIsLoaded"
              :width="700" :height="300"
              :chartData="formatTsPlot(benchmarkTs)"
              :chartdata="formatTsPlot(benchmarkTs)"
              :options="tsPlotOption"></rankTSPlot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rankRadarPlot from '~/components/analytics/widgets/storeDetail/rankRadarPlot'
  import rankTSPlot from '~/components/analytics/widgets/storeDetail/rankTSPlot'

  export default {
    name: "storeMetricsDisplay",
    props: {
      storeId: {
        type: String
      }
    },
    components: {
      rankRadarPlot,
      rankTSPlot
    },
    data: function () {
      return {
        selectedMetric: {
          id: "rating",
          display: "Review Rating",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."},
        availableMetrics: [
          {id: "rating", display: "Review Rating", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."},
          {id: "product_issues", display: "Product Issues", description: "Lorem  sed do eiusmod tempor incididunt ut labore et."}],
        tsPlotOption: {
          responsive: false,
          legend: {display: true},
          title: {
            display: false,
          },
        },
        rankPlotOption: {
          responsive: false,
          legend: {display: false},
          scale: {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 1
            },
            gridLines: {
              color: ['red', 'red', '#FFB71A', "#575A89", "#8AFA03"]
            }
          },
          title: {
            display: false,
            // text: 'Average Ranking (more is better)'
          },
        },
        radarDataIsLoaded: false,
        tsDataIsLoaded: false,
        colorWatch: {
          "Poor": "red",
          "Consistenly Worsening": "red",
          "Average": "#FFB71A",
          "Worsening": "#EC4E20",
          "Good": "#575A89",
          "Great": "#8AFA03",
          "Improving": "#575A89",
          "Consistently Improving": "#8AFA03",
        },
        performanceMap: {
          "Poor": "more",
          "Average": "similar",
          "Good": "fewer",
          "Great": "way fewer",
        },
        problemParser: {
          "business_issues_customer_services": "general customer services",
          "business_issues_maintenance": "maintenance",
          "business_issues_delivery": "delivery",
          "product_issues_quality": "bad product quality",
          "product_issues_damaged": "damaged products",
          "business_issues_payment": "payment",
          "business_issues_online_services": "online services"
        },
        improvMap: {
          "Improving": "Improved from last quarter.",
          "Consistently Improving": "Improving for the last two quarters.",
          "Worsening": "Deteriorated from last quarter.",
          "Consistently Worsening": "Deteriorating for the last two quarters.",
        }
      }
    },
    methods: {
      getPerformanceNum: function (storeData, by) {
        if (storeData) {
          let num = storeData["performance"][by].length;
          if (num === 0) {
            // if(by==="positive"){
            //   return "Currently not improving in any metric!"
            // }else{
            //   return "Currently not worsening in any metric!"
            // }
            return ["0", ""]
          } else {
            return [num.toString(), "/7"]
          }

        } else {
          return ["Not Available", ""]
        }
      },
      parseCompanyName: function (store_id) {
        return store_id.split("_")[0]
      },
      formatCompanyName: function (store_id) {
        let companyName = store_id.split("_")[0];
        if (companyName.includes("-")) {
          return companyName.split("-").join(" ")
        }
        return companyName
      },
      formatRankPercentile: function (rank) {
        return Math.floor(rank) + " top percentile"
      },
      formatTsPlot: function (storeData) {
        if (storeData) {
          let rankData = storeData;
          let dates = rankData.map((v) => v.date_comment);
          let metrics = rankData.map((v) => v.metric);
          let benchmark = rankData.map((v) => v.benchmark);

          let dataset = [{
            data: metrics,
            label: "Metric Value",
            borderColor: "#575A89"
          }, {
            data: benchmark,
            label: "Benchmark",
            borderColor: "#EC4E20"
          }];

          return {
            labels: dates,
            datasets: dataset
          }
        }
        return null
      },
      formatRadarPlot: function (storeData) {
        if (storeData) {
          let rankData = storeData["highlights"]["general"]
          let issues = rankData.map((v) => v.index);
          let ranks = rankData.map((v) => v.rank_val);

          let dataset = [{
            data: ranks,
            borderColor: "#575A89"
          }];

          return {
            labels: issues,
            datasets: dataset
          }
        }
        return null
      }
    },
    watch: {
      storeDetails(val) {
        if (val) {
          this.radarDataIsLoaded = true;
        }
      },
      benchmarkTs(val) {
        if (val) {
          this.tsDataIsLoaded = true;
        }
      },
      selectedMetric: async function (val) {
        if (val) {
          let ref = this;
          await this.$store.dispatch('api/FETCH_BENCHMARK_METRIC', {metric: val.id, store_id: this.storeId})
        }
      }
    },
    computed: {
      storeDetails: function () {
        return this.$store.getters["api/getStoreDetails"]
      },
      benchmarkTs: function () {
        return this.$store.getters["api/getBenchmarkTs"]
      }
    }
  }
</script>

<style scoped>
  .asterisk-rank {
    position: relative;
    bottom: 12px;
    left: -5px;
  }

  .highlight-hook {
    margin-bottom: 1rem;
  }

  .title-margin {
    margin: 3.5rem 1.5rem;
  }

  .subtitles-margin {
    padding: 2rem 1rem;
    background-color: #FFDC96;
    border-radius: 1rem;
    margin-top: 5rem;

  }

  .hero.has-background {
    position: relative;
    overflow: hidden;
  }

  .hero-background {
    position: absolute;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  }

  .hero-background.is-transparent {
    opacity: 70%;
  }
</style>
