"use strict";
import { selectGoodsList, goodsList, addTypeProduct, addBatchProduct } from '@/services/container/merchant/merchantChooseGoods';
//import queryString from 'query-string';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'goodsCate',
  state: {
    dataSource: [], //渠道列表
    defaultExpandedRowKeys:[],  //默认展开的行号
    goodsList:[], //商品列表
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    visible:false,  //窗口隐藏
    chooseCateId:'',  //选择分类id
    totalSizeModal:0,
    pageSizeModal: 10,
    currentPageModal: 1,
    chooseGoodsIds:[],  //已选商品列表
    chooseGoodsKeys:[], 
    chooseCateIds:[],  //已选分类列表
    chooseCateKeys:[],
    productName:'', //商品名称
    merchantName:'', //商户名称
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[3]);
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
        channelId: action.channelId,
        visible:false,
        chooseGoodsIds:[],  //已选商品列表
    		chooseGoodsKeys:[], 
      }
    },
    showDialog: function(state,action) {
      return {
        ...state,
        visible: true,
        chooseCateId: action.payload.sortId || '',
        goodsList:action.goodsList.datas,
        totalSizeModal:action.goodsList.totalRows,
        pageSizeModal: action.goodsList.pageSize<10?10:action.goodsList.pageSize,
        currentPageModal: action.goodsList.pageNo,
        productName: action.payload.productName?action.payload.productName:'',
        merchantName:action.payload.merchantName?action.payload.merchantName:''
      }
    },
    hideDialog: function(state) {
      return {
        ...state,
        visible: false,
        chooseCateId:'',
        chooseGoodsIds:[],  //已选商品列表
        chooseGoodsKeys:[], 
      }
    },
    changeChooseGoodsCate: function(state, action) {  //更改选择分类
      return {
        ...state,
        chooseCateIds: action.chooseCateIds?action.chooseCateIds:[],
        chooseCateKeys:action.chooseCateKeys?action.chooseCateKeys:[]
      }
    },
    changeChooseGoods: function(state, action) {  //更改选择商品
      return {
        ...state,
        chooseGoodsIds: action.chooseGoodsIds,
        chooseGoodsKeys:action.chooseGoodsKeys
      }
    },
    changeExpandRows: function(state, action) {
      return {
        ...state,
        defaultExpandedRowKeys: action.defaultExpandedRowKeys,
      }
    }
  },
  effects:{
    *query({payload = {},source},{put,call}){
      const data = yield call(selectGoodsList, payload);
      console.log(data);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        const channelId = payload.channelId;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,channelId})
        if(source === 'clearKeys'){   //如果是提交成功则清除选中的chenckbox
          yield put({type:'changeChooseGoodsCate'})
        }
      }else{
        console.log("out")
      }
    },
    *getGoodsList({payload = {}},{select,put,call}){
      const data = yield call(goodsList, payload);
      if(data.success){
        const goodsList = data.data;
        yield put({type:'showDialog',goodsList,payload})
      }else{
        console.log("out")
      }
    },  
    *chooseGoods({payload = {}},{put, call}){  //显示弹窗
      const data = yield call(goodsList,payload)
      if(data.success){
        const goodsList = data.data;
        yield put({type:'showDialog', goodsList, payload})
      }else{
        
      }
    },
    *hideDialog({test},{put, call}){  //隐藏弹窗
      const visible = false;
      const isUpdate = false;
      yield put({type:'dialogControll',visible, isUpdate})
    },
    *commitGoodsByCate({ids},{put,call}){ //根据分类添加商品
      const data = {
        ids:JSON.stringify(ids)
      }
      const result = yield call(addTypeProduct,data)
      return result
    },
    *commitGoods({ids,dispatch,payload},{put,call}){ //批量添加商品
      const data = {
        ids:JSON.stringify(ids)
      }
      const result = yield call(addBatchProduct,data)
      return result
      
    },
    saveMessage({validateFieldsAndScroll},{put,call}) {
      validateFieldsAndScroll((errors, values) => {
        console.log(values)
        if (errors) {
          return
        }
      })
    }
  },
  

};