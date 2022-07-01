<template>
  <div>
    <van-nav-bar fixed>
      <template #left>
        <img class="logo" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="white" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="channelId" animated sticky offset-top="38.14px">
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id" :name="item.id">
        <ArticleList :mid="channelId"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 编辑频道图标 -->
    <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="showPopup" />
    <van-popup v-model="show" class="edit_wrap" @closed="onPopupClosed">
      <ChannelEdit
        :userChannelList="channelList"
        @close="show=false"
        @add="addChannelFn"
        @remove="removeFn"
        @changeChannel="changeChannelFn"
        ref="ChannelEdit"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './ChannelEdit.vue'
import { getUserChannelsAPI } from '@/api/index'
import ArticleList from '@/views/Home/ArticleList.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data () {
    return {
      channelId: 0,
      channelList: [], // 频道数据
      show: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  async created () {
    const { data: res } = await getUserChannelsAPI()
    this.channelList = res.data.channels
    console.log(this.channelList)
  },
  methods: {
    showPopup () {
      this.show = true
    },
    addChannelFn (item) {
      this.channelList = [...this.channelList, item]
    },
    removeFn (item) {
      const index = this.channelList.findIndex((obj) => item.id === obj.id)
      // delete this.channelList[index]
      this.channelList.splice(index, 1)
    },
    onPopupClosed () {
      this.$refs.ChannelEdit.isEdit = false
    },
    changeChannelFn (item) {
      this.channelId = item.id
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
.van-tabs {
  padding-top: 45px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
/* 频道编辑弹出层铺满屏幕 */
.edit_wrap {
  width: 100%;
  height: 100%;
}
</style>
