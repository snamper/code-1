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
  "/platform/merchantAccount",
  "/platform/merchantChannelManager",
  "/platform/supplierManager",
  "/platform/memberManage",
  "/platform/platemGoodsManager",
  "/platform/platemAddGoods",
  "/platform/platemGoodsHouse",
  "/platform/checkPendingGoods",
  "/platform/goodsRecycle",
  "/merchant/goodsPackMan",
  "/platform/platemOrderManage",
  "/platform/platemStoreManage",
  "/platform/platemCateManage",
  "/platform/activityMan",
  "/platform/activityPutaway",
  "/platform/shareActivityConfig"
]; 
export const pathCheck = function(dispatch,history,url){  //url  当前页面路由
  history.listen((location) => {
  	const payload = queryString.parse(location.search) || { pageNo: 1, pageSize: 10 };
    if (location.pathname === url) return dispatch({type: 'query',payload,});      
  })
};

