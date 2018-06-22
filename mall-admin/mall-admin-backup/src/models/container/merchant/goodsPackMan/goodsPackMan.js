"use strict";
import { goodsPackManList, packLisDelFn, packLisUseFn } from '@/services/container/merchant/goodsPackMan';
import { message } from 'antd';
import queryString from 'query-string';
export default {
  namespace: 'packList',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/merchant/goodsPackMan') {
          const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10 }
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
        dataSource: action.dataSource?action.dataSource:'',
        totalSize: action.totalSize?action.totalSize:state.totalSize,
        currentPage: action.currentPage?action.currentPage:state.currentPage,
        pageSize: action.pageSize?action.pageSize:state.pageSize
      }
    }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(goodsPackManList, payload);
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
    *packLisDelFn({packsId},{put, call}){  //打包商品列表 删除操作
      const changeStatus = yield call(packLisDelFn,{packsId:packsId});
      return changeStatus;
    },
    *packLisUseFn({orderId},{put, call}){  //打包商品列表 应用生效操作
      const result = yield call(packLisUseFn,{orderId:orderId});
      return result;
    },
  }
};