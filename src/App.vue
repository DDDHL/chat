<template>
  <Loading v-show="store.state.isLoading" />
  <router-view v-show="!store.state.isLoading"></router-view>
</template>

<script>
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'
export default {
  name: 'App',
  components: {
    Loading
  },
  setup() {
    const store = useStore()
    setTimeout(() => {
      store.commit('contraLoading', false)
    }, 2000);
    return {
      store,
    }
  }
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>