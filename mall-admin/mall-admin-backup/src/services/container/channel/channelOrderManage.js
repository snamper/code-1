import request from './../../utils/request';
import { api } from './../../utils/config';

const { channelOrderIndex, channelOrderLists, orderRefundFn, orderDeliveFn } = api;
export function list(data) {//渠道订单管理列表
  return request({
  	url:channelOrderIndex,
  	method:"post",
  	data,
  });
};
export function seclist(data) {//渠道订单管理二级列表
  return request({
  	url:channelOrderLists,
  	method:"get",
  	data,
  });
};
export function orderRefund(data) {//渠道订单管理二级列表 退款操作
  return request({
  	url:orderRefundFn,
  	method:"get",
  	data,
  });
};
export function orderDelive(data) {//渠道订单管理二级列表 发货操作
  return request({
  	url:orderDeliveFn,
  	method:"get",
  	data,
  });
};
