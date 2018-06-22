"use strict";
import { addActive } from '@/services/container/merchant/createdActive';
import { message} from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
/* 创建活动 */
export default {
  namespace: 'createdActiveFn',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //选择打包商品窗口隐藏
    currentItem:{},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[13]);
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
    showSelPackGoods:function(state,action){//显示选择打包商品窗口
      return {
        ...state,
        visible: true,
      }
    },
    hideSelPackGoods:function(state,action){//隐藏选择打包商品窗口
      return {
        ...state,
        visible: false,
      }
    },
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(addActive, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
    }
  },
};