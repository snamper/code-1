"use strict";
var layLoad;
layui.use(['element', 'paging'], function(){
	//运营-广告管理
	$ = layui.jquery;
	
});
//验证广告积分设置正则
var regs = /(^[0-9]{1,3})+(.[0-9]{0,2})?$/;//积分占比，1-100以内的保留两位小数
$('#integralA').blur(function (){
	var integralA = $('#integralA').val();
	if(integralA && regs.test(integralA) && Number(integralA) <= 100){
		var strs = integralA.split('');
		var doltStr = strs[strs.length-1];
		if(doltStr == '.'){
			$('.tooltip-integralA').removeClass('hide');
		}else{
			$('.tooltip-integralA').addClass('hide');
		}
		var integralB = $('#integralB').val() || '';
		var grossScale = $('#grossScale').val() || '';
		getSubsidySum();
	}else{
		$('.tooltip-integralA').removeClass('hide');
	}
});
$('#integralB').blur(function (){
	var integralB = $('#integralB').val();
	if(integralB && regs.test(integralB) && Number(integralB) <= 100){
		var strs = integralB.split('');
		var doltStr = strs[strs.length-1];
		if(doltStr == '.'){
			$('.tooltip-integralB').removeClass('hide');
		}else{
			$('.tooltip-integralB').addClass('hide');
		}
		var integralA = $('#integralA').val() || '';
		var grossScale = $('#grossScale').val() || '';
	}else{
		$('.tooltip-integralB').removeClass('hide');
	}
});
$('#grossScale').blur(function (){
	var grossScale = $('#grossScale').val();
	if(grossScale && regs.test(grossScale) && Number(grossScale) <= 100){
		var strs = grossScale.split('');
		var doltStr = strs[strs.length-1];
		if(doltStr == '.'){
			$('.tooltip-grossScale').removeClass('hide');
		}else{
			$('.tooltip-grossScale').addClass('hide');
		}
		var integralB = $('#integralB').val() || '';
		var integralA = $('#integralA').val() || '';
	}else{
		$('.tooltip-grossScale').removeClass('hide');
	}
});
//单次播放奖励验证
$('#playAward').blur(function (){
	var reg = /^[0-9][0-9]{0,8}$/;
	var playAward = $('#playAward').val();
	if(playAward && reg.test(playAward)){
		$('.tooltip-playAward').addClass('hide');
		var targetNum = $('.targetNum').html();//投放目标量
		$('#allIntegralA').val(targetNum*playAward);
		getSubsidySum();
	}else{
		$('.tooltip-playAward').removeClass('hide');
	}
});
//完善平台补偿金额
function getSubsidySum(){//平台补贴A积分系统计算=总计投放A积分-投放金额*A积分
	var throwMoney = $('.throwMoney').html();
	var integralA = $('#integralA').val();
	var allIntegralA = $('#allIntegralA').val();
	if(integralA && allIntegralA){
		$('#subsidySum').val((allIntegralA/100)-(integralA/100*throwMoney));
	}
};

