"use strict";
import { APIV1 } from './../utils/config'; 
const Mock = require("mockjs");

const Users = Mock.mock({
  'success':true,
  'array|8-10':[
    {
      'name|+1':[
        'tom',
        'jick',
        'jim',
        'ted'
      ]
    }
  ],
});
module.exports = {
  [`GET ${APIV1}/users`](req,res){
    res.json(Users);
  },
}