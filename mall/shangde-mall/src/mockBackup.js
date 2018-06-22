/* eslint-disable */
'use strict';
import Mock from 'mockjs';
//const cont = '/api/mock/users','get',{type:'get'};

Mock.mock({
  'GET /api/mock/users':[{type:'get'}]
});

