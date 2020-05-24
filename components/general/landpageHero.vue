<template>
  <div class="hero main-hero is-black is-bold has-background">
    <img alt="Fill Murray" class="hero-background is-transparent" src="~assets/images/background_2.jpg" />
    <div class="hero-head">

    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-mobile is-multiline is-vcentered">
          <div class="column is-5-tablet is-12-mobile">
            <p class="is-size-2 has-text-weight-medium has-text-primary">Beyond NPS</p>
            <p class="subtitle is-family-sans-serif has-text-primary">DS4A - Team 19</p>
          </div>
          <div class="column">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "landpageHero",

    }
</script>

<style scoped>
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
    opacity: 100%;
  }
</style>
