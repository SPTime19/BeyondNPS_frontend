<template>
  <div class="modal-card" style="width: 80vw">
    <div class="modal-card-body">
      <div class="columns is-multiline">
        <div class="column is-7">
          <p>{{storeDetails["store_id"]}}</p>
        </div>
        <div class="column is-5">
          <img src="#" alt=""/>
        </div>
        <div class="column is-12">
          <p class="is-size-4">Summary</p>
        </div>
        <div class="column is-4">
          <p>General Rank</p>
          <p>{{storeDetails["rankings"]["type_ranking"]}}</p>
        </div>
        <div class="column is-4">
          <p>(Within) Company Rank</p>
          <p>{{storeDetails["rankings"]["company_ranking"]}}</p>
        </div>
        <div class="column is-4">
          <p>Improving in</p>
          <p>{{getPerformanceNum(storeDetails, 'positive')}}</p>
        </div>
        <div class="column is-4">
          <p>Worsening in</p>
          <p>{{getPerformanceNum(storeDetails, 'negative')}}</p>
        </div>
        <div class="column is-12">
          <p class="is-size-4">Highlights</p>
          <ul>
            <li><a href="#good-points">What is this store good at?</a></li>
            <li><a href="#problems">What kind of problem should I expect when buying from this store?</a></li>
            <li><a href="#improving">Is this store improving their customer support?</a></li>
            <li><a href="#worsening">Are there any aspect that this store is getting worse at?</a></li>
          </ul>
        </div>
        <div class="column is-12">
          <p id="good-points" class="is-size-4">What is this store good at?</p>
          <p v-for="(issue, idx) in storeDetails['highlights']['best']" :key="idx">
            {{issue.performance}} on solving {{issue.index}} ({{issue.rank_val}} top percentile)</p>
        </div>
        <div class="column is-12">
          <p id="problems" class="is-size-4">What kind of problem should I expect when buying from this store?</p>
          <p v-for="(issue, idx) in storeDetails['highlights']['worst']" :key="idx">
            {{issue.performance}} on solving {{issue.index}} ({{issue.rank_val}} top percentile)</p>
        </div>
        <div class="column is-12">
          <p id="improving" class="is-size-4">Is this store improving their customer support?</p>
          <p v-for="(issue, idx) in storeDetails['performance']['positive']" :key="idx">
            The store is {{issue.performance}} in solving {{issue.metric}} problems</p>
        </div>
        <div class="column is-12">
          <p id="worsening" class="is-size-4">Are there any aspect that this store is getting worse at?</p>
          <p v-for="(issue, idx) in storeDetails['performance']['negative']" :key="idx">
            The store is {{issue.performance}} in solving {{issue.metric}} problems</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "storeMetricsDisplay",
    methods: {
      getPerformanceNum: function (storeData, by) {
        if(storeData){
          let num = storeData["performance"][by].length;
          if(num === 0){
            // if(by==="positive"){
            //   return "Currently not improving in any metric!"
            // }else{
            //   return "Currently not worsening in any metric!"
            // }
            return "0 metrics"
          }else{
            return num.toString()+"/7 metrics"
          }

        }else{
          return "Not Available"
        }
      }
    },
    computed: {
      storeDetails: function () {
        return this.$store.getters["api/getStoreDetails"]
      }
    }
  }
</script>

<style scoped>

</style>
