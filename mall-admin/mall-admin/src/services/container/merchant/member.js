import requestJson from '@/utils/requestJson';
import { api } from '@/utils/config';

const { memberListUrl, appUserListUrl } = api;
export function memberList(data) {	//渠道列表
  return requestJson({
  	url:memberListUrl,
  	method:"post",
  	data,
  });
};

export function memberListApp(data) {	//会员
  return requestJson({
  	url:appUserListUrl,
  	method:"get",
  	data,
  });
};