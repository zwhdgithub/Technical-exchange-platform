import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'vant/lib/index.less'
import { NavBar, Field, Form, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Divider, Tag, CellGroup, Dialog, Image, DatetimePicker } from 'vant'

Vue.use(DatetimePicker)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Search)
Vue.use(Badge)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)

Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.use(Field)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Button)
Vue.config.productionTip = false
// 定义全局指令
Vue.directive('fofo', {
  inserted (el) {
    if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
      // 如果直接是input标签/textarea标签
      el.focus()
    } else {
      // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
      const inp = el.querySelector('input')
      const textArea = el.querySelector('textarea')
      // 如果找到了
      if (inp || textArea) {
        inp && inp.focus()
        textArea && textArea.focus()
      } else {
        // 本身也不是, 子标签里也没有
        console.error('请把v-fofo用在输入框标签上')
      }
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
