/* eslint-disable */
'use strict';
//import testApi from  './../../../api/test';
import api from './../../../api';
const { testApi } = api; 
/**
 * [a test module]
 * @type {Object}
 */
const Test = {
	namespaced:true, //带命名空间
	state:{
	  name: 'test',
	},
	mutations:{ //唯一能改变state的地方
	  test(state, data){
	  // console.log(data);
        state.name = data;
	  }
	},
	actions:{ //异步操作，只能通过mutations去改变state
      test(context){
      	context.commit('test')
      },
      async testQuery(context){
      	console.log(context);
        const req = await testApi();
        console.log(req);
        context.commit('test',req);
      }
	},
	getters:{ //基于现有state派生出其他state
      test(state){
        return `${state.name} getters计算后`;
      }
	},
	modules:{ //定义子模块

	}
}
export default Test;