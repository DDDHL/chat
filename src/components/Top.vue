<template>
  <div class="bg">
    <div class="top close" @click="close">
      <el-icon :size="20">
        <Close />
      </el-icon>
    </div>
    <div class="top max" @click="maximize">
      <el-icon :size="20">
        <FullScreen v-show="!isFullscreen" />
        <CopyDocument v-show="isFullscreen" />
      </el-icon>
    </div>
    <div class="top min" @click="minimize">
      <el-icon :size="20">
        <Minus />
      </el-icon>
    </div>
  </div>
</template>

<script>
import { Close, Minus, FullScreen, CopyDocument } from '@element-plus/icons'
import { ref } from '@vue/reactivity'
const { ipcRenderer } = require('electron')
export default {
  name: 'sysTop',
  components: {
    Close,
    Minus,
    FullScreen,
    CopyDocument
  },
  setup() {
    var isFullscreen = ref(false)
    function maximize() {
      isFullscreen.value = !isFullscreen.value
      ipcRenderer.send('window-maximize')
    }
    function minimize() {
      ipcRenderer.send('window-minimize')
    }
    function close() {
      ipcRenderer.send('window-close')
    }
    return {
      maximize, minimize, close, CopyDocument, isFullscreen
    }
  },
}
</script>

<style lang="scss" scoped>
$topBg: #f5f5f5;
.bg {
  background-color: $topBg !important;
  background-image: none !important;
  -webkit-app-region: drag;
  width: 100%;
  height: 30px !important;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #e2e2e2;
    }
  }
}
.top {
  width: 30px;
  height: 30px;
  float: right;
  background-color: $topBg;
  -webkit-app-region: no-drag !important;
  -webkit-user-select: none;
}
</style>
