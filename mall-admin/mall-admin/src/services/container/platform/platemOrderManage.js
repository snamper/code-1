import request from '@/utils/request';
import { api } from '@/utils/config';

const { platemOrderList, exportOrderExcel, refund, sendOrder } = api;
export function list(data) {	//列表
  return request({
  	url:platemOrderList,
  	method:"get",
  	data,
  });
};

export function exportOrderList(data) {	//导出列表
  return request({
  	url:exportOrderExcel,
  	method:"get",
  	data,
  });
};

export function refundOrder(data) {	//退款操作
  return request({
  	url:refund,
  	method:"get",
  	data,
  });
};

export function sendGoods(data) {	//发货操作
  return request({
  	url:sendOrder,
  	method:"get",
  	data,
  });
};