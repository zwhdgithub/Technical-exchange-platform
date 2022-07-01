<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{Obj.title}}</span>
        <!-- 单图 -->
        <img class="thumb" :src="Obj.cover.images[0]" v-if="Obj.cover.type===1" />
      </div>
      <!-- 三张图片 -->
      <div class="thumb-box" v-if="Obj.cover.type>1">
        <img class="thumb" :src="item" v-for="(item,index) in Obj.cover.images" :key="index" />
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>阿豪</span>
          <span>{{Obj.comm_count}}评论</span>
          <span>{{Obj.pubdate}}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon is-link name="cross" @click.stop="onCloseClick" v-if="showx" />
        <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
          get-container="body"
          :cancel-text="cancelText"
          @cancel="onCancel"
        />
      </div>
    </template>
  </van-cell>
</template>

<script>
// import { Toast } from 'vant'
import { firstActions, secondActions } from '@/api/report.js'
export default {
  data () {
    return {
      show: false,
      actions: firstActions,
      cancelText: '取消' // 底部按钮文字
    }
  },
  props: {
    Obj: {
      type: Object,
      default () {
        return {}
      }
    },
    showx: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 反馈选择
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (item.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.cancelText = '返回'
      } else if (item.name === '不感兴趣') {
        this.$emit('dislike', this.Obj.art_id)
        this.show = false // 关闭弹窗
      } else {
        this.$emit('reports', this.Obj.art_id, this.actions.value)
        this.actions = firstActions
        this.show = false
      }
    },
    // 反馈选择
    onCancel () {
      if (this.cancelText === '返回') {
        this.cancelText = '取消'
        this.actions = firstActions
        this.show = true
      }
      // Toast(`${this.cancelText}`)
    },
    // 反馈显示
    onCloseClick () {
      this.show = true
    }
    // 文章单元格点击事件
  }
}
</script>

<style lang="less" scoped>
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
