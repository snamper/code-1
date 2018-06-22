"use strict";
import { list, userInfo11, channelInfoUrl,userPassWord } from '@/services/container/merchant/merchantAccount';
import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
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
        if( location.pathname === routes[0]){
          pathCheck(dispatch, history, routes[0])
        }
        if( location.pathname === routes[1]){
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
        merchantMessage:action.result.data
      }
    },
    getMerchantMessage:function(state,action){
      return {
        ...state,
        merchantItem:action.result.data
      }
    },
    editPassword:function(state,action){
      return {
        ...state,
        passwordUpdate:true
      }
    },
    passwordUpdateChange:function(state,action){
      return {
        ...state,
        passwordUpdate:false
      }
    }

  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取账号信息
      const result = yield call(list,payload)
      yield put({type:'getMessage',result})
    },
    *query1({payload = {}},{put,call,select}){  //获取商户信息
      
      const result = yield call(channelInfoUrl,payload)
      // console.log(result)
      yield put({type:'getMerchantMessage',result})
    },
    *querySubmit({connectUserName,connectUserPhone},{put,call}){  //修改商户信息
      // console.log(connectUserName)
      const result = yield call(userInfo11,{connectUserName:connectUserName,connectUserPhone:connectUserPhone})
      return result;
    },
    *queryPassWordSubmit({password},{put,call}){  //修改商户密码信息
      // console.log(connectUserName)
      const result = yield call(userPassWord,{password:password})
      return result;
    }

  }
  
  

};