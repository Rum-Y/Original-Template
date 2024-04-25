import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import FrontPage from '@/views/FrontPage.vue'
import InformationCheck from '@/views/InformationCheck.vue'
import AwardInfo from '@/views/AwardInfo.vue'
import UserInfo from '@/views/UserInfo.vue'
import PersonalCenter from '@/views/PersonalCenter.vue'
import Login from '@/views/Login.vue'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login',name: 'Login', component: Login },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      redirect: '/index',
      children: [
        { path: '/index', component: FrontPage },
        { path: '/informationCheck', component: InformationCheck },
        { path: '/awardInfo', component: AwardInfo },
        { path: '/userInfo', component: UserInfo },
        { path: '/personal-center', component: PersonalCenter },
      ]
    },
  ]
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
  const token = Cookies.get("jwtToken")
  // 非登录路由及没有token的情况下永远重定向到登录页面
  if(to.name !== 'Login' && !token)
    next({name: 'Login'})
  else
    next() // 否则直接放行相关路由
})

export default router
