<template>
  <div class="bg">
    <div class="info">111</div>
    <div class="input">222</div>
  </div>
</template>

<script>
export default {
  setup() {

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