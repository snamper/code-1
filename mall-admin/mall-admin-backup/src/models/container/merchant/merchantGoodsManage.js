"use strict";
import { getChannelProducts, updatebatch,updateGoodsStatus,cancelProduct, goodsDetail } from '@/services/container/merchant/merchantGoodsManage';
import queryString from 'query-string';
export default {
  namespace: 'goodsManagerModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    tabActive:'3', //tab的key
    chooseGoodsIds:[],
    chooseGoodsKeys:[],
    ifShowDetail:false,
    productId:'',  //商品详情id
    goodsMessage:'',
    updatePrice:'',  //修改价格
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/merchant/merchantGoodsManage') {
          const payload = location.search?queryString.parse(location.search):{ pageNo: 1, pageSize: 10, status:'3' }
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
        tabActive:action.key,
        chooseGoodsKeys:action.ifRestart && action.ifRestart === "1"?[]:action.chooseGoodsKeys,
        chooseGoodsIds:action.ifRestart && action.ifRestart === "1"?[]:action.chooseGoodsIds,
      }
    },
    changeChooseGoods: function(state, action) {  //更改选择商品
      return {
        ...state,
        chooseGoodsIds: action.chooseGoodsIds,
        chooseGoodsKeys:action.chooseGoodsKeys
      }
    },
    showGoodsDetail: function(state, action) {
      console.log(action)
      return {
        ...state,
        ifShowDetail:true,
        productId:action.productId,
        goodsMessage:action.goodsMessage
      }
    },
    hideDialog: function(state, action) {
      return {
        ...state,
        ifShowDetail:false,
        productId:'',
        goodsMessage:''
      }
    },
    changePrice: function(state, action) {  //修改价格输入框
      return {
        ...state,
        updatePrice:action.index || action.index === 0 ?action.index : ''
      }
    },
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){
      const data = yield call(getChannelProducts, payload);
      let chooseGoodsIds = [];
      let chooseGoodsKeys = [];
      chooseGoodsIds = yield select(({ goodsManagerModel }) => goodsManagerModel.chooseGoodsIds);
      chooseGoodsKeys = yield select(({ goodsManagerModel }) => goodsManagerModel.chooseGoodsKeys);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        const key = payload.status;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,key,ifRestart:payload.ifRestart,chooseGoodsIds,chooseGoodsKeys})
      }else{
        console.log("out")
      }
    },
    *savePrice({payload = {}},{put,call}){  //保存售价
      const value = payload.values();
      const data = {
        id:payload.id,
        price:value
      }
      const result = yield call(updatebatch, data);
      if(result.message === '成功'){

      }else{
        
      }
    },
    *updateBatchStatus({payload = {}},{put,call}){  //批量修改商品
      const result = yield call(updatebatch, payload);
      return result
    },
    *updateGoods({payload = {}},{put,call}){  //修改单个商品状态
      const result = yield call(updateGoodsStatus, payload);
      return result
    },
    *cancelBatchProduct({payload = {}},{put,call}){  //批量取消选品
      const result = yield call(cancelProduct, payload);
      return result
    },
    *getGoodsDetail({payload = {}},{put,call}) {
      const result = yield call(goodsDetail, payload);
      return result
    }
  },
  

};