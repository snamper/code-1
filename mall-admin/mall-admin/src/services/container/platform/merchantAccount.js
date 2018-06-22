import request from '@/utils/request';
import requestJson from '@/utils/requestJson';
import { api } from '@/utils/config';

const { merchantList, changeUserInfoUrl, resetPasswordUrl, updateStatusUrl, disabledStatusUrl, createdChannelUrl, addChannelUrl, supplierManUrl, supplierManCreatedUrl,supplierManDelUrl, queryNewUrl } = api;
export function list(data) {	//用户列表
  return request({
  	url:merchantList,
  	method:"get",
  	data,
  });
};

export function changeUserInfo(data) {	//修改用户信息
  return request({
  	url:changeUserInfoUrl,
  	method:"POST",
  	data,
  });
};
export function resetPasswordFn(data) {	// 重置密码
  return request({
  	url:resetPasswordUrl,
  	method:"POST",
  	data,
  });
};
export function updateStatusFn(data) {	// 启用帐号
  return request({
  	url:updateStatusUrl,
  	method:"POST",
  	data,
  });
};
export function disabledStatusFn(data) {	// 封停账号
  return request({
  	url:disabledStatusUrl,
  	method:"POST",
  	data,
  });
};

export function createdChannelInfo(data) {	// 创建渠道
  return requestJson({
  	url:createdChannelUrl,
  	method:"POST",
  	data,
  });
};
export function addChannelInfo(data) {	// 新增商户
  return request({
  	url:addChannelUrl,
  	method:"POST",
  	data,
  });
};

export function supplierManInfo(data) {	// 供应商管理
  return request({
  	url:supplierManUrl,
  	method:"POST",
  	data,
  });
};
export function supplierManCreatedInfo(data) {	// 修改信息
  return request({
  	url:supplierManCreatedUrl,
  	method:"POST",
  	data,
  });
};

export function supplierManDel(data) {	// 修改信息
  return request({
  	url:supplierManDelUrl,
  	method:"POST",
  	data,
  });
};
export function queryNewFn(data) {	// 修改信息
  return request({
  	url:queryNewUrl,
  	method:"POST",
  	data,
  });
};
//   queryNewFn

