import request from '@/utils/request';
import { api } from '@/utils/config';
import requestJson from '@/utils/requestJson'

const { checkedProducts, goodscatelist, goodslist, addtypeproduct, addbatchproduct,selectGoods } = api;
export function channlelist(data) {	//渠道选品列表
  return request({
  	url:checkedProducts,
  	method:"get",
  	data,
  });
};
export function selectGoodsList(data) {	  //选取商品分类列表
  return request({
  	url:selectGoods,
  	method:"get",
  	data,
  });
}; 
export function goodsCateList(data) {	//商品选品
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
  return requestJson({
  	url:addtypeproduct,
  	method:"post",
  	data,
  });
};
export function addBatchProduct(data) {	//批量添加商品
  return requestJson({
  	url:addbatchproduct,
  	method:"post",
  	data,
  });
};


