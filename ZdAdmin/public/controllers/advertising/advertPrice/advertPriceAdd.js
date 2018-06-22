"use strict";
layui.use(['element','laydate'], function(){
	var $ = layui.jquery;
	var adProfitChannelList = [];	
	var ifFlag = true;
	var getMessage = function() {
		var layLoad = ""
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/ad/profit/detail.do?id="+$(".layui-form").attr("data-id"),
			beforeSend:function() {
//				layLoad = layer.load(2,{
//					shade: 0.6
//				});//加载等待
			},
			success: function(json) {
//				layer.close(layLoad)
				if(json.message == "成功") {
					console.log(json)
					$("#LAY_demorange_e").val(json.data.input_time);
					if(json.data.input_time){
						$("#LAY_demorange_e").attr("disabled","disabled")
					}
					$(".totalAmount").val(json.data.total_amount)
					if(!$(".amount") || $(".amount").length <= 0 || !json.data.adProfitChannelList || json.data.adProfitChannelList.length <= 0) return;
					adProfitChannelList = json.data.adProfitChannelList;
					console.log(adProfitChannelList)
					for(var i = 0; i < $(".amount").length; i++){
						for(var n = 0; n < json.data.adProfitChannelList.length; n++){
							if($($(".amount")[i]).attr("data-id") == json.data.adProfitChannelList[n].channel_id){
								$($($(".amount")[i])).attr("data-dataId",json.data.adProfitChannelList[n].id)
								if(json.data.adProfitChannelList[n].amount || json.data.adProfitChannelList[n].amount  === 0){
									$($(".amount")[i]).val(json.data.adProfitChannelList[n].amount)
									$($(".amount")[i]).attr("readonly","readonly")
									ifFlag = false
								}
							}
						}
					}
				}else{
					layer.msg(json.message)
				}
				
			},
			error:function(){
//				layer.close(layLoad)
				layer.msg('获取信息失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			}
		})
	}
	if($(".layui-form").attr("data-id")){
		getMessage()
	}
	var getList = function(source) {
		var adProfitChannelList1 = [];
		if(source == "add" || adProfitChannelList.length <= 0){
			for(var i = 0; i < $(".amount").length; i++){
				if($($(".amount")[i]).val()){
					adProfitChannelList1.push({
						channelId:$($(".amount")[i]).attr("data-id"),
						amount:$($(".amount")[i]).val()
					})
				}else{
					adProfitChannelList1.push({
						channelId:$($(".amount")[i]).attr("data-id"),
						amount:""
					})
				}
				if(!$($(".amount")[i]).check().isNum()){
					message = "只能输入数字"
					$($(".amount")[i]).parent().parent().find('.tooltip-amount').empty().html(message).show()
					return;
				}
			}
			return adProfitChannelList1;
		}else{					//录入过得就不能再录入
			for(var i = 0; i < $(".amount").length; i++){
				var flag = false;
				for(var n = 0; n < adProfitChannelList.length; n++){
					if($($(".amount")[i]).attr("data-id") == adProfitChannelList[n].channel_id && adProfitChannelList[n].amount){
							flag = true;
					}
				}
				if(!flag && $($(".amount")[i]).val() && $($(".amount")[i]).val() != 0){
					adProfitChannelList1.push({
						channelId:$($(".amount")[i]).attr("data-id"),
						amount:$($(".amount")[i]).val(),
						id:$($($(".amount")[i])).attr("data-dataId")
					})
				}
				if(!$($(".amount")[i]).check().isNum()){
					message = "只能输入数字"
					$($(".amount")[i]).parent().parent().find('.tooltip-amount').empty().html(message).show()
					return;
				}
			}
//			console.log(adProfitChannelList1)
			return adProfitChannelList1;
		}
	}
	//提交
	$(".submit").on("click", function(){
		var source = $(this).attr("data-source");
		var adProfitChannelList1 = [];
		if(source == "add"){
			var message = {inputTime:$("#LAY_demorange_e").val()}
			adProfitChannelList1 = getList("add")
		}else{
			var message = {inputTime:$("#LAY_demorange_e").val(),id:$(this).attr("data-id")}
			adProfitChannelList1 = getList("edit")
		}
		if(!message.inputTime){
			$(".tooltip-time").show();
			return;
		}
		var inputTime = $("#LAY_demorange_e").val().split("-");
		var inputTime1 = ""
		for(var i = 0; i < inputTime.length; i++){
			inputTime1 += inputTime[i]
		}
		message.inputTime = inputTime1;
		if(!$(".amount") || $(".amount").length <= 0) return;
		if(adProfitChannelList1.length <= 0){
			layer.msg('您没有修改渠道金额！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
		
		message.adProfitChannelList = adProfitChannelList1;
		console.log(message)
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				contentType: "application/json",
				url: "/admin/ad/profit/save.do",
				data: JSON.stringify(message),
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('录入成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href = "/advertising/advertPrice"
						});
					}else{
						layer.msg(json.message)
					}
				},
				error: function() {
					layer.msg('录入失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//计算总金额
	var computations = function() {
		if(!$(".amount") || $(".amount").length <= 0) return;
		var totalAmount = 0;
		for(var i = 0; i < $(".amount").length; i++){
			if($($(".amount")[i]).val()) totalAmount += Number($($(".amount")[i]).val())
		}
		$(".totalAmount").val(totalAmount)
	}
	
	var end = {
		min: '2017-01-01',
		max: laydate.now(),
		istime: true,
		format: 'YYYY-MM-DD',
//		choose: function(datas) {
//			start.max = datas; //结束日选好后，重置开始日的最大日期
//		}
	};
	
	document.getElementById('LAY_demorange_e').onclick = function() {
		end.elem = this
		laydate(end);
		$(".tooltip-time").hide()
	}
	
	
	
	//当前时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + getMinutes
	            + seperator2 + getSeconds;
	    return currentdate;
	};
	
	$(".amount").on("blur", function() {
		var message = ""
		var _this = this
		if(!$(_this).check().notNull()){
			$(_this).parent().parent().find('.tooltip-amount').hide()
//			computations()
		}else{
			if(!$(_this).check().isNum()){
				message = "只能输入数字"
				$(_this).parent().parent().find('.tooltip-amount').empty().html(message).show()
			}else{
				$(_this).parent().parent().find('.tooltip-amount').hide()
				computations()
			}
		}
	})
});