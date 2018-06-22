"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
//APP用户管理-积分明细列表	
	var $ = layui.jquery;
	var form = layui.form();
	
	form.on('select(descr)', function(data){//用户行为选择
	    //console.log(data.value); //得到被选中的值
		$('.selDescr').attr('data-descr', data.value);
	});
	
	//初始化日期组件
	if(getQueryString("status") == '4'){
		var opt = {
			sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
		};
		var dateIint = new dateComponent(opt);
	}
	var paging = layui.laypage({//分页组件
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){	
			 if(!first){
				jumpPage("pageSize=10&pageNo="+obj.curr);			 
			 }			 
		}
	});
});

//积分明细列表页搜索 按钮
$('#searchBtn').on('click', function (){
	reloadPage('1');
});

//get 同步刷新页面
var reloadPage = function(pageNo){
	var data = {
		status:getQueryString('status'),
		userId:getQueryString('userId'),
		adName:$("#searchName").val() || '',
		pageNo:pageNo,
		pageSize:$("#paging").attr("data-page-size")
	};
	if(getQueryString('status') == '1'){
		var $descr = $('.selDescr').attr('data-descr');
		if($descr == "empty"){
			data.type = '';
		}else{
			data.type = $descr;
		}
	}else{
		data.type = '';
	}
	if(getQueryString('status') == '4'){
		var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
		var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
		data.startTime = $starTimes;
		data.endTime = $endTimes;
	}else{
		data.startTime = '';
		data.endTime = '';
	}
	if(getQueryString('status') == '1' || getQueryString('status') == '3' || getQueryString('status') == '4'){
		var $names = 'adName';//搜索条件里面的名称
	}else{
		var $names = 'productName';//搜索条件里面的名称
	}
	window.location.search = "?userId=" + escape(data.userId) + "&status=" + escape(data.status) + "&"+$names+"=" + escape(data.adName) + "&type=" +  
			escape(data.type) + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + "&pageNo=" + escape(data.pageNo) + 
			"&pageSize=" + escape(data.pageSize);
		
};