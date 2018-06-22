"use strict";
import { shareActiveConfigListFn, shareActiveConfigFn, shareActiveConfigAddFn } from '@/services/container/merchant/activityMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
//活动管理-分享活动配置
export default {
  namespace: 'shareActivityConfigModul',
  state: {
    dataSource: [],
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    currentPage:1,
    pageSize:10,
    totalSize:0,
    
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[17]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource.datas?action.dataSource.datas:'',
        currentPage: action.dataSource.pageNo || state.currentPage,
        pageSize: action.dataSource.pageSize || state.pageSize,
        totalSize: action.dataSource.totalRows || state.totalSize,
      }
   },
   imgUpload:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource
      }
   },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      if(!payload.status) payload.status = 5
      const data = yield call(shareActiveConfigListFn, payload);
      // console.log(data);
      if(data.success){
      	const dataSource = data.data;
        yield put({type:'getList',dataSource})
      }else{
        message.error(data.message)
      }
    },
    *setActive({data},{put,call,select}){  //保存设置 
      // console.log(data)
      let result = ''
      if(!data.id){//说明是初次设置，调用add接口
         result = yield call(shareActiveConfigAddFn, data);
      }else{//说明是编辑接口，调用edit接口
         result = yield call(shareActiveConfigFn, data);
      }   
      return result
    },
  }
};