<template>
  <div>
    <van-nav-bar title="SGU技术分享" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        :rules="[{ required: true, message: '请填写正确的手机号码' ,pattern:/^1[3-9]\d{9}$/}]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        placeholder="请填写6位密码"
        :rules="[{ required: true, message: '请填写6位密码',pattern:/^\d{6}$/ }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
          loading-text="加载中..."
          :disabled="isLoading"
        >提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13888888880',
        code: '246810' // 后台默认密码
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true
      try {
        const { data: res } = await loginAPI(this.user)
        // console.log(refresh_token)
        console.log(res)
        // 成功通知
        Notify({ type: 'success', message: '登录成功' })
        // 登录成功后设置token
        setToken(res.data.token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        // 跳转到Layout页面
        this.$router.replace({
          path: '/layout'
        })
      } catch (err) {
        console.error(err)
        // 危险通知
        Notify({ type: 'danger', message: '手机号或密码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// .van-nav-bar {
//   background-color: rgb(229, 191, 120);
// }
// /deep/.van-nav-bar__title {
//   color: rgb(242, 235, 235);
// }
</style>
