"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	$ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	//选择列表展示状态
	form.on('select(tenantStatus)', function(data){
		if(data.value == '-1'){
			$('.selectStatus').attr('data-stats', '');
		}else{
			$('.selectStatus').attr('data-stats', data.value);
		}
	});
	//选择发货平台状态
	form.on('select(deliver)', function(data){
		$('.selDeliverInt').attr('data-stats', data.value);
	});
	//初始化翻页组件
	var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){		 
			 if(!first){
				jumpPage("pageSize=10&pageNo="+obj.curr+"&status="+$('.selectStatus').attr('data-stats')+"&deliverWay="+$('.selDeliverInt').attr('data-stats'));			 
			 }			 
		}
	});
	//初始化日期组件
	var opt = {
		sMax: getQueryString("createTimeEnd") ? getQueryString("createTimeEnd") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("createTimeStart") ? getQueryString("createTimeStart") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
});
//get 同步刷新页面
var reloadPage = function(pageNo){
	var $status = $('.selectStatus').attr('data-stats');
	if(!$status){
		$status = '';
	}
	 var data = {
	 	 deliverWay:$('.selDeliverInt').attr('data-stats'),
	 	 status:$status,
		 shortName:$("#shortName").val(),				 
		 pageNo:pageNo,
		 pageSize:$("#paging").attr("data-page-size"),
		 createTimeStart:$("#LAY_demorange_s").val(),
		 createTimeEnd:$("#LAY_demorange_e").val(),
	 };	
	 window.location.search = "?createTimeStart=" + escape(data.createTimeStart) +"&createTimeEnd=" +escape(data.createTimeEnd)+ "&shortName=" +
	 				escape(data.shortName) + "&status=" + escape(data.status) + "&deliverWay=" + escape(data.deliverWay) + "&pageNo=" + 
	 				escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
};
//查询
var queryClick = function(){
	$("#paging").attr("data-page-no",1);
	 reloadPage($("#paging").attr("data-page-no"));
};
//商户提交
$('.tenantSubmit').on('click', function (){
	var $this = $(this);
	var $merchantId = $this.attr('data-id');
	var $status = $this.attr('data-status');
	var data = {
		merchantId: $merchantId,
		status: "1"
	};
	layer.confirm('是否确认提交？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		layer.closeAll('dialog');
		$.ajax({	 
			 data:data,
			 dataType:"json",
			 url:"/client/tenantManagement/tenantSubmit",
			 type:"post",
			 beforeSend:beforeSend(),
			 success:function(json){			 		 
				 if(json.message == "成功"){								 
					 layer.msg("提交成功！");	
					 location.reload(true);
				 }else{
					 layer.msg(json.message);	
				 }
			 },
		     error:function(error){
				 console.log(error)
			 }
	    });	
	});
});
//删除商户
var delMerchant = function($elem){
	 layer.confirm('您确定要删除此商户吗？', {
		 btn: ['确认','取消'] //按钮
	 }, function(){			
		 $.ajax({	 
			 data:{id:$elem.attr("data-id")},
			 dataType:"json",
			 url:"/client/tenantManagement/delTenant",
			 type:"post",
			 beforeSend:beforeSend(),
			 success:function(json){			 		 
				 if(json.message == "成功"){								 
					 layer.msg("删除成功！");	
					 location.reload(true);
				 }else{
					 layer.msg(json.message);	
				 }
			 },
		     error:function(error){
				 console.log(error)
			 }
	     });				
	 });
	 	
};
$("[data-do='delMerchant']").click(function(){
	 delMerchant($(this));
});
