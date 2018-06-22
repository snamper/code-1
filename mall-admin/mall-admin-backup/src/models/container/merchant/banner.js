"use strict";
//首页轮播图业务层
//import { setRecGoodsLists, recGoodsDataDialog, addRecGoodsOkBtn, recGoodsDelete, recGoodsRelease, recGoodsEditorSort, goodsUpdate } from 'services/container/merchant/operateSiteMan';
//import queryString from 'query-string';
export default {
  namespace: 'banner',
  state: {
    editText:"编辑排序",  //唤起模态框按钮名字
    editDisable:true,
    visible:false,
  },
  subscriptions: {
  
  },
  reducers: {
    editSort(state,action){
      return {
        ...state,
        editDisable:!state.editDisable,
        editText:state.editDisable?"保存排序":"编辑排序",
      }      
    },
    modal(state,action){
      return {
        ...state,
        visible:action.payload.visible,
      }
    },
  },
  effects:{
    *onOk({payload},{put,call,select}){
      //异步请求接口成功
      yield put({type:"modal",payload:{visible:false}})
    },
  }
};
