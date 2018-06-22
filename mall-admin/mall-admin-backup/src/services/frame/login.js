import request from '@/utils/request';
import { api } from '@/utils/config';

const { login, logout } = api;
export function userLogin(data) {	//渠道选品列表
  return request({
  	url:login+"?account="+data.account+"&password="+data.password,
  	method:"post",
  	data,
  });
};
export function loginOut(data) {
	return request({
  	url:logout,
  	method:"post",
  	data,
  });
}

