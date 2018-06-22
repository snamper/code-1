"use strict";
import { list, exportOrderList } from '@/services/container/merchant/platemOrderManage';
import { message } from 'antd';
import {pathCheck,routes} from "@/app/pathCheck";
export default {
  namespace: 'orderModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    exportUrl:''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[6])
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
    changeUrl:function(state,action){
      return {
        ...state,
        exportUrl: action.url
      }
    },
  },
  effects:{
    *query({payload},{put,call,select}){  //获取列表
      payload = {
        ...payload
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
    *exportExcel({payload,that},{put,call,select}){  //导出表格
      let sendData = {orderStatus:"0"}; //默认状态
      console.log(payload)
      if(payload.orderStatus){
        sendData = {
          ...sendData,
          orderStatus:payload.orderStatus,
        }
      }
      if(payload.orderno){
        sendData = {
          ...sendData,
          orderno:payload.orderno,
        }
      }
      if(payload.productName){
        sendData = {
          ...sendData,
          productName:payload.productName,
        }
      }
      if(payload.userId){
        sendData = {
          ...sendData,
          userId:payload.userId,
        }
      }
      if(payload.createTimeBefore){
        sendData = {
          ...sendData,
          createTimeBefore:payload.createTimeBefore,
        }
      }
      if(payload.createTimeEnd){
        sendData = {
          ...sendData,
          createTimeEnd:payload.createTimeEnd,
        }
      }
      const data = yield call(exportOrderList, sendData);
      if(data.message === '成功'){
        const realData = "data:application/vnd.ms-excel;base64,"+data.data;
        var arr = realData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
        while(n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const url = URL.createObjectURL(new Blob([u8arr], {type: mime}));
        yield put({type:'changeUrl',url})
        message.destroy()
        message.success('导出成功！')
        setTimeout(function(){
          document.getElementById("export").click()
        },1)
        
      }else{
        message.error(data.message)
      }
    },
  },
  

};