"use strict";
import { list, updatebatchFn, updateGoodsStatus, goodsPreviewUrlFn, editorGoodsPriceFn } from '@/services/container/merchant/merchantGoodsManage';
import {pathCheck,routes} from '@/app/pathCheck';
import { message } from 'antd';
export default {
  namespace: 'goodsManagerModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    tabActive:'4', //tab的key
    chooseGoodsIds:[],
    chooseGoodsKeys:[],
    ifShowDetail:false,
    productId:'',  //商品详情id
    goodsMessage:'',
    updatePrice:'',  //修改价格
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[5]);
    }
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
      //第一二步是处理列表页有tab切换选项的情况
      const tabActive = yield select(({ goodsManagerModel }) => goodsManagerModel.tabActive);
      if(!payload.status) payload.status = tabActive
      const data = yield call(list, payload);
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
    *savePrice({payload = {},handleRefresh},{put,call}){  //保存售价
      const value = payload.values();
      const data = {
        id:payload.id,
        mailPrice:value.product
      }
      const result = yield call(editorGoodsPriceFn, data);
      if(result.success){
        message.success('价格修改成功！')
        // handleRefresh()//修改成功后刷新当前页面
        window.location.reload();
      }else{
        message.error(data.message)
        return
      }
    },
    *updateBatchStatus({payload = {}},{put,call}){  //批量修改商品
      yield put({type:'app/noLoading',payload:{noLoading:2}})
      if(payload.ids.length<1) return message.info("未选中商品，不能上架");
      const result = yield call(updatebatchFn, payload);
      if( result.message === '成功' ){
        yield put({type:'app/noLoading',payload:{noLoading:1}})
        message.success('成功')
        window.location.reload();
      }else{
        return
      }
      console.log(result)
      return result
    },
    *updateGoods({payload = {}},{put,call}){  //修改单个商品状态
      yield put({type:'app/noLoading',payload:{noLoading:2}})
      const result = yield call(updateGoodsStatus, payload);
      if( result.message === '成功' ){
        yield put({type:'app/noLoading',payload:{noLoading:1}})
        // message.success('成功')
        window.location.reload();
      }else{
        return
      }
      return result
    },
    *getGoodsDetail({payload},{put,call}) {
      const result = yield call(goodsPreviewUrlFn, payload);
      return result
    }
  },
  

};