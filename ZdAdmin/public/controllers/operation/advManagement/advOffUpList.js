"use strict";
var layLoad;
layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	
	var $status = '0';//切换的状态
	if(getQueryString("status") && getQueryString("status") != ''){
		$status = getQueryString("status");
	}else{
		$status = '0';
	}
	
	$(".dataActiveUl").attr("data-status",$status);
	
	//切换tab状态后的返回列表
	$(".dataActiveUl>li").on("click", function() {
		$status = $(this).attr("data-status");
		$(".dataActiveUl").attr("data-status",$status);
		reloadPage('1');
	})
	
	//列表首页的查询按钮
	$('#searchBtn').on('click', function (){
		searchBackList();
	});
	
	//不同的状态下的查询列表
	function searchBackList(){
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		var $advShortName = $('#advShortName').val() || ''; //广告名称
		var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
		var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
		$status = $(".dataActiveUl").attr("data-status"); //当前的查询状态
		if($status == '0'){
			$status = '';
		}
		var data = {
			name: $advShortName,
			startTime: $starTimes,
			endTime: $endTimes,
			status: $status,
			pageNo: "1",
			pageSize: getQueryString("pageSize") ? getQueryString("pageSize") : "10"
		};
		layer.close(layLoad);//清除加载
		//ajaxData(data,reloadHtml);
		window.location.search = "?name=" + escape(data.name) + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + 
								"&status=" + escape(data.status) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
	};
	//H5预览
	$('.previewH5Btn').on('click', function (){
		var $this = $(this);
		var $id = $this.attr('data-id');
		var data = {
			"id":$id
		};
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/ad/show/detail.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
//				console.log(json)
				if(json.message == "成功") {
					var videoStr = '<video id="uploadVedio" controls>' +
										'<source id="uploadVedioShow" src="' + json.data.mobileVersionUrl + '" type="video/mp4"></source>' +
								'</video>';
					$('.videoBox').html(videoStr);//广告视频地址
					$('.view_title').find('h1').html(json.data.name);//广告标题
					$('.view_time').html(json.data.createTime);
					$('.playNum').html(json.data.timesOfPlay);//播放次数
					if(json.data.recommendAdList.length){
						var len = json.data.recommendAdList.length;
						var relateStr = '';
						for(var i=0;i<len;i++){
							relateStr += '<li>' +
								'<img src="'+ json.data.recommendAdList[i].adHomepage +'"/>' +
								'<div class="view_list_message">' +
									'<h3>' + json.data.recommendAdList[i].name + '</h3>' +
									'<p>05:30 / 观看领取积分</p>' +
								'</div>' +
							'</li>';
						}
						$('.view_item_box').html(relateStr);
					}
					$('.H5PreviewBox').removeClass('hide');
				}else{
					layer.msg(json.data, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	});
	//关闭预览
	$('.closePreview').on('click',function (){
		$('.H5PreviewBox').addClass('hide');
	});
	
	//上架广告
	$(".toUpFlexPic").on("click", function() {
		var thisadvId = $(this).attr("data-id");
		var data = {
			"id": thisadvId
		};
		layer.confirm('您确定要上架该广告吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			toUpFlexPics(data);
		});
	});
	//下架广告
	$(".toOffFlexPic").on("click", function() {
		var thisFlexId = $(this).attr("data-id");
//		var thisFlexSort = $(this).attr("data-sort");
		var data = {
			"id": thisFlexId
		};
		layer.confirm('您确定要下架该广告吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			toOffFlexPics(data);
		});
	});
	function toUpFlexPics(data){
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/operation/advManagement/setAdvNextUp",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					searchBackList();
				}else{
					layer.msg(json.data, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	};
	function toOffFlexPics(data){
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/operation/advManagement/setAdvOnOff",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == '成功'){
					searchBackList();
				}else{
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	};
	//初始化日期组件
	var dateIint = new dateComponent();
	
	 var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){	
			 if(!first){
				var data = {
					name: getQueryString('name') || '',
					startTime: getQueryString('startTime') || '',
					endTime: getQueryString('endTime') || '',
					status: getQueryString('status') || '',
					pageNo: obj.curr,
					pageSize: getQueryString("pageSize") ? getQueryString("pageSize") : "10"
				};
				layer.close(layLoad);//清除加载
				window.location.search = "?name=" + escape(data.name) + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + 
					"&status=" + escape(data.status) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
			 }			 
		}
	 });
});

//get 同步刷新页面
var reloadPage = function(pageNo){
	var $advShortName = $('#advShortName').val() || ''; //广告名称
	var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
	var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
	var $status = $(".dataActiveUl").attr("data-status"); //当前的查询状态
	if($status == '0'){
		$status = '';
	}
	var data = {
		name: $advShortName,
		startTime: $starTimes,
		endTime: $endTimes,
		status: $status,
		pageNo: pageNo,
		pageSize: getQueryString("pageSize") ? getQueryString("pageSize") : "10"
	};
	window.location.search = "?name=" + escape(data.name) + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + 
		"&status=" + escape(data.status) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
	
};