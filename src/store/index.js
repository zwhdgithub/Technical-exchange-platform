import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 头像默认地址
    userPhoto: 'https://img1.baidu.com/it/u=2492230623,4226907091&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    userName: ''
  },
  getters: {
  },
  mutations: {
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    },
    SET_USERNAME (state, value) {
      state.userName = value
    }
  },
  actions: {
  },
  modules: {
  }
})
