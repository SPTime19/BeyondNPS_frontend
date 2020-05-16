<template>
  <section>
    <div class="columns is-vcentered">
      <div class="column is-hidden-mobile is-3-tablet">
        <companySideBar></companySideBar>
      </div>
      <div class="column is-12-mobile is-9-tablet">
        <geoMap></geoMap>
      </div>
    </div>
  </section>
</template>

<script>
  import companySideBar from '~/components/analytics/widgets/companySideBar'
  import geoMap from '~/components/analytics/widgets/geoMap'

  export default {
    name: "analyticsWrapper",
    components: {
      companySideBar,
      geoMap
    },
    data: function(){
      return {

      }
    },
    mounted() {
      this.$store.dispatch('api/FETCH_MARKER_METRIC', {metric: "rating"});
    }
  }
</script>

<style scoped>

</style>
