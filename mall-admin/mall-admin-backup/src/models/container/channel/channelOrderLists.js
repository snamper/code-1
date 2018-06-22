"use strict";
import { seclist, orderRefund, orderDelive } from './../../services/channel/channelOrderManage';
import queryString from 'query-string';
export default {
  namespace: 'channelOrderListItem',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    orderProductName:'',//商品名称
    // orderCreateStartTime:'',//下单起始时间初始化
    // orderCreateEndTime:'',//下单截止时间初始化
    startValue: '',
    endValue: '',
    endOpen: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.includes('/qcMall/channelOrderManage/channelOrderLists') ) {
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
        dataSource: action.dataSource,
        totalSize: action.totalSize,
        currentPage: action.currentPage,
        pageSize: action.pageSize,
        orderProductName:action.orderProductName,//搜索条件里面的商品名称
		    startValue:action.orderCreateStartTime,//搜索条件里面的下单起始时间
		    endValue:action.orderCreateEndTime,//搜索条件里面的下单截止时间
      }
    },
    changePageSize: function(state,action) {
      return {
        ...state,
        pageSize: action.pageSize
      }
    },
    changeTimeRange: function(state, action) {
      return {
        ...state,
        startValue: action.startValue,
        endValue: action.endValue,
      }
    },
    changeOpen: function(state, action) {
      return {
        ...state,
        endOpen: action.endOpen,
      }
    },
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call}){
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(seclist, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        const orderProductName = payload.orderProductName?payload.orderProductName:'';//搜索条件里面的商品名称
		    const orderCreateStartTime = payload.orderCreateStartTime?payload.orderCreateStartTime:'';//搜索条件里面的下单起始时间
		    const orderCreateEndTime = payload.orderCreateEndTime?payload.orderCreateEndTime:'';//搜索条件里面的下单截止时间
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,orderProductName,orderCreateStartTime,orderCreateEndTime})
      }else{
        console.log("out")
      }
    },
    *orderRefundBtnFn({orderId},{put, call}){  //渠道订单列表 退款操作
      const changeStatus = yield call(orderRefund,{orderId:orderId});
      return changeStatus;
    },
    *orderDeliveBtnFn({orderId},{put, call}){  //渠道订单列表 发货操作
      const result = yield call(orderDelive,{orderId:orderId});
      return result;
    },
  }
};