"use strict";
import { supplierManInfo, supplierManCreatedInfo, supplierManDel, queryNewFn } from '@/services/container/platform/merchantAccount';
import { message } from 'antd';
// import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'supplierModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    showPlantArr:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[2]);
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
    showDialog: function(state,{ payload }) {
      return { ...state, ...payload, visible: true }
    },
    hideDialog: function(state) {
      return { ...state, visible: false,currentItem:{}, isUpdate:false }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      const data = yield call(supplierManInfo, payload);
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
    },
    *queryCreated({payload},{put,call,select}){  //编辑
      console.log(payload)
      const data = yield call(supplierManCreatedInfo, payload);
      if(data.message === '成功'){
        message.success('修改成功')
        window.location.reload()
      }else{
        message.error(data.message)
      }
    }, // /admin/merchant/del.do
    *delSupplier({payload},{put,call,select}){  //删除
      console.log(payload)
      const data = yield call(supplierManDel, payload);
      if(data.message === '成功'){
        message.success('成功')
        window.location.reload()
      }else{
        message.error(data.message)
      }
      // console.log(data)
    },  // queryNew
    *queryNew({payload},{put,call,select}){  //删除
      console.log(payload)
      const data = yield call(queryNewFn, payload);
      if(data.message === '成功'){
        message.success('成功')
        window.location.reload()
      }else{
        message.error(data.message)
      }
      // console.log(data)
    },
  },
  

};