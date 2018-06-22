// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import Store from './store'
import Vant from 'vant'
import VueClipboard from 'vue-clipboard2'
import 'vant/lib/vant-css/index.css'
import 'swiper/dist/css/swiper.css'
import './common.css'
//require('./mock') // 开发环境中放开，打包时需注释
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(vuex)
Vue.use(Vant)
const store = new vuex.Store(Store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Vant,
  components: { App },
  template: '<App/>'
})
