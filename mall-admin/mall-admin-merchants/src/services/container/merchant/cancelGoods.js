import request from '@/utils/request';
import requestJson from '@/utils/requestJson';
import { api } from '@/utils/config';

const { cancelProductList , cancelProductUrl, cancelProductAllUrl, getTypeListUrl } = api;
export function list(data) {	//列表
  return request({
  	url:cancelProductList,
  	method:"post",
  	data,
  });
};
// 
export function cancelProductFn(data) {	//取消
  return requestJson({
  	url:cancelProductUrl,
  	method:"post",
  	data,
  });
};
export function cancelProductAllFn(data) {	//批量取消
  return request({
  	url:cancelProductAllUrl,
  	method:"post",
  	data,
  });
}; //
export function getTypeList(data) {	// 分类
  return request({
  	url:getTypeListUrl,
  	method:"get",
  	data,
  });
};
