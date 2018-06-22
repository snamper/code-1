"use strict";
import { list, changeUserInfo, resetPasswordFn, updateStatusFn, disabledStatusFn, createdChannelInfo, addChannelInfo } from '@/services/container/platform/merchantAccount';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'accountModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //账号窗口隐藏
    channelVisible:false, //增加渠道弹窗
    currentItem:{},
    currentItemChannel:{},
    resetPwd:false // 重置密码
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[0]);
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
    showDialog: function(state,{ payload }) {
      return { ...state, ...payload, visible: true }
    },
    hideDialog: function(state) {
      return { ...state, visible: false,currentItem:{}, isUpdate:false }
    },
    showResetPwdDialog: function(state,{ payload }) {
      return { ...state, ...payload, resetPwd: true }
    },
    hideResetPwdDialog: function(state) {
      return { ...state, resetPwd: false, currentItemChannel:{} }
    },
    showChannelDialog: function(state,{ payload }) {
      return { ...state, ...payload, channelVisible: true}
    },
    hideChannelDialog: function(state) {
      return { ...state, channelVisible: false }
    },
    dialogControll: function(state,action) {
      return {
        ...state,
        visible: action.visible,
        isUpdate: action.isUpdate
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
//    console.log("in")
      const data = yield call(list, payload);
//    console.log(data)
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize})
      }else{
        message.error(data.message)
      }
    },
    *resetPassword({datas},{put,call}){  //重置密码
//    console.log(datas)
      const data = yield call(resetPasswordFn, datas);
      return data
      // if(data.message === '成功'){
      //   message.success('重置成功')
      // }else{
      //   message.error(data.message)
      // }
    },
    *updateStatus({payload},{put,call}){  //更改为启用状态
      const data = yield call(updateStatusFn, payload);
      if(data.message === '成功'){
        message.success('修改成功')
        window.location.reload()
      }else{
        message.error(data.message)
      }
    },
    *disabledStatus({payload},{put,call}){  //更改为禁用状态
//    console.log(payload)
      const data = yield call(disabledStatusFn, payload);
      if(data.message === '成功'){
        message.success('修改成功')
        window.location.reload()
      }else{
        message.error(data.message)
      }
      
    },
    *updateUserInfo({data},{put,call}){  //更改用户信息
      const data1 = yield call(changeUserInfo, data);
      if(data1.message === '成功'){
        message.success('更改成功')
        window.location.reload()
      }else{
        message.error(data.message)
      }
      return data1;
    },
    *addChannel({data},{put,call}){  //更改用户信息
      const data1 = yield call(addChannelInfo, data);
      if(data1.message === '成功'){
        message.success('成功')
        window.location.reload()
      }else{
        message.error(data1.message)
      }
      // console.log(data1)
      return data1;
    },
    *createdChannel({data},{put,call}){  // 创建渠道
      const data1 = yield call(createdChannelInfo, data);
      if(data1.message === '成功'){
        message.success('创建成功')
        window.location.reload()
      }else{
        message.error(data.message)
      }
      
      return data1;
    },
  },
  

};