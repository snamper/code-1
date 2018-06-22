"use strict";
//商品分享统计列表
var layLoad;
layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	
	//初始化日期组件
	if($('.layui-form').eq(0).hasClass('dataPlug')){//判断数据是否请求成功
		var opt = {
			sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
		};
		var dateIint = new dateComponent(opt);
	}
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				layLoad = layer.load(2,{
					shade: 0.6
				});//加载等待
				search(obj.curr);
			};
		}
	});	
});

//查询
var search = function(pn) {
	if(layLoad){
		layer.closeAll('loading');
	}
	var $productId = getQueryString('productId')?getQueryString('productId'):'';
	var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
	var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
	var fullName = $("#shortName").val()||'';
	var phoneNum = $('#userPhone').val()||'';
	var pageNo = pn;
	var pageSize = $("#paging").attr("data-page-size");
	window.location.search="?productId="+escape($productId)+"&productName="+escape(fullName)+"&phoneNum="+escape(phoneNum)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+pageNo+"&pageSize="+escape(pageSize);
}
$('#searchBtn').on('click', function (){//查询
	layLoad = layer.load(2,{
		shade: 0.6
	});//加载等待
	search('1')
});