"use strict";
import { routerRedux } from 'dva/router'
import { loginOut } from '@/services/frame/login'
import {memberListApp} from "@/services/container/merchant/member"
import platformList from '@/app/nav/platform.json'
export default {
  namespace: 'app',
  state: {
    navOpenKeys:JSON.parse(window.localStorage.getItem(`navOpenKeys`)) || [],
    userName:JSON.parse(window.localStorage.getItem(`userName`)) || [],
    userType:window.localStorage.getItem(`userType`) || '',
    menuList:platformList.menuList || [],
    collapsed:false,
    noLoading:false
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({ type: 'loginStatus'})
    },
  },
  reducers: {
  	handleNavOpenKeys:function(state,action){
      return {
        ...state,
        navOpenKeys:action.navOpenKeys
      }
    },
    noLoading:function(state,action){
      return {
        ...state,
        noLoading:action.noLoading
      }
    },
    toggle (state) {
      return {
        ...state,
        collapsed:!state.collapsed
      }
    },
    showUserName: function(state,action) {
      return {
        ...state,
        userName:action.userName?unescape(JSON.parse(action.userName).name):''
      }
    }
  },
  effects:{
    *query({payload={}},{call,put}){
      yield put(routerRedux.push({
        pathname: '/login'
      }))
    },
    *loginStatus({payload={}},{call,put}){
      const result = yield call(memberListApp,{pageNo:"1",pageSize:"10"});
      if(!result||result.statusCode!==200||result.code!==1){
        yield put(routerRedux.push({
          pathname: '/login'
        })) 
      }else{
        // yield put({ type: 'getMenu', payload: {} }); 
      }
    }, 
    *logout({payload={}},{call,put}){
      const result = yield call(loginOut)
      return result
    },
    *getUserName({payload={}},{call,put}){
      const name = "userMessage=";
      const ca = document.cookie.split(';');
      for(let i=0; i<ca.length; i++)
      {
        const c = ca[i].trim();
        if (c.indexOf(name)===0) {
          yield put({type:"showUserName",userName:c.substring(name.length,c.length)})
        }
      }
      return "";
    }
  }

};