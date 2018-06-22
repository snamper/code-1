"use strict";
layui.use(['element', 'paging', 'laydate'], function(){
	var $ = layui.jquery;
	
	//初始化日期组件  
	var opt = {
		sMax: getQueryString("registTimeEnd") ? getQueryString("registTimeEnd") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("registTimeStar") ? getQueryString("registTimeStar") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
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

//删除商品包
$('.delGoodsPack').on('click', function (){
	var $this = $(this);
	var $packId = $this.attr('data-id');//获取商品包id
	
});

//应用生效按钮
$('.packUseTake').on('click', function (){
	
});
//删除商品包 & 应用生效按钮 的confirm提示框公用方法
function confirmFns(message,url,id,ajaxType){
	layer.confirm("是否确认要改变用户状态？", {
		btn: ['确认', '取消'] //按钮
	}, function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/appUserControl/appUserMan/allAbled",
			data: {
				"loginStatus":status,
				"ids[]":ids
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg("操作成功！", {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						reloadPage(getQueryString('pageNo')||'1');
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					},function(){
						layer.closeAll('dialog');
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				},function(){
					layer.closeAll('dialog');
				});
			}
		})
	})
}


//单个/批量操作公共方法 （启用/停用）
function getUserStatusFn(status,ids){//status 将执行的状态    ids被执行的用户ID
	layer.confirm("是否确认要改变用户状态？", {
		btn: ['确认', '取消'] //按钮
	}, function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/appUserControl/appUserMan/allAbled",
			data: {
				"loginStatus":status,
				"ids[]":ids
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg("操作成功！", {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						reloadPage(getQueryString('pageNo')||'1');
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					},function(){
						layer.closeAll('dialog');
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				},function(){
					layer.closeAll('dialog');
				});
			}
		})
	})
};
//冻结/解冻
$(".frostRelieveBtn").on("click", function() {
	var $this = $(this);
	var taskId = $this.attr("data-id");
	var status = $this.attr('data-allSta');//状态区分 冻结/解冻
	getUserScoreFn(status,taskId);
});
//批量进行  冻结/解冻
$(".batchSourceStatus").on("click", function() {
	var $this = $(this);
	var allFlag = true;
	var btnStatus = $this.attr('data-btnStatus');//冻结/解冻
	var $allCheck = $('#htmlWrap').find('.layui-form-checked');//当前列表内被选中的标签个数
	if(!$allCheck.length){
		layer.msg('请选择要操作的对象！');
		return false;
	}else{
		var idStr = '';
		for(var i=0;i<$allCheck.length;i++){
			if($allCheck.eq(i).parents('tr').find('.frostRelieveBtn').attr('data-status') == btnStatus){
				idStr += $allCheck.eq(i).parents('tr').find('.tagNames').attr('data-id')+',';
			}else{
				allFlag = false;
			}
		}
		if(!allFlag){
			layer.msg('所选择的用户待操作功能不统一！');
			return false;
		}else{
			idStr = idStr.substring(0,idStr.length-1);
			getUserScoreFn(btnStatus,idStr);
		}
	}
});
//单个/批量操作公共方法 （冻结/解冻）
function getUserScoreFn(status,ids){//status 将执行的状态    ids被执行的用户ID
	layer.confirm("是否确认要改变用户的积分状态？", {
		btn: ['确认', '取消'] //按钮
	}, function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/appUserControl/appUserMan/allFrost",
			data: {
				"scoreStatus":status,
				"userIds[]":ids
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg("操作成功！", {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						reloadPage(getQueryString('pageNo')||'1');
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					},function(){
						layer.closeAll('dialog');
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				},function(){
					layer.closeAll('dialog');
				});
			}
		})
	})
};
//用户列表页搜索按钮
$('#searchBtn').on('click',function (){
	reloadPage('1');
});

//get 同步刷新页面
var reloadPage = function(pageNo){
	var data = {
		telNum:$("#userId").val() || '',
		startTime:$('#LAY_demorange_s').val() || '',
		endTime:$('#LAY_demorange_e').val() || '',
		pageNo:pageNo,
		pageSize:$("#paging").attr("data-page-size")
	};
	var $userRisks = $('.selectStatus').attr('data-type');//账号异常原因的选择
	if($userRisks == '' || $userRisks == '0'){
		data.type = '';
	}else{
		data.type = $userRisks;
	}
	
	window.location.search = "?telNum=" + escape(data.telNum) + "&startTime=" + escape(data.startTime) + "&endTime=" + escape(data.endTime) + 
			"&type=" + escape(data.type) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
};
