"use strict";
layui.use(['element', 'paging', 'laydate'], function(){
	//客户管理-商户管理-商户待审核管理
	$ = layui.jquery;
	var laydate = layui.laydate;
	//初始化翻页组件
	var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){		 
			if(!first){
				jumpPage("pSize=10&pNo="+obj.curr+"&status="+$(".dataActiveUl").attr("data-status"));				 
			}			 
		}
	});
	//初始化日期组件
	var opt = {
		sMax: getQueryString("enDate") ? getQueryString("enDate") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("stDate") ? getQueryString("stDate") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
});

//切换tab状态后的返回列表
var $initStatus = getQueryString('status')?getQueryString('status'):'1';
$(".dataActiveUl").attr("data-status",$initStatus);
$(".dataActiveUl>li").on("click", function() {
	var $status = $(this).attr("data-status");
	$(".dataActiveUl").attr("data-status",$status);
	reloadPage('1');
});

//列表页查询按钮
$('#searchBtn').on('click', function() { //商户待审核列表条件查询
	reloadPage('1');
});

//get 同步刷新页面
var reloadPage = function(pageNo){
	var data = {
		shortName:$("#shortName").val()||'',				 
		pNo:pageNo,
		pSize:$("#paging").attr("data-page-size"),
		stDate:$("#LAY_demorange_s").val()||'',
		enDate:$("#LAY_demorange_e").val()||'',
		status:$(".dataActiveUl").attr("data-status")
	};	
	window.location.search = "?stDate=" + escape(data.stDate) +"&enDate=" + escape(data.enDate) + "&shortName=" + escape(data.shortName) + "&status=" +
	 	escape(data.status) + "&pNo=" + escape(data.pNo) + "&pSize=" + escape(data.pSize);	
};