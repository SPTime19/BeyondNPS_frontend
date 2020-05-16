
export const state = () => ({
  geoMapData: null,
});

export const mutations = {
  setGeoMapData(state, payload) {
    state.geoMapData = payload
  },
};

export const getters = {
  getGeoMapData(state) {
    return state.geoMapData
  },
};

export const actions = {

  async FETCH_GEO_MAP_DATA(state, payload) {
    return this.$axios.$post("/api/session")
      .then((data)=>{
        if(process.env.NODE_ENV === "development"){
          console.log(data)
        }
        state.commit("setGeoMapData", JSON.parse(data));
        return data
      })
  },

};
