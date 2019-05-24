<template>
  <div class="page-container">
    <van-cell-group>
      <van-cell title="祖籍" value="爪洼国"/>
      <van-cell title="点击显示picker" :value="pickerInfo.val" is-link @click="showPicker"/>
      <van-cell title="性别" value="妖" is-link/>
      <van-cell title="点击显示通知" value="通知" is-link label="描述信息" @click ="showNotify"/>
      <van-cell-group>
        <van-field v-model="formData.name" label="姓名" input-align="right" placeholder="请输入姓名"/>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="formData.name" label="爱好" placeholder="请输入爱好"/>
      </van-cell-group>
    </van-cell-group>

    <van-popup v-model="pickerInfo.visiable" position="bottom">
      <van-picker
        show-toolbar
        title="picker标题"
        :columns="pickerInfo.data"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

  </div>
</template>

<script>
import Vue from 'vue'
import { CellGroup, Cell, Field, Picker, Popup, Notify } from 'vant'
Vue.use(CellGroup).use(Cell)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Notify)

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
  methods: {
    showPicker(item) {
      this.pickerInfo.visiable = true
    },
    onConfirm(val) {
      this.pickerInfo.val = val
      this.pickerInfo.visiable = false
    },
    onCancel() {
      this.pickerInfo.visiable = false
    },
    showNotify() {
      Notify({
        message: '通知内容',
        duration: 1000,
        background: '#1989fa'
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
