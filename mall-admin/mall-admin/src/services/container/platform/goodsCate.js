import request from '@/utils/request';
import { api } from '@/utils/config';
import requestJson from '@/utils/requestJson';

const { checkedProducts, goodscatelist, goodslist, addtypeproduct, addbatchproduct, goodsBackupUrl,recoveryGoodUrl,productReviewUrl,reviewGoodUrl,reviewGoodAllUrl } = api;
export function channlelist(data) {	//渠道选品列表
  return request({
  	url:checkedProducts,
  	method:"get",
  	data,
  });
};
export function goodsCateList(data) {	//商品分类
  return request({
  	url:goodscatelist,
  	method:"get",
  	data,
  });
};

export function goodsList(data) {	//商品列表
  return request({
  	url:goodslist,
  	method:"get",
  	data,
  });
};
export function addTypeProduct(data) {	//根据类型批量添加商品
  return request({
  	url:addtypeproduct,
  	method:"post",
  	data,
  });
};
export function addBatchProduct(data) {	//批量添加商品
  return request({
  	url:addbatchproduct,
  	method:"post",
  	data,
  });
};
export function goodsBackupFn(data) {	//商品回收站列表
  return request({
  	url:goodsBackupUrl,
  	method:"get",
  	data,
  });
};
export function recoveryGoodFn(data) {	//恢复商品
  return requestJson({
  	url:recoveryGoodUrl,
  	method:"post",
  	data,
  });
};
// reviewGoodFn

export function productReviewFn(data) {	// 待审核列表
  return request({
  	url:productReviewUrl,
  	method:"get",
  	data,
  });
};

export function reviewGoodFn(data) {	// 单个审核
  return request({
  	url:reviewGoodUrl,
  	method:"post",
  	data,
  });
};
export function reviewGoodAllFn(data) {	// 批量审核
  return request({
  	url:reviewGoodAllUrl,
  	method:"post",
  	data,
  });
};

