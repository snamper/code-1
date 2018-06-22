import request from '@/utils/request';
import { api } from '@/utils/config';

const { login, logout } = api;
export function userLogin(data) {	//渠道选品列表
  return request({
  	url:login,
  	method:"post",
  	data,
  });
};
export function userLoginOut(data) {
	return request({
  	url:logout,
  	method:"post",
  	data,
  });
}

