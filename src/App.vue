<template>
  <div>
    <keep-alive exclude="Search,SearchResult,ArticleDetail,UserEdit">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import { allChannelListAPI } from '@/api/index'
export default {
  // 此段为代码测试
  // async created () {
  //   try {
  //     const res = await allChannelListAPI()
  //     console.log(res)
  //   } catch (err) {
  //     console.log(err)
  //     // console.log('请求出错')
  //   }
  // }
}
</script>

<style lang="less" scoped>
</style>
