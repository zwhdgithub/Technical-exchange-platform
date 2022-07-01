<template>
  <div class="home_container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- 底部导航 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home" to="/layout/home"></van-tabbar-item>
      <van-tabbar-item icon="manager" to="/layout/user"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  padding-bottom: 41.46px;
}
/* 底部导航上边框 */
.van-tabbar {
  border-top: 1px solid #d0cccc;
}
</style>
