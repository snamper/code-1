"use strict";
layui.use(['element', 'form'], function() {
	//风险调整
	var form = layui.form(),
		layer = layui.layer,
		$ = layui.jquery;	
	var flag = true;
	$('.risksNumInpt').blur(function (){//单项高风险输入框调整
		var $this = $(this);
		var $val = $this.val();
		var $dataVal = $this.attr('data-val')||'';//编辑的时候带过来的数据
		var reg = /^([1-9]|10)$/;
		if($val && reg.test($val)){
			$this.attr('data-val',$val);
		}else{
			flag = false;
			layer.msg('请输入1-10的整数！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
			if($dataVal){
				$this.val($dataVal);
			}else{
				$this.val('10');
			}
			return false;
		}
	});
	
	//调整风险度量值（+-）  
	$('.cutRisksBtn').on('click',function (){//+
		var $this = $(this);
		var $intVal = Number($this.parents('.layui-btn-group').find('.risksNumInpt').val());
		if($intVal == 1){
			layer.msg('限制1-10的整数！');
			return false;
		}else{
			$this.parents('.layui-btn-group').find('.risksNumInpt').val($intVal-1);
		}
	});
	$('.addRisksBtn').on('click',function (){//+
		var $this = $(this);
		var $intVal = Number($this.parents('.layui-btn-group').find('.risksNumInpt').val());
		if($intVal == 10){
			layer.msg('限制1-10的整数！');
			return false;
		}else{
			$this.parents('.layui-btn-group').find('.risksNumInpt').val($intVal+1);
		}
	});
	
	//保存设置按钮跳转
	$('.saveMoudelAdjust').on('click',function (){
		if(!flag){
			return false;
		}else{
			var $checked = $('.layuiRisks').find('.layui-form-checked');//被勾选的风险项
			var checkedItem = [];		
			for(var i=0;i<$checked.length;i++){
				var checkedLis = {};
				checkedLis.id = $checked.eq(i).parents('.risksLisItems').find('.risksNames').attr('data-id');
				checkedLis.floor = $checked.eq(i).parents('.risksLisItems').find('.risksNumInpt').val();
				checkedItem.push(checkedLis);
			}
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/risk/factor/top3/config.do",
				data:JSON.stringify(checkedItem),
				contentType : "application/json",
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('保存成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href = "/operation/accountRiskRating/risksMan";
						});
					}else{
						layer.msg(json.message, {
							time: 1000, //1s后自动关闭
							icon: 2
						});
						return false;
					}
				},
				error: function(error) {
					layer.msg('保存失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
					return false;
				}
			});//ajax请求
		}
		
	});
});