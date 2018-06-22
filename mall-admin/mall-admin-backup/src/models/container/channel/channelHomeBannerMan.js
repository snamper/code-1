"use strict";
import { channelHomeBannerList } from './../../services/channel/operateSiteMan';
import queryString from 'query-string';
export default {
  namespace: 'homeBanners',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        console.log(location.pathname)
        if (location.pathname === '/qcMall/channelHomeBannerMan') {
          const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10, productState: 0 }
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
      console.log(action)
      return {
        ...state,
        dataSource: action.dataSource,
        totalSize: action.totalSize,
        currentPage: action.currentPage,
        pageSize: action.pageSize
      }
    },
    changePageSize: function(state,action) {
      return {
        ...state,
        pageSize: action.pageSize
      }
    }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call}){
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      
      const data = yield call(channelHomeBannerList, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        console.log("out")
      }
    }
  }
};