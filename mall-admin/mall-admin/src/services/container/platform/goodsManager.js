import request from '@/utils/request';
import { api } from '@/utils/config';
import requestJson from '@/utils/requestJson';

const { goodsList,saveCateMessage,cateManagerList,chooseGoodsList,exportGoodsList, goodscatelist,productBatchClassify, addProduct, getMerchant, productDetail, updategoods, auditProduct, onlineUrl,deleteUrl, queryAllOnLineUrl, batchOnLineUrl, getChooseGoodsOutLineUrl,queryOutBatchLineUrl, setExchange} = api;

export function list(data) {	//商品库列表
  return request({
  	url:goodsList,
  	method:"get",
  	data,
  });
};
export function cateList(data) {	//商品分类列表
  return request({
  	url:goodscatelist,
  	method:"post",
  	data,
  });
};
export function saveCate(data) {	//保存分类
	return requestJson({
  	url:saveCateMessage,
  	method:"post",
  	data,
  });
}
export function getCateManagerList(data) {	//商品分类列表
  return request({
  	url:cateManagerList,
  	method:"post",
  	data,
  });
};
export function batchClassify(data) {	//商品分类列表
  return requestJson({
  	url:productBatchClassify,
  	method:"post",
  	data,
  });
};
export function addGoods(data) {	//创建商品
  return requestJson({
  	url:addProduct,
  	method:"post",
  	data,
  });
};
export function UpdateGoods(data) {	//修改商品
  return requestJson({
  	url:updategoods,
  	method:"post",
  	data,
  });
};

export function getMerchantList(data) {	//获取所有供货商
  return requestJson({
  	url:getMerchant,
  	method:"post",
  	data,
  });
};

export function goodsDetail(data) {	//获取所有供货商
  return request({
  	url:productDetail,
  	method:"get",
  	data,
  });
};
export function goodsAudit(data) {	//商品审核
  return request({
  	url:auditProduct,
  	method:"post",
  	data,
  });
};
// 

export function onlineFn(data) {	//商品下线
  return request({
  	url:onlineUrl,
  	method:"post",
  	data,
  });
};

export function deleteFn(data) {	//商品删除
  return request({
  	url:deleteUrl,
  	method:"post",
  	data,
  });
}; 

// 
export function queryAllOnLineFn(data) {	//全部上线
  return request({
  	url:queryAllOnLineUrl,
  	method:"post",
  	data,
  });
}; 

export function batchOnLineFn(data) {	//批量上线
  return request({
  	url:batchOnLineUrl,
  	method:"post",
  	data,
  });
}; 
export function getChooseGoodsList(data) {	//选品库列表
  return request({
  	url:chooseGoodsList,
  	method:"get",
  	data,
  });
}; 
export function exportGoodsData(data) {	//选品库列表
  return request({
  	url:exportGoodsList,
  	method:"get",
  	data,
  });
}; 

export function getChooseGoodsOutLine(data) {	// 商品下线
  return request({
  	url:getChooseGoodsOutLineUrl,
  	method:"post",
  	data,
  });
}; 
export function queryOutBatchLineFn(data) {	// 商品下线
  return request({
  	url:queryOutBatchLineUrl,
  	method:"post",
  	data,
  });
}; 

export function goodsExchange(data) {	//商品兑换方式
	return request({
  	url:setExchange,
  	method:"post",
  	data,
  });
}
// 


