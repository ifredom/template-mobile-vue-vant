<template>
  <div class="page-container">
    列表页
    <button @click="goback">后退到上一页</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  methods: {
    goback() {
      var data = {
        info: '这是list页面得信息'
      }
      this.$bus.$emit('list', data)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
