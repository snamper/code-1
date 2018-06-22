/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
// 按需加载导入方式 layout
const Layout = () => import(/* webpackChunkName: 'Layout' */ '@/components/layout/Layout')
const NoHeaderLayout = () => import(/* webpackChunkName: 'Layout' */ '@/components/layout/NoHeaderLayout')
const NoFooterLayout = () => import(/* webpackChunkName: 'NoFooterLayout' */ '@/components/layout/NoFooterLayout')
//index
const Index = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/index/Index')
const Classify = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/classify/Index') // 全部商品
const GoodDetail = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/goodDetail/Index') // 商品详情
const cpsDetail = () => import(/* webpackChunkName: 'cpsDetail' */ '@/components/cpsDetail/Index') // cps商品
//mine
const Mine = () => import(/* webpackChunkName: 'Mine' */ '@/components/mine/Index') // '我的'主页
const Hart = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/hart/Index') // 我的心愿单列表
const CardBag = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/cardBag/Index') // 我的卡包
const CardDetail = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/cardBag/CardDetail') // 卡包详情
const Order = () => import(/* webpackChunkName: 'Order' */ '@/components/mine/order/Index') // 我的订单
const PointDetial = () => import(/* webpackChunkName: 'Order' */ '@/components/mine/pointDetial/Index')// 积分明细
const OrderDetial = () => import(/* webpackChunkName: 'Mine' */ '@/components/mine/order/OrderDetial') // 订单详情页面
const ConfirmOrder = () => import(/* webpackChunkName: 'Mine' */ '@/components/mine/order/ConfirmOrder') // 确认订单页面
const BuyComplete = () => import(/* webpackChunkName: 'Mine' */ '@/components/mine/order/BuyComplete') // 购买成功页面
const GoodsConvert = () => import(/* webpackChunkName: 'Mine' */ '@/components/mine/cardBag/GoodsConvert') // 兑换页面
const ConvertResults = () => import(/* webpackChunkName: 'Mine' */ '@/components/mine/cardBag/ConvertResults') // 兑换结果页面

const UserInfo = () => import(/* webpackChunkName: 'Order' */ '@/components/mine/userInfo/Index') // 个人信息
const EditorName = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/userInfo/EditorName') // 修改个人昵称
const System = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/setSystem/Index') // 系统设置
const AccountSecurity = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/setSystem/AccountSecurity') // 账户安全
const EditPwd = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/setSystem/EditPwd') // 修改登录密码
const ResetPwd = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/setSystem/ResetPwd') // 重置登录密码
const EditTransactionPwd = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/setSystem/EditTransactionPwd') // 修改交易密码
const ResetTransactionPwd = () => import(/* webpackChunkName: 'HelloWorld' */ '@/components/mine/setSystem/ResetTransactionPwd') // 重置交易密码
//service center
const ServiceCenter = () => import(/* webpackChunkName: 'Mine' */ '@/components/mine/serviceCenter/Index') // 客服中心
//token
const Token = () => import(/* webpackChunkName: 'Token' */ '@/components/token/Token') // 授权登录页
const Login = () => import(/* webpackChunkName: 'Login' */ '@/components/login/Login') // 登录页
const FastLogin = () => import(/* webpackChunkName: 'Login' */ '@/components/login/FastLogin') // 快捷登录
const ForgetPwd = () => import(/* webpackChunkName: 'Login' */ '@/components/login/ForgetPwd') // 忘记密码

