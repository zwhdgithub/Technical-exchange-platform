<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" @click="$emit('close')" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span>
          我的频道
          <span class="small-title">{{isEdit?'点击删除频道':'点击进入频道'}}</span>
        </span>
        <span @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in userChannelList" :key="item.id" @click="removeFn(item)">
          <div class="channel-item van-hairline--surround">
            {{item.name}}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-if="isEdit&&item.name!=='推荐'">
              <template #content>
                <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="0.32rem" />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in unChannelList" :key="item.id" @click="addFn(item)">
          <div class="channel-item van-hairline--surround">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { allChannelListAPI, updateChannelAPI } from '@/api/index'
export default {
  data () {
    return {
      allChannelList: [],
      isEdit: false
    }
  },
  props: {
    userChannelList: []
  },
  async created () {
    const { data: res } = await allChannelListAPI()
    // console.log(res)
    this.allChannelList = res.data.channels
  },
  async updated () {
    // 推荐频道过滤掉,并用新数组去装数据,此时并未与原数组脱离关系
    const newArr = this.userChannelList.filter((obj) => {
      return obj.id !== 0
    })
    // 遍历过滤后的数组浅拷贝
    // eslint-disable-next-line array-callback-return
    const resultList = newArr.map((obj, index) => {
      const newObj = { ...obj }
      delete newObj.name
      newObj.seq = index
      return newObj
    })
    // 更新频道，整理完数据后发Ajax请求
    console.log(resultList)
    const res2 = await updateChannelAPI({
      channels: resultList
    })
    console.log(res2)
  },
  computed: {
    unChannelList () {
      // eslint-disable-next-line array-callback-return
      const newArr = this.allChannelList.filter((obj) => {
        const index = this.userChannelList.findIndex((obj2) => {
          return obj2.id === obj.id
        })
        if (index === -1) return true
      })
      return newArr
    }
  },
  methods: {
    addFn (item) {
      if (this.isEdit === true) {
        this.$emit('add', item)
      }
    },
    removeFn (item) {
      if (this.isEdit && item.name !== '推荐') {
        this.$emit('remove', item)
      } else {
        this.$emit('changeChannel', item)
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
