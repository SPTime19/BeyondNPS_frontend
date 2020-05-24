<template>
  <div class="geoMap" :class="{'geoMap-main': isMainPage}" style="overflow: auto">
    <l-map
      v-if="markerData"
      :zoom="zoom"
      :center="spCoordinates"
      :options="mapOptions">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <l-control-layers ref="control"></l-control-layers>

      <l-layer-group
        layer-type="overlay"
        name="Poor Rank"
        :visible="true">
        <vue-marker-cluster ref="clusterMarker">
          <l-marker :lat-lng="latLng(store['latitude'], store['longitude'])"
                    ref="markersRef"
                    v-for="(store,idx) in poorStores" :key="idx">
            <l-popup>
              <div class="columns is-multiline">
                <div class="column is-12 has-text-centered">
                  <p class="is-size-5 margin-pop" style="text-transform: capitalize">
                    {{parseCompanyName(store["store_id"])}}</p>
                </div>
                <div class="column is-12">
                  <p class="is-size-6 margin-pop">Store Id: {{parseCompanyId(store["store_id"])}}</p>
                  <p class="is-size-6 margin-pop">General Ranking:
                    <span class="has-text-weight-bold"
                          :style="{'color': evalMapColor[store['metric_eval']]}">{{store["metric_eval"]}}</span></p>
                  <!--                <p class="is-size-6">Percentile: {{formatRank(store["metric_rank"])}}</p>-->
                </div>
                <div class="column is-12">
                  <b-button type="is-info" expanded @click="openDetails(store)">See details</b-button>
                </div>
              </div>
            </l-popup>
          </l-marker>
        </vue-marker-cluster>
      </l-layer-group>

      <l-layer-group
        layer-type="overlay"
        name="Average Rank"
        :visible="true">
        <vue-marker-cluster ref="clusterMarker">
          <l-marker :lat-lng="latLng(store['latitude'], store['longitude'])"
                    ref="markersRef"
                    v-for="(store,idx) in avgStores" :key="idx">
            <l-popup>
              <div class="columns is-multiline">
                <div class="column is-12 has-text-centered">
                  <p class="is-size-5 margin-pop" style="text-transform: capitalize">
                    {{parseCompanyName(store["store_id"])}}</p>
                </div>
                <div class="column is-12">
                  <p class="is-size-6 margin-pop">Store Id: {{parseCompanyId(store["store_id"])}}</p>
                  <p class="is-size-6 margin-pop">General Ranking:
                    <span class="has-text-weight-bold"
                          :style="{'color': evalMapColor[store['metric_eval']]}">{{store["metric_eval"]}}</span></p>
                  <!--                <p class="is-size-6">Percentile: {{formatRank(store["metric_rank"])}}</p>-->
                </div>
                <div class="column is-12">
                  <b-button type="is-info" expanded @click="openDetails(store)">See details</b-button>
                </div>
              </div>
            </l-popup>
          </l-marker>
        </vue-marker-cluster>
      </l-layer-group>

      <l-layer-group
        layer-type="overlay"
        name="Good Rank"
        :visible="true">
        <vue-marker-cluster ref="clusterMarker">
          <l-marker :lat-lng="latLng(store['latitude'], store['longitude'])"
                    ref="markersRef"
                    v-for="(store,idx) in goodStores" :key="idx">
            <l-popup>
              <div class="columns is-multiline">
                <div class="column is-12 has-text-centered">
                  <p class="is-size-5 margin-pop" style="text-transform: capitalize">
                    {{parseCompanyName(store["store_id"])}}</p>
                </div>
                <div class="column is-12">
                  <p class="is-size-6 margin-pop">Store Id: {{parseCompanyId(store["store_id"])}}</p>
                  <p class="is-size-6 margin-pop">General Ranking:
                    <span class="has-text-weight-bold"
                          :style="{'color': evalMapColor[store['metric_eval']]}">{{store["metric_eval"]}}</span></p>
                  <!--                <p class="is-size-6">Percentile: {{formatRank(store["metric_rank"])}}</p>-->
                </div>
                <div class="column is-12">
                  <b-button type="is-info" expanded @click="openDetails(store)">See details</b-button>
                </div>
              </div>
            </l-popup>
          </l-marker>
        </vue-marker-cluster>
      </l-layer-group>

      <l-layer-group
        layer-type="overlay"
        name="Great Rank"
        :visible="true">
        <vue-marker-cluster ref="clusterMarker">
          <l-marker :lat-lng="latLng(store['latitude'], store['longitude'])"
                    ref="markersRef"
                    v-for="(store,idx) in greatStores" :key="idx">
            <l-popup>
              <div class="columns is-multiline">
                <div class="column is-12 has-text-centered">
                  <p class="is-size-5 margin-pop" style="text-transform: capitalize">
                    {{parseCompanyName(store["store_id"])}}</p>
                </div>
                <div class="column is-12">
                  <p class="is-size-6 margin-pop">Store Id: {{parseCompanyId(store["store_id"])}}</p>
                  <p class="is-size-6 margin-pop">General Ranking:
                    <span class="has-text-weight-bold"
                          :style="{'color': evalMapColor[store['metric_eval']]}">{{store["metric_eval"]}}</span></p>
                  <!--                <p class="is-size-6">Percentile: {{formatRank(store["metric_rank"])}}</p>-->
                </div>
                <div class="column is-12">
                  <b-button type="is-info" expanded @click="openDetails(store)">See details</b-button>
                </div>
              </div>
            </l-popup>
          </l-marker>
        </vue-marker-cluster>
      </l-layer-group>



    </l-map>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
  import {latLng} from "leaflet";
  import {LMap, LTileLayer, LMarker, LPopup, LTooltip, LControlLayers, LLayerGroup} from "vue2-leaflet";
  import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

  export default {
    name: "geoMap",
    props: {
      selectedMarker: {
        type: Array,
        required: false,
        default: null
      },
      isMainPage:{
        type: Boolean,
        required: false,
        default: false
      }
    },
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LTooltip,
      Vue2LeafletMarkerCluster,
      LControlLayers, LLayerGroup
    },
    data: function () {
      return {
        isLoading: false,
        zoom: 10,
        spCoordinates: latLng(-23.5505, -46.666),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        withPopup: latLng(47.41322, -1.219482),
        withTooltip: latLng(47.41422, -1.250482),
        currentZoom: 9.0,
        // currentCenter: latLng(47.41322, -1.219482),
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        markerObjects: [],
        evalMapColor: {
          "Poor": "red",
          "Average": "#FFB71A",
          "Good": "#575A89",
          "Great": "#8AFA03"
        },
        radioFilter: ""
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        this.markerObjects = {}
        if (this.$refs.markersRef) {
          let tmpMarkers = this.$refs.markersRef.map(ref => ref.mapObject)
          for (let idx in tmpMarkers) {
            this.markerObjects[[tmpMarkers[idx].getLatLng().toString()]] = tmpMarkers[idx]
          }
        }
      });
    },
    watch: {
      selectedMarker(val) {
        if (val) {
          let lat = val[0];
          let long = val[1];
          let e = latLng(lat, long).toString();
          if (Object.keys(this.markerObjects).includes(e)) {
            var myMarkerClusterGroup = this.$refs.clusterMarker.mapObject;
            let m = this.markerObjects[e];
            myMarkerClusterGroup.zoomToShowLayer(m, function () {
              m.openPopup();
            });
          }
        }
      }
    },
    methods: {
      latLng: latLng,
      openDetails: function (store) {
        console.log(store)
        this.$emit('display-store', store.store_id)
      },
      parseCompanyName: function (store_id) {
        return store_id.split("_")[0].split("-").join(" ")
      },
      parseCompanyId: function (store_id) {
        return store_id.split("_")[1]
      },
      formatRank: function (rank) {
        return Math.floor(rank * 100)
      }
    },
    computed: {
      markerData: function () {
        return this.$store.getters["api/getMarkerData"]
      },
      poorStores: function () {
        if(this.markerData){
          return this.markerData.filter((storeObj)=> storeObj.metric_eval === "Poor")
        }
        return []
      },
      avgStores: function () {
        if(this.markerData){
          return this.markerData.filter((storeObj)=> storeObj.metric_eval === "Average")
        }
        return []
      },
      goodStores: function () {
        if(this.markerData){
          return this.markerData.filter((storeObj)=> storeObj.metric_eval === "Good")
        }
        return []
      },
      greatStores: function () {
        if(this.markerData){
          return this.markerData.filter((storeObj)=> storeObj.metric_eval === "Great")
        }
        return []
      },
    }
  }
</script>

<style scoped>
  .geoMap {
    height: 55vh;
    width: 100%;
  }
  .geoMap-main {
    height: 70vh !important;
    width: 100%;
  }

  .margin-pop {
    margin: 10px 0 !important;
  }

  .store-filter {
    background: #fff;
    padding: 0 0.5em;
    border: 1px solid #aaa;
    border-radius: 0.1em;
  }
</style>
