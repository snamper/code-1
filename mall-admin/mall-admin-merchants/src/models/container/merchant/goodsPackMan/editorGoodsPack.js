"use strict";
import { packLisEditorFn, editorGoodsPackSaveFn,packLisUseFn } from '@/services/container/merchant/goodsPackMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
/* 创建商品包 */
export default {
  namespace: 'editorPackFn',
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
    initAllPackPrice: '',//初始化打包总价
    productState: true, // 说明列表内都是已上架的商品，如果有已下架的，则为false且不能保存
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[11]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        goodsList: action.dataSource?action.dataSource:'',
        dataSource: action.dataSource?action.dataSource:'',
        initAllPackPrice:action.packageTotalPrice||'',
        imgUrl:action.imgUrl||'',
        productState:action.productStatuOff,
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
        imgUrl:action.imgUrl,
        dataSource:action.dataSource || state.dataSource
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
      const data = yield call(packLisEditorFn, payload);
      if(data.success){
        const dataSource = data.data.data
        const packageTotalPrice = data.data.data.packageTotalPrice
        const imgUrl = data.data.data.sealImgUrl
        const productStatus = data.data.data.tProductList; 
        let productStatuOff = true;
        for(let i=0;i<productStatus.length;i++){//查看已被选择的商品列表里是否有被下架的  !== '1'的都是已下架的
          if(productStatus[i].productState !== '1'){
            productStatuOff = false;
          } 
        }
        yield put({type:'getList',dataSource,packageTotalPrice,imgUrl,productStatuOff})
      }else{
        message.error(data.message)
      }
    },
    *editorGoodsPackSaveFn({datas},{put, call, select}){//编辑商品包数据保存提交
      yield put({type:'app/noLoading',payload:{noLoading:2}});
      const data = yield call(editorGoodsPackSaveFn, datas);
      if(data.success && data.code === 1){
        yield put({type:'app/noLoading',payload:{noLoading:1}});
      }
      return data
    },
    *packLisUseFn({payload},{put, call}){  //打包商品列表 应用生效操作
      const result = yield call(packLisUseFn,{packageId:payload.packId});
      if(result.success){//应用生效按钮点击调用成功
        // message.success('操作成功！')
      }else{
        message.error(result.message)
      }
      return result
    },
  },
};