"use strict";
//签到任务日志详情
var layLoad;
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	//选择类型
	form.on('select(taskStatus)', function(data){
		$(".selTaskStatus").attr("data-task",data.value);
	})
			
	//初始化日期组件
	var opt = {
		sMax: getQueryString("enDate") ? getQueryString("enDate") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("stDate") ? getQueryString("stDate") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pSize=10&pNo="+obj.curr);
			};
		}
	});	
	
});
//查询
var search = function(pn) {
	if(layLoad){
		layer.closeAll('loading');
	}
	var $taskType = $(".selTaskStatus").attr("data-task")==='0'?'':$(".selTaskStatus").attr("data-task");//任务类型
	var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
	var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
	var pageNo =  $("#paging").attr("data-page-no")
	var $taskPhone = $("#taskPhone").val()||'';
	var pageNo = pn;
	var pageSize = $("#paging").attr("data-page-size");
	window.location.search="?signDay="+escape($taskType)+"&stDate="+escape($starTimes)+"&enDate="+escape($endTimes)+"&userPhone="+
			escape($taskPhone)+"&pNo="+escape(pageNo)+"&pSize="+escape(pageSize);
}
$('#searchBtn').on('click', function (){//查询
	var layLoad = layer.load(2,{
		shade: 0.6
	});//加载等待
	search('1');
});