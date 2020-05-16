<template>
  <section>
<!--    <landpageHero></landpageHero>-->
    <analyticsWrapper></analyticsWrapper>
  </section>
</template>

<script>
  import analyticsWrapper from '~/components/analytics/analyticsWrapper'
  import landpageHero from '~/components/general/landpageHero'
export default {
  name: 'HomePage',
  components: {
    analyticsWrapper,
    landpageHero
  }
}
</script>
