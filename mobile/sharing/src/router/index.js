import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '@/components/register'
import registerSucc from '@/components/registerSucc'
import shareGoodsDetail from '@/components/shareGoodsDetail'
import aboutus from '@/components/aboutus'
import serviceCenter from '@/components/serviceCenter'
import sharePackActive from '@/components/sharePackActive'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/registerSucc',
      name: 'registerSucc',
      component: registerSucc
    },
    {
      path: '/shareGoodsDetail',
      name: 'shareGoodsDetail',
      component: shareGoodsDetail
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus
    },
    {
      path: '/serviceCenter',
      name: 'serviceCenter',
      component: serviceCenter
    },
    {
      path: '/sharePackActive',
      name: 'sharePackActive',
      component:sharePackActive
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 总路由前置守卫
  next()
})

export default router
