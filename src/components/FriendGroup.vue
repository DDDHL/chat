<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-header height="30px"><Top /></el-header>
      <el-main>
        <div>微社区</div>
        <el-image style="width: 100%; height: 30%" :src="imgBg" fit="cover" />
        <div class="contain">
          <div class="headImg">
            <el-avatar :size="80" :src="head" />
          </div>
          <div style="height: 50px"></div>
          <div>123</div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import imgBg from '@/assets/img/bg.jpg'
import head from '@/assets/img/head.jpg'
export default {
  name: 'FriendGroup',
  setup() {
    return {
      imgBg, head
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
  > div:first-child {
    width: 100%;
    height: 30px;
    -webkit-app-region: drag;
    text-align: center;
    border-bottom: 1px solid #dddddd;
    font-size: 18px;
  }
}
.contain {
  width: 100%;
  position: relative;
  .headImg {
    position: absolute;
    top: -42px;
    left: 20px;
    width: 84px;
    height: 84px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 42px;
    :deep(.el-avatar > img) {
      image-rendering: -webkit-optimize-contrast;
    }
  }
}
</style>>