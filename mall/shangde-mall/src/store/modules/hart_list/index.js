/* eslint-disable */
'use strict';
//import testApi from  './../../../api/test';
import api from './../../../api';
const { hotShop, hartList } = api; 
/**
 * [a hart_shop module]
 * @type {Object}
 */
const HartList = {
	namespaced:true, //带命名空间
	state:{
	  data: 'data',
	   hart: []
	},
	mutations:{ //唯一能改变state的地方
	  test(state,data){
        state.data=data
	  },
	  hart(state,data){
        state.hart=data
	  }
	},
	actions:{ //异步操作，只能通过mutations去改变state
      test(context){
      	context.commit('test')
      },
      async hotQuery(context){ //热卖商品
      	// console.log(context);
        const req = await hotShop();
        // const req1 = await hartList();
        // context.commit('hart',req);
        // console.log(req);
        context.commit('test',req);
        
      },
      async hartQuery(context){ //热卖商品
      	// console.log(context);
        const req1 = await hartList();
        // console.log(req, '111');
        context.commit('hart',req1);
      }
	},
	getters:{ //基于现有state派生出其他state
      
	},
	modules:{ //定义子模块

	}
}
export default HartList;