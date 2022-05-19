<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-aside width="250px">
        <!-- 顶部搜索框 -->
        <leftCenterSearch />
        <!-- 下方用户列表 -->
        <div class="list">
          <div
            :class="
              activeItem == item.id
                ? 'list_item activeClass'
                : 'list_item notActiveClass'
            "
            @click="changeBg(item)"
            v-for="item in allUsers"
            :key="item.id"
          >
            <div class="headImg">
              <el-avatar
                shape="square"
                :size="40"
                fit="fit"
                :src="userListAvatar"
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
            <div @click="checkPeople">啊实打实大苏打</div>
          </div>
          <div class="grayLogo" v-show="logo">
            <el-image
              style="width: 120px; height: 120px"
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
import { ref } from '@vue/reactivity'
import LeftCenterSearch from './LeftCenterSearch.vue'
import grayLogoUrl from '@/assets/img/icon.png'
import router from '@/router'
export default {
  components: { LeftCenterSearch },
  setup() {
    var activeItem = ref()
    var logo = ref(true)
    var allUsers = [
      { id: '1', name: 'DDDHL' },
      { id: '2', name: '八本' },
      { id: '3', name: '幸福一家人' },
      { id: '4', name: '老八美食探讨群123456' },
      { id: '5', name: '卢本伟广场' },
      { id: '6', name: '前端工程师探讨' },
      { id: '7', name: '你好明天~' },
      { id: '8', name: '网抑云' },
      { id: '9', name: '微聊客服群' },
      { id: '10', name: '招聘会' },
      { id: '11', name: 'LOL开黑群' },
      { id: '12', name: '19软工通知群1111111111' },
    ]
    function changeBg(item) {
      activeItem.value = item.id
      router.push('chatFrame')
      logo.value = false
    }
    function checkPeople() {
      console.log(111)
    }
    var userListAvatar = JSON.parse(window.sessionStorage.getItem('user')).avatar
    return {
      userListAvatar, activeItem, allUsers, grayLogoUrl, logo, changeBg, checkPeople
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
  overflow-y: scroll;
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
  -webkit-app-region: drag;
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
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
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