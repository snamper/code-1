// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 拦截器，请求
axios.interceptors.request.use(config => {
  // if(config.url.indexOf('userToken') < 0){  //判断是否已经加上userToken
  //   if(config.url.indexOf('?') < 0){
  //     config.url += '?userToken=' + '1123'
  //   }else{
  //     config.url += '&userToken=123'
  //   }
  // }
  return config
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  // loadinginstace.close()
  return data
}, error => {
    // loadinginstace.close()
    // Message.error({
    //   message: '加载失败'
    // })
    return Promise.reject(error)
})
