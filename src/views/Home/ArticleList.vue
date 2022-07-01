<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="50"
        :immediate-check="false"
      >
        <ArticleItem
          v-for="item in articleList"
          :key="item.art_id"
          :Obj="item"
          @dislike="dislikeFn"
          @reports="reportsFn"
          @click.native="$router.push(`/article_detail?art_id=${item.art_id}`)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import {
  articlesListAPI,
  articleDislikeAPI,
  articleReportsAPI
} from '@/api/index'
import { timeAgo } from '@/utils/date'
import { Notify } from 'vant'

export default {
  data () {
    return {
      articleList: [],
      loading: false,
      finished: false,
      nextTime: null, // 用于加载更多(分页)
      isLoading: false // 顶部刷新状态
    }
  },
  props: ['mid'],
  components: {
    ArticleItem
  },
  methods: {
    async getArticleList () {
      const params = { channelId: this.mid, timestamp: this.nextTime }
      const { data: res } = await articlesListAPI(params)
      // 数据预处理
      res.data.results.forEach((Obj) => {
        // 规格化日期
        Obj.pubdate = timeAgo(Obj.pubdate)
      })
      // 如果无数据
      if (res.data.results.length === 0) {
        this.finished = true // 告诉list组件直接底部显示没有更多数据
      } else {
        this.nextTime = res.data.pre_timestamp // 保存下一页数据的时间(做分页用)
        this.articleList = [...this.articleList, ...res.data.results]
        // console.log(res)
        // 等待网络请求结果后
        this.loading = false // 底部加载更多状态
        this.isLoading = false
      }
    },
    // 底部加载
    onLoad () {
      // 有第一页数据以后, onLoad再发请求
      if (this.articleList.length > 0) {
        this.getArticleList()
      }
    },
    // 下拉刷新
    onRefresh () {
      this.nextTime = null
      this.articleList = []
      this.getArticleList()
    },
    async dislikeFn (id) {
      // const res = await articleDislikeAPI({ target: id })
      // if (!res) {
      //   // 危险通知
      //   Notify({ type: 'danger', message: '反馈失败-请连续工作人员' })
      // } else {
      //   // 成功通知
      //   Notify({ type: 'success', message: '反馈成功' })
      // }
      try {
        console.log(id)
        await articleDislikeAPI({ target: id })
        // 成功通知
        Notify({ type: 'success', message: '反馈成功' })
      } catch (error) {
        // 危险通知
        if (error.response.status === 401) {
          return
        }
        Notify({ type: 'danger', message: '反馈失败-请连续工作人员' })
      }
    },
    async reportsFn (id, value) {
      try {
        await articleReportsAPI({ target: id, type: value })
        // 成功通知
        Notify({ type: 'success', message: '举报成功' })
      } catch (err) {
        // 危险通知
        Notify({ type: 'danger', message: '举报失败-请连续工作人员' })
      }
    }
  },
  async created () {
    this.getArticleList()
  }
}
</script>

<style lang="less" scoped>
</style>
