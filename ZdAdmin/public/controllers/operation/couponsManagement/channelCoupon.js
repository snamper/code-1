"use strict";
/*运营管理-优惠券管理-渠道配置优惠券列表*/
layui.use(['element', 'paging', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				 $("#paging").attr("data-page-no",obj.curr);
				 jumpPage("pSize=10&pNo="+obj.curr);
			};
		}
	});	
});

//应用生效按钮事件
$('.useTakeBtn').on('click', function (){
	var $this = $(this);
	commomFnBtns($this)
});

//暂停领取按钮事件
$('.drawOffBtn').on('click', function (){
	var $this = $(this);
	var couponChannelId = $this.attr('data-ChannelId');//获取渠道id
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/admin/coupon/channel/stop.do",
		data: {couponChannelId: couponChannelId},
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('操作成功', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function (){
					window.location.reload();
				});
			}else{
				layer.msg(json.message, {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return;
			}
		},
		error: function() {
			layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
	});//ajax
});

//启动领取按钮事件
$('.drawOnBtn').on('click', function (){
	var $this = $(this);
	commomFnBtns($this)
});
//应用生效&启动领取 方法整合
function commomFnBtns($this){
	var couponChannelId = $this.attr('data-ChannelId');//获取渠道id
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/admin/coupon/channel/apply.do",
		data: {couponChannelId: couponChannelId},
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('操作成功', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function (){
					window.location.reload();
				});
			}else{
				layer.msg(json.message, {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return;
			}
		},
		error: function() {
			layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
	});//ajax
}

//搜索
$('#searchBtn').on('click',function (){
	refreshPage();
});

//按条件刷新页面
var refreshPage = function (){
	var channelName = $('.channelName').val()||'';//优惠券分类
	var pageNo =  '1';
	var pageSize = $("#paging").attr("data-page-size");
	window.location.search="?channelName="+escape(channelName)+"&pNo="+escape(pageNo)+"&pSize="+escape(pageSize);
};
