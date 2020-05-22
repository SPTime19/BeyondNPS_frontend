<template>
  <section>
    <analyticsWrapper></analyticsWrapper>
  </section>
</template>

<script>
  import analyticsWrapper from '~/components/analytics/analyticsWrapper'

  export default {
    name: 'HomePage',
    layout: "landPage",
    components: {
      analyticsWrapper
    }
  }
</script>
