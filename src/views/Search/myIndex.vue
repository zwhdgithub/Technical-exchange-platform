<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim.lazy="value"
        placeholder="请输入搜索关键词"
        shape="round"
        autofocus="true"
        v-autofocus
        @input="inputFn"
        @search="enterFn"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="value.length!==0">
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        :key="index"
        v-html="lightFn(str,value)"
        @click="clickFn(str)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(str, index) in history"
          :key="index"
          @click="hisClickFn(str)"
        >{{str}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  data () {
    return {
      value: '',
      timer: null,
      suggestList: [],
      history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  methods: {
    // 内容改变，触发改事件
    inputFn () {
      // 终止setTimeout
      clearTimeout(this.timer)
      if (this.value.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          if (this.value.length === 0) {
            return
          }
          const { data: res } = await suggestListAPI({ q: this.value })
          // console.log(res)
          this.suggestList = res.data.options
        }, 300)
      }
    },
    // 输入框回车
    enterFn () {
      if (this.value.length > 0) {
        this.history.push(this.value)
        setTimeout(() => {
          this.$router.push({
            path: `/search/${this.value}`
          })
        }, 0)
      }
    },
    // 建议列表点击
    clickFn (str) {
      this.history.push(str)
      setTimeout(() => {
        this.$router.push({
          path: `/search/${str}`
        })
      }, 0)
    },
    // 高亮
    lightFn (str, target) {
      // replace替换第一个
      // replaceAll替换全部
      // 正则可以忽略大小写，因为target是变量，所以需要将正则实例化
      const reg = new RegExp(target, 'ig') // i代表忽略大小写，g代表全局匹配
      return str.replace(
        reg,
        (match) => `<span style="color: red">${match}</span>`
      )
    },
    // 历史记录
    hisClickFn (str) {
      this.$router.push('/search/' + str)
    },
    // 清空历史记录
    clearFn () {
      this.history = []
    }
  },
  watch: {
    history: {
      deep: true,
      handler () {
        // Set:无序不重复的对象
        // 特点：传入数组类型，若有重复，自动清理重复元素，并返回一个Set对象
        // 采用Array中的from方法将对象解成数组
        const theSet = new Set(this.history)
        const arr = Array.from(theSet)
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
    background-color: #007bff;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
