"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var laydate = layui.laydate;
	
	//初始化日期组件
	if($('.layui-form').eq(0).hasClass('dataPlug')){//判断数据是否请求成功
		var opt = {
			sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
		};
		var dateIint = new dateComponent(opt);
	}
	
	 var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){		 
			 if(!first){
				var data = {
					 shortName:getQueryString('shortName') || '',
					 startTime:getQueryString('startTime') || '',
			         endTime:getQueryString('endTime') || '',
					 remState:"0",
					 pageNo:obj.curr,
					 pageSize:$("#paging").attr("data-page-size"),
				 };		
				 window.location.search = "?shortName=" + escape(data.shortName) + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + 
				 	"&remState=" + escape(data.remState)+"&pageNo="+escape(data.pageNo)+"&pageSize="+escape(data.pageSize);
			 }			 
		}
	 });
});
//get 同步刷新页面
var reloadPage = function(pageNo){
	 var data = {
		 shortName:$("#shortName").val(),
		 startTime:$("#LAY_demorange_s").val(),
         endTime:$("#LAY_demorange_e").val(),
		 remState:"0",
		 pageNo:pageNo,
		 pageSize:$("#paging").attr("data-page-size"),
	 };		
	 window.location.search = "?shortName=" + escape(data.shortName) + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + 
	 	"&remState=" + escape(data.remState)+"&pageNo="+escape(data.pageNo)+"&pageSize="+escape(data.pageSize);
};
//查询
var queryClick = function(){
	$("#paging").attr("data-page-no",1);
	reloadPage($("#paging").attr("data-page-no"));
};
//异步刷新页面
var reloadHtml = function(json) {
	var html = "";
	for(var i = 0; i < json.data.datas.list.length; i++) {
		var productState,btnHtml;
		if(json.data.datas.list[i].product_state == "2") { //销售方式状态码转换
			productState = "已下架";
			btnHtml = '<a href="/operation/opMerMan/showSetRules?productId='+json.data.datas.list[i].id+'" class="layui-btn">查看</a>';
		} else if(json.data.datas.list[i].product_state == "4") {
			productState = "已上架";
			btnHtml = '<a href="javascript:soldOut("'+json.data.datas.list[i].id+'")" class="layui-btn layui-btn-danger">下架</a><a href="/operation/opMerMan/showSetRules" class="layui-btn">查看</a>';
		} else {
			productState = "获取状态失败";
			btnHtml ="";
		};	
		html += '<tr>' +
			'<td>' + json.data.datas.list[i].code + '</td>' +
			'<td>' + json.data.datas.list[i].short_name + '</td>' +
			'<td>' + json.data.datas.list[i].full_name + '</td>' +
			'<td>' + json.data.datas.list[i].product_num + '</td>' +
			'<td>' + json.data.datas.list[i].retail_price + '</td>' +
			'<td>' + json.data.datas.list[i].retail_price*10 + '</td>' +
			'<td>' + productState + '</td><td>' + btnHtml+
			'</td></tr>';
	};
	$("#htmlWrap").empty().append(html);
	//重新设置翻页组件;
	$("#paging").empty();
	var paging = layui.laypage({
		pages: json.data.totalPage, //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: json.data.pageNo, //当前页
		groups: json.data.pageSize, //连续分页数
        jump:function(obj, first){		 
			 if(!first){
				 reloadPage(obj.curr);			 
			 }			 
		},		
	});
	layer.msg('下架成功！', {
		time: 1500, //1.5s后自动关闭
		icon: 1
	});
};