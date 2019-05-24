<template>
  <div class="ta-search">
    <img class="search-icon" src="/static/image/search.png" alt="search">
    <input
      v-model="inputVal"
      class="search-input"
      placeholder="请输入酒店名称"
      @focus="focusSearchInput"
      @blur="blurSearchInput"
    >
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      inputVal: ''
    }
  },
  methods: {
    focusSearchInput() {},
    blurSearchInput() {}
  }
}
</script>

<style lang="less" scoped>
.ta-search {
  position: relative;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
	padding-left: 0.38rem;
  background:rgba(234,235,237,1);
  font-family:PingFang-SC-Regular;
  font-size: 0.3rem;
  color:rgba(138,138,143,1);
  font-weight:400;
  border-radius: 0.28rem;
  z-index: 100;

}
.search-icon{
	position: absolute;
	left: 0.18rem;
	top: 0.24rem;
	width: 0.28rem;
	height: 0.28rem;
}
.search-input {
  width: 100%;
  padding: 0.22rem;
}

</style>
