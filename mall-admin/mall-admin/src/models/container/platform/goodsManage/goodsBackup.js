"use strict";
import { goodsBackupFn,recoveryGoodFn } from '@/services/container/platform/goodsCate';
import { message } from 'antd';
// import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'goodsBackup',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    chooseGoodsIds:[],  //选择商品id的数组
    chooseGoodsKeys:[],  //选择商品的key数组
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[8]);
    },
  },
  reducers: {
    getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource?action.dataSource:[],
        totalSize: action.totalSize?action.totalSize:state.totalSize,
        currentPage: action.currentPage?action.currentPage:state.currentPage,
        pageSize: action.pageSize?action.pageSize:state.pageSize,
        activeTab:action.status
      }
    },
    changeChooseGoods:function(state,action){
      return {
        ...state,
        chooseGoodsIds:action.chooseGoodsIds, 
        chooseGoodsKeys:action.chooseGoodsKeys
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      if(!payload.pageNo) {
        payload.pageNo =  1;
        payload.pageSize = 20
      }
      const data = yield call(goodsBackupFn, payload);
      if(data.success){
        const dataSource = data.data.datas.list;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,status:payload.status || 1})
      }else{
        message.error(data.message)
      }
    },
    *updateStatus({payload},{put,call}){  //恢复状态
      const data = yield call(recoveryGoodFn, payload);
      if(data.message === '成功'){
        message.success('修改成功')
        setTimeout(function() {
          debugger
          window.location.reload()
        },1000)
        
      }else{
        message.error(data.message)
      }
    },
    
  },  
};