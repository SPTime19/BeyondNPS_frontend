
export const state = () => ({
  markerData: null,
});

export const mutations = {
  setMarkerData(state, payload) {
    state.markerData = payload
  },
};

export const getters = {
  getMarkerData(state) {
    return state.markerData
  },
};

export const actions = {

  async FETCH_MARKER_METRIC(state, payload) {
    let finalUrl = process.env.API.HOST + "/geoMarkers/" + payload.metric;
    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setMarkerData", data);
      })
  },

};
