"use strict";
/*运营管理-优惠券管理-额度管理*/
layui.use(['element'], function(){
	var $ = layui.jquery;
	
});

//创建优惠券 点击生成按钮
$('.addCouponsSaveBtns').on('click',function (){
	if(!$('.fillCoupNum').check().noZero($('.fillCoupNum').val())){//补录后的优惠券数量符合标准
		$('.tooltip-fillCoupNum').addClass('hide');
		var datas = {couponBaseId: getQueryString('couponBaseId'),addCount: $('.fillCoupNum').val()};
	}else{
		$('.tooltip-fillCoupNum').removeClass('hide');
		return;
	}
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/admin/coupon/base/reAdd.do",
		data: datas,
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('操作成功', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function (){
					window.location.href = '/operation/couponsManagement/couponsMan';
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

