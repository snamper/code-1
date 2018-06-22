import request from '@/utils/request';
import { api } from '@/utils/config';

const { vipInfo } = api;
export function list(data) {	//列表
  return request({
  	url:vipInfo,
  	method:"get",
  	data,
  });
};
