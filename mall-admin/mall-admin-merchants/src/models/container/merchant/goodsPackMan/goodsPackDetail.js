"use strict";
import { packLisEditorFn } from '@/services/container/merchant/goodsPackMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
/* 商品包详情页面 */
export default {
  namespace: 'packDetialFn',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[20]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        goodsList: action.dataSource?action.dataSource:'',
        dataSource: action.dataSource?action.dataSource:'',
        initAllPackPrice:action.packageTotalPrice||''
      }
   },
    getSelGoodsLis(state,action){//获取已选择的商品列表数据
      return {
        ...state,
        selGoodsLis:action.payload.selGoodsLis,
        initAllCosts:action.payload.initAllCosts,
        initAllStock:action.payload.initAllStock
      }   
    },
  },
  effects:{
    *query({payload},{put,call,select}){  //获取列表
      // if(!payload.hasOwnProperty('status')) payload.status = '2'
      const data = yield call(packLisEditorFn, payload);
      if(data.success){
        const dataSource = data.data.data
        const packageTotalPrice = data.data.data.packageTotalPrice
        yield put({type:'getList',dataSource,packageTotalPrice})
      }else{
        message.error(data.message)
      }
    },
  },
};