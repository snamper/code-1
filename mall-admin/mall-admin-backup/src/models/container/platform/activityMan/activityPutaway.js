"use strict";
import { activityManList } from '@/services/container/platform/activityMan';
import { message } from 'antd';
import queryString from 'query-string';
export default {
  namespace: 'activityPutawayList',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    tabStatus: '1',//上架管理列表tab切换状态
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/platform/activityPutaway') {
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
        pageSize: action.pageSize?action.pageSize:state.pageSize,
        activeTab:action.tabStatus
      }
    }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(activityManList, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,tabStatus:payload.tabStatus||'1'})
      }else{
        message.error(data.message)
      }
    },
  }
};