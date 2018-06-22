/* eslint-disable */
'use strict';
import qs from 'qs';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { loginIn } = api;

export default function login(datas){
  const data = qs.stringify(datas);
  return request({
    url: loginIn,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
    data,
  });
}