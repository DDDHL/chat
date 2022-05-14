<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-aside width="55px"><Aside /></el-aside>
      <el-aside width="250px"
        ><el-button type="primary" @click="logOut"
          >退出登录</el-button
        ></el-aside
      >
      <el-container>
        <el-header height="30px"><Top /></el-header>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Top from '@/components/Top'
import Aside from '@/components/Aside'
import router from '@/router'
export default {
  name: 'SystemIndex',
  components: {
    Top, Aside
  },
  setup() {
    const store = useStore()
    store.commit('contraLoading', true)
    setTimeout(() => {
      store.commit('contraLoading', false)
    }, 2000);
    function logOut() {
      router.push('/')
    }
    return {
      store,
      logOut
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  widows: 100%;
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
}
</style>