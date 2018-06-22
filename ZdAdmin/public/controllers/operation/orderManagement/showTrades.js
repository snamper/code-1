"use strict";
layui.use(['element', 'form'], function() {
	//购买商品设置/编辑
	var form = layui.form(),
		layer = layui.layer,
		$ = layui.jquery;	
	
	//切换充值商家的请求
	form.on('radio(scaleFilter)', function(data){
		if(data.value == '1'){//话费
			$('.hfScale').removeClass('hide');
			$('.llScale').addClass('hide');
		}else{//流量
			$('.hfScale').addClass('hide');
			$('.llScale').removeClass('hide');
		}
	});  
	
	if($('.goodsImgShow').find('li').length && $('.goodsImgShow').find('li').length > 3){
		onOffShowImgBtn();
	}else{
		$('.hoverClickBtn').addClass('hide');
	}
	//判断是否显示左右移动的按钮
	function onOffShowImgBtn (){//商品详情图切换按钮
		$('.hoverClickBtn').removeClass('hide');
		var moveNum = 0;
		var $moveOffset = $('.uploadImgItem').width()+20;
		var $liLength = $('.goodsImgShow').find('li').length+1;
		$('.hoverClickBtnRight').on('click', function (){
			moveNum++;
			if(moveNum <= $liLength%4){
				$('.goodsImgShow').css('left',-$moveOffset*moveNum);
			}else if(moveNum > 3){
				moveNum = 3;
			}
		})
		$('.hoverClickBtnLeft').on('click', function (){ 
			moveNum--;
			if(moveNum >= 0){
				$('.goodsImgShow').css('left',-$moveOffset*moveNum);
			}else if(moveNum < 0){
				moveNum = 0;
			}
		})
	};
	//广告查看详情页关闭按钮
	$('.closeCurPage').on('click', function (){
		var $search = window.location.search.length;
		var $href = window.location.href.length;
		var $subStrNum = Number($href) - Number($search);
		var str = window.location.href.substring(0,$subStrNum);
		var useStr = str.substring(str.length-11);
		if(useStr == 'showTrades1'){
			window.location.href = '/operation/opMerMan/ordMan';
		}else if(useStr == 'showTrades2'){
			window.location.href = '/operation/opMerMan/merManRefer';
		}else if(useStr == 'showTrades3'){
			window.location.href = '/operation/opMerMan/upDownList';
		}
	});
	
	//充值类型切换
	$(".selTabItems>li").on("click", function() {
		var payType = $(this).attr("data-payType");
		$(".selTabItems").attr("data-payType",payType);
		if(payType == '1'){
			$('.tariffeItem').removeClass('hide');//话费框
			$('.flowItemM').addClass('hide');//移动流量框
			$('.flowItemU').addClass('hide');//联通流量框
			$('.flowItemC').addClass('hide');//电信流量框
		}else if(payType == '2'){
			$('.tariffeItem').addClass('hide');//话费框
			$('.flowItemM').removeClass('hide');//移动流量框
			$('.flowItemU').addClass('hide');//联通流量框
			$('.flowItemC').addClass('hide');//电信流量框
		}else if(payType == '3'){
			$('.tariffeItem').addClass('hide');//话费框
			$('.flowItemM').addClass('hide');//移动流量框
			$('.flowItemU').removeClass('hide');//联通流量框
			$('.flowItemC').addClass('hide');//电信流量框
		}else{
			$('.tariffeItem').addClass('hide');//话费框
			$('.flowItemM').addClass('hide');//移动流量框
			$('.flowItemU').addClass('hide');//联通流量框
			$('.flowItemC').removeClass('hide');//电信流量框
		}
	});
	
	
	$("body").delegate('.delFlowBtn','click',function (){//流量充值删除一条配置项
		var $this = $(this);
		$this.parents('.flowContentLis').remove();
	});
	
	
	
	
	
});