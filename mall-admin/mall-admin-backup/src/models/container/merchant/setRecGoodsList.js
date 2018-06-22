"use strict";
//推荐商品
//import { setRecGoodsLists, recGoodsDataDialog, addRecGoodsOkBtn, recGoodsDelete, recGoodsRelease, recGoodsEditorSort, goodsUpdate } from 'services/container/merchant/operateSiteMan';
//import queryString from 'query-string';

const dataSource = [
  {
    sort:"1",
    product_id:"1000",
    full_name:"tester1",
    mall_sale:"10",
    total:"1000",
    status:"失效",
  },
  { 
    sort:"2",
    product_id:"33431",
    full_name:"tester1",
    mall_sale:"10",
    total:"1000",
    status:"生效",
  },
  { 
    sort:"3",
    product_id:"3331",
    full_name:"tester1",
    mall_sale:"10",
    total:"1000",
    status:"生效",
  }
];
export default {
  namespace: 'setRecGoodsList',
  state: {
    dataSource,
    visible: false,	//控制新增选择商品弹窗显示隐藏
    changeVisuble: false, //控制替换选择商品弹窗显示隐藏
    recGoodsList: [], //初始化调用弹窗的时候返回的弹窗列表数据
    fullName: '', //商品名称
    merchantShortName: '', //商户名称
    editSort: false, //编辑排序按钮初始化
    totalSizeModal:0,
    pageSizeModal:1,
    currentPageModal:1,
    channelId:'',
    ifUpload:false, //用来判断是否是替换
    chooseGoodsIds:[], //选择的商品id列表
    chooseGoodsKeys:[], //选择的商品key值
    chooseProductId:'', //将要被替换的商品id
    disabled:true, //排序可编辑状态
    disabledText:'编辑排序',  //排序可编辑状态文本
  },
  subscriptions: {
  
  },
  reducers: {
    sort(state,action){
      return {
        ...state,
        disabled:!state.disabled,
        disabledText:state.disabled?'保存排序':'编辑排序'
      }
    },
    modalIn(state,action){
      return {
        ...state,
        visible:true,
      }
    },
    modalOut(state,action){
      return {
        ...state,
        visible:false,
      }
    },
    onModalOk(state,action){
      return {
        ...state,
        visible:false
      }
    }
  },
  effects:{
    *onOk({payload},{put,call,select}){ 
      yield  put({type:'onModalOk'})
    }
  }
};
