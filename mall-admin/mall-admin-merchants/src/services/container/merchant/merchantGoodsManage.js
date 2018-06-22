import request from '@/utils/request';
import { api } from '@/utils/config';
import requestJson from '@/utils/requestJson';

const { manGoodsList, editorGoodsPriceUrl, goodsPreviewUrl, enabletchannel, disabletchannel, addchannel, updatechannel, 
	getchannelproducts, getGoodsDetail, updategoodsstatus, updatebatchgoodsstatus } = api;
export function list(data) {	//列表
  return request({
  	url:manGoodsList,
  	method:"get",
  	data,
  });
};
export function editorGoodsPriceFn(data) {	//商品管理-管理商品列表-修改商品价格
  return requestJson({
  	url:editorGoodsPriceUrl,
  	method:"post",
  	data,
  });
};
export function goodsPreviewUrlFn(data) {	//商品管理-管理商品列表-商品预览
  return requestJson({
  	url:goodsPreviewUrl,
  	method:"get",
  	data,
  });
};
export function enable(data) {	//渠道启用
  return request({
  	url:enabletchannel,
  	method:"get",
  	data,
  });
};
export function disable(data) {	//渠道禁用
  return request({
  	url:disabletchannel,
  	method:"get",
  	data,
  });
};
export function addChannel(data) {	//增加渠道
  return request({
  	url:addchannel,
  	method:"post",
  	data,
  });
};
export function updateChannel(data) {	//增加渠道
  return request({
  	url:updatechannel,
  	method:"put",
  	data,
  });
};

export function getChannelProducts(data) {	//渠道商品列表
  return request({
  	url:getchannelproducts,
  	method:"get",
  	data,
  });
};
export function updateGoodsStatus(data) {	//单个修改上下架状态
  return requestJson({
  	url:updategoodsstatus,
  	method:"post",
  	data,
  });
};
export function updatebatchFn(data) {	//批量修改上下架状态
  return request({
  	url:updatebatchgoodsstatus,
  	method:"post",
  	data,
  });
};
export function goodsDetail(data) {	//获取商品详情
  return request({
  	url:getGoodsDetail,
  	method:"get",
  	data,
  });
};
