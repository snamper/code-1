"use strict";
import { setAvtiveDetail, activePutAwaySave,putUpFn, activePutAwayUpdate } from '@/services/container/merchant/activityMan';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
/* 活动管理-设置活动上架 */
export default {
  namespace: 'setActivityPutFn',
  state: {
    activeList: [],
    isUpdate:false, //是否是编辑
    visible:false,  //选择打包商品窗口隐藏
    activeDetail:{
      showPosition:"HOMEPAGE"
    },
    id:'',
    activeId:'',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[18]);
    },
  },
  reducers: {
  	getData:function(state,action){
     // console.log(action)
      return {
        ...state,
        activeDetail:action.data.data,
        id:action.payload.id
      }
   },
   getList:function(state,action){
//	console.log(action)
      return {
        ...state,
        activeList:action.data1.data
      }
   },
   changeData:function(state,action){
      return {
        ...state,
        activeDetail:action.activeDetail
      }
   },
  },
  effects:{
    *query({payload},{put,call,select}){  //获取详情
      if(payload.id){
        const data = yield call(setAvtiveDetail, payload);
      	if(data.success){
      		data.data.orderNum = Number(data.data.orderNum)
	        yield put({type:'getData',data,payload})
	      }else{
	        message.error(data.message)
	        return
	      }
      }else{
        //activeDetail
        //console.log("else")
        //const data = yield call(setAvtiveDetail, payload);
        yield put({type:'getData',data:{data:{}},payload:{id:""}})
      }
    },
    *saveMessage({data},{put,call,select}){  //保存
      const result = yield call(activePutAwaySave, data);
			return result
    },
    *UpdateMessage({data},{put,call,select}){  //修改保存
      const result = yield call(activePutAwayUpdate, data);
			return result
    },
    *putAway({id},{put,call,select}){  //上架
      const data = yield call(putUpFn, {id:id});
			return data
    },
  },
};