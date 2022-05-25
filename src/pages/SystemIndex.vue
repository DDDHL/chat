<template>
  <div class="bg">
    <div class="index">
      <div class="index_item1"><Aside /></div>
      <div class="index_item2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'SystemIndex',
  setup() {
    const store = useStore()
    store.commit('contraLoading', true)
    setTimeout(() => {
      store.commit('contraLoading', false)
    }, 2000);
    return {
      store
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  widows: 100%;
  height: 100%;
  .index {
    display: flex;
    width: 100%;
    height: 100%;
    .index_item1 {
      width: 54px;
    }
    .index_item2 {
      width: calc(100% - 55px);
    }
  }
}
:deep(.el-aside) {
  --el-aside-widt: calc(90% -55px);
}
</style>