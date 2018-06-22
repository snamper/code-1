"use strict";
//页面操作DOM集合
var pageDom = {
 	search: $(".queryBtn"),
 	paging: $("#paging")
};
layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var status = 2;
	
	//切换查询状态
	$(".chooseType>li").on("click", function() {
		status = $(this).attr("data-status")
		if(status == 0){
			status = ""
		}
		$("#paging").attr("data-page-no",1)
		$(".chooseType").attr("data-status",status)
		search()
	})
	//查询
	var search = function() {
		status = $(".chooseType").attr("data-status")
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var adverName = $(".adverName").val();
		if(!adverName){
			adverName = ""
		}
		var tAdvertiserName = $(".tAdvertiserName").val();
		if(!tAdvertiserName){
			tAdvertiserName = ""
		}
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?status="+status+"&name="+
			escape(adverName)+"&tAdvertiserName="+escape(tAdvertiserName)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+1+"&pageSize="+escape(pageSize);
	}
	$('.queryAdver').on('click', function (){//订单查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1)
		search()
	});		
	//删除
	$(".deleteAdvert").on("click", function() {
		var advertId = $(this).attr("data-id")
		layer.confirm('您确定要删除该广告吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/advertising/advertManage/deleteAdvert",
				data: {
					"id":advertId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}
				},
				error: function() {
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//提交
	$(".submitAdvert").on("click", function(){
		var advertId = $(this).attr("data-id")
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/advertising/advertManage/submitAdvert",
				data: {
					"id":advertId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('提交成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}else{
						layer.msg(json.message)
					}
				},
				error: function() {
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
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
				if(json.message == "成功") {
					var videoStr = '<video id="uploadVedio" controls>' +
										'<source id="uploadVedioShow" src="' + json.data.mobileVersionUrl + '" type="video/mp4"></source>' +
								'</video>';
					$('.videoBox').html(videoStr);//广告视频地址
					$('.view_title').find('h1').html(json.data.name);//广告标题
					$('.view_time').html(json.data.createTime);
					$('.playNum').html(json.data.timesOfPlay);//播放次数
					if(json.data.recommendAdList.length <= 0){
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
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endDate") ? getQueryString("endDate") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startDate") ? getQueryString("startDate") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first)
				jumpPage("pageSize=10&pageNo="+obj.curr+"&status="+$(".chooseType").attr("data-status"));
		}
			
	});
	
	//当前时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + getMinutes
	            + seperator2 + getSeconds;
	    return currentdate;
	};
});