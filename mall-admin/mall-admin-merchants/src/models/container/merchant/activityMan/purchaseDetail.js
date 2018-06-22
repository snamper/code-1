"use strict";
import { purchaseDetailFn } from '@/services/container/merchant/activityMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
//活动管理-活动详情-购买明细
export default {
  namespace: 'purchaseDetail',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    dataInfo:{}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[16]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:'',
        totalSize: action.totalSize?action.totalSize:state.totalSize,
        currentPage: action.currentPage?action.currentPage:state.currentPage,
        pageSize: action.pageSize?action.pageSize:state.pageSize,
        dataInfo:action.dataInfo || {}
      }
    }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(purchaseDetailFn, payload);
      if(data.success){
        const dataSource = data.data.orders.datas;
        const dataInfo = data.data
        const totalSize = data.data.orders.totalRows;
        const currentPage = data.data.orders.pageNo;
        const pageSize = data.data.orders.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,dataInfo})
      }else{
        message.error(data.message)
      }
    },
  }
};