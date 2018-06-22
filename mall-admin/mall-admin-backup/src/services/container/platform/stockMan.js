// import request from '@/utils/request';
// import { api } from '@/utils/config';

// const { stokeMan } = api;
// export function stokeMan(data) { // 库存管理
//   return request({
//   	url:stokeMan,
//   	method:"post",
//   	data,
//   });
// };

import request from '@/utils/request';
import { api } from '@/utils/config';

const { stokeMan } = api;
export function stokeManList(data) { //商品打包管理
  return request({
  	url:stokeMan,
  	method:"post",
  	data,
  });
};
export function updatebatch(data) {	//批量修改阈值
	return request({
		url:stokeMan,
		method:"post",
		data,
	});
  };