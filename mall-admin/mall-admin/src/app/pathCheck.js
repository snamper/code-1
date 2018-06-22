"use strict";
import queryString from 'query-string';
export const routes = [ //路由一定不要删除，可以进行修改
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
  "/platform/goodsAudit",
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

