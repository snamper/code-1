"use strict";
import { routerRedux } from 'dva/router'
import { loginOut } from '@/services/frame/login'
export default {
  namespace: 'app',
  state: {
    navOpenKeys:JSON.parse(window.localStorage.getItem(`navOpenKeys`)) || [],
    userName:JSON.parse(window.localStorage.getItem(`userName`)) || [],
    userType:window.localStorage.getItem(`userType`) || '',
    menuList:[],
    collapsed:false
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({ type: 'getMenu', payload: {} })
    },
  },
  reducers: {
  	handleNavOpenKeys:function(state,action){
      return {
        ...state,
        navOpenKeys:action.navOpenKeys
      }
    },
    toggle (state) {
      return {
        ...state,
        collapsed:!state.collapsed
      }
    },
    chaneMenuList: function(state,action) {  //更改菜单
      return {
        ...state,
        menuList:action.result
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
      const result = yield call(loginOut)
      return result
    },
    *getMenu({payload={}},{call,put,select}){
      const userType = yield select(({ app }) => app.userType);
      let result = "";
      if(userType){
        switch (userType) {
          case "1":
            result = yield require('@/app/nav/platform.json')
            yield put({type:'chaneMenuList',result:result.menuList})
            return
          case "2":
            result = yield require('@/app/nav/merchant.json')
            yield put({type:'chaneMenuList',result:result.menuList})
            return
          default:
            return false
        }
      }else{
        return false
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
    }
  }

};