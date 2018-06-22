import request from '@/utils/request';
import { api } from '@/utils/config';

const { chooseGoodsPack,selectGoodsPack,addGoodsPackActive, getPackDetailById, updateGoodsPackActive } = api;

export function getPackList(data) { //商品包列表
  return request({
  	url:chooseGoodsPack,
  	method:"post",
  	data,
  });
};
export function getPackGoods(data) { //
  return request({
  	url:selectGoodsPack,
  	method:"get",
  	data,
  });
};

export function addActive(data) { //
  return request({
  	url:addGoodsPackActive,
  	method:"post",
  	data,
  });
};
export function updateActive(data) { //
  return request({
  	url:updateGoodsPackActive,
  	method:"post",
  	data,
  });
};


export function getPackDetail(data) {
	return request({
  	url:getPackDetailById,
  	method:"post",
  	data,
  });
}
