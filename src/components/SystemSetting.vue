<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-container>
        <el-header height="30px"><Top /></el-header>
        <el-main>
          <div class="head">个人资料设置</div>
          <div class="headForm">
            <el-upload
              class="avatar-uploader"
              :action="uploadIp"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="uploadToken"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div class="input">
              <div class="input_item">
                <div>姓名:</div>
                <el-input v-model="name" placeholder="Please input" />
              </div>
              <div class="input_item">
                <div>性别:</div>
                <el-select
                  v-model="sex"
                  placeholder="Select"
                  style="width: 280px"
                >
                  <el-option
                    v-for="item in SexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="input_item">
                <div>签名:</div>
                <div style="width: 280px">
                  <el-input
                    v-model="signature"
                    :rows="2"
                    type="textarea"
                    placeholder="开始聊天吧"
                    resize="none"
                  />
                </div>
              </div>
            </div>
            <div style="margin-top: 40px">
              <el-button type="primary" @click="save">保存修改</el-button>
              <el-button type="warning" @click="changPwd">修改密码</el-button>
              <el-button type="danger" @click="logOut">退出登录</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Search, Plus } from '@element-plus/icons'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { ref } from '@vue/reactivity'
import { userLogOut, changeInfo } from '@/api'
import router from '@/router'
export default {
  name: 'SystemSetting',
  components: { Plus },
  setup() {
    const store = useStore()
    var user = JSON.parse(window.sessionStorage.getItem('user'))
    const imageUrl = ref(user.avatar)
    const uploadIp = store.state.ip + '/upLoadSingle'
    const uploadToken = { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') }
    const signature = ref(user.signature)
    const name = ref(user.name)
    const SexOptions = [{ value: '男', label: '男' }, { value: '女', label: '女' }]
    const sex = ref(user.sex)
    function handleAvatarSuccess(res) {
      console.log(res)
      if (res.code) {
        ElMessage({
          message: res.message,
          center: true,
          type: 'error',
          duration: 1000,
        })

      } else {
        imageUrl.value = res.data.path
        user.avatar = res.data.path
        window.sessionStorage.setItem('user', JSON.stringify(user))
        ElMessage({
          message: res.message,
          center: true,
          type: 'success',
          duration: 1000,
        })
      }
    }
    function beforeAvatarUpload(file) {
      const imgReg = /\.(jpg|png|jpeg)$/i
      const isLt1M = file.size / 1024 / 1024 < 3
      if (!imgReg.test(file.name)) {
        ElMessage({
          message: '上传图片只能是jpg/png/jpeg格式!',
          center: true,
          type: 'danger',
          duration: 1000,
        })
      }
      if (!isLt1M) {
        ElMessage({
          message: '上传图片文件大小不能超过 3MB!',
          center: true,
          type: 'danger',
          duration: 1000,
        })
      }
      const result = imgReg.test(file.name) && isLt1M
      return result
    }
    function save() {
      if (!name.value) {
        ElMessage({
          message: '姓名不能为空',
          center: true,
          type: 'warning',
          duration: 1000,
        })
      }
      changeInfo({ sex: sex.value, name: name.value, signature: signature.value }, { auth: true }).then(res => {
        user.name = name.value
        user.signature = signature.value
        user.sex = sex.value
        window.sessionStorage.setItem('user', JSON.stringify(user))
        ElMessage({
          message: res.message,
          center: true,
          type: 'success',
          duration: 1000,
        })
      })
    }
    function changPwd() {

    }
    function logOut() {
      userLogOut({ auth: true }).then(res => {
        ElMessage({
          message: res.message,
          center: true,
          type: 'success',
          duration: 1000,
        })
        window.sessionStorage.clear()
        router.push('/')
      })
    }
    return {
      Search, uploadIp, handleAvatarSuccess, beforeAvatarUpload, imageUrl, uploadToken, logOut, signature, name, SexOptions, sex, save, changPwd
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
.head {
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  font-size: 18px;
}
.headForm {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .input {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-input {
      width: 280px;
    }
    .input_item {
      display: flex;
      align-items: center;
      margin: 10px;
      > div:first-child {
        font-size: 14px;
        color: #585858;
        margin-right: 5px;
      }
    }
  }
}
:deep(.el-textarea__inner) {
  padding: 5px 9px;
}
.input {
  margin-top: 20px;
}
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-upload > img {
  image-rendering: -webkit-optimize-contrast;
  object-fit: cover;
}
</style>>