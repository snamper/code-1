/***
* root reducer
*/

"use strict";
import {combineReducers} from 'redux';
import Login from './login';
import table from './table';
//将redux消息处理进行包装；
const rootReducers = combineReducers({
  Login:Login,
  table:table
});
export default rootReducers;  //导出