<template>
  <section v-if="markers.length >= 3">
    <p><span class="first-place">1th </span>{{markers[0]}}</p>
    <p><span class="second-place">2th </span>{{markers[1]}}</p>
    <p><span class="third-place">3th </span>{{markers[2]}}</p>
  </section>
</template>

<script>
  export default {
    name: "topKMarkers",
    props: {
      markers: {
        type: Array,
      }
    }
  }
</script>

<style scoped>
.first-place{}
.second-place{}
.third-place{}
</style>
