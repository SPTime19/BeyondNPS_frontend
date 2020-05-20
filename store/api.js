
export const state = () => ({
  markerData: null,
  rankingData: null,
  isDataLoading: true,
  storeDetails: null,
  benchmarkTs: null,
  companyDetails: null,
  benchmarkCompanyTs: null,
  benchmarkCompanyDistribution: null
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

  setStoreDetails(state, payload) {
    state.storeDetails = payload
  },
  setBenchmarkTs(state, payload) {
    state.benchmarkTs = payload
  },
  setCompanyDetails(state, payload) {
    state.companyDetails = payload
  },
  setBenchmarkCompanyTs(state, payload) {
    state.benchmarkCompanyTs = payload
  },
  setBenchmarkCompanyDistribution(state, payload) {
    state.benchmarkCompanyDistribution = payload
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
  },
  getStoreDetails(state){
    return state.storeDetails
  },
  getBenchmarkTs(state){
    return state.benchmarkTs
  },
  getBenchmarkCompanyTs(state){
    return state.benchmarkCompanyTs
  },
  getCompanyDetails(state) {
    return state.companyDetails
  },
  getBenchmarkCompanyDistribution(state){
    return state.benchmarkCompanyDistribution
  },
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

  async FETCH_MARKER_METRIC_COMPANY(state, payload) {
    let finalUrl = process.env.API.HOST + "/geoMarkers/" + payload.metric+ "/company/"+payload.company_id;
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

  async FETCH_STORE_DETAILS(state, payload) {
    let finalUrl = process.env.API.HOST + "/detail/stores/" + payload.store_id;
    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setStoreDetails", data);
      })
  },

  async FETCH_BENCHMARK_METRIC(state, payload) {
    let finalUrl = process.env.API.HOST + "/metric/"+payload.metric+"/store/" + payload.store_id;
    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setBenchmarkTs", data);
      })
  },

  async FETCH_COMPANY_DETAILS(state, payload) {
    let finalUrl = process.env.API.HOST + "/detail/company/" + payload.company_id;
    console.log(finalUrl)
    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setCompanyDetails", data);
      })
  },

  async FETCH_COMPANY_BENCHMARK_METRIC(state, payload) {
    let finalUrl = process.env.API.HOST + "/metric/"+payload.metric+"/company/" + payload.company_id;
    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setBenchmarkCompanyTs", data);
      })
  },

  async FETCH_COMPANY_BENCHMARK_METRIC_DISTRIBUTION(state, payload) {
    var finalUrl = process.env.API.HOST + "/metric/distribution/"+payload.metric+"/company/" + payload.company_id;
    finalUrl = finalUrl +"/"+ payload.dt_com;

    return this.$axios.$get(finalUrl)
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setBenchmarkCompanyDistribution", data);
      })
  },


};
