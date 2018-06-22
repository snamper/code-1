/* eslint-disable */
'use strict';
import Mock from 'mockjs';
import { api } from './../utils/config';
// const { mockApi } = api
const { users } = api;
const Users = Mock.mock({
  'success':true,
  'array|8-10':[
    {
      'name|+1':[
        'tom',
        'jick',
        'jim',
        'ted'
      ],
      'id|+1': 1,
      'score|+1': 100
    }
  ],
});
Mock.mock(`${users}`,'get',Users);
// Mock.mock('/api/mock/users','get',Users);
// Mock.mock(`${mockApi}/users`,'get',Users);