import request from '@/utils/request';
import { api } from '@/utils/config';

const { channelList, exportOrderExcel } = api;
export function list(data) {	//列表
  return request({
  	url:channelList,
  	method:"post",
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
