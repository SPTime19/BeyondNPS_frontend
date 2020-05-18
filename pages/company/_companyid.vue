<template>
  <section>
    <analyticsCompanyWrapper></analyticsCompanyWrapper>
  </section>
</template>

<script>
  import analyticsCompanyWrapper from '~/components/analytics/analyticsCompanyWrapper'

  export default {
    name: "_companyId",
    components: {
      analyticsCompanyWrapper
    },
    created() {
      this.$store.dispatch("api/FETCH_COMPANY_DETAILS", {company_id: this.$route.params["companyid"]})
    }
  }
</script>

<style scoped>

</style>
