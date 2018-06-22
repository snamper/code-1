"use strict";
layui.use(['element'], function(){
	//客户管理-商户管理-商户审核
	$ = layui.jquery;
	
	//审核成功事件
	$('#auditPassBtn').on('click', function (){
		var data = {
			merchantId: getQueryString('merchantId'),
			appvStatus: '1'
		};
		layer.confirm('您确定要执行此次操作吗？', {
			btn: ['确认', '取消'] //按钮
		},function (){
			$.ajax({
				method:"post",
				data:data,
				url:"/client/tenantManagement/merchantsAudit",
				dataType:"json",
				success:function(json){
					if(json.message == "成功"){
						layer.msg('操作成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function (){
							window.location.href = '/client/tenantManagement/tenantAuditList';
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
	});
	//审核失败按钮弹窗
	$('#auditFailBtn').on('click', function (){
		layer.open({
		    type: 1,
		    title: '失败原因',
		    skin: 'layui-layer-molv', //加上边框
		    area: ['500px', '372px'], //宽高
		    content: '<div class="failBox">' +
            		'<div class="failText">' +
            			'<textarea class="failTextArea" placeholder="限制300字以内"></textarea>' +
            		'</div>' +
            		'<div class="handelBox">' +
            			'<a href="javascript:;" class="layui-btn" id="affirmBtn" style="margin-right:35px;">提交</a>' +
            			'<a href="javascript:;" class="layui-btn layui-btn-warm layui-layer-close" id="cancelBtn">取消</a>' +
            		'</div>' +
            	'</div>'
		});
	});
	//点击弹窗的提交通过审核按钮
	$("body").delegate('#affirmBtn', 'click', function (){
		var $ression = $("body").find('.failTextArea').val();
		if(!$ression){
			layer.msg('请输入审核失败的原因！', {
				time: 2500, //1s后自动关 闭
				icon: 2
			});
			return false;
		}
		if($ression && !$("body").find('.failTextArea').check().number(1,300)){
			layer.msg('超出限制字数，请重新编辑(300字以内)！', {
				time: 2500, //1s后自动关闭
				icon: 2
			});
			return false;
		}
		var data = {
			merchantId: getQueryString('merchantId'),
			appvStatus: '2',
			ression: $ression
		};
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		},function (){
			$.ajax({
				method:"post",
				data:data,
				url:"/client/tenantManagement/merchantsAudit",
				dataType:"json",
				success:function(json){
					if(json.message == "成功"){
						layer.msg('操作成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function (){
							window.location.href = '/client/tenantManagement/tenantAuditList';
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
	});
});