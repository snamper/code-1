/* eslint-disable */
'use strict';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { indexlist } = api;

export default function hotShop(data){
  return request({
    url: indexlist,
    method: 'post',
    data,
  });
}