"use strict";
import { memberListApp } from '@/services/container/merchant/member';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'platemberModel',
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
      // history.listen((location) => {
      //   if (location.pathname === '/platform/memberManage') {
      //     const payload = location.search ? queryString.parse(location.search) : { pageNo: 1, pageSize: 10 }
      //     dispatch({
      //       type: 'query',
      //       payload,
      //     })
      //   }
      // })
      pathCheck(dispatch, history,routes[3]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:'',
        totalSize: action.totalSize?action.totalSize:'0',
        currentPage: action.currentPage?action.currentPage:'1',
        pageSize: action.pageSize?action.pageSize:'10'
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
    *query({payload},{put,call,select}){  //获取列表
      // if(pageNo && pageSize) payload = {
      //   pageNo:"1",
      //   pageSize:"10"
      // }
      const data = yield call(memberListApp, payload);
      if(data.success){
        const dataSource = data.data.datas.list;
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