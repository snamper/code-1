"use strict";
import { stokeManList, updatebatch } from '@/services/container/platform/stockMan';
import { message } from 'antd';
import queryString from 'query-string';
export default {
  namespace: 'stockList',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    updateThreshold:''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/platform/platemStoreManage') {
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
    changeThreshold: function(state, action) {  //修改阈值
      return {
        ...state,
        updateThreshold:action.index || action.index === 0 ?action.index : ''
      }
    },
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(stokeManList, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
    },
  *saveThreshold({payload = {}},{put,call}){  //保存售价
      const value = payload.values();
      const data = {
        id:payload.id,
        yuValue:value
      }
      const result = yield call(updatebatch, data);
         if(result.message === '成功'){
         	
         }else{
        
         }
    },
  },
};