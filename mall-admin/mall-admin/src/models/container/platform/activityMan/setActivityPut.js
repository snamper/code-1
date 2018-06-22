"use strict";
import { setActivityPutFn } from '@/services/container/platform/activityMan';
import { message } from 'antd';
import queryString from 'query-string';
/* 活动管理-设置活动上架 */
export default {
  namespace: 'setActivityPutFn',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //选择打包商品窗口隐藏
    currentItem:{},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/platform/setActivityPut') {
          const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:'',
        totalSize: action.totalSize?action.totalSize:state.totalSize,
        currentPage: action.currentPage?action.currentPage:state.currentPage,
        pageSize: action.pageSize?action.pageSize:state.pageSize
      }
    },
    showSelPackGoods:function(state,action){//显示选择打包商品窗口
      return {
        ...state,
        visible: true,
      }
    },
    hideSelPackGoods:function(state,action){//隐藏选择打包商品窗口
      return {
        ...state,
        visible: false,
      }
    },
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(setActivityPutFn, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
    }
  },
};