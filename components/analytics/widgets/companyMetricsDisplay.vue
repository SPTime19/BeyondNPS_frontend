<template>
  <div class="columns is-multiline is-vcentered">
    <div class="column is-6 columns is-vcentered is-multiline" v-if="companyDetails">
      <div class="column is-3">
        <figure class='image is-1by1'>
          <img alt="Image not available" style="border-radius: 1rem"
               :src="require('@/assets/images/'+ 'magazine-luiza' +'.jpg')">
        </figure>
      </div>
      <div class="column is-9">
          <span class="is-size-3 has-text-weight-medium">
            AA
          </span>
        <p class="is-size-6 has-text-weight-medium">Number of stores:
          <span class="has-text-weight-normal">{{companyDetails['num_stores']}}</span>
        </p>
      </div>
      <div class="column is-12 columns is-multiline">
        <div class="column is-6">
          <p>Best Store</p>
          <p class="is-size-4 has-text-weight-bold">{{companyDetails["highlight_stores"]["best_store"]}}
          </p>
        </div>
        <div class="column is-6">
          <p>Worst Store</p>
          <p class="is-size-4 has-text-weight-bold">{{companyDetails["highlight_stores"]["worst_store"]}}</p>
        </div>
      </div>
    </div>
    {{companyDetails}}
  </div>
</template>

<script>

  export default {
    name: "companyMetricsDisplay",
    props: {
      storeId: {
        type: String
      }
    },
    components: {
    },
    data: function () {
      return {
      }
    },
    methods: {
    },
    watch: {
    },
    computed: {
      companyDetails: function () {
        return this.$store.getters["api/getCompanyDetails"]
      },
    }
  }
</script>

<style scoped>

</style>
