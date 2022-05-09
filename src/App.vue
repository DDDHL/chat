<template>
  <Top />
  <Loading v-show="store.state.isLoading" />
  <router-view v-show="!store.state.isLoading"></router-view>
</template>

<script>
  import { useStore } from 'vuex'
  import Loading from '@/components/Loading.vue'
  import Top from '@/components/Top.vue'
  export default {
    name: 'App',
    components: {
      Loading,Top
    },
    setup() {
      const store = useStore()
      setTimeout(() => {
        store.commit('contraLoading',false)
      }, 2000);
      return {
        store
      }
    }
  }
</script>

<style lang="scss">

</style>