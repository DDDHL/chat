<template>
  <div class="hello">
    <div>123</div>
    <div>3</div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'HelloWorld',
  setup() {
    const store = useStore()
    console.log(store.state.test)
  }
}
</script>

<style lang="scss" scoped>
.hello {
  & > div {
    color: aqua;
  }
}
</style>
