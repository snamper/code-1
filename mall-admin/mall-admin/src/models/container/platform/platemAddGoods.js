"use strict";
import { cateList, addGoods, getMerchantList, goodsDetail, UpdateGoods, goodsExchange } from '@/services/container/platform/goodsManager';
import { message } from 'antd';
import queryString from 'query-string';
import {routes} from '@/app/pathCheck';
export default {
  namespace: 'addGoodsModel',
  state: {
    dataSource: [], //分类列表
    merchantList:[],  //供应商列表
    chooseCateId:'',  //分类id
    isUpdate:false, //是否是编辑
    ifShowDetail:false, //是否只是查看详情
    step:1,  //步骤条
    productType:1,  //商品类型
    listImgUrl:{},  //列表图
    mainImgUrl:{},  //商品主图
    imgList:[], //细节图
    fileList:[],
    loading:false,
    goodsDetail:'', //商品详情
    goodsId:'',   //当前商品id
    currentProduct:'',  //当前商品详情
    productMerchant:'1',  //是否为赚动添加特殊商品
    exchangeMessage:{ //兑换方式详情
      productAdAttr:'1',  //商品广告属性
      exchangeMethods:'1',  //兑换方式
    }, 
    extendedDetail:{},  
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === routes[5]) {
          const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10 }
          console.log(payload.id)
          if(payload.id){  //如果是修改或是查看就调取详情接口
            dispatch({type: 'queryDetail',payload})
          }else          //调取分类
            dispatch({type: 'query',payload})
        }
      })
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:[],
        step:1,
        listImgUrl:{},  //列表图
        mainImgUrl:{},  //商品主图
        imgList:[], //细节图
        goodsDetail:'', //商品详情
        currentProduct:'',  //当前商品详情
        productMerchant:'1',  //是否为赚动添加特殊商品
        exchangeMessage:{ //兑换方式详情
          productAdAttr:'1',  //商品广告属性
          exchangeMethods:'1',  //兑换方式
        }, 
        extendedDetail:{},  
        isUpdate:false, //是否是编辑
        ifShowDetail:false, //是否只是查看详情
      }
    },
    merchantList:function(state,action){  //供货商列表
      return {
        ...state,
        merchantList: action.merchantList?action.merchantList:[],
      }
    },
    getGoodsDetail:function(state,action){  //商品详情
      console.log(action.mainImgUrl)
      return {
        ...state,
        currentProduct: action.currentProduct || '',
        exchangeMessage:action.currentProduct.product_detail,
        extendedDetail:action.productExtendedDetail || {},
        goodsId:action.id,
        step:2, //如果是修改则直接到第二步
        isUpdate:action.source && action.source === '1'?true:false, //是否是编辑
        ifShowDetail:action.source && action.source === '2'?true:false, //是否只是显示详情
        listImgUrl:action.listImgUrl?action.listImgUrl:{},
        mainImgUrl:action.mainImgUrl?action.mainImgUrl:{},
        imgList:action.imgList?action.imgList:[],
        goodsDetail:action.currentProduct.product_detail.product_describe,
        productMerchant:String(action.currentProduct.product_detail.channel_type) === '10000'?'1':'2',
        fileList:action.fileList || []
      }
    },
    chooseCateId: function(state,action) {
      return { ...state, chooseCateId:action.chooseCateId }
    },
    productMerchant: function(state,action) {
      return { ...state, productMerchant:action.value }
    },
    nextStep: function(state) {
      return { ...state,  step: 2 }
    },
    listImgUpload: function(state,action) { //列表图
      return { 
        ...state, 
        loading:action.payload.loading,
        listImgUrl:action.payload || {}
      }
    },
    mainImgUpload: function(state,action) { //主图
      return { 
        ...state, 
        loading:action.payload.loading,
        mainImgUrl:action.payload || {}  
      }
    },
    detailImgUpload: function(state,action) { //细节图图
      console.log(action)
      return { 
        ...state, 
        loading:action.payload.loading,
        imgList:action.payload.imgList || [],
        fileList:action.payload.imgDetailList || []
      }
    },
    preview: function(state,action) { //预览
      return { 
        ...state, 
        previewImage:action.previewImage,
        previewVisible:action.previewVisible
      }
    },
    changeGoodsDetail: function(state,action) { //商品详情内容
      return { 
        ...state, 
        goodsDetail:action.value
      }
    },
    changeData: function(state,action) { //商品详情内容
      return { 
        ...state, 
        exchangeMessage:action.exchangeMessage
      }
    },
    changeStep: function(state,action) { //还原第一步
      return { 
        ...state, 
        step:1
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call}){  //获取分类
      const data = yield call(cateList, payload);
      if(data.success){
        const dataSource = data.data;
        yield put({type:'getList',dataSource,id:payload.id || '',source:payload.source || ''})
      }else{
        message.error(data.message)
      }
    },
    *queryDetail({payload = {}},{put,call}){  //获取商品详情
      const data = yield call(goodsDetail, {productId:payload.id});
      if(data.success){
        console.log(data.data)
        let listImgUrl;
        let mainImgUrl;
        let imgList = [];
        let fileList = []
        for(let i = 0; i <data.data.img.length; i++ ){
          const item = data.data.img[i];
          console.log(item.type)
          item.imgUrl = item.image_url
          if(String(item.type) === '1'){
            listImgUrl = item;
          }else if(String(item.type) === '2') {
            mainImgUrl = item;
          }else{
            imgList.push(item);
            fileList.push({
              uid:item.imgUrl,
              url:item.imgUrl
            })
          }
          
        }
        let productExtendedDetail = []
        if(data.data.productExtendedDetail && data.data.productExtendedDetail.length > 0){
          for(let i = 0; i < data.data.productExtendedDetail.length; i++){
            const item = data.data.productExtendedDetail[i];
            if(item.attrDicName === 'announcements'){ //注意事项
              productExtendedDetail.announcements = item.detailDesc
            }else if(item.attrDicName === 'statement'){ //法律说明
              productExtendedDetail.statement = item.detailDesc
            }else if(item.attrDicName === 'useFlow'){ //使用流程
              productExtendedDetail.useFlow = item.detailDesc
            }else if(item.attrDicName === 'usefulTime'){ //使用有效期
              productExtendedDetail.usefulTime = item.detailDesc
            }else if(item.attrDicName === 'purchaseSucceedsMsg'){ //购买成功文案
              productExtendedDetail.purchaseSucceedsMsg = item.detailDesc
            }else if(item.attrDicName === 'purchaseSucceedsMsg'){ //
              productExtendedDetail.purchaseSucceedsMsg = item.detailDesc
            }else if(item.attrDicName === 'purchaseSucceedsMsg'){ //购买成功文案
              productExtendedDetail.purchaseSucceedsMsg = item.detailDesc
            }
          }
          console.log(productExtendedDetail)
        }
        console.log(listImgUrl)
        yield put({type:'getGoodsDetail',
          currentProduct:data.data,
          productExtendedDetail,
          source:payload.source,
          listImgUrl:listImgUrl,
          mainImgUrl:mainImgUrl,
          imgList:imgList,
          id:payload.id,
          fileList
        })
      }else{
        message.error(data.message)
      }
    },
    *queryMerchantList({payload = {}},{put,call}){  //供货商
      const data = yield call(getMerchantList);
      if(data.success){
        const merchantList = data.data;
        yield put({type:'merchantList',merchantList})
      }else{
        message.error(data.message)
      }
      return data
    },
    *saveMessage({data},{put,call,select}){  //创建商品
      const result = yield call(addGoods, data);
      return result
    },
    *UpdateMessage({data},{put,call,select}){  //创建商品
      const result = yield call(UpdateGoods, data);
      return result
    },
    *setExchange({productMessage},{put,call,select}){  //兑换方式设置
      yield put({type:'app/noLoading',noLoading:true})
      const result = yield call(goodsExchange, productMessage);
      return result
    },
  },
  

};