"use strict";
import { userLogin,userLoginOut } from '@/services/frame/login';
export default {
  namespace: 'login',
  state:{
  	status:"out",
  },
  reducers: {
  },
  effects:{
    *login({payload={}},{call,put}){  // 登录
      const result = yield call(userLogin,payload)
      console.log(result);
      return result
    },
    *loginOut({payload={}},{call,put}){  // 登录
      const result = yield call(userLoginOut,payload)
      console.log(result);
      //return result
    }
  }
}