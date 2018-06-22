"use strict";
/*运营管理-优惠券管理-额度管理*/
layui.use(['element', 'form', 'laydate'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	
	//选择指定商品券还是通用券
	form.on('radio', function(data){
		window.location.search="?useWay="+escape(data.value);
	});
	//选择优惠券的商品
	form.on('select(coupGoods)', function(data){
		$('.selCouponsGoods').attr('data-id',data.value);
	});
	//选择优惠券的额度
	form.on('select(coupLimit)', function(data){
		$('.selCouponsLimit').attr('data-val',data.value);
	});
	
	//选择商品按钮下的商品列表数据
	var $selValIdInit = $('.selCouponsGoods').attr('data-id');//页面渲染时已经被选中的商品id
	getSelGoodsList($selValIdInit);
	function getSelGoodsList(selValId){//selValId为渲染时被选中的商品的id
		var data = {pNo:1,pSize:10000000,status:4};
		$.ajax({
			data:data,
		    dataType:"json",
		    url:"/operation/opMerMan/upDownLists",
		    type:"post",
		    beforeSend:beforeSend(),
		    success:function(json){
			    if(json.message == "成功"){
			    	var datas = json.data.datas.list;
			    	var str = '<option value=" " data-id="--" data-name="" data-nature="--">请选择商品</option>';
			    	if(datas && datas.length){
			    		for(var i=0;i<datas.length;i++){
			    			if(selValId == datas[i].id){
			    				str += '<option selected="selected" value="'+ datas[i].id +'" data-id="'+ datas[i].id +'">'+ datas[i].full_name +'</option>';
			    			}else{
			    				str += '<option value="'+ datas[i].id +'" data-id="'+ datas[i].id +'">'+ datas[i].full_name +'</option>';
			    			}
				    	}
		    			$('.couponsGoodsBox').empty().append(str);
		    			form.render('select');
			    	}
			    }
		    }
		});//ajax
	};
	
	//选择优惠券额度按钮下的列表数据
	var $selLimitId = $('.selCouponsLimit').attr('data-val');//页面渲染时已经被选中的商品id
	getSelLimitList($selLimitId);
	function getSelLimitList(selValId){//selValId为渲染时被选中的优惠券额度的id
		var data = {pNo:1,pSize:10000000};
		$.ajax({
			data:data,
		    dataType:"json",
		    url:"/admin/coupon/limit/list.do",
		    type:"post",
		    beforeSend:beforeSend(),
		    success:function(json){
			    if(json.message == "成功"){
			    	var datas = json.data.datas;
			    	var str = '<option value=" " data-id="--" data-name="" data-nature="--">请选择额度</option>';
			    	if(datas && datas.length){
			    		for(var i=0;i<datas.length;i++){
			    			if(selValId == datas[i].id){
			    				str += '<option selected="selected" value="'+ datas[i].id +'">'+ datas[i].rmbValue +'</option>';
			    			}else{
			    				str += '<option value="'+ datas[i].id +'">'+ datas[i].rmbValue +'</option>';
			    			}
				    	}
		    			$('.couponsLimitBox').empty().append(str);
		    			form.render('select');
			    	}
			    }
		    }
		});//ajax
	};
	
	//时间日期调用
	getDateNowTimeInit(getQueryString("startTime"));
});

