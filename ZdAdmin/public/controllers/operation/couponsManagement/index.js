"use strict";
/*运营管理-优惠券管理-额度管理*/
layui.use(['element','paging', 'form'], function(){
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
	
	$('.creatLimitBtn').on('click',function (){
		layer.open({
		    type: 1,
		    title: '优惠券额度配置',
		    skin: 'layui-layer-molv', //加上边框
		    area: ['350px', '180px'], //宽高
		    content: '<div class="limitBox">' +
            		'<div class="limitText">' +
            			'<input type="text" value="" name="limits" class="layui-input limitsVal" lay-verify="text" autocomplete="off" placeholder="请输入优惠券额度" style="width:95%;display:inline-block;">元' +
            		'</div>' +
            		'<div class="handelBox layui-inline">' +
            			'<a href="javascript:;" class="layui-btn saveLimitBtn" style="margin-right:20px;">保存</a>' +
            			'<a href="javascript:;" class="layui-btn layui-btn-warm layui-layer-close cancelBtn">取消</a>' +
            		'</div>' +
            	'</div>'
		});
	});
});

//保存额度配置按钮
$('body').delegate('.saveLimitBtn','click',function (){
	var $this = $(this);
	var limitVal = $this.parents('.limitBox').find('.limitsVal').val()||'';
	if(!$('.limitsVal').check().integer() || Number(limitVal) <= 0){
		layer.msg('请输入大于0的整数！', {
			time: 1000, //1s后自动关闭
			icon: 2
		})
		return;
	}
//	layer.closeAll('dialog');
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/admin/coupon/limit/add.do",
		data: {"rmbValue":limitVal},
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

