"use strict";
/*运营管理-优惠券管理-配置渠道优惠券*/
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	
	//选择渠道
	form.on('select(coupGoods)', function(data){
		$('.selCouponsGoods').attr('data-id',data.value);
	});
	
	//选择渠道按钮下的渠道列表数据
	var $selValIdInit = $('.selCouponsGoods').attr('data-id');//页面渲染时已经被选中的渠道id
	if(!getQueryString('couponChannelId')){
		getSelGoodsList($selValIdInit);
	}
	function getSelGoodsList(selValId){//selValId为渲染时被选中的商品的id
		$.ajax({
		    dataType:"json",
		    url:"/admin/coupon/channel/exist/pull.do",
		    type:"get",
		    beforeSend:beforeSend(),
		    success:function(json){
			    if(json.message == "成功"){
			    	var datas = json.data;
			    	var str = '<option value=" " data-id="--" data-name="" data-nature="--">请选择渠道</option>';
			    	if(datas && datas.length){
			    		for(var i=0;i<datas.length;i++){
			    			if(selValId == datas[i].spreadId){
			    				str += '<option selected="selected" value="'+ datas[i].spreadId +'">'+ datas[i].spreadName +'</option>';
			    			}else{
			    				str += '<option value="'+ datas[i].spreadId +'">'+ datas[i].spreadName +'</option>';
			    			}
				    	}
		    			$('.couponsGoodsBox').empty().append(str);
		    			form.render('select');
			    	}
			    }
		    }
		});//ajax
	};
	
});

//选择优惠券按钮下的列表数据
var $selLimitId;
$selLimitId = $('.selCoupsItem').attr('data-val')||'';//页面渲染时已经被选中的优惠券id
getSelLimitList($selLimitId, '');
function getSelLimitList(selValId, name){//selValId为渲染时被选中的优惠券的id集合字符传 name为搜索时候的内容
	$.ajax({
	    dataType:"json",
	    url:"/admin/coupon/base/list.do?pNo=1&pSize=10000000",
	    type:"get",
	    beforeSend:beforeSend(),
	    success:function(json){
		    if(json.message == "成功"){
		    	var datas = json.data.datas;
		    	var str = '';
		    	if(datas && datas.length){
		    		if(selValId){//编辑状态下的修改
		    			var selValIdArr = selValId.split(',');//拿到选中的id字符传转成数组进行匹配
		    			for(var i=0;i<datas.length;i++){
		    				var lisId = datas[i].id;
		    				var lisName = datas[i].name;
		    				var strLis;
		    				for(var j=0;j<selValIdArr.length;j++){
		    					if(selValIdArr[j] == lisId){
				    				strLis = '<li class="coupLis fl activeThis" data-id="'+ lisId +'">'+ lisName +'</li>';
				    				break;
				    			}else{
				    				strLis = '<li class="coupLis fl" data-id="'+ lisId +'">'+ lisName +'</li>';
				    			}
		    				}
		    				str += strLis;
				    	}
		    		}else{//初次设置
		    			for(var i=0;i<datas.length;i++){
			    			str += '<li class="coupLis fl" data-id="'+ datas[i].id +'">'+ datas[i].name +'</li>';
				    	}
		    		}
	    			$('.selCoupsBox').empty().append(str);
	    			$('.handleBtnBox').show();
		    	}else{
		    		$('.selCoupsBox').empty().append('<li class="coupLis noDatasLis">暂无匹配数据</li>');
		    		$('.handleBtnBox').hide();
		    	}
		    	
		    }
	    }
	});//ajax
};
//优惠券下拉列表的点击事件
$('.selCoupsBox').delegate('.coupLis','click',function (){
	var $this = $(this);
	if($this.hasClass("activeThis")){
		$this.removeClass("activeThis");
	}else{
		$this.addClass("activeThis");
	}
});
//优惠券选择输入框的点击事件
$('.selCoupsInp').on('click',function(){
	getSelLimitList($selLimitId, '');
	$('.selCoupsContItem').show();
});
//优惠券选择输入框的搜索事件
$('.selCoupsInp').on('keyup',function(){
	var $this = $(this);
	var $thisVal = $this.val()||'';
	getSelLimitList($selLimitId, $thisVal);
	
});
//优惠券下拉框的取消事件
$('body').on('click',function (e){
	var $e = window.event || e; // 兼容IE7
	var $obj = $($e.srcElement || $e.target);
//	console.log(e.target.className)
	if(e.target.className.indexOf("coupLis") < 0 && e.target.className.indexOf("sureCoups") < 0 && e.target.className.indexOf("selCoupsBox") < 0 && e.target.className.indexOf("handleBtnBox") < 0 && e.target.className.indexOf("selCoupsInp") < 0){
		$('.selCoupsContItem').hide();
	}
});
//优惠券下拉框确定按钮事件
$('.sureCoups').on('click',function (){
	var $coupLis = $('.coupLis');
	var newStrId = '';//存放新选择的优惠券id
	var newStrName = '';//存放新选择的优惠券的名称
	for(var i=0;i<$coupLis.length;i++){
		if($coupLis.eq(i).hasClass('activeThis')){
			newStrId += $coupLis.eq(i).attr('data-id') + ',';
			newStrName += $coupLis.eq(i).html() + ',';
		}
	}
	newStrId = newStrId.substring(0,newStrId.length-1);//去除最后一个逗号
	newStrName = newStrName.substring(0,newStrName.length-1);//去除最后一个逗号
	$selLimitId = newStrId;
	$('.selCoupsItem').attr('data-val',newStrId);
	$('.selCoupsInp').val(newStrName);
	$('.selCoupsContItem').hide();
});

