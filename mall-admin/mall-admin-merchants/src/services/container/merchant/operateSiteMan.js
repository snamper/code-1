import request from 'utils/request';
import { api } from 'utils/config';
import requestJson from 'utils/requestJson';

const { channelHomeBannerMan, channelRecGoodsMan, setRecGoodsList, setHomeBannerList, recGoodsListDialog, changebannerstats, recGoodsListOk,
	recGoodsListEditorOk, recGoodsListEditorSort, recGoodsListPublish, recGoodsListDelete, setbanner, addbanner, recbannereditorsort, recbannerPublish, channelgoodsupdate } = api;
export function channelHomeBannerList(data) { //渠道首页banner管理
  return request({
  	url:channelHomeBannerMan,
  	method:"post",
  	data,
  });
};
export function channelRecGoodsList(data) { //渠道推荐商品管理
  return request({
  	url:channelRecGoodsMan,
  	method:"post",
  	data,
  });
};
export function setRecGoodsLists(data) { //渠道推荐商品设置列表
  return request({
  	url:setRecGoodsList,
  	method:"post",
  	data,
  });
};
export function setHomeBannerLists(data) { //渠道首页banner设置列表
  return request({
  	url:setHomeBannerList,
  	method:"post",
  	data,
  });
};
export function recGoodsDataDialog(data) { //渠道推荐商品设置列表-新增/替换弹窗列表
  return request({
  	url:recGoodsListDialog,
  	method:"get",
  	data,
  });
};
export function changeBannerStatus(data) { //渠道推荐商品设置列表-新增/替换弹窗列表
  return requestJson({
  	url:changebannerstats,
  	method:"post",
  	data,
  });
};
export function addRecGoodsOkBtn(data) { //渠道推荐商品设置列表-新增弹窗列表内的确认提交按钮
  return requestJson({
  	url:recGoodsListOk,
  	method:"post",
  	data,
  });
};
export function editorRecGoodsOkBtn(data) { //渠道推荐商品设置列表-替换弹窗列表内的确认提交按钮
  return request({
  	url:recGoodsListEditorOk,
  	method:"post",
  	data,
  });
};

export function goodsUpdate(data) { //商品替换
  return request({
  	url:channelgoodsupdate,
  	method:"post",
  	data,
  });
};
export function recGoodsEditorSort(data) { //渠道推荐商品设置列表-修改排序按钮
  return requestJson({
  	url:recGoodsListEditorSort,
  	method:"post",
  	data,
  });
};
export function recGoodsRelease(data) { //渠道推荐商品设置列表-发布按钮
  return request({
  	url:recGoodsListPublish,
  	method:"get",
  	data,
  });
};
export function recGoodsDelete(data) { //渠道推荐商品设置列表-删除按钮
  return request({
  	url:recGoodsListDelete,
  	method:"get",
  	data,
  });
};
export function setBanner(data) { //banner设置
  return requestJson({
  	url:setbanner,
  	method:"post",
  	data,
  });
};

export function addBanner(data) { //banner设置
  return requestJson({
  	url:addbanner,
  	method:"post",
  	data,
  });
};
export function recBannerEditorSort(data) { //banner排序
  return requestJson({
  	url:recbannereditorsort,
  	method:"post",
  	data,
  });
};
export function bannerPublish(data) { //banner发布
  return request({
  	url:recbannerPublish,
  	method:"get",
  	data,
  });
};