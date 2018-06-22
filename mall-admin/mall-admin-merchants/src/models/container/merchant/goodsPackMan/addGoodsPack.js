"use strict";
import { getAllSelGoodsFn, addGoodsPacSaveFn } from '@/services/container/merchant/goodsPackMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
/* 创建商品包 */
export default {
  namespace: 'addPackFn',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //选择打包商品窗口隐藏
    currentItem:{},
    goodsList:[], //下拉商品列表
    imgLoading:false, //图片上传加载
    imgUrl:'' , //上传图片路径
    selGoodsLis: [],//初始化已选择的商品列表
    initAllCosts: 0,//初始化原价总价
    initAllStock: 0,// 初始化进货总价
    initAllPackPrice: 0,//初始化打包总价
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[10]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        goodsList: action.dataSource?action.dataSource:'',
        isUpdate:false, //是否是编辑
        visible:false,  //选择打包商品窗口隐藏
        currentItem:{},
        imgLoading:false, //图片上传加载
        imgUrl:'' , //上传图片路径
        selGoodsLis: [],//初始化已选择的商品列表
        initAllCosts: 0,//初始化原价总价
        initAllStock: 0,// 初始化进货总价
        initAllPackPrice: 0,//初始化打包总价
      }
    },
    imgLoadding(state,action){
      return {
        ...state,
        imgLoading:true
      }      
    },
    imgUploadDown(state,action){
      return {
        ...state,
        imgLoading:false,
        imgUrl:action.imgUrl
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
    getAllPackPrice(state,action){//获取已选择的商品列表数据的打包价格之和
      return {
        ...state,
        initAllPackPrice:action.payload.packAllStocks
      }  
    },
  },
  effects:{
    *query({payload},{put,call,select}){  //获取列表
      // if(!payload.hasOwnProperty('status')) payload.status = '2'
      const data = yield call(getAllSelGoodsFn, payload);
      if(data.success){
        const dataSource = data.data
        yield put({type:'getList',dataSource})
      }else{
        message.error(data.message)
      }
    },
    *addGoodsPacSaveFn({datas},{put, call, select}){//创建商品包数据保存提交
      yield put({type:'app/noLoading',payload:{noLoading:2}});
      const data = yield call(addGoodsPacSaveFn, datas);
      if(data.success && data.code === 1){
        yield put({type:'app/noLoading',payload:{noLoading:1}});
      }
      return data
    },
  },
};