<template>
  <div style="width: 100%; height: 100%">
    <Top />
    <div class="bg">
      <div class="allBox">
        <!-- 登录模块 -->
        <div class="box box2" :style="turnBox">
          <el-image style="width: 100px; height: 100px" :src="logoUrl" />
          <div class="title">微聊</div>
          <div>
            <el-input
              v-model="account"
              placeholder="请输入账号"
              :prefix-icon="User"
            />
          </div>
          <div>
            <el-input
              type="password"
              v-model="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            />
          </div>
          <div>
            <el-button type="primary" round @click="login">登录</el-button>
          </div>
          <div class="regText">
            没有账号？<span @click="regUserTurn">注册</span>
          </div>
        </div>
        <!-- 注册模块 -->
        <div class="box2 box2Turn" :style="turnBox2">
          <el-image style="width: 100px; height: 100px" :src="logoUrl" />
          <div class="title">用户注册</div>
          <div>
            <el-input
              v-model="account"
              placeholder="请输入账号"
              :prefix-icon="User"
            />
          </div>
          <div>
            <el-input
              type="password"
              v-model="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            />
          </div>
          <div>
            <el-button type="primary" round @click="regUser">注册</el-button>
          </div>
          <div class="regText"><span @click="turnBack">返回登录</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logoUrl from '@/assets/img/logo.png'
import { ref } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import { encrypt } from '@/utils/secret'
import { userLogin, userRegister } from '@/api'
import router from '@/router'
import { Lock, User } from '@element-plus/icons'
import Top from '@/components/Top.vue'
export default {
  name: 'UserLogin',
  components: {
    Top
  },
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
      userLogin(
        { account: account.value, password: encrypt(password.value) }
      )
        .then((res) => {
          message(res.message, 'success')
          window.sessionStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('user', JSON.stringify(res.data.info[0]))
          setTimeout(() => {
            router.push('index')
          }, 1000)
        })
    }

    // 注册用户
    function regUser() {
      userRegister({
        account: account.value,
        password: encrypt(password.value)
      }).then(res => {
        message(res.message, 'success')
        setTimeout(() => {
          turnBack()
        }, 1000)
      })
    }

    // 注册用户翻转
    function regUserTurn() {
      account.value = ''
      password.value = ''
      turnBox.value = 'transform: rotateY(180deg);'
      turnBox2.value = 'transform: rotateY(0deg);'
    }

    // 返回登录页
    function turnBack() {
      account.value = ''
      password.value = ''
      turnBox.value = 'transform: rotateY(0deg);'
      turnBox2.value = 'transform: rotateY(180deg);'
    }
    // 弹窗
    function message(message, type) {
      ElMessage({
        message: message,
        center: true,
        type: type,
        duration: 1000,
      })
    }
    return {
      logoUrl,
      account,
      password,
      turnBox,
      turnBox2,
      User,
      Lock,
      login,
      regUserTurn,
      regUser,
      turnBack,
    }
  },
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: calc(100% - 30px);
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
}
.allBox {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 3.4px 3.4px 2.7px rgba(0, 0, 0, 0.019),
    8.7px 8.7px 6.9px rgba(0, 0, 0, 0.027),
    17.7px 17.7px 14.2px rgba(0, 0, 0, 0.033),
    36.5px 36.5px 29.2px rgba(0, 0, 0, 0.041),
    100px 100px 80px rgba(0, 0, 0, 0.06);
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
