<template>
  <div class="bg">
    <div class="info"></div>
    <div class="input"></div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { watch } from 'vue'
export default {
  setup() {
    const store = useStore()
    watch(() => store.state.nowPeople, (newValue) => {
      console.log(newValue);
    });
    const ws = new WebSocket("ws://localhost:4000/");
    ws.onopen = function () {
      ws.send("客户端消息");
    };
    ws.onmessage = function (e) {
      console.log(e.data);
    };
    return {
      store
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
  height: calc(100% - 145px);
}
.input {
  float: bottom;
  height: 145px;
  box-sizing: border-box;
  border-top: 1px solid #d6d6d6;
}
</style>