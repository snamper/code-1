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
					"adName":getQueryString("adName") || "",
					"advertiserName":getQueryString("advertiserName") || "",
					"pageNo":getQueryString("pageNo") || 1,
					"pageSize":getQueryString("pageSize") || 10,
					"startTime":getQueryString("startTime") || "",
					"endTime":getQueryString("endTime") || ""
				}
				window.location.search="?adName="+
					escape(data.adName)+"&advertiserName="+escape(data.advertiserName)+"&startTime="+escape(data.startTime)+"&pageNo="+
					obj.curr+"&pageSize="+escape(data.pageSize)+"&endTime="+escape(data.endTime);			 
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

//导出报表
$(".derivation").on("click", function(){
	var data = {
		adName:$(".adName").val() || '',
		advertiserName:$(".advertiserName").val() || '',
		startTime:$('#LAY_demorange_s').val() || '',
		endTime:$('#LAY_demorange_e').val() || '',
	}
	$.ajax({
		type: "get",
		dataType: "json",
		url: "/admin/ad/effect/statistics/export.do",
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
		 adName:$(".adName").val() || '',
		 advertiserName:$(".advertiserName").val() || '',
		 startTime:$('#LAY_demorange_s').val() || '',
		 endTime:$('#LAY_demorange_e').val() || '',
		 pageNo:pageNo,
		 pageSize:10
	 };		
	 window.location.search = "?adName=" + escape(data.adName) + '&advertiserName=' + escape(data.advertiserName) + "&startTime=" + escape(data.startTime) + "&endTime=" + 
	 escape(data.endTime) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + 10;
};