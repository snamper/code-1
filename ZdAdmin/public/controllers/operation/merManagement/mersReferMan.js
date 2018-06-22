"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var laydate = layui.laydate;
	
	//初始化日期组件
	if($('.layui-form').eq(0).hasClass('dataPlug')){//判断数据是否请求成功
		var opt = {
			sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
		};
		var dateIint = new dateComponent(opt);
	}
	
	 var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){		 
			 if(!first){
			 	var data = {
					 shortName:getQueryString('shortName') || '',
					 startTime:getQueryString('startTime') || '',
			         endTime:getQueryString('endTime') || '',
					 remState:"1",
					 location:$(".layui-tab-title").find(".layui-this").attr("data-location"),
					 pageNo:obj.curr,
					 pageSize:$("#paging").attr("data-page-size"),
				 };		
				 window.location.search = "?shortName=" + escape(data.shortName) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + 
				 escape(data.pageSize) + "&location=" + escape(data.location)+"&endTime="+escape(data.endTime)+"&startTime="+escape(data.startTime);
			 }			 
		}
	 });
});
var layLoad;
//加载首页已经被推荐的数据
var selTenantArr = ['0','0','0','0','0','0','0','0'];//存放首页已经推荐的商户
if(getQueryString("location") == 2){
	$.ajax({
		data:{"location":"2","pageNo":1,"pageSize":10},
	    dataType:"json",
	    url:"/operation/merManagement/mersReferManPos",
	    type:"post",
	    beforeSend:beforeSend(),
	    success: function (json){
		    if(json.message == "成功"){
		    	var datas = json.data.datas.list;
		    	if(datas && datas.length){
		    		for(var i=0;i<datas.length;i++){
		    			var $eq = datas[i].sord;
		    			selTenantArr[$eq-1] = datas[i].id;
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).html(datas[i].short_name);
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).attr('data-id',datas[i].id);
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).attr('data-recId',datas[i].recId);
			    		$('#htmlWrap').find('.posShortName').eq($eq-1).attr('data-name',datas[i].short_name);
			    		$('#htmlWrap').find('.posLogoImg').eq($eq-1).empty().append('<img src="' + datas[i].logo + '" style="width: 110px;height: 80px;" alt="" />');
			    		$('#htmlWrap').find('.posCreatTime').eq($eq-1).html(datas[i].create_time);
			    		$('#htmlWrap').find('.getGoodsName').eq($eq-1).val(datas[i].short_name);
			    	}
		    	}
		    	$('#htmlWrap').find('.rowTr').removeClass('hide');
		    	getSelGoodsList('init','','');
		    }
	    }
	 });//ajax
};

