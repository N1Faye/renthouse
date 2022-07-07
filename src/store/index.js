import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    area: '',
    ipArea: '北京',
    cityId: 'AREA|88cff55c-aaa4-e2e0',
    user: '',
    baseurl: 'http://liufusong.top:8080'
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setArea (state, payload) {
      state.area = payload
    },
    setCityId (state, payload) {
      state.cityId = payload
    },
    setIpArea (state, payload) {
      state.ipArea = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
