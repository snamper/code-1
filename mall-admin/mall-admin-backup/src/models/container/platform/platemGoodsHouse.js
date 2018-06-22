"use strict";
import { list, exportOrderList } from '@/services/container/merchant/platemOrderManage';
import { message } from 'antd';
import queryString from 'query-string';
export default {
  namespace: 'goodsHouseModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 20,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    activeTab:'1',
    chooseGoodsIds:[],  //选择商品id的数组
    chooseGoodsKeys:[],  //选择商品的key数组
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/platform/platemGoodsHouse') {
          const payload = location.search?queryString.parse(location.search):{ pageNo: 1, pageSize: 20 }
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
    changeUrl:function(state,action){
      return {
        ...state,
        exportUrl: action.url
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      if(!payload.pageNo) {
        payload.pageNo =  1;
        payload.pageSize = 20
      }
      const data = yield call(list, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,status:payload.status || 1})
      }else{
        message.error(data.message)
      }
    },
    *exportExcel({payload = {},that},{put,call,select}){  //导出表格
      const data = yield call(exportOrderList, payload);
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
          document.getElementById("test").click()
        },1)
        
      }else{
        message.error(data.message)
      }
    },
  },
  

};