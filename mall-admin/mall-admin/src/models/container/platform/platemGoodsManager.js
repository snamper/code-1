"use strict";
import { getChooseGoodsList, exportGoodsData,getChooseGoodsOutLine,queryOutBatchLineFn } from '@/services/container/platform/goodsManager';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'platGoodsModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    visible:false,  //窗口隐藏
    currentItem:{},
    exportUrl:'',
    chooseGoodsIds:[],  //选择商品id的数组
    chooseGoodsKeys:[],  //选择商品的key数组
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch,history,routes[4]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource.datas.list || '',
        totalSize: action.dataSource.totalRows || '',
        currentPage: action.dataSource.pageNo || '',
        pageSize: action.dataSource.pageSize || ''
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
    *query({payload },{put,call,select}){  //获取列表

      const data = yield call(getChooseGoodsList, payload);
      if(data.success){
        yield put({type:'getList',dataSource:data.data})
      }else{
        message.error(data.message)
      }
    },
    *exportExcel({payload = {},that},{put,call,select}){  //导出表格
      const data = yield call(exportGoodsData, payload);
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
        },10)
        
      }else{
        message.error(data.message)
      }
    },
    *queryOutLine({payload},{put,call,select}){  // 单个下线
      const data = yield call(getChooseGoodsOutLine, payload);
      if(data.success){
        message.success("成功")
        window.location.reload()
      }else{
        message.error(data.message)
      }
    },
    *queryOutBatchLine({payload},{put,call,select}){  // 批量下线
      const data = yield call(queryOutBatchLineFn, payload);
      if(data.success){
        message.success("成功")
        window.location.reload()
      }else{
        message.error(data.message)
      }
    },
  },
  

};