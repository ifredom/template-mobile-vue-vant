<template>
  <div class="ta-tabs">
    <div
      v-for="(item,index) in navList"
      :id="index"
      :key="index"
      class="ta-tab-item"
      @click="tabSelect(index,$event)"
    >
      <div class="tab-item-wrapper" :class="[index === tabCur ? selectClass + ' cur':'']">
        <span class="tab-item-icon gem-o">
          <img :src="item.icon" alt>
        </span>
        <span class="tab-item-text">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)

export default {
  name: 'Footer',
  data() {
    return {
      tabCur: 1,
      selectClass: 'text-select',
      navList: [
        {
          title: '组件',
          icon: '',
          path: '/page1'
        },
        {
          title: '首页',
          icon: '/static/image/tab2.png',
          path: '/home'
        },
        {
          title: '关于我',
          icon: '/static/image/tab3.png',
          path: '/page2'
        }
      ]
    }
  },
  methods: {
    tabSelect(index, e) {
      if (this.currentTab === index) return false
      this.tabCur = index
      this.$router.push({
        path: this.navList[index].path
      })
    }
  }
}
</script>

<style scoped lang="less">
.ta-tabs {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: absolute;
  z-index: 500;
  bottom: 0;
  width: 100%;
  background: #cfd9df;
}
.ta-tab-item {
  display: block;
  display: flex;
  flex: 1;
  padding: 0.2rem 0;
  justify-content: center;
  align-items: center;
  font-size: 0.32rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #999;
  text-align: center;
}
.tab-item-wrapper {
  display: flex;
  align-items: center;
  padding: 0.16rem 0.3rem;
  border-radius: 0.28rem;
  text-align: center;
  .tab-item-icon {
    width: 0.5rem;
    height: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
.text-select {
  color: #fff;
  background-image: linear-gradient(
    to right,
    #b8cbb8 0%,
    #b8cbb8 0%,
    #b465da 0%,
    #cf6cc9 33%,
    #ee609c 66%,
    #ee609c 100%
  );
  opacity: 1;
  border-radius: 0.5rem;
}
</style>
