<template>
  <div class="bg">
    <el-container style="height: 100%">
      <el-header height="60px"
        ><Top />
        <div class="title">微社区</div>
      </el-header>
      <el-main>
        <div class="allFa" ref="dataItem">
          <el-image style="width: 100%; height: 30%" :src="imgBg" fit="cover" />
          <div class="contain">
            <div class="headImg">
              <el-avatar :size="80" :src="head" />
            </div>
            <div class="topText">
              <div class="signature">
                {{ signature }}
              </div>
              <div>{{ name }}</div>
            </div>
            <div class="info" v-for="item in allData.data" :key="item.id">
              <div class="info_item">
                <el-avatar :size="40" :src="item.avatar" shape="square" />
              </div>
              <div class="text">
                <div>{{ item.name }}</div>
                <div>{{ item.info }}</div>
                <div style="margin-top: 5px" v-if="item.imgPath">
                  <el-image
                    style="width: 290px; height: 290px"
                    :src="item.imgPath"
                    fit="cover"
                  />
                </div>
                <div class="time">{{ item.createTime }}</div>
              </div>
            </div>
          </div>
          <div class="flash" @click="flash">
            <Refresh />
          </div>
          <div class="publish" @click="dialogVisible = true">
            <Plus />
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog
      v-model="dialogVisible"
      title="发布动态"
      width="450px"
      center
      :close-on-press-escape="false"
      :show-close="false"
      :before-close="cancelPublish"
    >
      <div>
        <div>内容 :</div>
        <el-input
          type="textarea"
          placeholder="请输入动态内容"
          resize="none"
          style="margin-top: 2px"
          v-model="info"
        ></el-input>
      </div>
      <div style="margin-top: 2px">
        <div>选择图片 :</div>
      </div>
      <div class="upload">
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
      </div>
      <div style="text-align: center">
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button type="warning" @click="delectImg">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import imgBg from '@/assets/img/bg.jpg'
import head from '@/assets/img/head.jpg'
import { reactive, ref } from '@vue/reactivity'
import { Refresh, Plus } from '@element-plus/icons'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { deleteImg, publishSingle, checkGroup } from '@/api'
import { onMounted } from '@vue/runtime-core'
import { handleNewRecordTime } from '@/utils/date'
import { nextTick } from 'vue'
import { ElLoading } from 'element-plus'
export default {
  name: 'FriendGroup',
  components: { Refresh, Plus },
  setup() {
    const uploadToken = { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') }
    var user = JSON.parse(window.sessionStorage.getItem('user'))
    var signature = ref(user.signature)
    var name = ref(user.name)
    var store = useStore()
    var dialogVisible = ref(false)
    const uploadIp = store.state.ip + '/upLoadGroup'
    const imageUrl = ref()
    var allData = reactive({ data: [] })
    var info = ref()
    const dataItem = ref(null)
    function flash() {
      getData()
      const loadingInstance = ElLoading.service({ fullscreen: true })
      nextTick(() => {
        dataItem.value.scrollTop = 0
        setTimeout(() => {
          loadingInstance.close()
        }, 500)
      })
    }
    onMounted(() => {
      getData()
    })
    function getData() {
      checkGroup({ auth: true }).then(res => {
        res.data.forEach(data => {
          data.createTime = handleNewRecordTime(data.createTime)
        })
        allData.data = res.data
      })
    }
    function publish() {
      var state = 'true'
      if (imageUrl.value == "" || imageUrl.value == undefined) {
        state = 'false'
      }
      var user = JSON.parse(window.sessionStorage.getItem('user'))
      publishSingle({ info: info.value, state: state, name: user.name, avatar: user.avatar }, { auth: true }).then(res => {
        ElMessage({
          message: res.message,
          center: true,
          type: 'success',
          duration: 1000,
        })
        dialogVisible.value = false
        imageUrl.value = ''
        info.value = ''
      })
    }
    function cancelPublish(done) {
      if (imageUrl.value == undefined || imageUrl.value == '') {
        done()
        return
      }
      ElMessageBox.confirm(
        '取消发布将删除已选择图片',
        'Warning',
        {
          confirmButtonText: '好的',
          cancelButtonText: '点错了',
          type: 'warning',
        }
      )
        .then(() => {
          done()
        })
        .catch(() => { })
    }
    function delectImg() {
      if (imageUrl.value == undefined || imageUrl.value == '') {
        dialogVisible.value = false
        return
      }
      deleteImg({ path: imageUrl.value }, { auth: true }).then(() => {
        dialogVisible.value = false
        imageUrl.value = ''
      })
    }
    function handleAvatarSuccess(res) {
      if (res.code) {
        ElMessage({
          message: res.message,
          center: true,
          type: 'error',
          duration: 1000,
        })
      } else {
        imageUrl.value = res.data.path
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
    return {
      imgBg, head, signature, name, flash, publish, dialogVisible, uploadToken, beforeAvatarUpload, handleAvatarSuccess, uploadIp, imageUrl, cancelPublish, delectImg, info, allData, dataItem
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
  .title {
    width: 100%;
    height: 30px;
    -webkit-app-region: drag;
    text-align: center;
    background-color: #f5f5f5;
    font-size: 18px;
  }
}
.el-main {
  padding: 0;
  background-color: #f5f5f5;
}

.topText {
  height: 50px;
  margin-left: 20px;
  display: flex;
  width: calc(100% - 20px);
  .signature {
    height: 50px;
    width: 55%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    white-space: nowrap;
  }
  > div:nth-child(2) {
    width: 45%;
    text-align: right;
    margin-right: 120px;
  }
}
.info {
  display: flex;
  margin-top: 20px;
  .info_item {
    margin-left: 20px;
  }
  .text {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 450px;
    > div:first-child {
      color: #576b95;
    }
    > div:nth-child(2) {
      margin-top: 10px;
    }
    > div:last-child {
      color: #9e9e9e;
      font-size: 14px;
      margin: 10px 0;
    }
  }
}
.flash {
  position: absolute;
  text-align: center;
  bottom: 65px;
  right: 20px;
  width: 35px;
  height: 35px;
  background-color: rgb(255, 255, 255);
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s;
  color: #5c5c5c;
  box-shadow: 2px 2px 10px #969696;
  &:hover {
    width: 40px;
    height: 40px;
    right: 18px;
    bottom: 63px;
    color: black;
  }
}
.upload {
  border: 1px dashed var(--el-border-color);
  width: 120px;
  margin: 0 0 10px 138px;
}
.avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
.publish {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  background-color: rgb(255, 255, 255);
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s;
  color: #5c5c5c;
  box-shadow: 2px 2px 10px #969696;
  &:hover {
    width: 40px;
    height: 40px;
    right: 18px;
    bottom: 18px;
    color: black;
  }
}
.contain {
  width: 100%;
  position: relative;
  .headImg {
    position: absolute;
    top: -42px;
    right: 30px;
    width: 84px;
    height: 84px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 42px;
  }
}
:deep(.el-avatar > img) {
  image-rendering: -webkit-optimize-contrast;
}
.allFa {
  width: 100%;
  height: 100%;
  overflow-y: overlay;
}
/* 整个滚动条 */
.allFa::-webkit-scrollbar {
  width: 7px;
}
/* 滚动条上的滚动滑块 */
.allFa::-webkit-scrollbar-thumb {
  background-color: #adacaa;
  border-radius: 32px;
}
/* 滚动条轨道 */
.allFa::-webkit-scrollbar-track {
  background-color: #dcdcdd;
  border-radius: 32px;
}
</style>>