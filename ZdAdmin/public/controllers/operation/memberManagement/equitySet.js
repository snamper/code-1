"use strict";
layui.use(['element', 'laydate', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var type = 0;
	if($(".exchange_goods").attr("data-type")){
		type = $(".exchange_goods").attr("data-type")
	}
	//选择特价商品兑换
	form.on('radio(exchange)', function(data){
		type = data.value;
		console.log(type)
	})
	//抽奖次数
	var drawNum = $(".drawNumInpt").val(), drawFlag=false;
	if (getQueryString("id") && drawNum != '' ) {
		drawFlag=true;
	}
	$(".drawNumInpt").on("change", function() {
		var reg=/^[0-6]{1}$/
		if( reg.test( $(".drawNumInpt").val() ) ) {
			drawNum = $(".drawNumInpt").val();
			$(".tooltip-draw").html("");
			drawFlag=true;
		}else{
			$(".tooltip-draw").html("抽奖次数不能小于0且不能大于6");
			drawFlag=false
		}
	})
	$(".cutDrawBtn").click(function() {
		if(drawNum > 0) {
			drawNum--;
			$(".drawNumInpt").val(drawNum);
			$(".tooltip-draw").html("")
		}else {
			layer.msg("抽奖次数不能小于0",{
				icon:2,
				times:1000
			})
		}
	})
	$(".addDrawBtn").click(function() {
		if(drawNum < 6) {
			drawNum++;
			$(".drawNumInpt").val(drawNum);
			$(".tooltip-draw").html("")
		}else {
			layer.msg("抽奖次数不能大于6",{
				icon:2,
				times:1000
			})
		}
	})
	
	//保存
	$('.saveMember').on('click', function (){
		var source = $(this).attr("data-source");
		var rank = $(".rank").val(); 
		var rankName = $(".rankName").val(); 	
		var numLimit = $(".numLimit").val();  	
//		var dspNum = $(".dspNum").val();
		var discount = $(".discount").val();
		var growCode = $(".growCode").val()
		var code = $(".code").val()
		
		var message = ""
		
		if(!$(".rank").check().notNull()){
			message = "请输入等级排序"
			$('.tooltip-rank').empty().html(message).show()
			return;
		}else{
			if(!$(".rank").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-rank').empty().html(message).show();
				return;
			}else{	//是数字
				if(!$(".rank").check().integer()){	//不是整数
					message = "只能输入整数"
					$('.tooltip-rank').empty().html(message).show()
					return;
				}else{
					$('.tooltip-rank').hide()
				}
			}
		}
		if($(".rank").val() == 0 && source == "add") {
			layer.msg('等级排序不可为0！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
			return;
		}
		if(!$(".rankName").check().notNull()){
			$('.tooltip-rankName').show()
			return;
		}
		if(!$(".numLimit").check().notNull()){
			message = "请输入平台广告上限"
			$('.tooltip-numLimit').empty().html(message).show()
			return;
		}else{
			if(!$(".numLimit").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-numLimit').empty().html(message).show()
				return;
			}
		}
//		if(!$(".dspNum").check().notNull()){
//			message = "请输入第三方dsp数量"
//			$('.tooltip-dspNum').empty().html(message).show()
//			return;
//		}else{
//			if(!$(".dspNum").check().isNum()){
//				message = "只能输入数字"
//				$('.tooltip-dspNum').empty().html(message).show()
//				return;
//			}
//		}
	
		if(!$(".growCode").check().notNull()){
			message = "请输入所需成长值"
			$('.tooltip-growCode').empty().html(message).show()
			return;
		}else{
			if(!$(".growCode").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-growCode').empty().html(message).show()
				return;
			}
		}
		if(!$(".code").check().notNull()){
			message = "请输入购买积分价格"
			$('.tooltip-code').empty().html(message).show()
			return;
		}else{
			$('.tooltip-code').hide()
			if(!$(".code").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-code').empty().html(message).show()
				return;
			}
		}
		if(!$(".discount").check().notNull()){
			message = "请输入购买折扣"
			$('.tooltip-discount').empty().html(message).show()
			return;
		}else{
			if(!$(".discount").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-discount').empty().html(message).show()
				return;
			}else if(Number($(".discount").val()) < 0 || Number($(".discount").val()) > 100){
				message = "只能输入0-100之间的数"
				$('.tooltip-discount').empty().html(message).show()
				return
			}
		}
		if (!drawFlag){ 
			layer.msg('必填参数未填写或区间值不符合要求！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			if( $(".tooltip-draw").html().length < 1 ) $(".tooltip-draw").html("抽奖次数未填写");
			
			return;
		}
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		var data = {
			"sort": rank,
			"name": rankName,
			"cpmWatchCeil": numLimit,
			"discount":discount,
			"specialProductAuthority":type,
			"growthValue":growCode,
			"integral":code,
			"drawCount": drawNum,
		}
		if($(this).attr("data-id")) data.id = $(this).attr("data-id");
		var url = $(this).attr("data-url");
		$.ajax({
			type: "post",
			dataType: "json",
			url: url,
			data:data,
			beforeSend:beforeSend(),
			success: function(json) {
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
			}
		})
		if(layLoad){
			layer.close(layLoad);//清除加载
		}
		
	});		
	
	//验证
	$('.rank').blur(function(){
		var message = ""
		if(!$(".rank").check().notNull()){
			message = "请输入等级排序"
			$('.tooltip-rank').empty().html(message).show()
		}else{
			$('.tooltip-rank').hide()
			if(!$(".rank").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-rank').empty().html(message).show()
			}else{
				if(!$(".rank").check().integer()){
					message = "只能输入整数"
					$('.tooltip-rank').empty().html(message).show()
				}else{
					$('.tooltip-rank').hide()
				}
				
			}
		}
	});
	$('.rankName').blur(function(){
		if(!$(".rankName").check().notNull()){
			$('.tooltip-rankName').show()
		}else{
			$('.tooltip-rankName').hide()
		}
	});
	$('.numLimit').blur(function(){	//广告上限
		var message = ""
		if(!$(".numLimit").check().notNull()){
			message = "请输入平台广告上限"
			$('.tooltip-numLimit').empty().html(message).show()
		}else{
			$('.tooltip-numLimit').hide()
			if(!$(".numLimit").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-numLimit').empty().html(message).show()
			}else{
				$('.tooltip-numLimit').hide()
			}
		}
	});
	$('.dspNum').blur(function(){	
		var message = ""
		if(!$(".dspNum").check().notNull()){
			message = "请输入第三方dsp数量"
			$('.tooltip-dspNum').empty().html(message).show()
		}else{
			$('.tooltip-dspNum').hide()
			if(!$(".dspNum").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-dspNum').empty().html(message).show()
			}else{
				$('.tooltip-dspNum').hide()
			}
		}
	});
	
	$('.growCode').blur(function(){	
		var message = ""
		if(!$(".growCode").check().notNull()){
			message = "请输入所需成长值"
			$('.tooltip-growCode').empty().html(message).show()
		}else{
			$('.tooltip-growCode').hide()
			if(!$(".growCode").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-growCode').empty().html(message).show()
			}else{
				$('.tooltip-growCode').hide()
			}
		}
	});
	$('.code').blur(function(){	
		var message = ""
		if(!$(".code").check().notNull()){
			message = "请输入购买积分价格"
			$('.tooltip-code').empty().html(message).show()
		}else{
			$('.tooltip-code').hide()
			if(!$(".code").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-code').empty().html(message).show()
			}else{
				$('.tooltip-code').hide()
			}
		}
	});
	$('.discount').blur(function(){	
		var message = ""
		if(!$(".discount").check().notNull()){
			message = "请输入购买折扣"
			$('.tooltip-discount').empty().html(message).show()
		}else{
			$('.tooltip-discount').hide()
			if(!$(".discount").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-discount').empty().html(message).show()
			}else{
				if(Number($(".discount").val()) < 0 || Number($(".discount").val()) > 100){
					message = "只能输入0-100之间的数"
					$('.tooltip-discount').empty().html(message).show()
				}else{
					$('.tooltip-discount').hide()
				}
			}
		}
	});
	
	

});