"use strict";
import { list } from '@/services/container/merchant/merchantAccount';
import queryString from 'query-string';
export default {
  namespace: 'account',
  state: {
    passwordUpdate:false, //是否是编辑
    merchantMessage:{}, //账号信息
    merchantItem:{} //商户信息
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/merchant/merchantAccount') {
          const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        if (location.pathname === '/merchant/merchantMessage') {
          const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10 }
          dispatch({
            type: 'query1',
            payload,
          })
        }
      })
    },
  },
  reducers: {
  	getMessage:function(state,action){
      return {
        ...state,
        merchantMessage:action.result
      }
    },
    getMerchantMessage:function(state,action){
      return {
        ...state,
        merchantItem:action.result
      }
    },
    editPassword:function(state,action){
      return {
        ...state,
        passwordUpdate:true
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取账号信息
      const result = yield call(list,payload)
      yield put({type:'getMessage',result})
    },
    *query1({payload = {}},{put,call,select}){  //获取商户信息
      const result = yield call(list,payload)
      yield put({type:'merchantMessage',result})
    },
  }
  

};