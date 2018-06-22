"use strict";
import { setHomeBannerLists, changeBannerStatus, addBanner, setBanner, recBannerEditorSort, bannerPublish } from './../../services/channel/operateSiteMan';
import queryString from 'query-string';
export default {
  namespace: 'setBannerLis',
  state: {
    dataSource: [],
    editSort:false,
    bannerDetail:'', //banner详情
    homeBannerVisuble: false, //控制banner设置显示隐藏
    imgUrl:'',  //banner图
    bannerId:'',
    channelId:'',
    startTime:'',
    endTime:'',
    ifUpload:false  //用来判断是新增还是修改
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        console.log(location.pathname)
        if (location.pathname === '/qcMall/channelHomeBannerMan/setHomeBannerList') {
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
        dataSource: action.dataSource,
        channelId:action.channelId,
        homeBannerVisuble:false,
        bannerDetail:'',
        imgUrl:'',
        bannerId:'',
        editSort:false
      }
    },
    changePageSize: function(state,action) {
      return {
        ...state,
        pageSize: action.pageSize
      }
    },
    showHomeBannerDialog: function(state,action) {// 显示banner设置弹窗
    	return {
        ...state,
        homeBannerVisuble: true,
        bannerDetail:action.bannerDetail || '',
        imgUrl:action.bannerDetail.img_url || '',
        bannerId:action.bannerDetail.id || '',
        endTime:action.bannerDetail.end_time || '',
        startTime:action.bannerDetail.start_time || '',
        isUpload:action.bannerDetail.insert?false:true//修改数据
      }
    },
    hideHomeBannerDialog: function(state,action) {// 隐藏banner设置弹窗
    	return {
        ...state,
        homeBannerVisuble: false
      }
    },
    updateSort: function(state, action) {
      return {
        ...state,
        editSort: true
      }
    },
    cancelSort: function(state, action) {
      return {
        ...state,
        editSort: false
      }
    },
    uploadImgDown: function(state, action) {
      return {
        ...state,
        imgUrl: action.imageUrl
      }
    },
    changeTime: function(state,action){
      return {
        ...state,
        startTime: action.startTime,
        endTime:action.endTime
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call}){
      
      const data = yield call(setHomeBannerLists, payload);
      if(data.success){
        let dataSource = data.data;
        if(dataSource.length < 6 ){
          if(dataSource.length === 1 && !dataSource[0].id){
            for(let i = 0; i < 6; i++){
              dataSource.push({insert:true})
            }
          }else{
            console.log(6-dataSource.length)
            for(let i=6-dataSource.length; i--; i>=0){
              console.log(6-dataSource.length)
              dataSource.push({insert:true})
            }
          }
        }
        yield put({type:'getList',dataSource,channelId:payload.channelId})
      }else{
        console.log("out")
      }
    },
    *addMessage({data},{put,call}){//新增banner
      const result = yield call(addBanner,data);
      return result;
    },
    *saveMessage({data},{put,call}){//banner设置弹窗内的保存信息按钮事件
      const result = yield call(setBanner,data);
      return result;
    },
    *editorSort({data},{put,call}){//banner列表的编辑排序按钮事件
    	const result = yield call(recBannerEditorSort,data);
      return result;
    },
    *releaseBtn({bannerIds},{put,call}){//banner列表的发布按钮事件
      console.log(bannerIds)
      const result = yield call(bannerPublish,{bannerId:bannerIds});
      return result;
    },
    *changeStatus({payload = {},pageNo,pageSize},{put,call}){
      const result = yield call(changeBannerStatus, payload);
      return result;
    }
  }
};