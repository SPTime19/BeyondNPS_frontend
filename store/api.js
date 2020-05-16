
export const state = () => ({
  markerData: null,
  rankingData: null,
  isDataLoading: true,
});

export const mutations = {
  setMarkerData(state, payload) {
    state.markerData = payload
  },

  setRankedCompanies(state, payload){
    state.rankingData = payload;
  },

  setDataLoading(state, payload) {
    state.isDataLoading = payload
  },
};

export const getters = {
  getMarkerData(state) {
    return state.markerData
  },
  getRankingData(state){
    return state.rankingData
  },
  getDataLoading(state){
    return state.isDataLoading
  }
};

export const actions = {

  async FETCH_MARKER_METRIC(state, payload) {
    let finalUrl = process.env.API.HOST + "/geoMarkers/" + payload.metric;
    state.commit("setDataLoading", true);

    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setMarkerData", data);
      })
  },

  async FETCH_COMPANY_METRICS(state, payload) {
    let finalUrl = process.env.API.HOST + "/ranked/companies/" + payload.metric;
    state.commit("setDataLoading", true);

    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setRankedCompanies", data);
      })
  },

};
