"use strict";
import { stokeManList, updatebatch } from '@/services/container/platform/stockMan';
import { message } from 'antd';
//import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'stockList',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    updateThreshold:''
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
        dataSource: action.dataSource?action.dataSource:'',
        totalSize: action.totalSize?action.totalSize:state.totalSize,
        currentPage: action.currentPage?action.currentPage:state.currentPage,
        pageSize: action.pageSize?action.pageSize:state.pageSize
      }
    },
    changeThreshold: function(state, action) {  //修改阈值
      //console.log(action.index);
      return {
        ...state,
        updateThreshold:action.index || action.index === 0 ? action.index : ''
      }
    },
  },
  effects:{
    *query({payload},{put,call,select}){  //获取列表
      const data = yield call(stokeManList, payload);
      if(data.success){
        const dataSource = data.data.datas.list;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
    },
  *saveThreshold({payload},{put,call}){  //保存阀值
      yield put({type:"app/noLoading",noLoading:true}) //关闭loading
      const value = payload.values();
      const data = {
        id:String(payload.id),
        stockThreshold:value.value
      };    
      const result = yield call(updatebatch, data);
      if(result.message === '成功'){
        yield put({type:"app/noLoading",noLoading:false}) //开启loading
        window.location.reload();
      }else{
        message.error(result.message)
      }
    },
  },
};