/* eslint-disable */
'use strict';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { hartlist } = api;

export default function hartList(data){
  return request({
    url: hartlist,
    method: 'post',
    data,
  });
}