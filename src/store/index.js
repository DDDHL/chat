import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: true,
  },
  mutations: {
    contraLoading(state, payload) {
      state.isLoading = payload
    },
  },
  actions: {},
  modules: {},
})
