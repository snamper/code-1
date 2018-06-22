"use strict";
import { getPackList,getPackGoods, addActive, getPackDetail, updateActive } from '@/services/container/merchant/createdActive';
import { message} from 'antd';
// import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
/* 创建活动 */
export default {
  namespace: 'createdActiveFn',
  state: {
    goodsPackList:[],	//商品包列表
    goodsList:[],	//商品包对应的商品列表
    packId:'',	//选择的商品包id
    imgUrl:'' , //上传图片路径
    keyword:'',
    describe:'',
    name:'',
    id:'',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[13]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        goodsPackList: action.dataSource || [],
        infos:[],
        describe:"",
        id:"",
        imageUrl:"",
        keyword:"",
        name:"",
        imgUrl:"",
        packId:""
      }
    },
    getDetail:function(state,action){
      return {
        ...state,
        goodsList: action.data.infos,
        describe:action.data.describe,
        imgUrl:action.data.imageUrl,
        keyword:action.data.keyword,
        name:action.data.name,
        id:action.data.activeId?action.data.activeId:action.data.id
      }
    },
    choosePackId:function(state,action){	//选择商品包
      return {
        ...state,
        packId: action.value,
        goodsList:action.goodsList,
        keyword:action.values.keyword,
        describe:action.values.describe,
        name:action.values.name
      }
    },
    activeImgUp(state,action){
      return {
        ...state,
        imgUrl:action.imgUrl
      }      
    },
    goodsImgUp(state,action){
      return {
        ...state,
        goodsList:action.goodsList
      }      
    },
  },
  effects:{
    *query({payload },{put,call,select}){  //获取列表  
      if(payload.spreadEventId) {	//编辑
        const data = yield call(getPackDetail, payload);       
      	yield put({type:'getDetail',data:data.data})
      }else{ //创建
        const data1 = yield call(getPackList, payload);
        yield put({type:'getList',dataSource:data1.data});
        yield put({type:'getDetail',data:{
          infos:[],
          describe:"",
          id:"",
          imgUrl:"",
          keyword:"",
          name:""
        }});
      }   
    },
    *getPackGoodslist({value,values },{put,call,select}){  //获取商品包详情
      yield put({type:'app/noLoading',payload:{noLoading:2}});
      const data = yield call(getPackGoods, {id:value});
      if(data.success){
        yield put({type:'app/noLoading',payload:{noLoading:1}});
        const goodsList = data.data;
        yield put({type:'choosePackId',goodsList,value,values})
      }else{
        message.error(data.message)
      }
    },
    *saveMessage({data },{put,call,select}){  //保存数据
      let result;
    	if(data.packId){ //新建
    		result = yield call(addActive, data);
    	}else{ //编辑
    	 	result = yield call(updateActive, data);
    	}
      return result
    },
  },
};