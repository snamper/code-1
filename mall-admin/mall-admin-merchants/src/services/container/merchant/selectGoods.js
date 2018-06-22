"use strict";
import request from '@/utils/request';
import { api } from '@/utils/config';
const {
  selectGoods
} = api;

export function selectGoodsList(data) {	  //选取商品分类列表
  return request({
  	url:selectGoods,
  	method:"get",
  	data,
  });
}; 