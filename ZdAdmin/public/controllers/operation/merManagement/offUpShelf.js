"use strict";
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
	//fun replace url
	function replaceParamVal(paramName,replaceWith){  
         var oUrl = window.location.href.toString();  
         var re=eval('/('+ paramName+'=)([^&]*)/gi');  
         var nUrl = oUrl.replace(re,paramName+'='+replaceWith);  		 
         window.location = nUrl;  
    }  
	//tab for page nav
	var navLink = function($elem){	
		 var toStatus = $elem.attr("data-status");
		 var isInit = (getQueryString("pageNo")&&getQueryString("pageSize"))?false:true;
		 window.location.search = "?pageNo=1&pageSize=10&status="+toStatus;
//		 if(!isInit){
//			 replaceParamVal("status",toStatus); 
//		 }else{
//			 window.location.search = "?pageNo=1&pageSize=10&status="+toStatus;			 
//		 }
	}
	$(".layui-tab-title").find("li").click(function(){
		 navLink($(this));
	});
	//查询
	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
		var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
		var shortName = $("#shortName").val()||'';		
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		var status = $(".layui-tab-title").find(".layui-this").attr("data-status")||'';
		window.location.search="?startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+ escape(pageNo) +"&pageSize="+escape(pageSize)+"&shortName="+escape(shortName)+"&status="+escape(status);
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1);
		search();
	});		
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			var $starTimes = getQueryString('startTime') || '';//开始时间
			var $endTimes = getQueryString('endTime') || '';//截止时间
			var shortName = getQueryString('shortName') || '';
			var pageSize = $("#paging").attr("data-page-size");
			var status = $(".layui-tab-title").find(".layui-this").attr("data-status")||'';
			if(!first) {
				var layLoad = layer.load(2,{
					shade: 0.6
				});//加载等待
				window.location.search="?startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+escape(obj.curr)+"&pageSize="+
						escape(pageSize)+"&shortName="+escape(shortName)+"&status="+escape(status);
			};
		}
	});	
});
//列表页上架
$('.slavesBtn').on('click', function (){
	var $this = $(this);
	var $merchantId = $this.attr('data-merchant-id');
	var $sord = $this.attr('data-sord') || '';
	var $recId = $this.attr('data-recId');
	var $location = $this.attr('data-location');
	var data = {
		status:"1",
		merchantId:$merchantId,
		sord:$sord,
		id:$recId,
		location:$location
	};
	layer.confirm('是否确定执行上架操作？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		$.ajax({
			 url:"/operation/merManagement/lisUpDown",
		     type:"post",
		     dataType:"json",
		     data:data,      
		     success:function(json){
			     if(json.message == "成功"){ 
	                 layer.msg("上架成功！",{
	                 	time:1500,
	                 	icon:1
	                 },function (){
	                 	location.reload(true);
	                 });
			     }else{  
					 layer.msg(json.message);			
				 }
		     },
	         error:function(error){
			     layer.msg('操作失误！');
		     }
	     });
	});
});
//下架
var undercarriage = function($elem){
	 var data = {
		 merchantId:$elem.attr("data-merchant-id"),
		 sord:$elem.attr("data-sord")||'',
		 status:"2",
		 location:$elem.attr("data-location"),
		 rec_id:$elem.attr("data-recId")
	 };
	 layer.confirm('是否确定执行下架操作？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		layer.closeAll('dialog');
		$.ajax({
			 data:data,
		     dataType:"json",
		     url:"/operation/merManagement/undercarriage",
		     type:"post",
		     beforeSend:beforeSend(),
		     success:function(json){
			     if(json.message == "成功"){ 
	                 layer.msg("下架成功！");				 
				     location.reload(true);
			     }else{  
					 layer.msg(json.message);			
				 }
		     },
	         error:function(error){
			    layer.msg("操作失败！",{
                 	time:1500,
                 	icon:2
                });
		     }
	     });
	});
};
$('[data-active="undercarriage"]').click(function(){
	 undercarriage($(this))
});