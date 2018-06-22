"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	var type = "",        //类型
		status = "",		//状态
		scope = ""
	
	//选择类型
	form.on('select(type)', function(data){
		type = data.value;
		if(type == 0) type = ""
		$(".type").attr("data-type",type)
	})
	//选择状态
	form.on('select(status)', function(data){
		status = data.value;
		if(status == 0) status = ""
		$(".status").attr("data-status",status)
	})
	//选择用户范围
	form.on('select(scope)', function(data){
		scope = data.value;
		$(".scope").attr("data-scope",scope)
	})
	$('#searchBtn').on('click', function (){ //查询
		$("#paging").attr("data-page-no",1)
		search()
	});	
	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var pageNo = $("#paging").attr('data-page-no');
		var pageSize = 10;
		status = $(".status").attr("data-status") ? $(".status").attr("data-status") : "";
		scope = $(".scope").attr("data-scope") ? $(".scope").attr("data-scope") : "";
		type = $(".type").attr("data-type") ? $(".type").attr("data-type") : "";
		
		window.location.search="?startTime="+escape($starTimes)+"&status="+status+"&scope="+
			escape(scope)+"&endTime="+escape($endTimes)+"&type="+escape(type)+
			"&pageNo="+escape(pageNo)+"&pageSize="+escape(pageSize);
	}
	//撤回
	$(".widthdraw").on("click", function(){
		var _this = this;
		layer.confirm('您确定要撤回吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/msg/letter/recall.do",
				data:{
					"id":$(_this).attr("data-id"),
					"logid":$(_this).attr("data-logid")
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('撤回成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
						
					}else{
						layer.msg(json.data, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},error: function(){
					layer.msg('撤回失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
	//分页模块Math.ceil		
	var pageNo = $("#paging").attr('data-page-no') ? $("#paging").attr('data-page-no') : "1";
	var pageSize = $("#paging").attr('data-page-size') ? $("#paging").attr('data-page-size') : "10";
	var pages = Math.ceil($("#paging").attr('data-page') / pageSize);
	var paging = layui.laypage({
		pages: pages, //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: pageNo, //当前页
		groups: pageSize, //连续分页数
		jump: function(obj, first) {
			//得到了当前页，用于向服务端请求对应数据
			if(!first) {
				var data = {
				"status":getQueryString("status") || "",
				"scope":getQueryString("scope") || "",
				"type":getQueryString("type") || "",
				"pageNo":getQueryString("pageNo") || 1,
				"pageSize":getQueryString("pageSize") || 10,
				"startTime":getQueryString("startTime") || "",
				"endTime":getQueryString("endTime") || ""
			}
			window.location.search="?status="+data.status+"&scope="+escape(data.scope)+"&type="+
				escape(data.type)+"&startTime="+escape(data.startTime)+"&pageNo="+
				obj.curr+"&pageSize="+escape(data.pageSize)+"&endTime="+escape(data.endTime);
			
			};
		}
	});
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("startTime") ? getQueryString("startTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("endTime") ? getQueryString("endTime") : '2017-01-01',//结束日期的最小值
		format:'YYYY-MM-DD hh:mm:ss'
	};
	var dateIint = new dateComponent(opt);
	
});