//首页推荐位置选择框点击
$('.getGoodsName').on('click',function (){
	$('.selContBox').find('.goodsItems').hide();
	var $this = $(this);
	$this.parents('.selContBox').find('.goodsItems').show();
})
//下拉框的取消事件
$('body').on('click',function (e){
	var $e = window.event || e; // 兼容IE7
	var $obj = $($e.srcElement || $e.target);
	if(e.target.className != "goodsItems" && e.target.className.indexOf("getGoodsName") < 0){
		$('.goodsItems').hide();
	}
})
//下拉列表的点击事件
$('body').delegate('.selGoodsBox li','click',function (){
//	var layLoad = layer.load(2,{shade: 0.6});//加载等待
	var $this = $(this);
	//被选择的商户的信息
	var $dataName = $this.attr('data-name');//商户名称
	var $dataLogo = $this.attr('data-img')||'';//商户图
	var $dataTime = $this.attr('data-time')||'--';//提交时间
	var $dataId = $this.attr('data-id');//商户ID
	//当前位置上的商户信息
	var $sord = $this.parents('tr').find('.posSord').html();
	var $posShortName = $this.parents('tr').find('.posShortName').html()||'';
	var $posShortNameRecId = $this.parents('tr').find('.posShortName').attr('data-recId')||'';
	var $posShortNameid = $this.parents('tr').find('.posShortName').attr('data-id')||'';
	//选择商户推荐到首页
	if($this.html() == '请选择商户' && $posShortName == '--'){
		if(layLoad){
			layer.close(layLoad);
		}
		layer.msg('请勿重复操作！');
		return false;
	}else if($dataId == $posShortNameid){
		if(layLoad){
			layer.close(layLoad);
		}
		layer.msg('请勿重复操作！');
		return false;
	}else if($posShortName != '--' && $dataName == ''){//恢复默认
		var data = {
			merchantId:$posShortNameid,
			sord:$sord,
			status:0,
			recId:$posShortNameRecId
		};
		var param = {'$recId':$posShortNameRecId,'$dataName':$dataName,'$dataId':$posShortNameid,'$dataLogo':$dataLogo,'$dataTime':$dataTime};//需要传入的参数变量
		replaceSet($this,data,param);
	}else{
		var data = {merchantId:$dataId,sord:$sord,status:1,recId:$posShortNameRecId};
		var param = {'$recId':$posShortNameRecId,'$dataName':$dataName,'$dataId':$posShortNameid,'$dataLogo':$dataLogo,'$dataTime':$dataTime};//需要传入的参数变量
		var hasPosItems = $('#htmlWrap').find('tr');
		var flag = true;
		for(var i=0;i<hasPosItems.length;i++){//查看同一商品是否在不同位置设置(重复设置)
			var _dataId = hasPosItems.eq(i).find('.posShortName').attr('data-id');
			if(_dataId == $dataId){
				flag = false;
				layer.confirm('当前商品已在首页展示，是否确认覆盖？', {
					btn: ['确认', '取消'] //按钮
				}, function() {
					var layLoad = layer.load(2,{
						shade: 0.7
					});//加载等待
					replaceSet($this,data,param);
					layer.closeAll('dialog');
//					reloadPage('1');
				});//同一商户在不同位置设置时的强提示
			}
		}
		if(flag) replaceSet($this,data,param);
	}
})
//
function replaceSet($this,data,param){//param 函数内需要的变量参数集合
	$.ajax({
		data:data,
	    dataType:"json",
	    url:"/operation/merManagement/referralHome",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
		    if(json.message == "成功"){
		    	$this.parents('.rowTr').find('.posShortName').html(param.$dataName);
		    	$this.parents('.rowTr').find('.posShortName').attr('data-id',param.$dataId);
				if($this.parents('.rowTr').find('.posLogoImg').find('img').length){
					if(param.$sord == 0){
						$this.parents('.rowTr').find('.posLogoImg').html('');
					}else{
						if(param.$dataLogo && param.$dataLogo != '--'){
							$this.parents('.rowTr').find('.posLogoImg').find('img').attr('src',param.$dataLogo);
						}else{
							$this.parents('.rowTr').find('.posLogoImg').html('');
						}
					}
				}else{
					$this.parents('.rowTr').find('.posLogoImg').html('<img src="'+ param.$dataLogo +'" style="width: 110px;height: 80px;" alt="" />');
				}
				$this.parents('.rowTr').find('.posCreatTime').html(param.$dataTime);
				$this.parents('.rowTr').find('.getGoodsName').val(param.$dataName);
				reloadPage('1');
		    }else{
		    	layer.msg(json.message);
			    return false;
		    }
		    $this.parents('.rowTr').find('.goodsItems').addClass('hide');
	    },
	    error:function (){
	    	layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
	    }
	});//ajax
};

//获取展示位首页列表里 设置商品按钮下的数据
$('body').delegate('#htmlWrap .getGoodsName','keyup',function (){//首页选择输入框搜索事件
	var $this = $(this);
	var thisVal = $this.val()||'';
	getSelGoodsList('search',thisVal,$this);
});
function getSelGoodsList(type,name,$this){//type为渲染方式：init为初始渲染，search为搜索渲染,name为搜索的内容,$this为搜索时操作的节点
	if(type == 'search'){
		var data = {shortName:name,pageNo:1,pageSize:10000000,location:1};
	}else{
		var data = {pageNo:1,pageSize:10000000,location:1};
	}
	$.ajax({
		data:data,
	    dataType:"json",
	    url:"/admin/merchant/sort/list.do",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
    		if(layLoad){
    			layer.close(layLoad);
    		}
		    if(json.message == "成功"){
		    	var datas = json.data.datas.list;
		    	if(datas && datas.length){
		    		var str = '<li value="0" data-id="--" data-name="" data-img="--" data-time="--">请选择商户</li>';
		    		for(var j=0;j<selTenantArr.length;j++){
		    			for(var i=0;i<datas.length;i++){
			    			if(selTenantArr[j] == datas[i].id){
			    				str += '<li selected="selected" value="'+ (i+1) +'" data-id="'+ datas[i].id +'" data-name="'+ datas[i].short_name +'" data-img="'+ 
			    					datas[i].logo +'" data-time="'+ datas[i].create_time +'">'+ datas[i].short_name +'</li>';
			    			}else{
			    				str += '<li value="'+ (i+1) +'" data-id="'+ datas[i].id +'" data-name="'+ datas[i].short_name +'" data-img="'+ 
			    					datas[i].logo +'" data-time="'+ datas[i].create_time +'">'+ datas[i].short_name +'</li>';
			    			}
				    	}
		    			$('.goodsItems').eq(j).find('.selGoodsBox').empty().append(str);
			    		str = '<li value="0" data-id="--" data-name="" data-img="--" data-time="--">请选择商户</li>';
		    		}
		    	}else{
		    		if(type == 'search'){
		    			$this.parents('.selContBox').find('.goodsItems').find('.selGoodsBox').empty().append('<div onclick="null" style="color:#c3c3c3">无匹配项</div>');
		    		}
		    	}
		    }
	    }
	});//ajax
};

