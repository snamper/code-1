"use strict";
layui.use(['element', 'laydate', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	//保存
	$('.saveCode').on('click', function (){
		
		var loginAcquire = $(".loginAcquire").val(); 
		if(!loginAcquire) loginAcquire = 0
		var readAcquireCode = $(".readAcquireCode").val(); 
		if(!readAcquireCode) readAcquireCode = 0
		var readAcquireNum = $(".readAcquireNum").val()
		if(!readAcquireNum) readAcquireNum = 0
		var codeList = [];
		codeList.push({
			attrEname:'login',
			attrValue:loginAcquire,
			id:$(".loginAcquire").attr("data-id")
		})
		codeList.push({
			attrEname:'readTimes',
			attrValue:readAcquireCode,
			attrLimitTimes:readAcquireNum,
			id:$(".readAcquireCode").attr("data-id")
		})
		for(var n = 0; n < $(".vipRankInfo").length; n++){
			var attrValue = $($(".vipRankInfo")[n]).val()
			if(!attrValue) attrValue = 0
			else attrValue = Number(attrValue)
			
			var message = {
				attrEname:'userlevel',
				attrId:$($(".vipRankInfo")[n]).attr("data-attrId"),
				attrValue:attrValue
			}
			if($($(".vipRankInfo")[n]).attr("data-id")) message.id = $($(".vipRankInfo")[n]).attr("data-id");
			codeList.push(message)
		}
		var data = {
			adProfitFitViewList:codeList
		}
		
		if(!$(".loginAcquire").check().notNull()){
			$('.tooltip-loginAcquire').hide()
		}else{
			if(!$(".loginAcquire").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-loginAcquire').empty().html(message).show()
				return;
			}else{
				if(!$(".loginAcquire").check().integer()){
					message = "只能输入整数"
					$('.tooltip-loginAcquire').empty().html(message).show()
					return;
				}else{
					if(Number($(".loginAcquire").val()) < 0 || Number($(".loginAcquire").val()) > 100){
						message = "只能输入0-100之间的数"
						$('.tooltip-loginAcquire').empty().html(message).show()
						return;
					}
				}
				
				
			}
		}
		
		if(!$(".readAcquireCode").check().notNull()){
			$('.tooltip-readAcquireCode').hide()
		}else{
			if(!$(".readAcquireCode").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-readAcquireCode').empty().html(message).show()
				return;
			}else{
				if(!$(".readAcquireCode").check().integer()){
					message = "只能输入整数"
					$('.tooltip-readAcquireCode').empty().html(message).show()
					return;
				}else{
					if(Number($(".readAcquireCode").val()) < 0 || Number($(".readAcquireCode").val()) > 100){
						message = "只能输入0-100之间的数"
						$('.tooltip-readAcquireCode').empty().html(message).show()
						return;
					}
				}
				
				
			}
		}
		
		if($(".vipRankInfo")){
			if($(".vipRankInfo").length > 0){
				for(var i = 0; i < $(".vipRankInfo").length; i++){
					if($($(".vipRankInfo")[i]).val()){
						if(!$($(".vipRankInfo")[i]).check().isNum()){
							message = "只能输入数字"
							$($(".vipRankInfo")[i]).parent().parent().find('.tooltip-vipRankInfo').empty().html(message).show()
							return;
						}else{
							if(!$($(".vipRankInfo")[i]).check().integer()){
								message = "只能输入整数"
								$($(".vipRankInfo")[i]).parent().parent().find('.tooltip-vipRankInfo').empty().html(message).show()
								return;
							}
							
						}
					}
				}
			}
		}
		if(!computations()) return
		$.ajax({
			type: "post",
			dataType: "json",
			contentType: "application/json",
			url: "/admin/integral/release/save.do",
			data:JSON.stringify(data),
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/pointMan/integralSet"
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
	});		
	//获取会员列表
	var getMemberLsit = function() {
		var memberRankList = $(".memberRankList").attr("data-value"), memberCodeList = ""
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/integral/release/detail.do",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					memberCodeList = json.data;
					console.log(memberCodeList)
					if(memberRankList) memberRankList = JSON.parse(memberRankList);
					else {
						computations()
						return;
					}
					if(!memberCodeList || memberCodeList.length <= 0){
						computations()
						return
					} 
					
					var html = ""
					
					if(!$(".vipRankInfo") || $(".vipRankInfo").length <= 0) {
						computations()
						return;
					}
					for(var n = 0; n < $(".vipRankInfo").length; n++){
						for(var i = 0; i < memberCodeList.length; i++){
							if(memberCodeList[i].attrEname == "userlevel" && memberCodeList[i].attrId == $($(".vipRankInfo")[n]).attr("data-attrid")){
								$($(".vipRankInfo")[n]).val(memberCodeList[i].attrValue)
								$($(".vipRankInfo")[n]).attr("data-id",memberCodeList[i].id)
							}else if(memberCodeList[i].attrEname == "login"){
								$(".loginAcquire").val(memberCodeList[i].attrValue)
								$($(".loginAcquire")[n]).attr("data-id",memberCodeList[i].id)
							}else if(memberCodeList[i].attrEname == "readTimes"){
								$(".readAcquireCode").val(memberCodeList[i].attrValue)
								$($(".readAcquireCode")[n]).attr("data-id",memberCodeList[i].id)
								$(".readAcquireNum").val(memberCodeList[i].attrLimitTimes)
							}
						}
					}
					computations()
					
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
	}
	getMemberLsit()
	//计算发放比例
	var computations = function () {
		var totalCode = 0;
		var loginCode = $('.loginAcquire').val();
		if(!loginCode) loginCode = 0;
		var readCode = $('.readAcquireCode').val();
		if(!readCode) readCode = 0;
		totalCode += Number(loginCode) + Number(readCode);
		if($(".vipRankInfo") && $(".vipRankInfo").length > 0){
			for(var i = 0; i < $(".vipRankInfo").length; i++){
				totalCode += Number($($(".vipRankInfo")[i]).val());
			}
		}
		var message = ""
		if(totalCode > 100){
			message = "当前比例为"+totalCode+"%,已超过100%,请调整比例"
			$(".totalCode").empty().html(message)
			return false;
		}else{
			$(".totalCode").empty().html("已设置发放比例"+totalCode+"%")
			return true;
		}
			
		
	}
	
	//验证
	$('.loginAcquire').blur(function(){	
		var message = ""
		if(!$(".loginAcquire").check().notNull()){
			$('.tooltip-loginAcquire').hide()
			computations()
		}else{
			if(!$(".loginAcquire").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-loginAcquire').empty().html(message).show()
			}else{
				if(!$(".loginAcquire").check().integer()){
					message = "只能输入整数"
					$('.tooltip-loginAcquire').empty().html(message).show()
				}else{
					if(Number($(".loginAcquire").val()) < 0 || Number($(".loginAcquire").val()) > 100){
						message = "只能输入0-100之间的数"
						$('.tooltip-loginAcquire').empty().html(message).show()
					}else{
						$('.tooltip-loginAcquire').hide()
						computations()
					}
				}
				
				
			}
		}
	});
	$('.readAcquireCode').blur(function(){	
		var message = ""
		if(!$(".readAcquireCode").check().notNull()){
			$('.tooltip-readAcquireCode').hide()
			computations()
			
		}else{
			if(!$(".readAcquireCode").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-readAcquireCode').empty().html(message).show()
			}else{
				if(!$(".readAcquireCode").check().integer()){
					message = "只能输入整数"
					$('.tooltip-readAcquireCode').empty().html(message).show()
				}else{
					if(Number($(".readAcquireCode").val()) < 0 || Number($(".readAcquireCode").val()) > 100){
						message = "只能输入0-100之间的数"
						$('.tooltip-readAcquireCode').empty().html(message).show()
					}else{
						$('.tooltip-readAcquireCode').hide()
						computations()
					}
				}
				
				
			}
		}
	});
	$('.readAcquireNum').blur(function(){	
		var message = ""
		if(!$(".readAcquireNum").check().notNull()){
			$('.tooltip-readAcquireCode').hide()
		}else{
			if(!$(".readAcquireNum").check().isNum()){
				message = "只能输入数字"
				$('.tooltip-readAcquireCode').empty().html(message).show()
			}else{
				if(!$(".readAcquireNum").check().integer()){
					message = "只能输入整数"
					$('.tooltip-readAcquireCode').empty().html(message).show()
				}else{
					$('.tooltip-readAcquireCode').hide()
				}
				
				
			}
		}
	});
	$(document).on("blur",".vipRankInfo",function(){
		var message = ""
		var _this = this
		if(!$(_this).check().notNull()){
			$(_this).parent().parent().find('.tooltip-vipRankInfo').hide()
			computations()
		}else{
			
			if(!$(_this).check().isNum()){
				message = "只能输入数字"
				$(_this).parent().parent().find('.tooltip-vipRankInfo').empty().html(message).show()
			}else{
				if(!$(_this).check().integer()){
					message = "只能输入整数"
					$(_this).parent().parent().find('.tooltip-vipRankInfo').empty().html(message).show()
				}else{
					$(_this).parent().parent().find('.tooltip-vipRankInfo').hide()
					computations()
				}
				
			}
		}
	})
	

});