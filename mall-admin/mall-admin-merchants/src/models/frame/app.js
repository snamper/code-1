"use strict";
import { routerRedux } from 'dva/router'
import { userLoginOut } from '@/services/frame/login'
import {list} from "@/services/container/merchant/member"
export default {
  namespace: 'app',
  state: {
    navOpenKeys:JSON.parse(window.localStorage.getItem(`navOpenKeys`)) || [],
    userName:JSON.parse(window.localStorage.getItem(`userName`)) || [],
    menuList:[],
    userType:window.localStorage.getItem(`permissions`) || '',
    collapsed:false,
    noLoading:1
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({ type: 'loginStatus'});
    }
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
    channelMenuList: function(state,action) {  //更改菜单
      return {
        ...state,
        menuList:action.result
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
    *logout({payload={}},{call,put}){
      const result = yield call(userLoginOut)
      return result
    },
    *loginStatus({payload={}},{call,put}){
      const result = yield call(list,{pageNo:"1",pageSize:"10"});
      if(!result||result.statusCode!==200||result.code!==1){
        yield put(routerRedux.push({
          pathname: '/login'
        })) 
      }else{
        yield put({ type: 'getMenu', payload: {} }); 
      }
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
    },
    *getMenu({payload={}},{call,put,select}){
      const userType = yield select(({ app }) => app.userType);
      let result = "";
      if(userType){
        switch (userType) {
          case "1":
            result = yield require('@/app/nav/merchantPackage.json')
            yield put({type:'channelMenuList',result:result.menuList})
            return
          case "2":
            result = yield require('@/app/nav/merchant.json')
            yield put({type:'channelMenuList',result:result.menuList})
            return
          default:
            return false
        }
      }else{
        return false
      }
    },
  }

};