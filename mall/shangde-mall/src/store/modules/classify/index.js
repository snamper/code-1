/* eslint-disable */
'use strict';
//import testApi from  './../../../api/test';
import api from './../../../api';
const { classify } = api; 
const { goodsCateList, getGoodsCateList } = classify
/**
 * [a test module]
 * @type {Object}
 */
const Classify = {
	namespaced:true, //带命名空间
	state:{
	  name: 'classify',
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
      async getGoodsCate(context){
        const req = await goodsCateList();
        return req
      },
      async getGoodsList(context) {
      	const req = await getGoodsCateList();
        return req
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
export default Classify;