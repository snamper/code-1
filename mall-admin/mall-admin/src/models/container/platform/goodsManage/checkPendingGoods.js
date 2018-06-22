"use strict";
import { productReviewFn,reviewGoodFn, reviewGoodAllFn } from '@/services/container/platform/goodsCate';
import { message } from 'antd';
// import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'checkPendingGoods',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    chooseGoodsIds:[],  //选择商品id的数组
    chooseGoodsKeys:[],  //选择商品的key数组
    activeTab:'',
    visible:false,
    modalSouurce:'',
    failedReason:'',
    ifShowFailReason:false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[7]);
    },
  },
  reducers: {
    getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:[],
        totalSize: action.totalSize?action.totalSize:'0',
        currentPage: action.currentPage?action.currentPage:'1',
        pageSize: action.pageSize?action.pageSize:'10',
        activeTab:action.productState || '',
        visible:false
      }
    },
    changeChooseGoods:function(state,action){
      return {
        ...state,
        chooseGoodsIds:action.chooseGoodsIds, 
        chooseGoodsKeys:action.chooseGoodsKeys
      }
    },
    changeActiveTab:function(state,action){
      return {
        ...state,
        activeTab:action.payload.activeTab || '',
      }
    },
    modalControll:function(state,action){
      return {
        ...state,
        visible:!state.visible,
        modalSouurce:action.modalSouurce || '',
        failedReason:action.failedReason || ''
      }
    },
    changeFailReason:function(state,action){
      return {
        ...state,
        ifShowFailReason:!state.ifShowFailReason
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      if(!payload.pageNo) {
        payload.pageNo =  1;
        payload.pageSize = 20
      }
      const data = yield call(productReviewFn, payload);
      if(data.success){
        const dataSource = data.data.datas.list;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,productState:payload.productState})
      }else{
        message.error(data.message)
      }
    },
    *reviewStatus({payload},{put,call}){  //单个审核
      const data = yield call(reviewGoodFn, payload);
      console.log(data)
      if(data.message === '成功'){
        message.success('审核成功')
      }else{
        message.error(data.message)
      }
    },  //
    *reviewStatusAll({payload},{put,call}){  //批量审核
      const data = yield call(reviewGoodAllFn, payload);
      return data
    },
  },  
};