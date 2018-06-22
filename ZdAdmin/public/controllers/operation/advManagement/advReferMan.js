"use strict";
layui.use(['element','paging', 'laydate','form'], function(){
	var form = layui.form();
	$ = layui.jquery;
	//初始化日期组件
	var dateIint = new dateComponent();
	
	form.on('select', function(data){
		reloadPage('1');
	});
	
	var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){		 
			if(!first){
				var data = {
				 	 status:getQueryString('status') || '',
					 name:getQueryString('status') || '',
					 startTime:getQueryString('status') || '',
					 endTime:getQueryString('status') || '',
					 showInHomePage:getQueryString('showInHomePage') || '',
					 showInChannel:getQueryString('showInChannel') || '',
					 pageNo:obj.curr,
					 pageSize:$("#paging").attr("data-page-size")
				 };	
				 window.location.search = "?name=" + escape(data.name) + "&status=" + data.status + "&showInHomePage=" + data.showInHomePage + "&showInChannel=" + 
				 	data.showInChannel + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + "&pageNo=" + 
				 	escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
			}			 
		}
	});
});

//列表页查询按钮
$('#searchBtn').on('click', function() { //推荐管理列表条件查询
	reloadPage('1');
});

//切换tab状态后的返回列表
$(".dataActiveUl>li").on("click", function() {
	var $showIn = $(this).attr("data-showin");
	$(".dataActiveUl").attr("data-showin",$showIn);
	reloadPage('1');
});

//修改首页/频道排序
$('.editorAdvSorts').blur(function (){
	var $this = $(this);
	var newSorts = $this.val();
	var oldVal = $this.attr('old-value');
	var $id = $this.attr('data-id');
	var reg = new RegExp("^[1-4]{1}$");
	var reg1 = new RegExp("^[1-8]{1}$");
	var $showIn = $(".dataActiveUl").attr("data-showin");
	if(!newSorts){
		$this.val(oldVal);
		return;
	}else{
		if($showIn == '0' && !reg.test(newSorts)){
			layer.msg("只能设置数字1-4！");
			$this.val(oldVal);
			return;
		}else if($showIn == '1' && !reg1.test(newSorts)){
			layer.msg("只能设置数字1-8！");
			$this.val(oldVal);
			return;
		}
	}
	if($showIn == '0'){
		var data = {
			id:$id,
			showInHomePage:true,
			homePageSort:newSorts
		}
	}else if($showIn == '1'){
		var data = {
			id:$id,
			showInChannel:true,
			channelSort:newSorts
		}
	}
	$.ajax({
		method:"post",
		data:data,
		url:"/operation/advManagement/setAdvSort",
		dataType:"json",
		success:function(json){
			if(json.message == "成功"){
				layer.msg('修改成功！', {
					time: 1500, //1s后自动关闭
					icon: 1
				},function (){
					refreshAdvListSort();
				});
			}else{
				layer.msg(json.message, {
					time: 2500, //1s后自动关闭
					icon: 2
				});
			}
		}
	});
});

//修改排序刷新列表
function refreshAdvListSort (){
	var $showIn = $(".dataActiveUl").attr("data-showin");
	if($showIn == '0'){
		var $showInHomePage = true;
	}else{
		var $showInHomePage = '';
	} 
	if($showIn == '1'){
		var $showInChannel = true;
	}else{
		var $showInChannel = '';
	}
	var data = {
	 	status:getQueryString('status') || '',
		name:getQueryString('name') || '',
		startTime:$('#LAY_demorange_s').val() || '',
		endTime:$('#LAY_demorange_e').val() || '',
		showInHomePage:$showInHomePage,
		showInChannel:$showInChannel,
		pageNo:'1',
		pageSize:$("#paging").attr("data-page-size")
	};	
    window.location.search = "?name=" + escape(data.name) + "&status=" + data.status + "&showInHomePage=" + data.showInHomePage + "&showInChannel=" + 
		data.showInChannel + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + "&pageNo=" + 
		escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
};

//商品类型转换
var getProducType = function(){
	 var IsGoodsTypeVirtual = $("#goodsTypeVirtual").next(0).hasClass("layui-form-checked")?"1":"";
	 return IsGoodsTypeVirtual;
};
//get 同步刷新页面
var reloadPage = function(pageNo){
	var $status;
	if($('.layui-anim-upbit').find('dd').eq(0).hasClass('layui-this')){
		$status = '';
	}else if($('.layui-anim-upbit').find('dd').eq(1).hasClass('layui-this')){
		$status = '7';
	}else{
		$status = '5';
	}
	var $showin = $('.dataActiveUl').attr('data-showin');
	if($showin == '0'){
		var $showInHomePage = true;
	}else{
		var $showInHomePage = '';
	}
	if($showin == '1'){
		var $showInChannel = true;
	}else{
		var $showInChannel = '';
	}
	 var data = {
	 	 status:$status,
		 name:$("#shortName").val() || '',
		 startTime:$('#LAY_demorange_s').val() || '',
		 endTime:$('#LAY_demorange_e').val() || '',
		 showInHomePage:$showInHomePage,
		 showInChannel:$showInChannel,
		 pageNo:pageNo,
		 pageSize:$("#paging").attr("data-page-size")
	 };	
	 window.location.search = "?name=" + escape(data.name) + "&status=" + data.status + "&showInHomePage=" + data.showInHomePage + "&showInChannel=" + 
	 	data.showInChannel + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + "&pageNo=" + 
	 	escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
};