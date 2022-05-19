<template>
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
</template>

<script>
import { Search, Plus } from '@element-plus/icons'
import { ref } from '@vue/reactivity'
export default {
  setup() {
    var searchInfo = ref()
    return {
      Search, Plus, searchInfo
    }
  }
}
</script>

<style lang="scss" scoped>
// 上方搜索框
.headSearch {
  background-color: #f7f7f7;
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
</style>