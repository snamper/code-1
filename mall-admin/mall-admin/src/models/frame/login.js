"use strict";
import { userLogin } from '@/services/frame/login';
export default {
  namespace: 'login',
  state:{
  	status:"out",
  },
  reducers: {
    test:function(state,action){
      return {
      	...state,
      	status: state.status,
      }
    }
  },
  effects:{
    *login({payload={}},{call,put}){  // 登录
      const result = yield call(userLogin,payload)
      return result
    }
  }
}