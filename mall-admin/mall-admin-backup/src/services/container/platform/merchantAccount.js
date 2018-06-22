import request from '@/utils/request';
import { api } from '@/utils/config';

const { channelList } = api;
export function list(data) {	//列表
  return request({
  	url:channelList,
  	method:"post",
  	data,
  });
};

