<template>
  <div class="bg">
    <div class="info" ref="root">
      <div
        v-for="item in allMsg.data"
        :key="item"
        :class="item.from == myAccount ? 'rightInfo' : 'leftInfo'"
      >
        <div class="leftHead">
          <el-avatar
            shape="square"
            :size="35"
            fit="cover"
            :src="item.from == myAccount ? myHead : friendHead"
          />
        </div>
        <div :class="item.from == myAccount ? 'rightArrow' : 'leftArrow'"></div>
        <div :class="item.from == myAccount ? 'msg co' : 'msg'">
          <div>{{ item.msg }}</div>
        </div>
      </div>
    </div>
    <div class="input">
      <el-input
        v-model="inputInfo"
        :rows="6"
        type="textarea"
        placeholder="开始聊天吧"
        resize="none"
        @keyup.enter="sendMsg"
        @keydown="handleInput"
      />
      <div class="sendBtn">
        <el-tooltip
          effect="dark"
          content="不能发送空消息"
          placement="top"
          v-model:visible="tooltip"
        >
          <el-button plain @click="sendMsg">发送</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { nextTick, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  setup() {
    const store = useStore()
    const inputInfo = ref()
    const root = ref(null)
    const allMsg = reactive({ data: [] })
    const tooltip = ref(false)
    const ws = new WebSocket("ws://localhost:4000/");
    const myHead = JSON.parse(window.sessionStorage.getItem("user")).avatar
    const friendHead = ref()
    const myAccount = JSON.parse(window.sessionStorage.getItem("user")).account
    ws.onopen = function () {
      // 连接成功后发送信息
      ws.send(JSON.stringify({ state: 'connet', account: myAccount }))
    }
    watch(() => store.state.nowPeople, (newValue) => {
      // 更改用户重新获取聊天记录
      friendHead.value = newValue.avatar
    });
    function sendMsg() {
      if (inputInfo.value == '' || inputInfo.value == undefined) {
        tooltip.value = true
        setTimeout(() => {
          tooltip.value = false
        }, 1500)
        return
      }
      // 向服务端发送信息
      let data = JSON.stringify({ state: 'communication', fromAccount: myAccount, toAccount: store.state.nowPeople.account, msg: inputInfo.value })
      ws.send(data)
      inputInfo.value = ''
    }
    function handleInput(e) {
      // 聊天不允许输入回车
      if (e.keyCode == 13) {
        e.preventDefault()
      }
    }
    ws.onmessage = function (e) {
      // 接收服务端信息
      let data = JSON.parse(e.data)
      allMsg.data.push(data)
      nextTick(() => {
        root.value.scrollTop = root.value.scrollHeight
      })
    };
    ws.onclose = function () {
      ElMessage({
        message: '聊天服务器已断开',
        center: true,
        type: 'warning',
        duration: 2000,
      })
    }
    ws.onerror = function () {
      ElMessage({
        message: '聊天服务器出错',
        center: true,
        type: 'warning',
        duration: 2000,
      })
    }
    return {
      store,
      sendMsg,
      inputInfo,
      handleInput,
      allMsg,
      myHead,
      myAccount,
      friendHead,
      root,
      tooltip
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
}
.info {
  height: calc(100% - 137px);
  width: 100%;
  overflow-y: overlay;
  .leftInfo {
    display: flex;
    margin: 10px 0;
  }
  .rightInfo {
    display: flex;
    flex-direction: row-reverse;
    margin: 10px 0;
  }
  .leftHead {
    margin: 0 10px;
  }
  .co {
    background-color: #95ec69 !important;
  }
  .msg {
    max-width: 50%;
    min-width: 24px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    > div:last-child {
      margin: 8px;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
}
.rightArrow {
  width: 0;
  height: 0;
  font-size: 0;
  border: solid 7px;
  margin: 12px -10px 0 0;
  border-color: #f5f5f5 #f5f5f5 #f5f5f5 #95ec69;
}
.leftArrow {
  width: 0;
  height: 0;
  font-size: 0;
  border: solid 7px;
  margin: 12px 0 0 -10px;
  border-color: #f5f5f5 #ffffff #f5f5f5 #f5f5f5;
}
.input {
  float: bottom;
  height: 135px;
  box-sizing: border-box;
  :deep(.el-textarea__inner:focus) {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
  }
}
.sendBtn {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
/* 整个滚动条 */
.info::-webkit-scrollbar {
  width: 0;
}
.info:hover::-webkit-scrollbar {
  width: 10px;
}
/* 滚动条上的滚动滑块 */
.info::-webkit-scrollbar-thumb {
  background-color: #d2d2d2;
  border-radius: 32px;
}
/* 滚动条轨道 */
.info::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 32px;
}
</style>