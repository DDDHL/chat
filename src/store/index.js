import { createStore } from 'vuex'

export default createStore({
  state: {
    ip: 'http://localhost:7777',
    chatIp: 'ws://localhost:4000/',
    isLoading: true,
    nowPeople: {},
  },
  mutations: {
    contraLoading(state, payload) {
      state.isLoading = payload
    },
  },
  actions: {},
  modules: {},
})
