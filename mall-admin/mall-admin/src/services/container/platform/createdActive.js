import request from '@/utils/request';
import { api } from '@/utils/config';

const { createdActive } = api;

export function createdActiveFn(data) { //活动管理 -- 创建活动
  return request({
  	url:createdActive,
  	method:"post",
  	data,
  });
};
