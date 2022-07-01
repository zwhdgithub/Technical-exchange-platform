<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 搜索结果 -->
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleItem
          v-for="item in searchResultList"
          :key="item.art_id"
          :Obj="item"
          @click.native="$router.push(`/article_detail?art_id=${item.art_id}`)"
          :showx="false"
        ></ArticleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultListAPI } from '@/api/index'
import { timeAgo } from '@/utils/date'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SearchResult',
  data () {
    return {
      searchResultList: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    onLoad () {
      this.page++
      this.getSearchResultFn()
    },
    async getSearchResultFn () {
      const { data: res } = await searchResultListAPI({
        // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
        q: this.$route.params.keywords,
        page: this.page
      })
      // 更多数据判断
      if (res.data.results.length === 0) {
        this.finished = true
        // 如果数据为空，说明加载完毕，剩余操作不执行，直接跳出
        return
      }
      // console.log(res)
      // 数据预处理
      res.data.results.forEach((obj) => {
        obj.pubdate = timeAgo(obj.pubdate)
      })

      // 合并数据
      this.searchResultList = [...this.searchResultList, ...res.data.results]
      this.loading = false
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.getSearchResultFn()
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
