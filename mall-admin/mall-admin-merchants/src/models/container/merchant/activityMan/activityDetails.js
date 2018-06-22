"use strict";
import { activityDetailsFn } from '@/services/container/merchant/activityMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'activityList1',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    content:{},
    id:'',// 需要传到下一个页面的id
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[15]);
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
        content:action.content?action.content:state.content,
        id:action.id?action.id:''
      }
    }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      // console.log(payload);

      const data = yield call(activityDetailsFn, payload);
      // console.log(data);
      if(data.success){
        const dataSource = data.data.statistics.datas;
        const totalSize = data.data.statistics.totalRows;
        const currentPage = data.data.statistics.pageNo;
        const pageSize = data.data.statistics.pageSize;
        const content = data.data;
        const id = payload.id;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,content,id})
      }else{
        message.error(data.message)
      }
    },
  }
};