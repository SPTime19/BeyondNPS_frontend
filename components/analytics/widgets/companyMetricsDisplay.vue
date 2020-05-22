<template>
  <div class="columns is-multiline is-vcentered">
    <div class="column is-12 columns is-vcentered is-multiline" v-if="companyDetails">
      <div class="column is-3 columns is-multiline">
        <div class="column is-4">
          <figure class='image is-1by1'>
            <img alt="Image not available" style="border-radius: 1rem"
                 :src="require('@/assets/images/'+ companyDetails['company_id'] +'.jpg')">
          </figure>
        </div>
        <div class="column is-8">
          <span class="is-size-4 has-text-weight-medium" style="text-transform: capitalize">
            {{formatCompanyName(companyDetails["company_id"])}}
          </span>
          <p class="is-size-6 has-text-weight-medium">Company Rank:
            <span class="has-text-weight-normal">{{companyDetails['company_rank']}}th</span>
          </p>
          <p class="is-size-6 has-text-weight-medium">Number of stores:
            <span class="has-text-weight-normal">{{companyDetails['num_stores']}}</span>
          </p>
        </div>
        <div class="column is-12 columns is-multiline">
          <div class="column is-6">
            <p class="is-size-5">Best Store</p>
            <b-button outlined size="is-medium" type="is-success"
                      @click="focusStore(companyDetails['highlight_stores']['best_store'])">
              Store {{parseStoreIdNumber(companyDetails["highlight_stores"]["best_store"]["store_id"])}}
            </b-button>
          </div>
          <div class="column is-6">
            <p class="is-size-5">Worst Store</p>
            <b-button outlined size="is-medium" type="is-danger"
                      @click="focusStore(companyDetails['highlight_stores']['worst_store'])">
              Store {{parseStoreIdNumber(companyDetails["highlight_stores"]["worst_store"]["store_id"])}}
            </b-button>
          </div>
        </div>
      </div>

      <div class="column columns">
        <div class="column is-6"
             style="padding: 2rem 1rem;">
          <div class="column is-12 columns is-multiline warning-background is-vcentered">
            <div class="box-container-inner"></div>
            <div class="column is-7 content">
              <p class="is-size-4 has-text-weight-medium">Warning!</p>
              <p>These stores are <b>getting worst</b> in at least one metric for 2 consecutive quarters!</p>
              <p class="is-size-7">*See store details to get more information</p>
            </div>
            <div class="column is-5 columns is-multiline has-text-centered"
                 v-if="companyDetails['perfomants']['worsening'] && companyDetails['perfomants']['worsening'].length > 0"
                 style="padding: 5rem 1rem 1rem 1rem">
              <div class="column is-12"
                   style="padding: 2px"
                   v-for="(store,idx) in companyDetails['perfomants']['worsening']"
                   :key="idx">
                <b-button outlined expanded size="is-medium" type="is-danger"
                          @click="focusStore(store)">
                  Store {{parseStoreIdNumber(store.store_id)}}
                </b-button>
                <!--              <b-icon style="font-size: small" size="is-small" type="is-danger" icon="exclamation"-->
                <!--                      v-for="(level, j) in getWarningLevel(store.worsening)" :key="j"></b-icon>-->
              </div>
            </div>
            <div class="column">
              <p class="is-size-6" style="color: gray">No information available for this company.</p>
            </div>
          </div>
        </div>
        <div class="column is-6" style="padding: 2rem 1rem;">
          <div class="column is-12 columns is-multiline praise-background is-vcentered">
            <div class="box-container-inner"></div>
            <div class="column is-7 content">
              <p class="is-size-4 has-text-weight-medium">Good Job!</p>
              <p>These stores are <b>getting <span class="has-text-primary">better</span></b> in at least one metric for 2 consecutive quarters!</p>
              <p class="is-size-7">*See store details to get more information</p>
            </div>
            <div class="column is-5 columns is-multiline has-text-centered"
                 v-if="companyDetails['perfomants']['improving'] && companyDetails['perfomants']['improving'].length > 0"
                 style="padding: 5rem 1rem 1rem 1rem">
              <div class="column is-12"
                   style="padding: 2px"
                   v-for="(store,idx) in companyDetails['perfomants']['improving']"
                   :key="idx">
                <b-button outlined size="is-medium" expanded type="is-primary"
                          @click="focusStore(store)">
                  Store {{parseStoreIdNumber(store.store_id)}}
                </b-button>
              </div>
            </div>
            <div class="column">
              <p class="is-size-6 " style="color: gray">No information available for this company.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatCompanyName,parseStoreIdNumber} from '@@/utils'

  export default {
    name: "companyMetricsDisplay",
    props: {
      storeId: {
        type: String
      }
    },
    data: function () {
      return {
      }
    },
    methods: {
      formatCompanyName:formatCompanyName,
      parseStoreIdNumber:parseStoreIdNumber,
      getWarningLevel(worsening){
        if(worsening >=5){
          return [1,1,1]
        }else if(worsening >=3){
          return [1,1]
        }
        return [1]
      },
      focusStore: function (store) {
        this.$emit("focus-store", {reference: [store.latitude, store.longitude]})
      }
    },

    computed: {
      companyDetails: function () {
        return this.$store.getters["api/getCompanyDetails"]
      },
    }
  }
</script>

<style scoped lang="scss">
.warning-background{
  background-color: $link-light;
  border-radius: 1rem;
  position: relative;
}
.praise-background{
  background-color: $success-light;
  border-radius: 1rem;
  position: relative;
}

/*
.box-container-inner {
bottom: 0;
The box-shadow is added here now
  box-shadow: 0 4px 5px rgba(0,0,0,0.3);
  filter: blur(6px);
  height: 94%;
  left: 3%;
  position: absolute;
  width: 94%;
  z-index: -1;
}*/
</style>
