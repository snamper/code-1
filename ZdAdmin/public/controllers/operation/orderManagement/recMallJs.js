"use strict";
var layLoad;//loading加载初始化
var form;
var $productSortId;//定义全局一级分类ID
var $productSortId2;//定义全局二级分类ID
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	form = layui.form();
	
	var $loca = getQueryString("location");
	//切换查询状态
	$(".chooseType>li").on("click", function() {
		var toLocation = $(this).attr("data-location");
		$loca = toLocation;
	    if(toLocation == '1'){
			$('#htmlWrap').find('.rowTr').addClass('hide');
		}else{
			if(!layLoad){
				layLoad = layer.load(2);//加载等待
			}
		}
		if(Number(toLocation) > 3){//区分前后三个导航（toLocation=1,2,3为一个页面，4,5,6为另一个页面）
			if(toLocation == '5'){
				window.location.href = window.location.origin + "/operation/recMall/mallRec?pNo=1&pSize=10&location=" + toLocation + "&productSortId="+ getClassIfys().one;
			}else if(toLocation == '6'){
				window.location.href = window.location.origin + "/operation/recMall/mallRec?pNo=1&pSize=10&location=" + toLocation + "&productSortId="+ getClassIfys().one + "&productSortId2=" + getClassIfys().two;
			}else{
				window.location.href = window.location.origin + '/operation/recMall/mallRec?pNo=1&pSize=10&location=' + toLocation;
			}
			return;
		}else{
			window.location.href = window.location.origin + '/operation/opMerMan/merManRefer?pNo=1&pSize=10&location=' + toLocation;
		}
		
	});
	
	//选择一级分类
	form.on('select(stairClassify)', function(data){
		var $val = data.value;
		$productSortId = $val;
		if(getQueryString("location") == '6'){//存在二级分类
			var str = '<select name="secondClassify" lay-filter="secondClassify" id="secondClassify"><option value="" >二级分类</option></select>';
			$(".secondClassify").empty().append(str);
			refreshDatas($val,getQueryString('productSortId2')||getClassIfys().two);//刷新页面重新渲染数据
		}else{
			refreshDatas($val);//刷新页面重新渲染数据
		}
		secondClassify($val);
	});
	//选择二级分类
	form.on('select(secondClassify)', function(data){
		if(data.value){
			var $val = data.value;
			$productSortId2 = $val;
//			secondClassify(getQueryString("productSortId"),$val);
			refreshDatas(getQueryString("productSortId"),$val);//刷新页面重新渲染数据
//			$('#htmlWrap').find('.rowTr').removeClass('hide');//显示推荐列表
		}
	});

	//加载首页已推荐的商品数据
	var selGoodsArr = ['0','0','0','0','0','0','0','0'];//存放商城已经推荐的商品
	if(Number(getQueryString("location")) > 3){
		recListsInit();
	};
	//初始化推荐列表方法加载
	function recListsInit(){
		if(getQueryString("location") == '5'){
			var data = {"location":getQueryString("location"),productSortId: getQueryString('productSortId')||getClassIfys().one,"pNo":1,"pSize":10};
		}else if(getQueryString("location") == '6'){
			var data = {"location":getQueryString("location"),productSortId: getQueryString('productSortId')||getClassIfys().one,productSortId2: getQueryString('productSortId2')||getClassIfys().two,"pNo":1,"pSize":10};
		}else{//location=4   商城全部
			var data = {"location":getQueryString("location"),"pNo":1,"pSize":10};
		}
		$.ajax({
			data:data,
		    dataType:"json",
		    url:"/admin/product/recommend/list.do",
		    type:"post",
		    beforeSend:beforeSend(),
		    success:function(json){
			    if(json.message == "成功"){
			    	var datas = json.data.datas.list;
			    	if(datas && datas.length){
			    		for(var i=0;i<datas.length;i++){
			    			if(getQueryString("location") == '5'){
			    				var $eq = datas[i].grade1_sort;
			    			}else if(getQueryString("location") == '6'){
			    				var $eq = datas[i].grade2_sort;
			    			}else{
			    				var $eq = datas[i].grade_all_sort;
			    			}
			    			selGoodsArr[$eq-1] = datas[i].id;
			    			if(datas[i].product_ad_attr == '1'){
			    				var $adAttr = '购买商品';
			    			}else if(datas[i].product_ad_attr == '2'){
			    				var $adAttr = '广告商品';
		    				}else if(datas[i].product_ad_attr == '3'){
			    				var $adAttr = '充值商品';
			    			}else{
			    				var $adAttr = '';
			    			}
				    		$('#htmlWrap').find('.posShortName').eq($eq-1).html(datas[i].full_name);
				    		$('#htmlWrap').find('.posShortName').eq($eq-1).attr('data-id',datas[i].id);
				    		$('#htmlWrap').find('.posLogoImg').eq($eq-1).empty().append('<img src="' + datas[i].image_url + '" style="width: 110px;height: 80px;" alt="" />');
				    		$('#htmlWrap').find('.posCreatTime').eq($eq-1).html(datas[i].update_time);
				    		$('#htmlWrap').find('.posPrice').eq($eq-1).html(datas[i].retail_price);
				    		$('#htmlWrap').find('.posTatol').eq($eq-1).html(datas[i].exchange_points);
				    		$('#htmlWrap').find('.posBase').eq($eq-1).html(datas[i].base);
				    		$('#htmlWrap').find('.posReal').eq($eq-1).html(datas[i].sale_count);
				    		$('#htmlWrap').find('.posNature').eq($eq-1).html($adAttr);
				    		$('#htmlWrap').find('.getGoodsName').eq($eq-1).val(datas[i].full_name);
				    	}
			    	}
			    	if(getQueryString("location") != '6'){
			    		$('#htmlWrap').find('.rowTr').removeClass('hide');
			    	}else{
			    		if(getQueryString('productSortId2')){
				    		$('#htmlWrap').find('.rowTr').removeClass('hide');
				    	}else{
				    		$('#htmlWrap').find('.rowTr').addClass('hide');
				    	}
			    	}
			    	getSelGoodsList('init','','');
			    }
		    }
		});//ajax
	}
	
	//一级分类/二级分类 下拉列表渲染
	var stair = getQueryString("productSortId") || $productSortId;
	var second = getQueryString("productSortId2") || $productSortId2;
	stairClassify(stair);
	if(getQueryString("location") == '6'){//二级分类
		secondClassify(stair,second);
	}
	
	//页面初始化加载的时候(location=5/6)，直接单独获取第一个一级分类和第一个二级分类
	function getClassIfys(){
//		var firstId;var secId;
		var $fid;
		$.ajax({//获取一级分类里的第一个分类ID
		    data: {location:1,pageNo:'1',pageSize:'100000000'},
		    type:"post",
		    dataType: "json",
		    async: false,
		    url: "/admin/product/sort/list.do",
		    success:function(json){
		     	if (json.message == '成功') {
		     		if(!$productSortId){
		     			$productSortId = json.data.datas[0].id;
		     		}
		     	}
		    }
	    });
	    $.ajax({//获取一级分类里的第二个分类ID
		    data: {location:2,pageNo:'1',pageSize:'100000000'},
		    type:"post",
		    dataType: "json",
		    async: false,
		    url: "/admin/product/sort/list.do",
		    success:function(json){
		     	if (json.message == '成功') {
		     		$productSortId2 = json.data.datas[0].id;
		     		$fid = json.data.datas[0].fid;
		     	}
		    }
	    });
 		if($productSortId == $fid){
 			return {"one":$productSortId||'',"two":$productSortId2||''};
 		}else{
 			return {"one":$productSortId||'',"two":''};
 		}
	}
	
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
		if(e.target.className != "recGoodsItems" && e.target.className.indexOf("getRecGoodsName") < 0){
			$('.recGoodsItems').hide();
		}
	});
	
	//下拉列表的点击事件
	$('body').delegate('.selHomeGoodsBox li','click',function (){
		layLoad = layer.load(2,{shade: 0.6});//加载等待
		var $this = $(this);
		//被选择的商户的信息
		var $dataName = $this.attr('data-name');//商品名称
		var $dataLogo = $this.attr('data-img');//商品图
		var $dataTime = $this.attr('data-time')||'--';//提交时间
		var $dataId = $this.attr('data-id');//商品ID
		var $dataPrice = $this.attr('data-price');//原价
		var $dataTatol = $this.attr('data-tatol');//兑换积分
		var $dataBase = $this.attr('data-base');//已售基数
		var $dataReal = $this.attr('data-real')||'0';//实售数量
		var $dataNature = $this.attr('data-nature');//商品广告属性
		//当前位置上的商品信息  posPrice posTatol posBase posReal posCreatTime posNature
		var $sord = $this.parents('tr').find('.posSord').html();
		var $posShortName = $this.parents('tr').find('.posShortName').html();
		var $posShortNameid = $this.parents('tr').find('.posShortName').attr('data-id')||'';
		//选择商品推荐到首页
		if($this.html() == '请选择商品' && $posShortName == '--'){
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
			$dataId = $posShortNameid;
			$sord = 0;
			if($loca == '5'){//商城一级分类
				var data = {productId:$dataId,grade1Id:getQueryString('productSortId')||getClassIfys().one,grade1Sort:$sord};
			}else if($loca == '6'){//商城二级分类
				var data = {productId:$dataId,grade2Id:getQueryString('productSortId2')||getClassIfys().two,grade2Sort:$sord};
			}else{//商城全部
				var data = {productId:$dataId,gradeAllSort:$sord};
			}
			var param = {'$dataName':$dataName,'$dataId':$dataId,'$dataLogo':$dataLogo,'$dataTime':$dataTime,'$dataPrice':$dataPrice,'$dataTatol':$dataTatol,'$dataBase':$dataBase,'$dataReal':$dataReal,'$dataNature':$dataNature};//需要传入的参数变量
			$('#htmlWrap').find('.rowTr').addClass('hide');
			replaceSet($this,data,param);
		}else{
			if($loca == '5'){//商城一级分类
				var data = {productId:$dataId,grade1Id:getQueryString('productSortId')||getClassIfys().one,grade1Sort:$sord};
			}else if($loca == '6'){//商城二级分类
				var data = {productId:$dataId,grade2Id:getQueryString('productSortId2')||getClassIfys().two,grade2Sort:$sord};
			}else{//商城全部
				var data = {productId:$dataId,gradeAllSort:$sord};
			}
			var param = {'$dataName':$dataName,'$dataId':$dataId,'$dataLogo':$dataLogo,'$dataTime':$dataTime,'$dataPrice':$dataPrice,'$dataTatol':$dataTatol,'$dataBase':$dataBase,'$dataReal':$dataReal,'$dataNature':$dataNature};
			var hasPosItems = $('#htmlWrap').find('tr');
			var flag = true;
			for(var i=0;i<hasPosItems.length;i++){//查看同一商品是否在不同位置设置(重复设置)
				var _dataId = hasPosItems.eq(i).find('.posShortName').attr('data-id');
				if(_dataId == $dataId){
					flag = false;
					layer.confirm('当前商品已在首页展示，是否确认覆盖？', {
						btn: ['确认', '取消'] //按钮
					}, function() {
						layLoad = layer.load(2,{
							shade: 1
						});//加载等待
						$('#htmlWrap').find('.rowTr').addClass('hide');
						replaceSet($this,data,param);
						layer.closeAll('dialog');
					},function (){
						if(layLoad){
							layer.close(layLoad);
						}
						layer.closeAll('dialog');
					});//同一商户在不同位置设置时的强提示
				}
			}
			if(flag){
				replaceSet($this,data,param);
				if(layLoad){
					layer.close(layLoad);
				}
			};
		}
	})
	//
	function replaceSet($this,data,param){//param 函数内需要的变量参数集合
		if($loca == '5'){//商城一级分类
			var $url = "/admin/product/recommend/grade1Sort/set.do";
		}else if($loca == '6'){//商城二级分类
			var $url = "/admin/product/recommend/grade2Sort/set.do";
		}else{//商城全部
			var $url = "/admin/product/recommend/gradeAllSort/set.do";
		}
		$.ajax({
			data:data,
		    dataType:"json",
		    url:$url,
		    type:"post",
		    beforeSend:beforeSend(),
		    success:function(json){
				layer.closeAll('loading');
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
					$this.parents('.rowTr').find('.posPrice').html(param.$dataPrice);
					$this.parents('.rowTr').find('.posTatol').html(param.$dataTatol);
					$this.parents('.rowTr').find('.posBase').html(param.$dataBase);
					$this.parents('.rowTr').find('.posReal').html(param.$dataReal);
					$this.parents('.rowTr').find('.posNature').html(param.$dataNature);
					$this.parents('.rowTr').find('.getGoodsName').val(param.$dataName);
					window.location.reload();
	//				search('1');
			    }else{
			    	layer.msg(json.message);
				    return;
			    }
			    $this.parents('.rowTr').find('.goodsItems').addClass('hide');
		    },
		    error:function (){
		    	layer.closeAll('loading');
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
		var data = {shortName:name||'',pNo:1,pSize:10000000,status:4};
		if($loca == '5'){//需要渲染一级分类下的的商品
			data.productSortId = getQueryString('productSortId')||getClassIfys().one;
		}else if($loca == '6'){//需要渲染二级分类下的商品
			data.productSortId2 = getQueryString('productSortId2')||getClassIfys().two;
		}
		$.ajax({
			data:data,
		    dataType:"json",
		    url:"/admin/product/recommend/slaves/list.do",
		    type:"post",
		    beforeSend:beforeSend(),
		    success:function(json){
	    		if(layLoad){
	    			layer.close(layLoad);
	    		}
			    if(json.message == "成功"){
			    	var datas = json.data.datas.list;
			    	if(datas && datas.length){
			    		var str = '<li value="0" data-id="--" data-name="" data-img="--" data-price="--" data-tatol="--" data-base="--"' + 
			    			'data-real="--" data-time="--" data-nature="--">请选择商品</li>';
			    		for(var j=0;j<selGoodsArr.length;j++){
			    			for(var i=0;i<datas.length;i++){
				    			var $nature = datas[i].product_ad_attr;
				    			if($nature == '1'){//是购买商品
				    				var $natureText = '购买商品';
				    			}else if($nature == '2'){//广告商品
				    				var $natureText = '广告商品';
			    				}else if($nature == '3'){//广告商品
				    				var $natureText = '充值商品';
				    			}else{
				    				var $natureText = '--';
				    			}
				    			if(selGoodsArr[j] == datas[i].id){
				    				str += '<li selected="selected" value="'+ (i+1) +'" data-id="'+ datas[i].id +'" data-name="'+ datas[i].full_name +'" data-img="'+ 
						    			datas[i].image_url +'" data-price="'+ datas[i].retail_price +'" data-tatol="'+ datas[i].exchange_points +'" data-base="'+ 
						    			datas[i].base +'" data-real="'+ datas[i].sale_count +'" data-time="'+ datas[i].update_time +'" data-nature="'+ 
						    			$natureText +'">'+ datas[i].full_name +'</li>';
				    			}else{
				    				str += '<li value="'+ (i+1) +'" data-id="'+ datas[i].id +'" data-name="'+ datas[i].full_name +'" data-img="'+ 
						    			datas[i].image_url +'" data-price="'+ datas[i].retail_price +'" data-tatol="'+ datas[i].exchange_points +'" data-base="'+ 
						    			datas[i].base +'" data-real="'+ datas[i].sale_count +'" data-time="'+ datas[i].update_time +'" data-nature="'+ 
						    			$natureText +'">'+ datas[i].full_name +'</li>';
				    			}
					    	}
			    			if(getQueryString("location") == 3){
			    				$('.recGoodsItems').eq(j).find('.selRecGoodsBox').empty().append(str);
			    			}else{
			    				$('.goodsItems').eq(j).find('.selGoodsBox').empty().append(str);
			    			}
			    			$('.goodsItems').eq(j).find('.selGoodsBox').empty().append(str);
			    			str = '<li value="0" data-id="--" data-name="" data-img="--" data-price="--" data-tatol="--" data-base="--"' + 
			    			'data-real="--" data-time="--" data-nature="--">请选择商品</li>';
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
	
	function stairClassify(stair) {//一级分类渲染
		$.ajax({
			data: {location:1,pageNo:'1',pageSize:'100000000'},
		    type:"post",
		    dataType: "json",
		    url: "/admin/product/sort/list.do",
		    success:function(json){
		     	if (json.message == '成功') {
		     		var list = json.data.datas;
		     		var length = list.length;
		     		var str = '<select name="stairClassify" lay-filter="stairClassify" id="stairClassify"><option value="">一级分类</option>';
		     		for ( var i=0 ; i<length ; i++ ) {
		     			if ( stair && list[i].id == stair ) {
		     				str += '<option selected="selected" data-id="'+ list[i].id +'" value="'+ list[i].id +'">' + list[i].sortName +'</option>'
		     			}else {
		     				str += '<option data-id="'+ list[i].id +'" value="'+ list[i].id +'">' + list[i].sortName +'</option>'
		     			}
		     		}
					str += '</select>'
		     		$(".stairClassify").empty().append(str)
		     		form.render('select')
		     		if(getQueryString('location') == '6' && getQueryString('productSortId2')){
		     			$('#htmlWrap').find('.rowTr').removeClass('hide');
		     		}
		     	}
			     	
		    }//ajax
	   });
	}
	function secondClassify(stair,second){//为二级分类渲染
	   	if(stair) {
	        $.ajax({
			    data: {location:2,sortId: stair,pageNo:'1',pageSize:'100000000'},
			    type:"post",
			    dataType: "json",
			    url: "/admin/product/sort/list.do",
			    success:function(json){
			     	if (json.message == '成功') {
			     		var list = json.data.datas;
			     		var length = list.length;
			     		if(length){
				     		var str = '<select name="secondClassify" lay-filter="secondClassify" id="secondClassify"><option value="" >二级分类</option>';
				     		for ( var i=0 ; i<length ; i++ ) {
				     			if (second && list[i].id == second) {
				     				str += '<option selected="selected" data-id="'+ list[i].id +'" value="'+ list[i].id +'">' + list[i].sortName +'</option>'
				     			}else {
				     				str += '<option data-id="'+ list[i].id +'" value="'+ list[i].id +'">' + list[i].sortName +'</option>'
				     			}
				     		}
							str += '</select>';
				     		$(".secondClassify").empty().append(str);
			     		}else{
			     			$('#htmlWrap').find('.rowTr').addClass('hide');
			     		}
			     		form.render('select');
			     	}
			    }
		    });	
		}
	}
	//选择分类后刷新页面渲染数据
	var refreshDatas = function(stair,second) {
		var pageNo = '1';
		var pageSize = '10';
		var location = getQueryString("location");
		var stair = stair||'';//一级分类
		var second = second||'';//二级分类
		window.location.search="?location="+escape(location)+"&productSortId="+escape(stair)+"&productSortId2="+escape(second)+"&pSize="+escape(pageSize)+"&pNo="+escape(pageNo);
	}

});