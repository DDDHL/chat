<template>
  <div class="bg">
    <div class="left">
      <div class="head">
        <el-avatar :size="36" shape="square" :src="circleUrl" />
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="true"
        background-color="#2e2e2e"
        text-color="#949494"
        style="height: calc(100% - 80px)"
        router
      >
        <el-menu-item index="/userList">
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
        <el-menu-item index="/chatPerson">
          <el-icon :size="20">
            <Compass />
          </el-icon>
          <template #title>微社区</template>
        </el-menu-item>
        <el-menu-item index="/chatPerson">
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
import circleUrl from '@/assets/img/head.jpg'
export default {
  name: 'sysAside',
  components: {
    ChatDotSquare, UserFilled, Setting, Compass
  },
  setup() {
    return {
      circleUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  display: flex;
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
.right {
  width: 250px;
  border-right: 1px solid #eee;
}
.el-menu--collapse {
  width: 55px;
}
:deep(.el-menu-tooltip__trigger.el-tooltip__trigger.el-tooltip__trigger) {
  justify-content: center;
}
</style>