//创建优惠券 点击生成按钮
$('.addCouponsSaveBtns').on('click',function (){
	var datas = getAddBtnDatas();
	if(datas.status){
		var data = datas.data;
		if(!getQueryString('couponChannelId')){
			var $url = "/admin/coupon/channel/add.do?channelId="+data.id+"&couponIds="+data.couponIds+"&allCount="+data.allCount;//初次设置接口
		}else{
			var $url = "/admin/coupon/channel/edit.do?id="+data.id+"&couponIds="+data.couponIds+"&allCount="+data.allCount;//二次编辑接口
		}
		var layLoad = layer.load(1);//加载等待
		$.ajax({
			type: "get",
			dataType: "json",
			url: $url,
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
	}else{
		layer.msg('提交的信息有误', {
			time: 1000, //1s后自动关闭
			icon: 2
		});
		return;
	}
});
//获取点击生成按钮所需要的数据data
function getAddBtnDatas(){
	if($('.selCouponsGoods').attr('data-id')){
		var $coupGoodsId = $('.selCouponsGoods').attr('data-id');//选择的渠道的id
	}else{
		layer.msg('请选择渠道！', {
			time: 1000, //1s后自动关闭
			icon: 2
		})
		return;
	}
	if($('.selCoupsItem').attr('data-val')){
		var $coupLimits = $('.selCoupsItem').attr('data-val');//选择的优惠券  拼接的字符串
	}else{
		layer.msg('请选择额度！', {
			time: 1000, //1s后自动关闭
			icon: 2
		})
		return;
	}
	if(!$('.fillCoupNum').check().noZero($('.fillCoupNum').val()) && Number($('.fillCoupNum').val()) <= 100000000){//选择的优惠券的数量
		$('.tooltip-fillCoupNum').addClass('hide');
		var $fillCoupNum = $('.fillCoupNum').val();
	}else{
		$('.tooltip-fillCoupNum').removeClass('hide');
		return;
	}
	
	var _data = {};
	var data = {
		id: $coupGoodsId,
		couponIds: $coupLimits,
		allCount: $fillCoupNum
	};
	_data.data = data;
	_data.status = true;
	return _data;
}

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

