/* eslint-disable */
'use strict';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { goodscate, goodsCateLists } = api;

const goodsCateList = (data) => {
  return request({
    url: goodscate,
    method: 'post',
    data,
  });
}
const getGoodsCateList = (data) => {
	return request({
    url: goodsCateLists,
    method: 'post',
    data,
  });
}

const classifyService = {
	goodsCateList,
	getGoodsCateList
}

export default  classifyService;
