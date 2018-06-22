/* eslint-disable */
'use strict';
/**
 * [global Mutations]
 * @type {Object}
 */
const Mutations = {
  loginIn(state,data){
    localStorage['token'] = data.token;
  }
};
export default Mutations;
