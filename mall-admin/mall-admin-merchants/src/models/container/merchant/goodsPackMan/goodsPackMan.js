"use strict";
import { goodsPackManList, packLisDelFn, packLisUseFn } from '@/services/container/merchant/goodsPackMan';
import { message } from 'antd';
// import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
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
      pathCheck(dispatch, history,routes[9]);
    }
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.data.data.datas?action.data.data.datas:'',
        totalSize: action.data.data.totalRows || state.totalSize,
        currentPage: action.data.data.pageNo || state.currentPage,
        pageSize: action.data.data.pageSize || state.pageSize
      }
    }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      const data = yield call(goodsPackManList, payload);
      if(data.success){
        yield put({type:'getList',data})
      }else{
        message.error(data.message)
      }
    },
    *packLisDelFn({packageId},{put, call}){  //打包商品列表 删除操作\
      const changeStatus = yield call(packLisDelFn,{packageId:packageId});
      return changeStatus
    },
    *packLisUseFn({packageId},{put, call}){  //打包商品列表 应用生效操作
      const result = yield call(packLisUseFn,{packageId:packageId});
      if(result.success){//应用生效按钮点击调用成功
        if(result.code === 1){
          message.success('操作成功！')
        }
      }
      return result
    },
  }
};