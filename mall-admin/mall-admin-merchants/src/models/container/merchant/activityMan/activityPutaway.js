"use strict";
import { activityPutawayFn,putUpFn,putDownFn,changeActiveSortFn } from '@/services/container/merchant/activityMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
//打包活动管理页面( 活动上下架管理页面 )
export default {
  namespace: 'activityPutawayList',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage:1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    activeTab: '1',//上架管理列表tab切换状态
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[12]);
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
        pageNo: action.pageNo?action.pageNo:state.pageNo,
        activeTab:action.activeTab || state.activeTab
      }
    }
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      payload.status = payload.activeTab?payload.activeTab:'1';   
      const data = yield call(activityPutawayFn, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,activeTab:payload.activeTab||'1'})
      }else{
        message.error(data.message)
      }
    },  
    *putUp({payload = {}},{put,call,select}){  //上架   
      yield put({type:'app/noLoading',payload:{noLoading:2}})
      const data = yield call(putUpFn, payload);
      if(data.success){
        if(data.code === 1){
          message.success('上架成功！')
          yield put({type:'app/noLoading',payload:{noLoading:1}});
          setTimeout(function (){
            window.location.reload();
          },200)
        }else{
          message.error(data.message)
          return
        }
      }else{
        message.error(data.message)
        return
      }
    },
    *putDown({payload = {}},{put,call,select}){ //下架
      const data = yield call(putDownFn, payload);
      yield put({type:'app/noLoading',payload:{noLoading:true}})
      if(data.success){
        if(data.code === 1){
          message.success('下架成功！')
          yield put({type:'app/noLoading',payload:{noLoading:true}});
          setTimeout(function (){
            window.location.reload();
          },200)
        }else{
          message.error(data.message)
          return
        }
      }else{
        message.error(data.message)
        return
      }
    },
    *changeSorts({getSortNum,id},{put,call}){ //列表内直接修改排序号
      // console.log(getSortNum,id)
      // if(Number(getSortNum) > 5){//超出排序号限制
      //   message.error('排序号最大为5')
      //   setTimeout(function (){
      //     window.location.reload();
      //   },200)
      //   return
      // }
      yield put({type:'app/noLoading',payload:{noLoading:2}});
      const data = yield call(changeActiveSortFn, {id:id,orderNum:getSortNum});
      if(data.message === '成功'){
        if(data.code === 1){
          message.success('修改成功！')
          yield put({type:'app/noLoading',payload:{noLoading:1}});
          // setTimeout(function (){
          //   window.location.reload();
          // },200)
        }else{
          message.destroy()
          message.error(data.message)
          return
        }
      }else{
        message.error(data.message)
      }
    }
  }
};