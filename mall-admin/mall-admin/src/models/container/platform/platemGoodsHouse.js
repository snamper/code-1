"use strict";
import { list, onlineFn,deleteFn,queryAllOnLineFn,batchOnLineFn, cateList, batchClassify } from '@/services/container/platform/goodsManager';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'goodsHouseModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 20,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    activeTab:'',
    chooseGoodsIds:[],  //选择商品id的数组
    chooseGoodsKeys:[],  //选择商品的key数组
    visible:false,  //商品归类弹窗
    cateList:[],
    goodsId:false,  //单个归类时的商品id
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[6]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.datas.datas.list?action.datas.datas.list:'',
        totalSize: action.datas.totalRows?action.datas.totalRows:state.totalSize,
        currentPage: action.datas.pageNo?action.datas.pageNo:state.currentPage,
        pageSize: action.datas.pageSize?action.datas.pageSize:state.pageSize,
        activeTab:action.payload.productState || '',
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
    changeUrl:function(state,action){
      return {
        ...state,
        exportUrl: action.url
      }
    },
    showDialog:function(state,action){
      return {
        ...state,
        visible: true,
        cateList:action.datas,
        goodsId:action.goodsId
      }
    },
    hideDialog:function(state,action){
      return {
        ...state,
        visible: false
      }
    },
    clearState:function(state,action){
      return {
        ...state,
        visible: true,
        chooseGoodsIds:[],  
        chooseGoodsKeys:[],  
      }
    },
  },
  effects:{
    *query({payload},{put,call,select}){  //获取列表
      const data = yield call(list, payload);
      if(data.success){
        const datas = data.data;
        yield put({type:'getList',datas,payload})
      }else{
        message.error(data.message)
      }
    },
    *getCateList({payload,goodsId},{put,call,select}){  //分类列表
      const data = yield call(cateList, payload);
      if(data.success){
        const datas = data.data;
        yield put({type:'showDialog',datas,goodsId})
      }else{
        message.error(data.message)
      }
    },
    *productBatchClassify({productBatchClassify},{put,call,select}){  //商品归类
      const data = yield call(batchClassify, productBatchClassify);
      return data
    },
    *exportExcel({payload = {},that},{put,call,select}){  //导出表格
      // const data = yield call(exportOrderList, payload);
      // if(data.message === '成功'){
      //   const realData = "data:application/vnd.ms-excel;base64,"+data.data;
      //   var arr = realData.split(','),
      //   mime = arr[0].match(/:(.*?);/)[1],
      //   bstr = atob(arr[1]),
      //   n = bstr.length,
      //   u8arr = new Uint8Array(n);
      //   while(n--) {
      //     u8arr[n] = bstr.charCodeAt(n);
      //   }
      //   const url = URL.createObjectURL(new Blob([u8arr], {type: mime}));
      //   yield put({type:'changeUrl',url})
      //   message.destroy()
      //   message.success('导出成功！')
      //   setTimeout(function(){
      //     document.getElementById("test").click()
      //   },1)
        
      // }else{
      //   message.error(data.message)
      // }
    },
    *queryonline({payload},{put,call,select}){  // 下线
      const data = yield call(onlineFn, payload);
      if(data.success){
        const datas = data.data;
        yield put({type:'getList',datas,payload})
      }else{
        message.error(data.message)
      }
    }, 
    *querydelete({payload},{put,call,select}){  // 删除
      const data = yield call(deleteFn, payload);
      if(data.success){
        const datas = data.data;
        yield put({type:'getList',datas,payload})
      }else{
        message.error(data.message)
      }
    },
    *queryAllOnLine({payload={}},{put,call,select}){  // 删除
      const data = yield call(queryAllOnLineFn);
      if(data.success){
        const datas = data.data;
        yield put({type:'getList',datas,payload})
      }else{
        message.error(data.message)
      }
    },
    // 
    *queryBatchOnLine({payload},{put,call,select}){  // 删除
      const data = yield call(batchOnLineFn, payload);
      if(data.success){
        const datas = data.data;
        yield put({type:'getList',datas,payload})
      }else{
        message.error(data.message)
      }
      return data;
    }, //
  },
  

};