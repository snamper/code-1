import request from '@/utils/request';
import { api } from '@/utils/config';

const { orderList, exportOrderExcel } = api;
export function list(data) {	//列表
  return request({
  	url:orderList,
  	method:"get",
  	data,
  });
};

export function exportOrderList(data) {	//导出列表
  return request({
  	url:exportOrderExcel,
  	method:"post",
  	data,
  });
};
