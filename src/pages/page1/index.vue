<template>
  <div class="page-container">
    <van-cell-group>
      <van-cell title="前往列表" :value="pickerInfo.val" is-link @click="toList"/>
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue'
import { CellGroup, Cell } from 'vant'
Vue.use(CellGroup).use(Cell)
export default {
  name: 'Home',
  data() {
    return {
      formData: {},
      pickerInfo: {
        data: ['小花', '小草', '小猫'],
        visiable: false,
        val: ''
      }
    }
  },
  created() {
    this.$bus.$on('list', function(data) {
      console.log(data) // data就是触发list事件.由list页面带过来的数据
    })
  },
  methods: {
    toList(item) {
      this.$router.push({
        path: '/list'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
