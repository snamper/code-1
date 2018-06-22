/* eslint-disable */
'use strict';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { alipay } = api;


export default function alipayApi(datas){
  const  reqUrl = `${commonApi}?token=${datas.token}`;  
  const data = datas.data;
  return request({
    url:reqUrl ,
    method: 'post',
    headers:{ 'Content-Type': 'application/json' },
    data,
  });
}