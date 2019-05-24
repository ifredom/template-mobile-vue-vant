require('es6-promise').polyfill() // 兼容低版本安卓机
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import 'amfe-flexible' // 使用rem方案
// import '@/utils/adaption/ifredom-rem' // 或者使用ifredom-rem方案，更利于开发
// 工具
const R = require('ramda') // 函数式工具
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import EventBus from '@/utils/eventBus'
import EventBusTypes from '@/utils/eventBusTypes'

// import '@/components/global.js' //引入components下所有vue后缀组件
import '@/icons' // SVG图标icons
import './styles/index.less' // 全局样式

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueLazyload)

Vue.prototype.R = R
Vue.prototype.$bus = EventBus // 事件总线，页面之间传参，比如后退时
Vue.prototype.$busType = EventBusTypes
// 取消点击300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render (createElement) {
    return createElement(App)
  }
}).$mount('#app')
