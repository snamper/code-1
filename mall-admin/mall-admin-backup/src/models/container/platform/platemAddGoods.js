"use strict";
import { list } from '@/services/container/merchant/member';
import { message } from 'antd';
import queryString from 'query-string';
export default {
  namespace: 'addGoodsModel',
  state: {
    dataSource: [],
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    isUpdate:false, //是否是编辑
    ifShowDetail:false, //是否只是查看详情
    step:1,  //步骤条
    goodsType:1,  //商品类型
    listImgUrl:'',  //列表图
    mainImgUrl:'',  //商品主图
    imgList:[], //细节图
    loading:false,
    goodsDetail:'', //商品详情
    goodsId:'',   //当前商品id
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/platform/platemAddGoods') {
          const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10 }
          if(payload.id)  //如果是修改或是查看就调取详情接口
            dispatch({type: 'query',payload})
          else          //调取其他接口
            dispatch({type: 'query',payload})
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
        goodsId:action.id,
        step:action.id?2:1, //如果是修改则直接到第二步
        isUpdate:action.source && action.source === '1'?true:false, //是否是编辑
        ifShowDetail:action.source && action.source === '2'?true:false, //是否只是显示详情
      }
    },
    nextStep: function(state) {
      return { ...state,  step: 2 }
    },
    listImgUpload: function(state,action) { //列表图
      return { 
        ...state, 
        loading:action.payload.loading,
        listImgUrl:action.payload.listImgUrl?action.payload.listImgUrl:''  
      }
    },
    mainImgUpload: function(state,action) { //主图
      return { 
        ...state, 
        loading:action.payload.loading,
        imgList:action.payload.fileList.fileList?action.payload.fileList.fileList:[] 
      }
    },
    preview: function(state,action) { //预览
      return { 
        ...state, 
        previewImage:action.previewImage,
        previewVisible:action.previewVisible
      }
    },
    changeGoodsDetail: function(state,action) { //商品详情内容
      return { 
        ...state, 
        goodsDetail:action.value
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      if(!payload.pageNo){
        payload.pageNo = 1
        payload.pageSize = 10
      }
      const data = yield call(list, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,id:payload.id || '',source:payload.source || ''})
      }else{
        message.error(data.message)
      }
    }
  },
  

};