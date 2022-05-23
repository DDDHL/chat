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
      <el-button :icon="Plus" @click="dialogVisible = true" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="添加好友" width="350px" center>
    <div>
      <el-input
        v-model="searchParams"
        class="w-50 m-2"
        placeholder="搜索账户或名字"
        :prefix-icon="Search"
        @keydown.enter="searchPeople"
        clearable
        @clear="userList.data = []"
      />
    </div>
    <div class="userList_fa">
      <div class="userList" v-for="item in userList.data" :key="item">
        <div>
          <el-image class="headAvatar" :src="item.avatar" fit="cover" />
        </div>
        <div class="head">
          <div>{{ item.name }}</div>
          <div>{{ item.signature }}</div>
        </div>
        <div v-if="item.sex == '男'">
          <el-icon size="18px" :color="'#46A3FF'">
            <Female />
          </el-icon>
        </div>
        <div v-else>
          <el-icon size="18px" color="#FF79BC">
            <Male />
          </el-icon>
        </div>
        <div style="margin-right: 10px">
          <el-button :icon="Plus" @click="addFriend(item.account)" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Search, Plus, Female, Male } from '@element-plus/icons'
import { reactive, ref } from '@vue/reactivity'
import { searchFriends, addNewFriend } from '@/api'
import { ElMessage } from 'element-plus'
export default {
  emits: ['updateData'],
  components: {
    Female, Male
  },
  setup(props, context) {
    var searchInfo = ref()
    var searchParams = ref()
    var dialogVisible = ref(false)
    var userList = reactive({ data: [] })
    // 搜索用户（除自己和已加好友）
    function searchPeople() {
      if (searchParams.value == undefined || searchParams.value == '') {
        userList.data = []
        return
      }
      searchFriends({ params: searchParams.value }, { auth: true }).then(res => {
        if (res.data.length == 0) {
          ElMessage({
            message: '没有此用户哦~',
            center: true,
            type: 'warning',
            duration: 2000,
          })
        }
        userList.data = res.data
      })
    }
    // 添加用户
    function addFriend(paramsAccount) {
      addNewFriend({ paramsAccount: paramsAccount }, { auth: true }).then(res => {
        ElMessage({
          message: res.message,
          center: true,
          type: 'success',
          duration: 2000,
        })
        if (userList.data.length > 1) {
          searchPeople()
        } else {
          userList.data = []
        }
        context.emit('updateData')
      })
    }
    return {
      Search, Plus, searchInfo, dialogVisible, searchParams, userList, searchPeople, addFriend
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
.userList_fa {
  height: 300px;
  overflow: auto;
}
.userList {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-button {
    width: 35px;
    height: 35px;
  }
  .head {
    display: flex;
    flex-direction: column;
    height: 55px;
    width: 150px;
    div:nth-child(1) {
      font-size: 16px;
    }
    div:nth-child(2) {
      margin-top: 10px;
      color: #a7a6a6;
    }
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.headAvatar {
  width: 55px;
  height: 55px;
  border: 1px solid #d6d6d6;
  image-rendering: -webkit-optimize-contrast;
}
/* 整个滚动条 */
.userList_fa::-webkit-scrollbar {
  width: 6px;
}
.userList_fa:hover::-webkit-scrollbar {
  width: 6px;
}
/* 滚动条上的滚动滑块 */
.userList_fa::-webkit-scrollbar-thumb {
  background-color: #adacaa;
  border-radius: 32px;
}
/* 滚动条轨道 */
.userList_fa::-webkit-scrollbar-track {
  background-color: #dcdcdd;
  border-radius: 32px;
}
</style>