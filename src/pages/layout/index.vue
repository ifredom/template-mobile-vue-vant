<template>
  <div class="page-full-container">
    <router-view />
    <TaFooter />
  </div>
</template>

<script>
import TaFooter from '@/components/common/Footer'
export default {
  name: 'Layout',
  components: {
    TaFooter
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.page-full-container {
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>
