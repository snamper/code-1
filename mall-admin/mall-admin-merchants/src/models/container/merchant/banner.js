"use strict";
//首页轮播图业务层
import { setHomeBannerLists, changeBannerStatus, addBanner, setBanner, recBannerEditorSort, bannerPublish } from 'services/container/merchant/operateSiteMan';
//import queryString from 'query-string';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'banner',
  state: {
    editText:"编辑排序",  //唤起模态框按钮名字
    editDisable:false,
    visible:false,
    dataSource:[],
    bannerDetail:'', //banner详情
    imgLoading:false, //图片上传加载
    imgUrl:'' , //上传图片路径
    bannerId:'',
    isUpload:false  //用来判断是新增还是修改
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[8]);
    },
  },
  reducers: {
    getList(state,action){  //获取列表数据
      return {
        ...state,
        dataSource:action.dataSource
      }      
    },
    editSort(state,action){
      return {
        ...state,
        editDisable:!state.editDisable,
        editText:state.editDisable?"保存排序":"编辑排序",
      }      
    },
    imgLoadding(state,action){
      return {
        ...state,
        imgLoading:true
      }      
    },
    imgUploadDown(state,action){
      return {
        ...state,
        imgLoading:false,
        imgUrl:action.imgUrl
      }      
    },
    showModal: function(state,action) {// 显示banner设置弹窗
    	return {
        ...state,
        visible: true,
        bannerDetail:action.bannerDetail || '',
        imgUrl:action.bannerDetail.img_url || '',
        isUpload:action.bannerDetail.insert?false:true,//修改数据
        bannerId:action.bannerDetail.id || ''
      }
    },
    hideModal: function(state,action) {// 隐藏banner设置弹窗
    	return {
        ...state,
        visible: false
      }
    },
    clearStatus: function(state,action) {// 显示banner设置弹窗
    	return {
        ...state,
        editDisable: false,
        visible:false
     	}
    }
  },
  effects:{
    *query({payload = {}},{put,call,select}){  //获取列表
      const data = yield call(setHomeBannerLists, payload);
      if(data.success){
        let dataSource = data.data;
        if(dataSource.length < 6 ){ //如果小于六张时
          if(dataSource.length === 1 && !dataSource[0].id){ //如果返回的只是一个默认并且没有id
            for(let i = 0; i < 6; i++){
              dataSource.push({insert:true})
            }
          }else{
            for(let i=6-dataSource.length; i--; i>=0){
              dataSource.push({insert:true})
            }
          }
        }
        yield put({type:'getList',dataSource})
      }else{
        // message.error(data.message)
      }
    },
    *changeStatus({payload = {},pageNo,pageSize},{put,call}){ //发布开关
      const result = yield call(changeBannerStatus, payload);
      return result;
    },
    *editorSort({data},{put,call}){//banner列表的编辑排序按钮事件
    	const result = yield call(recBannerEditorSort,data);
      return result;
    },
    *releaseBanner({bannerIds},{put,call}){//banner列表的发布按钮事件
      console.log(bannerIds)
      const result = yield call(bannerPublish,{bannerId:bannerIds});
      return result;
    },
    *addMessage({data},{put,call}){//新增banner
      const result = yield call(addBanner,data);
      return result;
    },
    *saveMessage({data},{put,call}){//banner设置弹窗内的保存信息按钮事件
      const result = yield call(setBanner,data);
      return result;
    },
  }
};
