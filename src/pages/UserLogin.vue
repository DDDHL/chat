<template>
  <div class="bg">
    <div class="allBox">
      <!-- 登录模块 -->
      <div class="box box2" :style="turnBox">
        <el-image style="width: 100px; height: 100px" :src="logoUrl" />
        <div class="title">新华的湖</div>
        <div>
          <el-input v-model="account" placeholder="请输入账号" />
        </div>
        <div>
          <el-input
            type="password"
            v-model="password"
            placeholder="请输入密码"
          />
        </div>
        <div>
          <el-button type="primary" round @click="login">登录</el-button>
        </div>
        <div class="regText">没有账号？<span @click="regUser">注册</span></div>
      </div>
      <!-- 注册模块 -->
      <div class="box2 box2Turn" :style="turnBox2">
        <el-image style="width: 100px; height: 100px" :src="logoUrl" />
        <div class="title">用户注册</div>
        <div>
          <el-input v-model="account" placeholder="请输入账号" />
        </div>
        <div>
          <el-input
            type="password"
            v-model="password"
            placeholder="请输入密码"
          />
        </div>
        <div>
          <el-button type="primary" round @click="login">注册</el-button>
        </div>
        <div class="regText"><span @click="turnBack">返回登录</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import logoUrl from '@/assets/img/logo.png'
import { ref } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import { encrypt } from '@/utils/secret'
export default {
  name: 'UserLogin',
  setup() {
    var account = ref()
    var password = ref()
    var turnBox = ref()
    var turnBox2 = ref()
    // 登录
    function login() {
      if (!account.value) {
        message('请输入账号', 'error')
        return
      }
      if (!password.value) {
        message('请输入密码', 'error')
        return
      }
      console.log(encrypt(password.value))
    }
    // 注册用户
    function regUser() {
      console.log('用户注册')
      turnBox.value = 'transform: rotateY(180deg);'
      turnBox2.value = 'transform: rotateY(0deg);'
    }
    // 返回登录页
    function turnBack() {
      turnBox.value = 'transform: rotateY(0deg);'
      turnBox2.value = 'transform: rotateY(180deg);'
    }
    // 弹窗
    function message(message, type) {
      ElMessage({
        message: message,
        center: true,
        type: type,
      })
    }
    return {
      logoUrl, account, password, turnBox, turnBox2, login, regUser, turnBack,
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: calc(100% - 30px);
  background-color: rgb(114, 88, 88);
}
.allBox {
  position: relative;
  width: 100%;
  height: 100%;
}
.box {
  z-index: 1;
}
.box2Turn {
  transform: rotateY(180deg);
}
.box2 {
  backface-visibility: hidden;
  transition: all 1s;
  position: absolute;
  top: calc(50% - 175px);
  left: calc(50% - 144px);
  width: 288px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  & > div:nth-child(1) {
    margin: 10px;
  }
  & > div:nth-child(3) {
    margin: 25px 0 15px 0;
  }
  & > div:nth-child(5) {
    margin-top: 20px;
  }
}
.regText {
  margin-top: 22px;
  font-size: 14px;
  & > span {
    color: #2d71b6;
    &:hover {
      cursor: pointer;
    }
  }
}
.title {
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
}
</style>
