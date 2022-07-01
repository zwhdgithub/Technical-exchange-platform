import { getToken } from '@/utils/token'
import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home/myIndex.vue')
const User = () => import('@/views/User/myIndex.vue')
const Search = () => import('@/views/Search/myIndex.vue')
const SearchResult = () => import('@/views/Search/SearchResult')
const ArticleDetail = () => import('@/views/ArticleDetail/myIndex')
const UserEditor = () => import('@/views/User/UserEdit')
const Chat = () => import('@/views/Chat/myIndex')
const Layout = () => import('@/views/Layout/myIndex.vue')
const Login = () => import('@/views/Login/myIndex.vue')
// import { Search } from 'vant'
Vue.use(VueRouter)

const routes = [
  { path: '/chat', component: Chat },
  { path: '/user_editor', component: UserEditor },
  { path: '/', redirect: '/layout' },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/article_detail', component: ArticleDetail },
  { path: '/search/:keywords', component: SearchResult },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home', // 默认显示二级页面为home首页
    children: [
      { path: 'home', component: Home },
      { path: 'user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (getToken()?.length > 0 && to.path === '/login') {
    next('/layout/home')// 留在原地
  } else {
    next()
  }
})
export default router
