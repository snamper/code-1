import request from '@/utils/request';
import { api } from '@/utils/config';

const { stokeMan,saveThreshold } = api;
export function stokeManList(data) { //商品打包管理
  return request({
  	url:stokeMan,
  	method:"get",
  	data,
  });
};
export function updatebatch(data) {	//批量修改阈值
	return request({
		url:saveThreshold,
		method:"post",
		data,
	});
  };