const Register = () => import(/* webpackChunkName: 'Login' */ '@/components/login/Register') // 登录页
// FoegetPwd
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: '404',
      component: Index,
      meta:{keepAlive: false}
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      meta:{keepAlive: false}
    },
    {
      path: '/fastLogin',
      name: '快捷登录',
      component: FastLogin,
      meta:{keepAlive: false}
    },
    {
      path: '/forgetPwd',
      name: '忘记密码',
      component: ForgetPwd,
      meta:{keepAlive: false}
    },
    {
      path: '/register',
      name: '注册',
      component: Register,
      meta:{keepAlive: false}
    },
    {
      path: '/hart',
      name: '我的心愿单',
      component: Hart,
      meta:{keepAlive: false}
    },
    {
      path: '/cardBag',
      name: '我的卡包',
      component: CardBag,
      meta:{keepAlive: true}
    },
    {
      path: '/buyComplete',
      name: '购买成功',
      component: BuyComplete,
      meta:{keepAlive: false}
    },
    {
      path: '/goodsConvert',
      name: '兑换',
      component: GoodsConvert,
      meta:{keepAlive: false}
    },
    {
      path: '/convertResults',
      name: '兑换结果',
      component: ConvertResults,
      meta:{keepAlive: false}
    },
    {
      path: '/goodDetail',
      name: '商品详情',
      component: GoodDetail,
      meta:{keepAlive: false}
    },
    {
      path: '/editorName',
      name: '修改昵称',
      component: EditorName,
      meta:{keepAlive: false}
    },
    {
      path: '/',
      redirect: { name: '赚动商城' },
      component: Layout,
      children: [
        {
          path: 'index',
          name: '赚动商城',
          component: Index,
          meta:{keepAlive: true}
        },
        {
          path: 'classify',
          name: '全部商品',
          component: Classify,
          meta:{keepAlive: true}
        },
        {
          path: 'cpsDetail',
          name: '兑换页',
          component: cpsDetail,
          meta:{keepAlive: false}
        },
      ]
    },
    {
      path: '/mine',
      component: NoHeaderLayout,
      children: [
        {
          path: '/',
          name: '我的',
          component: Mine,
          meta:{keepAlive: false}
        }
      ]
    },
    {
      path: '/order',
      component: NoFooterLayout,
      children: [
        {
          path: '/',
          name: '我的订单',
          component: Order,
          meta:{keepAlive: true}
        },
        {
          path: '/pointDetial',
          name: '积分明细',
          component: PointDetial,
          meta:{keepAlive: false}
        },
        {
          path: 'orderDetial',
          name: '订单详情',
          component: OrderDetial,
          meta:{keepAlive: false}
        },
        {
          path: 'cardDetail',
          name: '卡包详情',
          component: CardDetail,
          meta:{keepAlive: false}
        },
        {
          path: 'confirmOrder',
          name: '确认订单',
          component: ConfirmOrder,
          meta:{keepAlive: false}
        },
        {
          path: 'serviceCenter',
          name: '客服中心',
          component: ServiceCenter,
          meta:{keepAlive: false}
        },
        {
          path: '/userInfo',
          name: '个人信息',
          component: UserInfo,
          meta:{keepAlive: false}
        },
        {
          path: '/system',
          name: '系统设置',
          component: System,
          meta:{keepAlive: false} 
        },
        {
          path: '/accountSecurity',
          name: '账户安全',
          component: AccountSecurity,
          meta:{keepAlive: false}   //AccountSecurity
        },
        {
          path: '/editPwd',
          name: '修改登录密码',
          component: EditPwd,
          meta:{keepAlive: false}   //AccountSecurity
        },
        {
          path: '/resetPwd',
          name: '修改登录密码',
          component: ResetPwd,
          meta:{keepAlive: false}   //AccountSecurity
        },
        {
          path: '/editTransactionPwd',
          name: '修改交易密码',
          component: EditTransactionPwd,
          meta:{keepAlive: false}   //AccountSecurity
        },
        {
          path: '/resetTransactionPwd',
          name: '修改交易密码',
          component: ResetTransactionPwd,
          meta:{keepAlive: false}   //AccountSecurity
        }
      ]
    },
  {
    path: '/token',
    name: '授权登录页',
    component: Token,
    meta:{keepAlive: false}
  }
  ]
})
