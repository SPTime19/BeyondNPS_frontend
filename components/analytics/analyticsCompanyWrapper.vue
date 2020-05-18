<template>
  <section class="analytics-container">
  <div class="container">
    <div class="columns">
      <div class="column is-hidden-mobile is-6-tablet">
        <companyMetricsDisplay></companyMetricsDisplay>
      </div>
      <div class="column is-12-mobile is-6-tablet" style="z-index: 40">
        <geoMap v-on="{'display-store': displayStoreMetrics}"></geoMap>
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

  export default {
    name: "analyticsWrapper",
    components: {
      companyMetricsDisplay,
      geoMap,
      storeMetricsDisplay
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
