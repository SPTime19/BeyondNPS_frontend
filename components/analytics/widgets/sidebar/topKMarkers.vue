<template>
  <section v-if="markers.length >= 3">
    <div class="columns is-multiline is-vcentered">
      <div class="column  is-2" style="padding: 0 1rem">
      <p><span class="first-place">1th </span></p>
      </div>
      <div class="column is-10" style="padding: 0.5rem 1rem">
        <a :href="'/company/'+markers[0]"><p class="ranked-stores">{{formatCompanyName(markers[0])}}</p></a>
      </div>
      <div class="column is-2" style="padding: 0 1rem">
        <p><span class="second-place">2th </span></p>
      </div>
      <div class="column is-10" style="padding: 0.5rem 1rem">
        <a :href="'/company/'+markers[1]"><p class="ranked-stores">{{formatCompanyName(markers[1])}}</p></a>
      </div>
      <div class="column is-2" style="padding: 0 1rem">
        <p><span class="third-place">3th </span></p>
      </div>
      <div class="column is-10" style="padding: 0.5rem 1rem">
        <a :href="'/company/'+markers[2]"><p class="ranked-stores">{{formatCompanyName(markers[2])}}</p></a>
      </div>
    </div>
  </section>
</template>

<script>
  import {formatCompanyName} from "@@/utils"
  export default {
    name: "topKMarkers",
    props: {
      markers: {
        type: Array,
      }
    },
    methods:{
      formatCompanyName:formatCompanyName
    }
  }
</script>

<style scoped>
  .ranked-stores{
    text-transform: capitalize;
  }
.first-place{
  font-size: xx-large;
}
.second-place{
  font-size: x-large;
}
.third-place{
  font-size: larger;
}
</style>
