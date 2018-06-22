"use strict";
import { list, cancelProductFn, cancelProductAllFn, getTypeList} from '@/services/container/merchant/cancelGoods';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'cancelGoodsModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    chooseGoodsIds:[],
    chooseGoodsKeys:[],
    getTypeList:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[4]);
    }
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:'',
        totalSize: action.totalSize?action.totalSize:state.totalSize,
        currentPage: action.currentPage?action.currentPage:state.currentPage,
        pageSize: action.pageSize?action.pageSize:state.pageSize
      }
    },
    getTypeList:function(state,action){
      return {
        ...state,
        getTypeList: action.getTypeList?action.getTypeList:'',
        
      }
    },
    changeChooseGoods:function(state,action){
      return {
        ...state,
        chooseGoodsIds:action.chooseGoodsIds, 
        chooseGoodsKeys:action.chooseGoodsKeys
      }
    },
    showDialog: function(state,{ payload }) {
      return { ...state, ...payload, visible: true }
    },
    hideDialog: function(state) {
      return { ...state, visible: false,currentItem:{}, isUpdate:false }
    },
    dialogControll: function(state,action) {
      return {
        ...state,
        visible: action.visible,
        isUpdate: action.isUpdate
      }
    },
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表

      const data = yield call(list, payload);
      console.log(data)
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
      const dataList = yield call(getTypeList, payload);
      if(dataList.message === "成功"){
        const getTypeList = dataList.data;
        console.log(dataList)
        yield put({type:'getTypeList',getTypeList})
      }else{
        message.error(data.message)
      }
    },
    *cancelProduct({payload},{put,call,select}){  // 单个取消
      const data = yield call(cancelProductFn, payload);
      if(data.message === "成功"){
      	message.success("取消成功")
      	window.location.reload()
      }else{
      	message.error(data.message)
      }
//    console.log(data)
    }, //
     *cancelProductBatch({payload},{put,call,select}){  // 批量取消
      const data = yield call(cancelProductAllFn, payload);
      return data;
    }
  },
  

};