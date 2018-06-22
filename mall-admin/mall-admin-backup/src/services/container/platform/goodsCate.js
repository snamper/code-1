import request from '@/utils/request';
import { api } from '@/utils/config';

const { checkedProducts, goodscatelist, goodslist, addtypeproduct, addbatchproduct } = api;
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


