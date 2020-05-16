<template>
  <div class="geoMap" style="overflow: auto">
    <l-map
      :zoom="zoom"
      :center="spCoordinates"
      style="height: 80%"
      :options="mapOptions">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <vue-marker-cluster>
        <l-marker :lat-lng="latLng(store['latitude'], store['longitude'])"
                  v-for="(store,idx) in markerData" :key="idx">
          <l-popup>
            <div class="columns is-multiline">
              <div class="column is-8">
                <p class="is-size-5">{{parseCompanyName(store["store_id"])}}</p>
              </div>
              <div class="column is-4"></div>
              <div class="column is-12">
                <p class="is-size-6">General Ranking: <span class="has-font-weight-bold">{{store["metric_eval"]}}</span></p>
                <p class="is-size-6">Percentile: {{formatRank(store["metric_rank"])}}</p>
              </div>
              <div class="column is-12">
                <b-button type="is-info" expanded @click="openDetails(store)">See details</b-button>
              </div>
            </div>
          </l-popup>
        </l-marker>
      </vue-marker-cluster>
    </l-map>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
  import {latLng} from "leaflet";
  import {LMap, LTileLayer, LMarker, LPopup, LTooltip} from "vue2-leaflet";
  import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

  export default {
    name: "geoMap",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LTooltip,
      Vue2LeafletMarkerCluster
    },
    data: function () {
      return {
        isLoading: false,
        zoom: 9,
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
        }
      }
    },
    methods: {
      latLng:latLng,
      openDetails: function (store) {
        console.log(store)
        this.$emit('display-store', store.store_id)
      },
      parseCompanyName: function (store_id) {
        return store_id.split("_")[0].split("-").join(" ")
      },
      formatRank: function (rank) {
        return Math.floor(rank*100)
      }
    },
    computed: {
      markerData: function () {
        return this.$store.getters["api/getMarkerData"]
      }
    }
  }
</script>

<style scoped>
  .geoMap {
    height: 80vh;
    width: 100%;
  }
</style>
