"use strict";
import { setRecGoodsLists, recGoodsDataDialog, addRecGoodsOkBtn, recGoodsDelete, recGoodsRelease, recGoodsEditorSort, goodsUpdate } from 'services/container/merchant/operateSiteMan';
import queryString from 'query-string';
export default {
  namespace: 'setRecGoodsList',
  state: {
    dataSource: [],
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
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/qcMall/channelRecGoodsMan/setRecGoodsList') {
          const payload = queryString.parse(location.search) || ''
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
        channelId:action.channelId,
        editSort:false
      }
   },
    showDialog: function(state,action) {//展示新增推荐弹窗
      console.log(action)
    	return {
    		...state,
    		visible:true,
    		recGoodsList: action.recGoodsList.datas.list,
        totalSizeModal:action.recGoodsList.totalRows,
        pageSizeModal: action.recGoodsList.pageSize<10?10:action.recGoodsList.pageSize,
        currentPageModal: action.recGoodsList.pageNo,
        fullName: action.fullName?action.fullName:'',
        merchantShortName:action.merchantShortName?action.merchantShortName:'',
        isUpload:action.source === "add"?false:true,
        chooseProductId:action.source === "add"?'':action.chooseProductId
    	}
    },
    hideDialog: function(state,action) {//隐藏弹窗
    	return {
    		...state,
    		visible:false,
        recGoodsList: [],
        chooseGoodsIds: [],
        chooseGoodsKeys: []
    	}
    },
    changeChooseGoods: function(state, action) {  //更改选择商品
      return {
        ...state,
        chooseGoodsIds: action.chooseGoodsIds,
        chooseGoodsKeys:action.chooseGoodsKeys
      }
    },
    hideChangeDialog: function(state,action) {//隐藏替换弹窗
    	return {
    		...state,
    		changeVisuble:false,
    		recGoodsList: [],
    	}
    },
    editorSortBtn: function(state,action) {//列表页编辑排序更改状态
    	console.log(action)
    	return {
    		...state,
    		editSort:true
    	}
    },
    cancelSortBtn: function(state, action) {//列表页编辑状态取消编辑
      return {
        ...state,
        editSort: false
      }
    }
  },
  effects:{
    *query({payload = {}},{put,call}){//列表的处理逻辑-此列表不需要分页，最多20条数据
      const data = yield call(setRecGoodsLists, payload);
      if(data.success){
        const dataSource = data.data;
        yield put({type:'getList',dataSource,channelId:payload.channelId})
      }else{
        console.log("out")
      }
    },
    *getGoodsList({payload,pageNo,pageSize,fullName,merchantShortName,source,chooseProductId},{select,put,call}){//新增推荐商品 弹窗数据
      
      if(!payload) payload = {
        pageNo:pageNo,
        pageSize:pageSize,
        fullName:fullName,
        merchantShortName:merchantShortName,
        source:source
      }
      const data = yield call(recGoodsDataDialog, payload);
      if(data.success){
        const recGoodsList = data.data;
        yield put({type:'showDialog',recGoodsList,fullName,merchantShortName,source:payload.source,chooseProductId})
      }else{
        console.log("out")
      }
    },
    *changeGoodsLis({payload = {},pageNo,pageSize,fullName,merchantShortName},{put,call}){//替换推荐商品弹窗数据
      payload = {
        pageNo:pageNo,
        pageSize:pageSize,
        fullName:fullName,
        merchantShortName:merchantShortName
      }
      const data = yield call(recGoodsDataDialog, payload);
      return data
    },
    *channelGoodsUpdate({data},{put,call}) {  //商品替换
      const result = yield call(goodsUpdate,data)
      return result
    },
    *commitGoods({data},{put,call}){ //批量推荐商品
      const result = yield call(addRecGoodsOkBtn,data)
      return result
    },
    *releaseBtn({id},{put,call}) {//推荐商品列表发布按钮
      const result = yield call(recGoodsRelease,{id:id});//调用发布按钮的接口方法
      return result
    },
    *editorSortSave({data},{put,call}){//推荐商品列表的编辑排序保存按钮事件
    	const result = yield call(recGoodsEditorSort,data);
      return result;
    },
    *getRecGoodsLis({payload = {}},{put,call}) {//新增推荐商品按钮弹窗
      const result = yield call(recGoodsDataDialog,payload);
      return result
    },
    *recGoodsDelete({id},{put,call}) {//推荐商品列表删除按钮
      const result = yield call(recGoodsDelete,{id:id});//调用删除按钮的接口方法
      return result
    }
  }
};