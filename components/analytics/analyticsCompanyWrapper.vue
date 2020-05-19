<template>
  <section class="analytics-container">
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12-tablet">
        <companyMetricsDisplay></companyMetricsDisplay>
      </div>
      <div class="column is-12-mobile is-12-tablet" style="z-index: 40">
        <b-tabs position="is-centered" class="block">
          <b-tab-item label="Map">
            <div class="column is-12">
              <geoMap v-if="markerData" v-on="{'display-store': displayStoreMetrics}"></geoMap>
            </div>
          </b-tab-item>
          <b-tab-item label="Metrics">
            <metricTs></metricTs>
          </b-tab-item>
        </b-tabs>

      </div>
    </div>
    <b-modal :active.sync="isModalActive"
             has-modal-card
             :destroy-on-hide="false"
             aria-role="dialog"
             aria-modal>
      <storeMetricsDisplay :storeId="activeStoreId"></storeMetricsDisplay>
    </b-modal>
  </div>
  </section>
</template>

<script>
  import companyMetricsDisplay from '~/components/analytics/widgets/companyMetricsDisplay'
  import geoMap from '~/components/analytics/widgets/geoMap'
  import storeMetricsDisplay from '~/components/analytics/widgets/storeMetricsDisplay'
  import metricTs from '~/components/analytics/widgets/metricTs'

  export default {
    name: "analyticsWrapper",
    components: {
      companyMetricsDisplay,
      geoMap,
      storeMetricsDisplay,
      metricTs
    },
    data: function () {
      return {
        isModalActive: false,
        isLoading: false,
        activeStoreId: ""
      }
    },
    methods: {
      displayStoreMetrics: async function (store_id) {
        this.isLoading = true;
        this.activeStoreId = store_id;
        let ref = this;
        this.$store.dispatch('api/FETCH_BENCHMARK_METRIC', {store_id: store_id, metric: "rating"});
        await this.$store.dispatch("api/FETCH_STORE_DETAILS", {store_id: store_id})
          .then(() => {
            ref.isLoading = false;
            ref.isModalActive= true
          }).catch(() => {
            ref.$buefy.dialog.alert({
              message: 'We had problems fetching new data. Please, contact one of our team members.',
              type: 'is-warning',
              hasIcon: true,
              icon: 'warning',
              iconPack: 'fas'
            })
          })
      }
    },
    mounted: function () {
      let ref = this;
      this.$store.dispatch('api/FETCH_MARKER_METRIC', {metric: "rating"});
      this.$store.dispatch('api/FETCH_COMPANY_METRICS', {metric: "rating"});
      ref.$store.commit("api/setDataLoading", false);
    },
    computed: {
      markerData: function () {
        return this.$store.getters["api/getMarkerData"]
      }
    }
  }
</script>

<style>
.analytics-container{
  padding: 2rem;
}
  .animation-content{
    max-width: 100% !important;
  }
</style>
