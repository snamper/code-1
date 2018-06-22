"use strict";
import { list } from '@/services/container/merchant/member';
import { message } from 'antd';
// import queryString from 'query-string'; 
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'memberModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history, routes[2])
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
    showDialog: function(state,{ payload }) {
      return { ...state, ...payload, visible: true }
    },
    hideDialog: function(state) {
      return { ...state, visible: false,currentItem:{}, isUpdate:false }
    },
    dialogControll: function(state,action) {
      return {
        ...state,
        visible: action.visible,
        isUpdate: action.isUpdate
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      if(!payload.pageNo) {
        payload = {
          pageNo:1,
          pageSize:10
        }
      }
      const data = yield call(list, payload);
      if(data.success){
        const dataSource = data.data.datas.list;
        const totalSize = data.data.datas.totalRows;
        const currentPage = data.data.datas.pageNo;
        const pageSize = data.data.datas.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
    }
  },
  

};