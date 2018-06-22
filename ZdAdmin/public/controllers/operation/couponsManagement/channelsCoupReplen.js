"use strict";
/*运营管理-优惠券管理-配置渠道优惠券补货*/
layui.use(['element'], function(){
	var $ = layui.jquery;
	
});

//创建优惠券 点击生成按钮
$('.addCouponsSaveBtns').on('click',function (){
	if(!$('.fillCoupNum').check().noZero($('.fillCoupNum').val()) && Number($('.fillCoupNum').val()) <= 100000000){//选择的优惠券的数量
		$('.tooltip-fillCoupNum').addClass('hide');
		var $fillCoupNum = $('.fillCoupNum').val();
	}else{
		$('.tooltip-fillCoupNum').removeClass('hide');
		return;
	}
	var datas = {
		couponChannelId: getQueryString('couponChannelId'),
		addCount: $('.fillCoupNum').val()
	};
	var layLoad = layer.load(1);//加载等待
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/admin/coupon/channel/reAdd.do",
		data: datas,
		beforeSend:beforeSend(),
		success: function(json) {
			layer.close(layLoad);//清除加载
			if(json.message == "成功") {
				layer.msg('操作成功', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function (){
					window.location.href = '/operation/couponsManagement/channelCoupon';
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
			layer.close(layLoad);//清除加载
			layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
	});//ajax
});

//正则验证
//优惠券数量验证 大于等于0的整数
$('.fillCoupNum').blur(function (){
	var $this = $(this);
	var perVal = $this.parents('.fillCouponsNumber').find('.fillCoupNum').val()||'';
	if(!$('.fillCoupNum').check().noZero(perVal)){//符合标准
		$('.tooltip-fillCoupNum').addClass('hide');
	}else{
		$('.tooltip-fillCoupNum').removeClass('hide');
		return;
	}
});