//创建优惠券 点击生成按钮
$('.addCouponsSaveBtns').on('click',function (){
	var datas = getAddBtnDatas();
	if(datas && datas.status){
		if(!getQueryString('couponBaseId')){
			var $url = "/admin/coupon/base/add.do";//初次设置接口
		}else{
			var $url = "/admin/coupon/base/edit.do";//二次编辑接口
		}
		var data = datas.data;
		var layLoad = layer.load(1);//加载等待
		$.ajax({
			type: "post",
			dataType: "json",
			url: $url,
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(layLoad);//清除加载
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
				layer.close(layLoad);//清除加载
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return;
			}
		});//ajax
	}else{
//		layer.msg('提交的信息有误', {
//			time: 1000, //1s后自动关闭
//			icon: 2
//		});
		return;
	}
});
//获取点击生成按钮所需要的数据data
function getAddBtnDatas(){
	var $coupType = $('.getCoupIfy').attr('data-useway');//创建优惠券选择的类型
	if($('.couponsName').check().character(1,60)){//优惠券名称
		$('.tooltip-couponsName').addClass('hide');
		var $coupName = $('.couponsName').val();
	}else{
		$('.tooltip-couponsName').removeClass('hide');
		return;
	}
	if($coupType == 1){
		if($('.selCouponsGoods').attr('data-id')){
			var $coupGoodsId = $('.selCouponsGoods').attr('data-id');//选择的商品的id
		}else{
			layer.msg('请选择商品！', {
				time: 1000, //1s后自动关闭
				icon: 2
			})
			return;
		}
	}
	if($('.selCouponsLimit').attr('data-val')){
		var $coupLimits = $('.selCouponsLimit').attr('data-val');//选择的优惠券的额度
	}else{
		layer.msg('请选择额度！', {
			time: 1000, //1s后自动关闭
			icon: 2
		})
		return;
	}
	if(!$('.fillCoupNum').check().noZero($('.fillCoupNum').val()) && Number($('.fillCoupNum').val()) <= 100000){//选择的优惠券的数量
		$('.tooltip-fillCoupNum').addClass('hide');
		var $fillCoupNum = $('.fillCoupNum').val();
	}else{
		$('.tooltip-fillCoupNum').removeClass('hide');
		return;
	}
	if(!$('.coupPeriod').check().noZero($('.coupPeriod').val())){//选择的优惠券的有效期
		$('.tooltip-coupPeriod').addClass('hide');
		var $coupPer = $('.coupPeriod').val();
	}else{
		$('.tooltip-coupPeriod').removeClass('hide');
		return;
	}
	var $activity_s = $('#LAY_demorange_s').val()||'';//选择活动的开始时间
	var $activity_e = $('#LAY_demorange_e').val()||'';//选择活动的结束时间
	if($activity_s && $activity_e){
		if(Date.parse($activity_e) <= Date.parse($activity_s)){
			layer.msg("活动结束时间必须大于开始时间!", {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			return;
		}
	}else{
		layer.msg('请规范选择活动时间！', {
			time: 1000, //1s后自动关闭
			icon: 2
		});
		return;
	}
	var $coupUse_s = $('.coupUseTime_s').html()||'';//选择优惠券使用开始时间
	var $coupUse_e = $('.coupUseTime_e').html()||'';//选择优惠券使用结束时间
	if(!IsDate($coupUse_s) || !IsDate($coupUse_e)){//说明使用时间符合标准
		layer.msg('请规范选择活动时间！', {
			time: 1000, //1s后自动关闭
			icon: 2
		});
		return;
	}
	
	var _data = {};
	var data = {
		couponType: $coupType,
		name: $coupName,
		limitId: $coupLimits,
		allCount: $fillCoupNum,
		useDays: $coupPer,
		eventDateStart: $activity_s,
		eventDateEnd: $activity_e
	};
	if($coupType == 1){//是选择的指定商品券
		data.productId = $coupGoodsId;
	}
	if(getQueryString('couponBaseId')){//二次编辑接口需要传id
		data.id = getQueryString('couponBaseId');//初次设置接口
	}
	_data.data = data;
	_data.status = true;
	return _data;
}

//起始日期方法2(未封装版)最小时间为当前时间含时分秒
function getDateNowTimeInit(st){//st开始时间 
	//活动时间选择
	var dateStartEnd = st ? st : getNowFormatDate();
	var dateEnd = '2100-12-31 00:00:00';
	$("#LAY_demorange_s").blur(function() {
		if($(this)[0].value){
			dateStartEnd = $(this)[0].value;
			var _this = this;
			setTimeout(function(){
				$('.coupUseTime_s').html($(_this)[0].value);
			},350);
//			$('.coupUseTime_s').html(dateStartEnd);//将开始时间赋值给指定的元素
			//动态获取优惠券使用截止时间
			if($('#LAY_demorange_e').val() && $('.coupPeriod').val()){//优惠券使用的结束时间=活动的开始到活动结束的时间+使用有效期的时间 （毫秒）
				var times_e = Date.parse(new Date($('#LAY_demorange_e').val()));//活动结束时间
				var times_a = Number($('.coupPeriod').val())*24*60*60*1000;//有效期
				var newTimes = Number(times_e) + Number(times_a);
				$('.coupUseTime_e').html(timestampToTime(newTimes));//将综合时间赋值给优惠券使用的结束时间
			}
		}else{//时间输入框失焦的时候如果为空，那么就清空优惠券的使用结束时间
			$('.coupUseTime_s').html('');
			$('.coupUseTime_e').html('');
		}
	})
	$("#LAY_demorange_e").blur(function() {
		if($(this)[0].value){
//			dateEnd = $(this)[0].value;
			var _this = this;
			setTimeout(function(){
				dateEnd = $(_this)[0].value;
				//动态获取优惠券使用截止时间
				if($('#LAY_demorange_s').val() && $('.coupPeriod').val()){//优惠券使用的结束时间=活动的开始到活动结束的时间+使用有效期的时间 （毫秒）
					var times_e = Date.parse(new Date(dateEnd));//活动结束时间
					var times_a = Number($('.coupPeriod').val())*24*60*60*1000;//有效期
					var newTimes = Number(times_e) + Number(times_a);
					$('.coupUseTime_e').html(timestampToTime(newTimes));//将综合时间赋值给优惠券使用的结束时间
				}
			},350);
			
		}else{//时间输入框失焦的时候如果为空，那么就清空优惠券的使用结束时间
			$('.coupUseTime_e').html('');
		}
	})
	var start = {
		min: dateStartEnd,
		max: dateEnd,
		istime: true,
		istoday: false, 
		format: 'YYYY-MM-DD hh:mm:ss',
		choose: function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
			$('.coupUseTime_s').html(datas);//将开始时间赋值给指定的元素
			//动态获取优惠券使用截止时间
			if($('#LAY_demorange_e').val() && $('.coupPeriod').val()){//优惠券使用的结束时间=活动的开始到活动结束的时间+使用有效期的时间 （毫秒）
				var times_e = Date.parse(new Date($('#LAY_demorange_e').val()));//活动结束时间
				var times_a = Number($('.coupPeriod').val())*24*60*60*1000;//有效期
				var newTimes = Number(times_e) + Number(times_a);
				
				$('.coupUseTime_e').html(timestampToTime(newTimes));//将综合时间赋值给优惠券使用的结束时间
			}
		}
	};
	var end = {
		min: dateStartEnd,
		max: dateEnd,
		istime: true,
		istoday: false, 
		format: 'YYYY-MM-DD hh:mm:ss',
		choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
			//动态获取优惠券使用截止时间
			if($('#LAY_demorange_s').val() && $('.coupPeriod').val()){//优惠券使用的结束时间=活动的开始到活动结束的时间+使用有效期的时间 （毫秒）
				var times_e = Date.parse(new Date(datas));//活动结束时间
				var times_a = Number($('.coupPeriod').val())*24*60*60*1000;//有效期
				var newTimes = Number(times_e) + Number(times_a);
				$('.coupUseTime_e').html(timestampToTime(newTimes));//将综合时间赋值给优惠券使用的结束时间
			}
		}
	};
	document.getElementById('LAY_demorange_s').onclick = function() {
		start.elem = this;
		laydate(start);
	}
	document.getElementById('LAY_demorange_e').onclick = function() {
		end.elem = this;
		laydate(end);
		
	}
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate()+ ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
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

//正则验证时间插件不符合规则的
function IsDate(val){
	var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
	var regExp = new RegExp(reg);
	if(!regExp.test(val)){
	　　return false;
	}else{
		return true;
	};
}

//正则验证
//优惠券名称验证 30个汉字以内
$('.couponsName').blur(function (){
	if($('.couponsName').check().character(1,60)){
		$('.tooltip-couponsName').addClass('hide');
	}else{
		$('.tooltip-couponsName').removeClass('hide');
		return;
	}
});
//有效期验证  大于0的整数
$('.coupPeriod').blur(function (){
	var $this = $(this);
	var perVal = $this.parents('.couponsPeriod').find('.coupPeriod').val()||'';
	if(!$('.coupPeriod').check().noZero(perVal)){
		$('.tooltip-coupPeriod').addClass('hide');
		if($('#LAY_demorange_s').val() && $('.coupPeriod').val()){//优惠券使用的结束时间=活动的开始到活动结束的时间+使用有效期的时间
			var times_a = Number(perVal)*24*60*60*1000;
			if($('#LAY_demorange_e').val()){
				var times_e = Date.parse(new Date($('#LAY_demorange_e').val()));
				var newTimes = Number(times_e) + Number(times_a);
				$('.coupUseTime_e').html(timestampToTime(newTimes));//将综合时间赋值给优惠券使用的结束时间
			}
		}
	}else{
		$('.tooltip-coupPeriod').removeClass('hide');
		return;
	}
});
//优惠券数量验证 1-100000
$('.fillCoupNum').blur(function (){
	var $this = $(this);
	var perVal = $this.parents('.fillCouponsNumber').find('.fillCoupNum').val()||'';
	if(!$('.fillCoupNum').check().noZero(perVal) && Number(perVal) <= 100000){//符合标准
		$('.tooltip-fillCoupNum').addClass('hide');
	}else{
		$('.tooltip-fillCoupNum').removeClass('hide');
		return;
	}
});

