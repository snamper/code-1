/* eslint-disable */
'use strict';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { goodsDetialFn } = api;

export default function goodsDetialFn(data){
  return request({
    url: goodsDetialFn,
    method: 'post',
    data,
  });
}