<template>
  <section class="analytics-container">
    <div class="columns">
      <div class="column is-hidden-mobile is-3-tablet">
        <companySideBar></companySideBar>
      </div>
      <div class="column is-12-mobile is-9-tablet" style="z-index: 40">
        <geoMap v-on="{'display-store': displayStoreMetrics}"></geoMap>
      </div>
    </div>
    <b-modal :active.sync="isModalActive"
             has-modal-card
             trap-focus
             :destroy-on-hide="false"
             aria-role="dialog"
             aria-modal>
      <storeMetricsDisplay></storeMetricsDisplay>
    </b-modal>
  </section>
</template>

<script>
  import companySideBar from '~/components/analytics/widgets/companySideBar'
  import geoMap from '~/components/analytics/widgets/geoMap'
  import storeMetricsDisplay from '~/components/analytics/widgets/storeMetricsDisplay'

  export default {
    name: "analyticsWrapper",
    components: {
      companySideBar,
      geoMap,
      storeMetricsDisplay
    },
    data: function () {
      return {
        isModalActive: false,
        isLoading: false
      }
    },
    methods: {
      displayStoreMetrics: async function (store_id) {
        this.isLoading = true;
        let ref = this;
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
      this.$store.dispatch('api/FETCH_COMPANY_METRICS', {metric: "rating"})
      ref.$store.commit("api/setDataLoading", false);
    }
  }
</script>

<style scoped>
.analytics-container{
  padding: 2rem;
}
</style>
