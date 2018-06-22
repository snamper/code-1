"use strict";
import queryString from 'query-string';
export const routes = [ //路由一定不要删除，可以进行修改
  "/merchant/merchantAccount",  
  "/merchant/merchantMessage",
  "/merchant/merchantMemberManage",
  "/merchant/merchantChooseGoods",
  "/merchant/merchantCancelGoods",
  "/merchant/merchantGoodsManage",
  "/merchant/platemOrderManage",
  "/merchant/merchantRecommendGoods",
  "/merchant/merchantBannerManager",
  "/merchant/goodsPackMan",// 商品打包管理9
  "/merchant/addGoodsPack",// 商品打包管理-创建商品包10
  "/merchant/editorGoodsPack",// 商品打包管理-编辑商品包11
  "/merchant/activityPutaway",// 商品打包活动管理12
  "/merchant/createdActive",// 商品打包活动管理-创建活动13
  "/merchant/editorActives",// 商品打包活动管理-编辑活动14
  "/merchant/activityDetails",// 商品打包活动管理-活动详情15
  "/merchant/purchaseDetail",// 商品打包活动管理-购买明细16
  "/merchant/shareActiveConfig",// 商品打包活动管理-分享活动配置17
  "/merchant/setActivityPut",// 商品打包活动管理-设置活动上架18
  "/merchant/activityListMan",// 打包活动上下架管理19
  "/merchant/goodsPackDetail",// 商品包详情页面20
]; 
export const pathCheck = function(dispatch,history,url){  //url  当前页面路由
  history.listen((location) => {
    const params = queryString.parse(location.search);
    let payload;
    if(params.pageNo&&params.pageSize){
      payload = queryString.parse(location.search);
    }else{
      payload = { 
        ...params,
        pageNo: 1, 
        pageSize: 10 
      };
    }
    dispatch({type:'app/noLoading',noLoading:false})
    if (location.pathname === url) return dispatch({type: 'query',payload,});      
  })
};

