"use strict";
import { list, enable, disable, addChannel, updateChannel } from './../../../services/channel/channelManage';
import { message } from 'antd';
import queryString from 'query-string';
export default {
  namespace: 'index',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/qcMall/merchantAccountManager') {
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
        pageSize: action.pageSize?action.pageSize:state.pageSize
      }
    },
    showDialog: function(state,{ payload }) {
      return { ...state, ...payload, visible: true }
    },
    hideDialog: function(state) {
      return { ...state, visible: false,currentItem:{}, isUpdate:false }
    },
    dialogControll: function(state,action) {
      return {
        ...state,
        visible: action.visible,
        isUpdate: action.isUpdate
      }
    },
  //   updateData: function(state, action) {
  //     return {
  //       ...state,
  //       channelName:action.channel.channelName?action.channel.channelName:'', //渠道名称
  //       companyName: action.channel.companyName?action.channel.companyName:'',       //企业名称
  //       linkMan : action.channel.linkMan?action.channel.linkMan:'',   //联系人
  //       linkPhone: action.channel.linkPhone?action.channel.linkPhone:'',     //联系电话
  //       channelId: action.channel.channelId?action.channel.channelId:''
  //     }
  //   }
  },
  effects:{
    *query({payload = {},pageNo,pageSize},{put,call,select}){  //获取列表
      if(pageNo && pageSize) payload = {
        pageNo:pageNo,
        pageSize:pageSize
      }
      const data = yield call(list, payload);
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
    *enabletchannel({tChannelId},{put, call}){  //渠道启用
      const changeStatus = yield call(enable,{tChannelId:tChannelId});
      if(changeStatus.message === '成功'){
        message.success('启用成功')
      }else{
        message.error('启用失败')
      }
    },
    *disabletchannel({tChannelId},{put, call}){  //渠道禁用用
      const changeStatus = yield call(disable,{tChannelId:tChannelId});
      console.log(changeStatus)
    },
    // *showDialog({channel},{put, call}){  //显示弹窗
    //   const visible = true;
    //   let isUpdate = false;
    //   if(!channel || !channel.channelId){
    //     isUpdate = false;
    //     channel = {}
    //     yield put({type:'updateData', channel})
    //   }else{
    //     isUpdate = true;
    //     yield put({type:'updateData', channel})
    //   }
    //   yield put({type:'dialogControll', visible, isUpdate})
    // },
    // *hideDialog({test},{put, call}){  //隐藏弹窗
    //   const visible = false;
    //   const isUpdate = false;
    //   const channel = {}
    //   yield put({type:'updateData', channel})
    //   yield put({type:'dialogControll',visible, isUpdate})
    // },
    *addChannel({data},{put,call,select}) {  //新增渠道
      const result = yield call(addChannel,data)
      const visible = false;
      const isUpdate = false;
      yield put({type:'dialogControll', visible, isUpdate})
      if(result.message === "成功"){
        message.success('渠道增加成功！')
      }else message.error(result.message)
    },
    *updateChannel({data},{put,call,select}) {  //新增渠道
      const result = yield call(updateChannel,data)
      const visible = false;
      const isUpdate = false;
      yield put({type:'dialogControll', visible, isUpdate})
      if(result.message === "成功"){
        message.success('渠道修改成功！')
      }else message.error(result.message)
    },
  },
  

};