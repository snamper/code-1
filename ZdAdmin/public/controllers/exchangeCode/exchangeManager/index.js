"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	$ = layui.jquery;
	var form = layui.form(),
		status = "",
		orderStatus = "";
	if($(".orderStatus").attr("data-status")){
		status = $(".orderStatus").attr("data-status");
		if(status == 4) orderStatus = 0;
		else orderStatus = status;
	}
	//初始化日期组件
	var opt = {
		sMax: getQueryString("exchangeStartTime") ? getQueryString("exchangeStartTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("exchangeEndTime") ? getQueryString("exchangeEndTime") : '2017-01-01',//结束日期的最小值
		format:'YYYY-MM-DD hh:mm:ss'
	};
	var dateIint = new dateComponent(opt);
	
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
	$('.queryAdvertiser').on('click', function (){
		searchBackList();
	});
	form.on("select(status)",function(data){
		orderStatus = data.value;
		status = data.value;
//		debugger
	})
	//不同的状态下的查询列表
	function searchBackList(){
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		reloadPage('1');
		layer.close(layLoad);//清除加载
	};
	
	//导出报表
	$(".derivation").on("click", function(){
		var data = {
			orderStatus:orderStatus,
			userPhone:$(".userPhone").val() || '',
			businessName:$(".businessName").val(),
			exchangeStartTime:$('#LAY_demorange_s').val() || '',
			exchangeEndTime:$('#LAY_demorange_e').val() || '',
		}
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/business/platform/swap/list/export.do",
			data:data,
			beforeSend:beforeSend(),
			success: function(json) {
				console.log(json)
				if(json.message == "成功") {
					layer.msg('准备导出！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
							var realData = "data:application/vnd.ms-excel;base64,"+json.data;
							var url = URL.createObjectURL(dataURLtoBlob(realData));
							$('body').find('#downloadFiles').attr('href',url).attr('download', '导出结果.xlsx');
							document.getElementById("downloadFiles").click();
					});
				}else{
					layer.msg(json.message)
				}
			},
			error: function() {
				layer.msg('导出失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			}
		})
	
	})
	
	//get 同步刷新页面
	var reloadPage = function(pageNo){
		 var data = {
			 orderStatus:orderStatus,
			 userPhone:$(".userPhone").val() || '',
			 businessName:$(".businessName").val() || '',
			 startTime:$('#LAY_demorange_s').val() || '',
			 endTime:$('#LAY_demorange_e').val() || '',
			 pageNo:pageNo,
			 pageSize:10,
			 status:orderStatus || ""
		 };		
		 if(status && data.status == 0) data.status = "4";
		 else data.status = status;
//		 debugger
		 window.location.search = "?orderStatus=" + data.orderStatus + "&status="+data.status + '&userPhone=' + escape(data.userPhone) + '&businessName=' + escape(data.businessName) + "&exchangeStartTime=" + escape(data.startTime) + "&exchangeEndTime=" + 
		 escape(data.endTime) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + 10;
	};
});