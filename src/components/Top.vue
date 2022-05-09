<template>
  <div class="bg">
    <div class="top close" @click="close">
      <el-icon :size="20">
        <Close />
      </el-icon>
    </div>
    <div class="top max" @click="maximize">
      <el-icon :size="20">
        <FullScreen />
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
import { Close, Minus, FullScreen } from '@element-plus/icons'
const { ipcRenderer } = require('electron')
export default {
  name: 'sysTop',
  components: {
    Close,
    Minus,
    FullScreen,
  },
  methods: {
    maximize() {
      this.fullscreen = true
      ipcRenderer.send('window-maximize')
    },
    minimize() {
      ipcRenderer.send('window-minimize')
    },
    close() {
      console.log(88)
      ipcRenderer.send('window-close')
    }
  },
}
</script>

<style lang="scss" scoped>
.bg {
  -webkit-app-region: drag;
  width: 100%;
  height: 30px;
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
  background-color: #fff;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
}
</style>
