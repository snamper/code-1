"use strict";
/*商家运营 模块公用的方法*/
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	
});
//模块的保存按钮
$('.moduleSaveBtn').on('click',function (){
	var $moduleNameVal = $('.moduleName').val();//模块名称
	var $recGoodNumVal = $('.recGoodNum').val();//推荐数量
	var $moduleSortVal = $('.moduleSort').val();//模块排序
	
	if($('.moduleName').check().character(1,8)){ 
		$('.tooltip-moduleName').addClass('hide');
		$('.tooltip-moduleNameNull').addClass('hide');
	}else{
		if(!$moduleNameVal){
			$('.tooltip-moduleName').addClass('hide');
			$('.tooltip-moduleNameNull').removeClass('hide');
			return;
		}else{
			$('.tooltip-moduleNameNull').addClass('hide');
			$('.tooltip-moduleName').removeClass('hide');
			return;
		}
	}
	if(!$('.recGoodNum').check().integer() || Number($recGoodNumVal) <= 0){//排除不是整数的，小于等于0的
		$('.tooltip-recGoodNum').removeClass('hide');
		return;
	}else{
		$('.tooltip-recGoodNum').addClass('hide');
	}
	if(!$('.moduleSort').check().integer() || Number($moduleSortVal) <= 0){
		$('.tooltip-moduleSort').removeClass('hide');
		return;
	}else{
		$('.tooltip-moduleSort').addClass('hide');
	}
	if($('.modStatusBox').find('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){
	 	var $status = '1';
	}else if($('.modStatusBox').find('.layui-form-radio').eq(1).hasClass('layui-form-radioed')){
	 	var $status = '2';
	}
	if($('.chooseSec').attr('selType') == '1'){//模块1
		var $moduleType = 1;
	}else if($('.chooseSec').attr('selType') == '2'){//模块2
		var $moduleType = 2;
	}
	
	var data = {
		"id": $moduleType,
		"moduleName": $moduleNameVal,
		"productCount": $recGoodNumVal,
		"moduleOrder": $moduleSortVal,
		"enabled": $status,
		"moduleType": $moduleType
	}
	$.ajax({
		method:"post",
		data:data,
		url:'/admin/mall/layout/update.do',
		dataType:"json",
		success:function(json){
			if(json.message == "成功"){
				layer.msg('保存成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				});
				if($moduleType == 1){//模块1
					$('.chooseSec').find('li').eq(0).html($moduleNameVal);
				}else if($moduleType == 2){//模块2
					$('.chooseSec').find('li').eq(1).html($moduleNameVal);
					getSecModuleLis($recGoodNumVal);//$recGoodNumVal为商品数量
				}
			}else{
				layer.msg(json.message);
			}
		},
		error:function (){
			layer.msg('保存失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
		}
	})//ajax
});

//应用配置按钮事件
$('.useConfigBtns').on('click',function (){
	if($('.chooseSec').attr('selType') == '2'){//模块2
		var moduleSec = verifyRecList();//返回模块二的列表校验是否成功
		if(!moduleSec){
			return;
		}
	}
	var radioTwoSta = $('.layui-form-radio').eq(1).hasClass('layui-form-radioed');//应用配置前看该模块是否被禁用
	if(radioTwoSta){//如果被禁用则需要提示开启该模块才能应用配置
		layer.msg('禁用状态请改为开启状态！', {
			time: 1000, //1s后自动关闭
			icon: 2
		});
		return;
	}
	$.ajax({
		method:"post",
		data:'',
		url:'/admin/mall/layout/apply.do',
		dataType:"json",
		success:function(json){
			if(json.message == "成功"){
				layer.msg('配置应用成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				});
			}else{
				layer.msg(json.message);
			}
		},
		error:function (){
			layer.msg('配置应用失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
		}
	})//ajax
});

//模块的正则验证
//模块名称验证
$('.moduleName').blur(function (){
	var $moduleNameVal = $(this).val();
	if($('.moduleName').check().character(1,8)){ 
		$('.tooltip-moduleName').addClass('hide');
		$('.tooltip-moduleNameNull').addClass('hide');
	}else{
		if(!$moduleNameVal){
			$('.tooltip-moduleName').addClass('hide');
			$('.tooltip-moduleNameNull').removeClass('hide');
			return;
		}else{
			$('.tooltip-moduleNameNull').addClass('hide');
			$('.tooltip-moduleName').removeClass('hide');
			return;
		}
	}
});
//推荐数量验证
$('.recGoodNum').blur(function (){
	var $val = $(this).val();
	if(!$('.recGoodNum').check().integer() || Number($val) <= 0){//排除不是整数的，小于等于0的
		$('.tooltip-recGoodNum').removeClass('hide');
	}else{
		$('.tooltip-recGoodNum').addClass('hide');
	}
});
//模块排序验证
$('.moduleSort').blur(function (){
	var $val = $(this).val();
	if(!$('.moduleSort').check().integer() || Number($val) <= 0){
		$('.tooltip-moduleSort').removeClass('hide');
	}else{
		$('.tooltip-moduleSort').addClass('hide');
	}
});


