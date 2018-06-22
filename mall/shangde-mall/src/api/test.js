/* eslint-disable */
'use strict';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { users } = api;

export default function testApi(data){
  return request({
    url: users,
    method: 'get',
    data,
  });
}