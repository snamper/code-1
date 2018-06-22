"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	$ = layui.jquery;
	var form = layui.form();
	//初始化日期组件
//	var opt = {
//		sMax: getQueryString("exchangeStartTime") ? getQueryString("exchangeStartTime") : laydate.now(),//开始日期的最大值
//		eMin: getQueryString("exchangeEndTime") ? getQueryString("exchangeEndTime") : '2017-01-01',//结束日期的最小值
////		format:'YYYY-MM-DD hh:mm:ss'
//	};
//	var dateIint = new dateComponent(opt);
	
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first){		 
			if(!first)
				jumpPage("pageSize=10&pageNo="+obj.curr);	 
		}
	});
	
	//列表查询按钮点击
	$('.query').on('click', function (){
		searchBackList();
	});
	
	//不同的状态下的查询列表
	function searchBackList(){
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		reloadPage('1');
		layer.close(layLoad);//清除加载
	};
	
	//应用生效
	$(".apply").on("click", function(){
		
		$.ajax({
			type: "get",
			dataType: "json",
			contentType: "application/json",
			url: "/admin/business/platform/swap/bplatformeffective.do",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					
					layer.msg('配置成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/exchangeCode/platform"
					});
				}else{
					layer.msg(json.message)
				}
				
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
	
	//get 同步刷新页面
	var reloadPage = function(pageNo){
		 var data = {
			 name:$(".name").val() || '',
			 rangeStart:$('#LAY_demorange_s').val() || '',
			 rangeEnd:$('#LAY_demorange_e').val() || '',
			 pageNo:pageNo,
			 pageSize:10
		 };		
		 window.location.search = "?name=" + escape(data.name) + "&rangeStart=" + escape(data.rangeStart) + "&rangeEnd=" + 
		 escape(data.rangeEnd) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + 10;
	};
});