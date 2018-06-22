"use strict";
layui.use(['element', 'laydate', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var type = 1;
	//选择特价商品兑换
	form.on('radio(exchange)', function(data){
		type = data.value;
		console.log(type)
	})
	
	//保存
	$('.saveGrowSet').on('click', function (){
		
		var loginAcquire = $(".loginAcquire").val(); 
		var buyAcquire = $(".buyAcquire").val(); 	
//		var watchAdAcquire = $(".watchAdAcquire").val()
//		var vipRankInfoViewList = [];
//		if($(".vipRankInfo")){
//			if($(".vipRankInfo").length > 0){
//				for(var i = 0; i < $(".vipRankInfo").length; i++){
//					var message = {
//						"id":$($(".vipRankInfo")[i]).attr("data-id"),
//						"cpmGrowthValueCeil":$($(".vipRankInfo")[i]).val()
//					};
//					vipRankInfoViewList.push(message)
//				}
//			}
//			
//		}
		if(!$(".loginAcquire").check().notNull()){
			message = "请输入登录获得成长值"
			$('.tooltip-loginAcquire').empty().html(message).show()
			return;
		}else{
			if(!$(".loginAcquire").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-loginAcquire').empty().html(message).show();
				return;
			}
		}
		
		if(!$(".buyAcquire").check().notNull()){
			message = "请输入购买获得成长值"
			$('.tooltip-buyAcquire').empty().html(message).show()
			return;
		}else{
			if(!$(".buyAcquire").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-buyAcquire').empty().html(message).show()
				return;
			}
		}
//		if($(".vipRankInfo")){
//			if($(".vipRankInfo").length > 0){
//				for(var i = 0; i < $(".vipRankInfo").length; i++){
//					if(!$($(".vipRankInfo")[i]).val()){
//						var curVipBank = $(".vipRankInfo")[i];
//						$(curVipBank).parent().parent().find(".tooltip-vipRankInfo").show();
//						return;
//					}
//				}
//			}
//		}
		
		
		
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		var data = {
			"loginAcquire": loginAcquire,
			"buyAcquire": buyAcquire,
//			"watchAdAcquire": watchAdAcquire,
//			"vipRankInfoViewList":vipRankInfoViewList
		}
		console.log(data)
		$.ajax({
			type: "post",
			dataType: "json",
			contentType: "application/json",
			url: "/admin/growth/value/setting/config.do",
			data:JSON.stringify(data),
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(layLoad);//清除加载
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/memberManagement";
					});
					
				}else{
					layer.msg(json.message)
				}
			},error: function(){
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
				layer.close(layLoad);//清除加载
			}
		})
		
		
	});		
	
	//验证
	$('.loginAcquire').blur(function(){
		var message = ""
		if(!$(".loginAcquire").check().notNull()){
			message = "请输入登录获得成长值"
			$('.tooltip-loginAcquire').empty().html(message).show()
		}else{
			$('.tooltip-loginAcquire').hide()
			if(!$(".loginAcquire").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-loginAcquire').empty().html(message).show()
			}else{
				$('.tooltip-loginAcquire').hide()
			}
		}
	});
	$('.buyAcquire').blur(function(){	
		var message = ""
		if(!$(".buyAcquire").check().notNull()){
			message = "请输入购买获得成长值"
			$('.tooltip-buyAcquire').empty().html(message).show()
		}else{
			$('.tooltip-buyAcquire').hide()
			if(!$(".buyAcquire").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-buyAcquire').empty().html(message).show()
			}else{
				if(Number($(".buyAcquire").val()) < 0 || Number($(".buyAcquire").val()) > 100){
					message = "只能输入0-100之间的数"
					$('.tooltip-buyAcquire').empty().html(message).show()
				}else{
					$('.tooltip-buyAcquire').hide()
				}
				
			}
		}
	});
	$('.watchAdAcquire').blur(function(){	
		var message = ""
		if(!$(".watchAdAcquire").check().notNull()){
			message = "请输入浏览广告获得成长值"
			$('.tooltip-watchAdAcquire').empty().html(message).show()
		}else{
			$('.tooltip-watchAdAcquire').hide()
			if(!$(".watchAdAcquire").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-watchAdAcquire').empty().html(message).show()
			}else{
				$('.tooltip-watchAdAcquire').hide()
			}
		}
	});
	$(".vipRankInfo").blur(function() {
		var message = ""
		var _this = this
		if(!$(_this).check().notNull()){
			message = "请输入当前等级可获得成长值"
			$(_this).parent().parent().find('.tooltip-vipRankInfo').empty().html(message).show()
		}else{
			if(!$(_this).check().isNum()){
				message = "只能输入数字"
				$(_this).parent().parent().find('.tooltip-vipRankInfo').empty().html(message).show()
			}else{
				$(_this).parent().parent().find('.tooltip-vipRankInfo').hide()
			}
		}
	})
	

});