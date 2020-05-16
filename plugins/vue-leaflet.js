import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component("vue-marker-cluster", Vue2LeafletMarkerCluster);

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

delete Icon.Default.prototype._getIconUrl;

Icon.Default.imagePath = '.';
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


