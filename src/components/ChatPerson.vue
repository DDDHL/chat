<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-aside width="250px">
        <!-- 顶部搜索框 -->
        <LeftCenterSearch />
        <!-- 下方好友列表 -->
        <div class="list">
          <div
            class="list_item"
            v-for="item in allUsers.data"
            :key="item.id"
            @click="checkOne(item)"
          >
            <div class="headImg">
              <el-avatar
                shape="square"
                :size="40"
                fit="cover"
                :src="item.avatar"
              />
            </div>
            <div class="name">
              <div>{{ item.name }}</div>
              <div>{{ item.signature }}</div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header height="30px"><Top /></el-header>
        <el-main>
          <div></div>
          <div class="grayLogo" v-show="showLogo">
            <el-image
              style="width: 120px; height: 120px; -webkit-user-select: none"
              :src="grayLogoUrl"
              fit="fill"
            />
          </div>
          <div v-show="!showLogo" class="info">
            <div style="margin-top: 30px">
              <el-image
                style="width: 100px; height: 100px"
                :src="userData.data.avatar"
                fit="cover"
              />
            </div>
            <div class="info_item">
              {{ userData.data.name }}
              <span v-if="userData.data.sex == '男'"
                ><el-icon size="16px" :color="'#46A3FF'"> <Female /> </el-icon
              ></span>
              <span v-else>
                <el-icon size="18px" color="#FF79BC">
                  <Male />
                </el-icon>
              </span>
            </div>
            <div class="info_item">{{ userData.data.account }}</div>
            <div class="info_item">{{ userData.data.signature }}</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import grayLogoUrl from '@/assets/img/icon.png'
import { Search, Plus, Female, Male } from '@element-plus/icons'
import { reactive, ref } from '@vue/reactivity'
import { getFriendsList } from '@/api'
export default {
  name: 'ChatPerson',
  components: { Female, Male },
  setup() {
    var searchInfo = ref()
    var allUsers = reactive({ data: [] })
    var showLogo = ref(true)
    var userData = reactive({ data: {} })
    getFriendsList({ auth: true }).then(res => {
      allUsers.data = res.data
    })
    function checkOne(item) {
      userData.data = item
      console.log(item)
      showLogo.value = false
    }
    return {
      Search, Plus, searchInfo, allUsers, grayLogoUrl, checkOne, showLogo, userData
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
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-image {
    image-rendering: -webkit-optimize-contrast;
  }
}
.el-main {
  padding: 0;
  background-color: #f5f5f5;
  > div:first-child {
    width: 100%;
    height: 30px;
    -webkit-app-region: drag;
    border-bottom: 1px solid #d6d6d6;
  }
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
  overflow-y: overlay;
  user-select: none;
  .list_item {
    display: flex;
    height: 60px;
    align-items: center;
    padding-left: 10px;
    border-bottom: 1px solid #c0bfbf;
  }
  .name {
    width: 150px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > div:nth-child(1) {
      line-height: 20px;
    }
    > div:nth-child(2) {
      line-height: 20px;
      color: #a7a6a6;
      font-size: 14px;
    }
  }

  .list_item:hover {
    background-color: #d2d1d1;
  }
  .headImg {
    image-rendering: -webkit-optimize-contrast;
  }
}
/* 整个滚动条 */
.list::-webkit-scrollbar {
  width: 0;
}
.list:hover::-webkit-scrollbar {
  width: 6px;
}
/* 滚动条上的滚动滑块 */
.list::-webkit-scrollbar-thumb {
  background-color: #adacaa;
  border-radius: 32px;
}
/* 滚动条轨道 */
.list::-webkit-scrollbar-track {
  background-color: #dcdcdd;
  border-radius: 32px;
}
.grayLogo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: -51px;
}
.info_item {
  border-bottom: 1px solid #dddddd;
  line-height: 60px;
  width: 300px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>