"use strict";
//运营管理-小游戏管理-大转盘设置
var layLoad;
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
});
//增加列
$(".addColumn").on("click", function(){
	if(Number($(".getProbBox").attr("data-step") >= 10)){
		layer.msg('最多只能增加到10列！', {
			time: 1000, //1s后自动关闭
			icon: 2
		});
		return;
	}
	$.ajax({
		type: "post",
		dataType: "json",
		url: '/admin/game/lottery/base/add.do',
		data:{
			step:Number($(".getProbBox").attr("data-step"))+1
		},
		beforeSend:beforeSend(),
		success: function(json) {
			console.log(json)
			if(json.message == "成功") {
				for(var i = 0; i < $("#bigDialTbody > tr").length; i++){
					var html = '<span class="colContainer" data-step="'+(Number($(".getProbBox").attr("data-step"))+1)+'">-<input class="layui-input probValBlur probVal"  value=""  type="text" /></span>'
					$($("#bigDialTbody > tr")[i]).find(".getProbBox").append(html)
				}
				$(".getProbBox").attr("data-step",Number($(".getProbBox").attr("data-step"))+1)
				if(Number($(".getProbBox").attr("data-step") >= 10)){
					$(".addColumn").removeClass("btn_active").addClass("btn-disabled")
				}
				$(".delColumn").removeClass("btn-disabled").addClass("btn_active")
	
			}else{
				layer.msg(json.message, {
					time: 1500,
					icon: 2
				});
				return;
			}
		},
		error: function() {
			layer.msg('增加失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
	});//ajax
	
})
//删除列
$(".delColumn").on("click", function(){
	if($(".getProbBox").attr("data-step") <= 1) {
		return
	};
	for(var i = 0; i < $("#bigDialTbody > tr").length; i++){
		var colContainer = $($("#bigDialTbody > tr")[i]).find(".colContainer");
		for(var n = 0; n < colContainer.length; n++){
			if($(colContainer[n]).attr("data-step") == $(".getProbBox").attr("data-step")){
				$(colContainer[n]).remove()
			}
		}
	}
	$(".getProbBox").attr("data-step",Number($(".getProbBox").attr("data-step"))-1)
	$(".addColumn").removeClass("btn-disabled").addClass("btn_active")
	if($(".getProbBox").attr("data-step") <= 1) {
		$(".delColumn").removeClass("btn_active").addClass("btn-disabled")
	};
})

//验证条件正则
var lottoReg = /^[0-9]+(.[0-9]{1,3})?$/;//抽奖概率验证条件（0.001-100）保留3位小数
var ticketPointReg = /^(?!00)(?:[0-9]{1,4}|10000)$/;//积分验证条件(1-10000)

//大转盘设置保存
$('.bigDialSetBtn').on('click',function (){
	var $this = $(this);
	var $len = $('#bigDialTbody tr').length;//获取位置的数量
	
	var $touristProbSum = 0;//游客概率之和初始化
	var $touristProbVal = $('.touristProbVal');//游客概率输入框
	var colmunNums = $(".getProbBox").attr("data-step");	//概率有几列
	
	
	for(var n = 0; n < colmunNums; n++){
		var $probSum = 0;//概率之和初始化
		for(var i=0;i<$len;i++){
			var $probVal = $($('.getProbBox')[i]).find(".probVal").eq(n).val();//概率输入框
			console.log($probVal)
			if(lottoReg.test($probVal) && Number($probVal) >= 0 && Number($probVal) <= 100){
				$probSum += Number($probVal*1000);//概率之和
				$($('.getProbBox')[i]).find(".probVal").eq(n).removeClass('bigDialBorder');
			}else{
				$($('.getProbBox')[i]).find(".probVal").eq(n).addClass('bigDialBorder');
				return;
			}
		}
		if(Number($probSum)/1000 != 100){
			layer.msg('概率之和必须等于100%');
			$probVal.addClass('bigDialBorder');
			return;
		}
	}
	for(var i=0;i<$len;i++){
		
		if(lottoReg.test($touristProbVal.eq(i).val()) && Number($touristProbVal.eq(i).val()) >= 0 && Number($touristProbVal.eq(i).val()) <= 100){
			$touristProbSum += Number($touristProbVal.eq(i).val()*1000);//游客概率之和
			$touristProbVal.eq(i).removeClass('bigDialBorder');
		}else{
			$touristProbVal.eq(i).addClass('bigDialBorder');
			return;
		}
	}
	if(Number($touristProbSum)/1000 != 100){
		layer.msg('游客概率之和必须等于100%');
		$touristProbVal.addClass('bigDialBorder');
		return;
	}
	
	var $ticketPointVal = $('.ticketPoint').val();//门票
	if($ticketPointVal && ticketPointReg.test($ticketPointVal) && $ticketPointVal > 0){
		$('.tooltip-tickets').addClass('hide');
	}else{
		$('.tooltip-tickets').removeClass('hide');
		return;
	}
	
	var data = {};
	var dataArr = [];
	var $trs = $('#bigDialTbody tr');
	for(var i=0;i<$len;i++){
		var dataLis = {};//每一条数据对应的值
		dataLis.id = $trs.eq(i).find('.getDataLis').attr('data-id');
		dataLis.type = $trs.eq(i).find('.getDataLis').attr('data-type');
		dataLis.winScore = $trs.eq(i).find('.getDataLis').attr('data-winScore');
		dataLis.winRate = Number($trs.eq(i).find('.probVal').val())*1000;
		dataLis.vistorWinRate = Number($trs.eq(i).find('.touristProbVal').val())*1000;
		
		var winRateList = [];
		for(var n = 0; n < $(".getProbBox").attr("data-step"); n++){
			winRateList.push(Number($($trs[i]).find(".probVal").eq(n).val())*1000)
		}
		dataLis.winRateList = winRateList
		dataArr.push(dataLis);
	}
	
	data.colCount = $(".getProbBox").attr("data-step");
	data.gameLotteryList = dataArr;
	data.ticketScore = $('.ticketPoint').val();//门票值
	
	$.ajax({
		type: "post",
		dataType: "json",
		url: '/admin/game/lottery/list/update.do',
		data:JSON.stringify(data),
		contentType: "application/json",
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('保存成功', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function (){
					window.location.href = '/games/gamesMan';
				});
			}else{
				layer.msg(json.message, {
					time: 1500,
					icon: 2
				});
				return;
			}
		},
		error: function() {
			layer.msg('保存失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
	});//ajax
});

//概率验证
$('.probValBlur').blur(function (){
	var $this = $(this);
	var $val = $this.val();
	if($val && lottoReg.test($val) && $val >= 0 && $val <= 100){
		$this.removeClass('bigDialBorder');
	}else{
		$this.addClass('bigDialBorder');
		return;
	}
});

//门票验证
$('.ticketPoint').blur(function (){
	var $this = $(this);
	var $val = $this.val();
	if($val && ticketPointReg.test($val) && $val > 0){
		$this.parents('.ticketsBox').find('.tooltip-tickets').addClass('hide');
	}else{
		$this.parents('.ticketsBox').find('.tooltip-tickets').removeClass('hide');
	}
});