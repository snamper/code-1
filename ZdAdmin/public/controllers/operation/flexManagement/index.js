"use strict";
layui.use(['element', 'paging', 'laydate','form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	
	var $status = '1';//切换的状态
	var statusInit = getQueryString("status")?getQueryString("status"):"1";
	$(".dataActiveUl").attr("data-status",statusInit);
	//切换tab状态后的返回列表
	$(".dataActiveUl>li").on("click", function() {
		$status = $(this).attr("data-status");
		$(".dataActiveUl").attr("data-status",$status);
		reloadPage('1');
	})
	
	//切换轮播图位置查询
	form.on('select(locationType)', function(data){
		$('.selLocationType').attr('data-locationType', data.value);
	});

	$('.getFlexSorts').on('blur',function (e){
		var _this = $(this);//排序号输入框
		var $e = window.event || e; // 兼容IE7
		var $obj = $($e.srcElement || $e.target);
		if(e.target.className.indexOf("toUpFlexPic") > 0){
			var $this = $(this);
			editorListSorts($this,"up");
		}else{
			editorListSorts(_this,"");
		}
	});
	function editorListSorts($this,source){//列表内修改排序号
		var oldSorts = $this.attr('data-old-sort')||'';//排序框上的老数据
		var newSorts = $this.val()||'';//排序框内的序号
		var $dataStatus = $this.attr('data-status');//排序框的status
		var $Id = $this.parents('tr').find('.textLinks').attr('data-id')||'';
		var reg = new RegExp("^[1-5]{1}$");
		if(!newSorts || !reg.test(newSorts)){
			layer.msg('请输入正确的排序号！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			$this.parents('tr').find('.getFlexSorts').val(oldSorts);
			return;
		}
		var data = {
			id:$Id,
			sort:oldSorts,
			status:$dataStatus,
			orderNum:newSorts
		};
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/operation/flexManagement/editorSorts",
			data: data,
			beforeSend:function (){},
			success: function(json) {
				if(json.message == "成功") {
					if(source == "up"){
						$this.parents('tr').find('.toUpFlexPic').click();
					}else{
						reloadPage('1');
					}
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 3
					},function (){
						reloadPage('1');
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				},function (){
					reloadPage('1');
				});
			}
		});//ajax
	}
	
	//删除轮播图
	$(".delFlexPic").on("click", function() {
		var thisFlexId = $(this).attr("data-id")
		
		layer.confirm('您确定要删除该轮播图吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/operation/flexManagement/delFlexPic",
				data: {
					"id":thisFlexId
				},
				beforeSend:beforeSend(),
				success: function(json) {
//					console.log(json)
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							reloadPage('1');
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
	});
	//上架轮播图
	$(".toUpFlexPic").on("click", function() {
		var oldSorts = $(this).parents('tr').find('.getFlexSorts').attr("data-old-sort") || '';//排序框上的老数据
		var newSorts = $(this).parents('tr').find('.getFlexSorts').val();//排序框内的序号
		var $dataStatus = $(this).parents('tr').find('.getFlexSorts').attr('data-status');//排序框的status
		var $Id = $(this).parents('tr').find('.toUpFlexPic').attr('data-id') || $(this).parents('tr').find('.toOffFlexPic').attr('data-id');
	//	var $Id = $('.toUpFlexPic').attr('data-id');
		var reg = new RegExp("^[1-5]{1}$");
		if(!newSorts || !reg.test(newSorts)){
			layer.msg('请输入正确的排序号！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
			$(this).parents('tr').find('.getFlexSorts').val(oldSorts);
			return;
		}
		var data = {
			id:$Id,
			sort:oldSorts,
			status:$dataStatus,
			orderNum:newSorts
		};
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/operation/flexManagement/editorSorts",
			data: data,
			beforeSend:function (){},
			success: function(json) {
				if(json.message == "成功") {
					var datas = {
						"id": $Id,
						"sort": newSorts,
						"status": "2"
					};
					layer.confirm('您确定要上架该轮播图吗？', {
						btn: ['确认', '取消'] //按钮
					}, function() {
						toUpFlexPics(datas);
					});
				}else{
					layer.msg(json.message, {
						time: 2000, //1s后自动关闭
						icon: 3
					},function (){
						reloadPage('1');
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 2000, //1s后自动关闭
					icon: 2
				},function (){
					reloadPage('1');
				});
			}
		});//ajax
		
	});
	$(".toOffFlexPic").on("click", function() {
		var thisFlexId = $(this).attr("data-id");
		var thisFlexSort = $(this).attr("data-sort");
		var data = {
			"id": thisFlexId,
			"sort": thisFlexSort,
			"status": "3"
		};
		layer.confirm('您确定要下架该轮播图吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
		toUpFlexPics(data);
		});
	});
	function toUpFlexPics(data){
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/operation/flexManagement/toUpFlexPic",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					reloadPage('1');
				}else{
					layer.msg(json.message, {
						time: 2000, //1s后自动关闭
						icon: 2
					});
					return;
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 2000, //1s后自动关闭
					icon: 2
				});
				return;
			}
		})
	};
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
				jumpPage("pageSize=10&pageNo="+obj.curr);
			}			 
		}
	});
});
//商品类型转换
var getProducType = function(){
	 var IsGoodsTypeVirtual = $("#goodsTypeVirtual").next(0).hasClass("layui-form-checked")?"1":"";
	 return IsGoodsTypeVirtual;
};
//轮播图查询
$('#searchFlexBtn').on('click', function() { 
	reloadPage('1');
});
//get 同步刷新页面
var reloadPage = function(pageNo){
	var data = {
		name:$("#shortName").val() || '',
		startDate:$('#LAY_demorange_s').val() || '',
		endDate:$('#LAY_demorange_e').val() || '',
		status:$(".dataActiveUl").attr("data-status"),
		locationType:$('.selLocationType').attr('data-locationType'),
		pageNo:pageNo,
		pageSize:$("#paging").attr("data-page-size")
	};		
	window.location.search = "?name=" + escape(data.name) + "&startTime=" + escape(data.startDate) + "&endTime=" + escape(data.endDate) + "&status=" + 
			escape(data.status)+ "&locationType=" + escape(data.locationType) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
};