"use strict";
layui.use(['element', 'paging', 'laydate'], function(){
	$ = layui.jquery;
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){		 
			if(!first){
				var data = {
					 name:getQueryString('name') || '',
					 startTime:getQueryString('startTime') || '',
					 endTime:getQueryString('endTime') || '',
					 pageNo:obj.curr,
					 pageSize:$("#paging").attr("data-page-size")
				 };		
				 window.location.search = "?name=" + escape(data.name) + "&startTime=" + escape(data.startTime) + "&endTime=" + 
				 escape(data.endTime) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
			}			 
		}
	});
});
//列表查询按钮点击
$('#searchBtn').on('click', function (){
	searchBackList();
});
//不同的状态下的查询列表
function searchBackList(){
	var layLoad = layer.load(2,{
		shade: 0.6
	});//加载等待
	var $advName = $('#advName').val() || ''; //轮播图名称
	var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
	var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
	reloadPage('1');
	layer.close(layLoad);//清除加载
};

//商品类型转换
var getProducType = function(){
	 var IsGoodsTypeVirtual = $("#goodsTypeVirtual").next(0).hasClass("layui-form-checked")?"1":"";
	 return IsGoodsTypeVirtual;
};
//get 同步刷新页面
var reloadPage = function(pageNo){
	 var data = {
		 name:$("#advName").val() || '',
		 startTime:$('#LAY_demorange_s').val() || '',
		 endTime:$('#LAY_demorange_e').val() || '',
		 pageNo:pageNo,
		 pageSize:$("#paging").attr("data-page-size")
	 };		
	 window.location.search = "?name=" + escape(data.name) + "&startTime=" + escape(data.startTime) + "&endTime=" + 
	 escape(data.endTime) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
};