//待设置广告保存
$('#integralPutSave').on('click', function (){
	if(clickVerifys()){//验证是CPC&CPM设置 还是 CPM视频设置
		var data = btnClickAdv();
		if(data.ok){
			layLoad = layer.load(1);//加载等待
			$.ajax({
				method:"post",
				data:data,
				url:"/operation/advManagement/setIntPut",
				dataType:"json",
				success:function(json){
					layer.close(layLoad);//清除加载
					if(json.message == "成功"){
						layer.msg('保存成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						});
						window.location.href="/operation/advManagement/advReferMan";
					}else{
						layer.msg(json.message);
					}
				}
			});
		}
	}
});
//待设置广告直接保存/上架(CPM / CPC),没有下一步的操作
$('#integralUpOneStep').on('click',function (){
	if(clickVerifys()){//验证是CPC&CPM设置 还是 CPM视频设置
		var data = btnClickAdv();
		if(data && data.ok){
			layLoad = layer.load(1);//加载等待
			$.ajax({
				method:"post",
				data:data,
				url:"/operation/advManagement/setIntPut",
				dataType:"json",
				success:function(json){
					layer.close(layLoad);//清除加载
					if(json.message == "成功"){
						layer.msg('保存成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						});
						var $id = getQueryString('id');
						$.ajax({
							method:"post",
							data:{id:$id},
							url:"/operation/advManagement/setAdvNextUp",
							dataType:"json",
							success:function(json){
								if(json.message == "成功"){
									layer.msg('上架成功！', {
										time: 1500, //1s后自动关闭
										icon: 1
									});
									window.location.href="/operation/advManagement/advReferMan";
								}else{
									layer.msg(json.data, {
										time: 1500, //1s后自动关闭
										icon: 2
									});
									return;
								}
							},
							error: function() {
								layer.msg('操作失败！', {
									time: 1500, //1s后自动关闭
									icon: 2
								});
								return;
							}
						});
					}else{
						layer.msg(json.message);
					}
				}
			});
		}
	};
})
//待设置广告下一步
$('#integralPutNext').on('click', function (){
	if(clickVerifys()){//验证是CPC&CPM设置 还是 CPM视频设置
		var data = btnClickAdv();
		if(data && data.ok){
			layLoad = layer.load(1);//加载等待
			$.ajax({
				method:"post",
				data:data,
				url:"/operation/advManagement/setIntPut",
				dataType:"json",
				success:function(json){
					layer.close(layLoad);//清除加载
					if(json.message == "成功"){
						layer.msg('保存成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						});
						$('#setIntegral').addClass('hide');
						$('#setSortNext').removeClass('hide');
					}else{
						layer.msg(json.message);
					}
				}
			});
		}
	};
});
//验证是CPC&CPM设置 还是 CPM视频设置
function clickVerifys(){
	var clickVerifysFn = true;
	if($('#onePlayBonus').length){
		var regs = /^\d+$/;//非负整数
		var $advUserPrice = $('#onePlayBonus').attr('data-advUserPrice');//广告主单价
		var $onePlayBonusVal = $('#onePlayBonus').val();//点击奖励积分值
		if(!regs.test($onePlayBonusVal)){
			$('.tooltip-onePlayBonus').removeClass('hide');
			return false;
		}else{
			if(Number($onePlayBonusVal) <= Number($advUserPrice)*100){
				$('.tooltip-onePlayBonus').addClass('hide');
			}else{
				layer.msg('点击奖励积分不可大于广告主单价换算成的积分！', {
					time: 1500,
					icon: 2
				});
				return false;
			}
		}
	}else{
		var terraceSum = $('#subsidySum').val();
		if(Number(terraceSum) < 0){
			layer.msg('平台补贴金额不能小于0！', {
				time: 1500,
				icon: 2
			});
			return false;
		}
	}
	return clickVerifysFn;
}
//同页面内第二步设置排序页面内的返回上一步按钮
$('#integralSortPre').on('click', function (){
	$('#setIntegral').removeClass('hide');
	$('#setSortNext').addClass('hide');
});
//第二步页面内的输入框事件
$('.sortHomeVal').blur(function (){
	var reg = /^[1-4]*$/;
	var homeTrue = $('.sortHome').find('.layui-form-checkbox').hasClass('layui-form-checked');//首页推荐是否选中
	var $sortHomeVal = $('.sortHomeVal').val();
	if(homeTrue && $sortHomeVal){
		if(reg.test($sortHomeVal) && Number($sortHomeVal) > 0 && Number($sortHomeVal) < 5){
			$('.tooltip-sortHome').addClass('hide');
		}else{
			$('.tooltip-sortHome').removeClass('hide');
		}
	}else{
		$('.tooltip-sortHome').removeClass('hide');
	}
});
$('.sortChannelVal').blur(function (){
	var reg = /^[1-8]*$/;
//	var channelTrue = $('.sortChannel').find('.layui-form-checkbox').hasClass('layui-form-checked');//频道页推荐是否选中
	var $sortChannelVal = $('.sortChannelVal').val();
	if($sortChannelVal && reg.test($sortChannelVal) && Number($sortChannelVal) > 0 && Number($sortChannelVal) < 9){
		$('.tooltip-sortChannel').addClass('hide');
	}
});
//第二步页面内的保存按钮
$('#integralSortSave').on('click', function (){
	nextPageSet('save');
});
//第二步页面内的上架按钮
$('#integralSortUp').on('click', function (){
	nextPageSet('up');
});
//第二步页面内的保存/上架方法
function nextPageSet(type){
//	var layLoad = layer.load(1);//加载等待
	var reg = /^[1-4]*$/;
	var reg1 = /^[1-8]*$/;
	var homeTrue = $('[name="home"]').next(0).hasClass('layui-form-checked') ? true : false; //首页推荐是否选中
//	var channelTrue = $('[name="channel"]').next(0).hasClass('layui-form-checked') ? true : false; //频道页推荐是否选中
	if(homeTrue){
		var $sortHomeVal = $('.sortHomeVal').val()||'';
		if($('.sortHomeVal').val() && reg.test($sortHomeVal) && Number($sortHomeVal) > 0 && Number($sortHomeVal) < 5){
			$('.tooltip-sortHome').addClass('hide');
		}else{
			$('.tooltip-sortHome').removeClass('hide');
			return;
		}
	}
	var $sortChannelVal = $('.sortChannelVal').val()||'';
	if($sortChannelVal && reg1.test($sortChannelVal) && Number($sortChannelVal) > 0 && Number($sortChannelVal) < 9){
		$('.tooltip-sortChannel').addClass('hide');
	}
	var $id = getQueryString('id');
	var data = {
		id:$id,
		showInHomePage:homeTrue,
		homePageSort:$sortHomeVal||'',
		showInChannel:true,
		channelSort:$sortChannelVal||''
	};
	if(data.id){
		$.ajax({
			method:"post",
			data:data,
			url:"/operation/advManagement/setAdvSort",
			dataType:"json",
			success:function(json){
//				console.log(json)
				if(json.message == "成功"){
					if(type == 'save'){
						layer.msg('保存成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						});
						window.location.href="/operation/advManagement/advReferMan";
					}else{
						$.ajax({
							method:"post",
							data:{id:$id},
							url:"/operation/advManagement/setAdvNextUp",
							dataType:"json",
							success:function(json){
								if(json.message == "成功"){
									layer.msg('上架成功！', {
										time: 1500, //1s后自动关闭
										icon: 1
									});
									window.location.href="/operation/advManagement/advReferMan";
								}else{
									layer.msg(json.data, {
										time: 1500, //1s后自动关闭
										icon: 2
									});
									return;
								}
							},
							error: function() {
								layer.msg('操作失败！', {
									time: 1500, //1s后自动关闭
									icon: 2
								});
								return;
							}
						});
					}
				}else{
					layer.msg(json.data, {
						time: 2500, //1s后自动关闭
						icon: 2
					});
					return;
				}
			},
			error: function() {
				layer.msg('本次操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	}else{
		layer.msg('操作有误！', {
			time: 1500, //1s后自动关闭
			icon: 1
		});
	}
};

function btnClickAdv(){//设置保存/下一步时的验证
	var $adId = getQueryString('id');
	if($('#onePlayBonus').length){//CPC&CPM设置
		var data = {ok:'1',adId:$adId,onePlayBonus:$('#onePlayBonus').val()};
		return data;
	}else{
		var $integralA = $('#integralA').val();
		var $integralB = $('#integralB').val();
		var $grossScale = $('#grossScale').val();
		var $playAward = $('#playAward').val();
		var $allIntegralA = $('#allIntegralA').val();
		var $subsidySum = $('#subsidySum').val();
		var $chooseAdv = $('#chooseAdv').attr('data-id') || '';
		
		if($integralA && $integralB && $grossScale && $playAward){
			var data = {
				ok:'1',
				aProportion:$integralA,
				bProportion:$integralB,
				platformProportion:$grossScale,
				onePlayBonus:$playAward,
				aPoint:$allIntegralA,
				platformAmount:$subsidySum,
				recommendAdIdsStr:$chooseAdv,
				adId:$adId
			};
			return data;
		}else{
			if(!$integralA){//验证A积分是否为空
				$('.tooltip-integralA').removeClass('hide');
				return;
			}else{
				$('.tooltip-integralA').addClass('hide');
			}
			if(!$integralB){//验证B积分是否为空
				$('.tooltip-integralB').removeClass('hide');
				return;
			}else{
				$('.tooltip-integralB').addClass('hide');
			}
			if(!$grossScale){//验证平台毛利是否为空
				$('.tooltip-grossScale').removeClass('hide');
				return;
			}else{
				$('.tooltip-grossScale').addClass('hide');
			}
			if(!$playAward){//验证单次播放奖励是否为空
				$('.tooltip-playAward').removeClass('hide');
				return;
			}else{
				$('.tooltip-playAward').addClass('hide');
			}
		}
	}
};

