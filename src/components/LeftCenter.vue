<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-aside width="250px">
        <!-- 顶部搜索框 -->
        <leftCenterSearch @updateData="getData" />
        <!-- 下方用户列表 -->
        <div class="list">
          <div
            :class="
              activeItem == item.id
                ? 'list_item activeClass'
                : 'list_item notActiveClass'
            "
            @click="changeBg(item)"
            v-for="item in allUsers.data"
            :key="item.id"
          >
            <div class="headImg">
              <el-avatar
                shape="square"
                :size="40"
                fit="cover"
                :src="item.avatar"
              />
            </div>
            <div class="text">
              <div>{{ item.name }}</div>
              <div>你好啊啊啊啊啊aaaaa</div>
            </div>
            <div class="time">13:06</div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header height="61px" :style="logo ? 'border:none' : ''"
          ><Top />
          <div class="headDrag"></div>
        </el-header>
        <el-main>
          <div class="chatTitle" v-show="!logo">
            <div @click="checkPeople(peopleName)">{{ peopleName }}</div>
          </div>
          <div class="grayLogo" v-show="logo">
            <el-image
              style="width: 120px; height: 120px; -webkit-user-select: none"
              :src="grayLogoUrl"
              fit="fill"
            />
          </div>
          <router-view v-show="!logo"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import LeftCenterSearch from './LeftCenterSearch.vue'
import grayLogoUrl from '@/assets/img/icon.png'
import { useStore } from 'vuex'
import router from '@/router'
import { getFriendsList } from '@/api'
import { onMounted } from '@vue/runtime-core'
export default {
  components: { LeftCenterSearch },
  setup() {
    var activeItem = ref()
    var logo = ref(true)
    var peopleName = ref()
    var allUsers = reactive({ data: [] })
    const store = useStore()
    onMounted(() => {
      getData()
    })
    function getData() {
      getFriendsList({ auth: true }).then(res => {
        allUsers.data = res.data
        if (res.data.length > 0) {
          store.state.nowPeople = { avatar: res.data[0].avatar, account: res.data[0].account }
        }
      })
    }
    function changeBg(item) {
      activeItem.value = item.id
      peopleName.value = item.name
      store.state.nowPeople = item
      router.push('chatFrame')
      logo.value = false
    }
    function checkPeople(name) {
      console.log(name)
    }
    var userListAvatar = JSON.parse(window.sessionStorage.getItem('user')).avatar
    return {
      userListAvatar, activeItem, allUsers, grayLogoUrl, logo, peopleName, changeBg, checkPeople, getData
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
.el-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #d6d6d6;
}
// 下方好友列表
.list {
  background-color: #dcdcdd;
  height: calc(100% - 60px);
  box-sizing: border-box;
  border-right: 1px solid #d6d6d6;
  overflow-y: overlay;
  .list_item {
    user-select: none;
    display: flex;
    height: 70px;
    align-items: center;
    .headImg {
      margin-left: 10px;
    }
    .text {
      height: 40px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      width: 136px;
      > div {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      > div:nth-child(1) {
        margin-top: -2px;
        font-size: 16px;
        line-height: 16px;
      }
      > div:nth-child(2) {
        font-size: 14px;
        margin-top: 10px;
        line-height: 14px;
        color: #999999;
      }
    }
    .time {
      font-size: 13px;
      color: #999999;
      margin-top: -35px;
    }
    &:hover {
      background-color: #d2d1d1;
    }
  }
}
.chatTitle {
  height: 40px;
  font-size: 22px;
  line-height: 22px;
  position: absolute;
  top: 20px;
  left: 330px;
  div {
    -webkit-app-region: no-drag !important;
    display: inline-block;
    user-select: none;
  }
}
.grayLogo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: -35px;
}
.headDrag {
  -webkit-app-region: drag;
  height: 30px;
}
.activeClass {
  background-color: #c7c6c6;
}
.notActiveClass {
  background-color: #dcdcdd;
}
:deep(.el-avatar.el-avatar--square > img) {
  image-rendering: -webkit-optimize-contrast;
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
</style>>