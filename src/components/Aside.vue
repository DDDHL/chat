<template>
  <div class="bg">
    <div class="left">
      <div class="head">
        <el-avatar :size="36" shape="square" :src="avatar" />
      </div>
      <el-menu
        :default-active="path"
        class="el-menu-vertical-demo"
        :collapse="true"
        background-color="#2e2e2e"
        text-color="#949494"
        style="height: calc(100% - 80px)"
        router
      >
        <el-menu-item index="/leftCenter">
          <el-icon :size="20">
            <ChatDotSquare />
          </el-icon>
          <template #title>聊天区</template>
        </el-menu-item>
        <el-menu-item index="/chatPerson">
          <el-icon :size="20">
            <UserFilled />
          </el-icon>
          <template #title>好友列表</template>
        </el-menu-item>
        <el-menu-item index="/friendGroup">
          <el-icon :size="20">
            <Compass />
          </el-icon>
          <template #title>微社区</template>
        </el-menu-item>
        <el-menu-item index="/SystemSetting">
          <el-icon :size="20">
            <Setting />
          </el-icon>
          <template #title>设置</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { ChatDotSquare, UserFilled, Setting, Compass } from '@element-plus/icons'
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
export default {
  name: 'sysAside',
  components: {
    ChatDotSquare, UserFilled, Setting, Compass
  },
  setup() {
    var route = useRoute()
    var store = useStore()
    var avatar = ref(JSON.parse(window.sessionStorage.getItem('user')).avatar)
    watch(() => store.state.avatar, (newValue) => {
      // 更换头像
      avatar.value = newValue
    });
    var path = ref()
    path = computed(() => {
      if (route.path == '/chatFrame') {
        return '/leftCenter'
      }
      return route.path
    })
    return {
      avatar, path
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  display: flex;
  user-select: none;
}
.head {
  height: 45px;
  background: #2e2e2e;
  width: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35px;
}
:deep(.el-avatar.el-avatar--square > img) {
  image-rendering: -webkit-optimize-contrast;
}

.el-menu--collapse {
  width: 55px;
}
:deep(.el-menu-tooltip__trigger.el-tooltip__trigger.el-tooltip__trigger) {
  justify-content: center;
}
</style>