//set sord 
var setSord = function($elem){
	//验证通过
	var $Sords = $elem.val()||'';
	if($Sords){
		var data = {
			merchantId:$elem.attr("data-merchant-id"),
			sord:$Sords
		};
	}else{//该商户sord为空
		var data = {
			recId:$elem.attr("data-recId"),
			status:'0'
		};
	}
	
    $.ajax({
		data:data,
	    dataType:"json",
	    url:"/operation/merManagement/setSord",
	    type:"post",
	    beforeSend:beforeSend(),
	    success:function(json){
		    if(json.message == "成功"){
				layer.msg("修改成功",{
			 	time: 1500, //1.5s后自动关闭
					icon: 1
				},function (){
				 	location.reload(true);
				});
		    }else{  
				layer.msg(json.message);
				$elem.val($elem.attr('lis-sord'));
			}
	    },
        error:function(error){
		    layer.msg("操作失败");
		    $elem.val($elem.attr('lis-sord'));
	    }
	});
}
//set sord 
$("[data-sord='input']").blur(function(){
	var tenantSortVal = $(this).val();
	var reg = /^(?:[1-9]|1[0-8]|18)$/;
	if(reg.test(tenantSortVal) && Number(tenantSortVal) > 0 && Number(tenantSortVal) < 19){
		setSord($(this));
	}else if(!tenantSortVal){
		setSord($(this));
	}else{
		layer.msg("请输入1-18任意整数");
		$(this).val($(this).attr('lis-sord'));
		return false;
	}
});
//fun replace url
function replaceParamVal(paramName,replaceWith){  
     var oUrl = window.location.href.toString();  
     var re=eval('/('+ paramName+'=)([^&]*)/gi');  
     var nUrl = oUrl.replace(re,paramName+'='+replaceWith);  		 
     window.location = nUrl;  
} 
//tab for page nav
var navLink = function($elem){	
     var toLocation = $elem.attr("data-location");
     if(toLocation == '1'){
		$('#htmlWrap').find('.rowTr').addClass('hide');
	}else{
		if(layLoad){
			layer.close(layLoad);
		}else{
			layLoad = layer.load(2);//加载等待
		}
	}
	 var isInit = (getQueryString("pageNo")&&getQueryString("pageSize"))?false:true;
	 if(!isInit){
		 replaceParamVal("location",toLocation); 
	 }else{
		 window.location.search = "?pageNo=1&pageSize=10&location="+toLocation;			 
	 }
}
$(".layui-tab-title").find("li").click(function(){
	navLink($(this));
});
//get 同步刷新页面
var reloadPage = function(pageNo){
	 var data = {		 
		 shortName:$("#shortName").val(),				 
		 pageNo:pageNo,
		 pageSize:$("#paging").attr("data-page-size"),
		 remState:"1",
		 location:$(".layui-tab-title").find(".layui-this").attr("data-location"),
		 endTime:$("#LAY_demorange_e").val(),
		 startTime:$("#LAY_demorange_s").val()
	 };		
	 window.location.search = "?shortName=" + escape(data.shortName) + "&pageNo=" +
	 escape(data.pageNo) + "&pageSize=" + escape(data.pageSize) + "&location=" + escape(data.location)+"&endTime="+escape(data.endTime)+"&startTime="+escape(data.startTime);	
};
//查询
var queryClick = function(){	
	$("#paging").attr("data-page-no",1);
	 reloadPage($("#paging").attr("data-page-no"));
};