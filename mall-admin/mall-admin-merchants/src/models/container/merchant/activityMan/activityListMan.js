"use strict";
import { activityManListFn, changeActiveStatusFn } from '@/services/container/merchant/activityMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
//打包活动列表
export default {
  namespace: 'activityList',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    currentItem:{},
    getCircleData:'', //初始化表头上面的内容展示数据

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[19]);
    },
  },
  reducers: {
  	getList:function(state,action){
      // console.log(action)
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:'',
        totalSize: action.totalSize?action.totalSize:state.totalSize,
        currentPage: action.currentPage?action.currentPage:state.currentPage,
        pageSize: action.pageSize?action.pageSize:state.pageSize,
        getCircleData: action.getCircleData?action.getCircleData:''
      }
    }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(activityManListFn, payload);
      // console.log(data);
      if(data.success){
        const dataSource = data.data.datas.datalist;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        const getCircleData = data.data.datas.datastastic // 表头上面圆圈内的数据展示对象
        yield put({type:'getList',dataSource,getCircleData,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
    },
    *changeStatusFn({id,state},{put, call}){  //打包活动列表-修改活动状态\
      // console.log(id,state)
      const changeStatus = yield call(changeActiveStatusFn,id);
      if(changeStatus.success){//应用生效按钮点击调用成功
        message.success('操作成功！')
      }else{
        message.error(changeStatus.message)
      }
      return changeStatus
    },
  }
};