<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-aside width="250px">
        <!-- 顶部搜索框 -->
        <div class="headSearch">
          <div></div>
          <div>
            <el-input
              v-model="searchInfo"
              class="w-50 m-2"
              placeholder="搜索"
              :prefix-icon="Search"
            />
            <el-button :icon="Plus" />
          </div>
        </div>
        <!-- 下方用户列表 -->
        <div class="list"></div>
      </el-aside>
      <el-container>
        <el-header height="30px"><Top /></el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Search, Plus } from '@element-plus/icons'
import { ref } from '@vue/reactivity'
export default {
  name: 'ChatPerson',
  setup() {
    var searchInfo = ref()
    return {
      Search, Plus, searchInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
  background-color: #f5f5f5;
}
.el-aside {
  background-color: #f5f5f5;
}
.headSearch {
  background-color: #fff;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid #d6d6d6;
  > div:nth-child(1) {
    height: 22px;
    width: 100%;
    -webkit-app-region: drag;
  }
  > div:nth-child(2) {
    height: 37px;
    width: 250px;
    display: flex;
    justify-content: space-around;
    .el-input {
      width: 180px;
      height: 30px;
    }
    :deep(.el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 1px #dcdfe6 inset;
    }
    .el-button {
      width: 35px;
      height: 30px;
    }
  }
}
.list {
  background-color: #dcdcdd;
  height: calc(100% - 60px);
}
</style>>