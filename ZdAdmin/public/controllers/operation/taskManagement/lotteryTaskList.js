"use strict";
//抽奖任务列表
//因为初始化的时候没有数据，列表为空,初次使用应先进行配置
var layLoad; 
//layer.close(layLoad);
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
//	layLoad = layer.load(2,{shade: 0.6});//加载等待
});