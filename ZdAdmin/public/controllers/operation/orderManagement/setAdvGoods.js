"use strict";
layui.use(['element', 'form', 'layedit', 'laydate', 'upload'], function() {
	//广告商品设置/编辑
	var form = layui.form(),
		layer = layui.layer,
		laydate = layui.laydate;
	$ = layui.jquery;	
	
	//选择入口位置
	form.on('checkbox(homeBox)', function(data){
		var $name = $(data.elem).attr('name');
		if($name == 'homeBox'){
			if($('.layuiFirst').find('.layui-form-checked').length){
				$('.firstLine').removeClass('hide');
				$('.layuiFirst').attr('data-select','1'); 
			}else{
				$('.firstLine').addClass('hide');
				$('.layuiFirst').attr('data-select','0'); 
				$('.btnsName').val('');//切换之后置空按钮名称
				$('.insLink').val('');//切换之后置空按钮链接
			}
		}else if($name == 'buyPageBox'){
			if($('.layuiSec').find('.layui-form-checked').length){
				$('.secLine').removeClass('hide');
				$('.layuiSec').attr('data-select','1'); 
			}else{
				$('.secLine').addClass('hide');
				$('.layuiSec').attr('data-select','0'); 
				$('.btnsName2').val('');//切换之后置空按钮名称
				$('#uploadgoodsShow').attr('src','');//切换之后置空图片
				$('.insLink2').val('');//切换之后置空图片链接
			}
		}else{
			if($('.layuiThird').find('.layui-form-checked').length){
				$('.thirdLine').removeClass('hide');
				$('.layuiThird').attr('data-select','1'); 
			}else{
				$('.thirdLine').addClass('hide');
				$('.layuiThird').attr('data-select','0'); 
				$('#uploadgoodsShow2').attr('src','');//切换之后置空图片
				$('.insLink3').val('');//切换之后置空图片链接
			}
		}
	});
	//切换第二行入口类型操作
	form.on('radio(inletBtn2)', function(data){
		var $title = $(data.elem).attr('title');
		if($title == '按钮入口'){			
			$('#uploadgoodsShow').attr('data-url','');//切换之后置空图片
			$('.insLink2').val('');//切换之后置空图片链接
			$('.inletLinksItem2').removeClass('hide');
			$('.btnNameItem2').removeClass('hide');
			$('.imgItem').addClass('hide');
		}else{
			if(!$("#uploadgoodsShow").length){
				$('#addGoodsImg').before('<img id="uploadgoodsShow" class="uploadgoodsShow" src="" data-host="" data-url=""/>');
			}
			$('.btnsName2').val('');//切换之后置空按钮名称
			$('.insLink2').val('');//切换之后置空按钮链接
			$('.inletLinksItem2').removeClass('hide');
			$('.imgItem').removeClass('hide');
			$('.btnNameItem2').addClass('hide');
		}
	});
	//切换商品详情页的入口类型操作
	form.on('radio(inletBtn3)', function(data){
		var $title = $(data.elem).attr('title');
		if($title == '按钮入口'){			
			$('#uploadgoodsShow2').attr('data-url','');//切换之后置空图片
			$('.insLink3').val('');//切换之后置空图片链接
			$('.inletLinksItem3').removeClass('hide');
			$('.btnNameItem3').removeClass('hide');
			$('.imgItem2').addClass('hide');
		}else{
			if(!$("#uploadgoodsShow2").length){
				$('#addGoodsImg2').before('<img id="uploadgoodsShow2" class="uploadgoodsShow2" src="" data-host="" data-url=""/>');
			}
			$('.btnsName3').val('');//切换之后置空按钮名称
			$('.insLink3').val('');//切换之后置空按钮链接
			$('.inletLinksItem3').removeClass('hide');
			$('.imgItem2').removeClass('hide');
			$('.btnNameItem3').addClass('hide');
		}
	});
	
	var merchantId = "",		//商户id
		_url = window.location.href,
		productId = _url.split("productId=")[1];		//推荐信息
	
	//保存数据
	$(".setMessage").on("click", function() {
		if(getQueryString('online')){//在线编辑时候的保存用特殊接口处理
			var datas = {"id":getQueryString('productId'),"tag":$('.goodsLabel').val()};
			$.ajax({
				url:'/admin/product/on/sale/edit.do',
				type:"post",
				dataType:"json",
				data:datas,
				beforeSend:beforeSend(),             
				success:function(json){	
					if(json.message == "成功"){
						layer.msg('保存成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href = "/operation/opMerMan/merManRefer";
						});
					}else{
						layer.msg(json.message);
						return false;
					}
				}
			});//ajax
		}else{//未上架的编辑保存
			var dataCps = setGoodsCPS();//验证CPS配置项
			if(dataCps.turnON){	
				$.ajax({
					url:'/admin/product/entrance/edit.do',
					type:"post",
					dataType:"json",
					data:JSON.stringify(dataCps.data),
					contentType : "application/json" ,
					beforeSend:beforeSend(),             
					success:function(json){	
						if(json.message == "成功"){
							layer.msg('保存成功！', {
								time: 1500, //1s后自动关闭
								icon: 1
							},function(){
								// &online=true&oSave=true   
								//online：在售商品直接编辑3种类型的商品(只有保存按钮，没有上架按钮)，oSave：在售商品二次编辑CPS(只有保存按钮，没有上架按钮)
								if(getQueryString('online') || getQueryString('oSave')){
									window.location.href = "/operation/opMerMan/merManRefer";
								}else{
									window.location.href = "/operation/opMerMan/upDownList";
								}
							});
						}else{
							layer.msg(json.message);
							return false;
						}
					}
				});//ajax
			}else{
				layer.msg("信息填写有误！");
				return false;
			}
		}
	});
	//上架
	$(".slaves").on("click", function() {
		var dataCps = setGoodsCPS();//验证CPS配置项
		if(dataCps.turnON){			
			$.ajax({
				url:'/admin/product/entrance/edit.do',
				type:"post",
				dataType:"json",
				data:JSON.stringify(dataCps.data),
				contentType : "application/json" ,
				beforeSend:beforeSend(),             
				success:function(json){	
					if(json.message == "成功"){
						$.ajax({
							data:{productId:productId,status:'4'},
						    dataType:"json",
						    url:"/operation/opMerMan/slaves",
						    type:"post",
						    beforeSend:beforeSend(),
						    success:function(json){
							    if(json.message == "成功"){
							    	layer.msg('上架成功！', {
										time: 1000, //1s后自动关闭
										icon: 1
									},function(){
										window.location.href = "/operation/opMerMan/ordMan";
									});
							    }else{
							    	layer.msg(json.message);
								    return false;
							    }
						    },
						    error:function (){
						    	layer.msg('操作失败！', {
									time: 1000, //1s后自动关闭
									icon: 2
								});
						    }
						});//ajax
					}else{
						layer.msg("信息填写有误！");
						return false;
					}
				}
			});//ajax
		}else{
			layer.msg("信息填写有误！");
			return false;
		}
	});
	
	//设置CPS配置项
	function setGoodsCPS(){//setCPS
		var dataCPS = {
			"Id":productId
		};
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,4}$/;
		var $val = $('.goodsLabel').val() || '';//商品标签
		if($val && reg.test($val)){
			dataCPS.tag = $val;
		}else{
			if($val && !reg.test($val)){
				return false;
			}
		}
		var turnON = true;
		var $cpsEntranceList = [];//存放CPS配置项信息
		var $firstItem1 = $('.layuiFirst').find('.layui-form-checked');//第一列
		var $firstItem2 = $('.layuiSec').find('.layui-form-checked')//第二列
		var $firstItem3 = $('.layuiThird').find('.layui-form-checked')//第三列
		if($firstItem1.length){//当第一列有被选中的
			var json1 = {};//存放第一列对应的配置信息
			var $cpsEntrance1 = '';//记录每一行的入口位置
			json1.entranceCategory = 0;
			json1.entranceType = 0;//按钮
			var str1 = '';
			for(var i=0;i<$firstItem1.length;i++){
				str1 += $firstItem1.eq(i).prev('input').attr('data-cpsEntrance') + ',';
			}
			$cpsEntrance1 = str1.substring(0,str1.length-1);
			json1.cpsEntrance = $cpsEntrance1;
			var $btnsName = $('.btnsName').val()||'';//第一列下的按钮名称
			var $insLink = $('.insLink').val()||'';//第一列下的按钮链接
			if($btnsName && $insLink ){
				if($('.tooltip-btnsName').hasClass('hide') && $('.tooltip-insLink').hasClass('hide')){
					json1.entranceButtonName = $btnsName;
					json1.entranceUrl = $insLink;
					$cpsEntranceList.push(json1);
					turnON = true;
				}else{
					turnON = false;
				}
			}else{
				turnON = false;
				if(!$btnsName){
					$('.tooltip-btnsName').removeClass('hide');
				}else if(!$insLink){
					$('.tooltip-insLink').removeClass('hide');
				}
				return;
			}
		}else{//没有选择就传空
			var json1 = {};//存放第一列对应的配置信息
			json1.entranceCategory = 0;
			json1.entranceButtonName = '';
			json1.entranceUrl = '';
			json1.cpsEntrance = '';
			json1.entranceType = '';//按钮
			$cpsEntranceList.push(json1);
		}
		if($firstItem2.length){//当第二列有被选中的
			var json2 = {};//存放第二列对应的配置信息
			var $cpsEntrance2 = '';//记录每一行的入口位置
			json2.entranceCategory = 1;
			var str2 = '';
			for(var i=0;i<$firstItem2.length;i++){
				str2 += $firstItem2.eq(i).prev('input').attr('data-cpsEntrance') + ',';
			}
			$cpsEntrance2 = str2.substring(0,str2.length-1);
			json2.cpsEntrance = $cpsEntrance2;
			if($('.inletBtnItem2').find('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){//第二列的按钮入口
				json2.entranceType = 0;//按钮
				var $btnsName2 = $('.btnsName2').val()||'';//第二列下的按钮名称
				var $insLink2 = $('.insLink2').val()||'';//第二列下的按钮链接
				if($btnsName2 && $insLink2 ){
					if($('.tooltip-btnsName2').hasClass('hide') && $('.tooltip-insLink2').hasClass('hide')){
						turnON = true;
						json2.entranceButtonName = $btnsName2;
						json2.entranceUrl = $insLink2;
						$cpsEntranceList.push(json2);
					}else{
						turnON = false;
					}
				}else{
					turnON = false;
					if(!$btnsName2){
						$('.tooltip-btnsName2').removeClass('hide');
					}else if(!$insLink2){
						$('.tooltip-insLink2').removeClass('hide');
					}
					return;
				}
			}else{//第二列的图片入口
				json2.entranceType = 1;//图片
				var $uploadgoodsShow = $('#uploadgoodsShow').attr('src');//第二列下的图片地址
				var $insLink2 = $('.insLink2').val()||'';//第二列下的图片链接
				if($uploadgoodsShow && $insLink2 ){
					turnON = true;
					json2.entrancePicUrl = $uploadgoodsShow;
					json2.entranceUrl = $insLink2;
					$cpsEntranceList.push(json2);
				}else{
					turnON = false;
					if(!$uploadgoodsShow){
						$('.tooltip-uploadgoodsShow').removeClass('hide');
					}else if(!$insLink2){
						$('.tooltip-insLink2').removeClass('hide');
					}
					return;
				}
			}
		}else{//没有选择就传空
			var json2 = {};//存放第二列对应的配置信息
			json2.entranceCategory = 1;
			json2.entranceButtonName = '';
			json2.entranceUrl = '';
			json2.cpsEntrance = '';
			json2.entranceType = '';
			$cpsEntranceList.push(json2);
		}
		if($firstItem3.length){//当第三列有被选中的
			var json3 = {};//存放第三列对应的配置信息
			var $cpsEntrance3 = '';//记录每一行的入口位置
			json3.entranceCategory = 2;
			json3.entranceType = 1;//图片
			var str3 = '';
			for(var i=0;i<$firstItem3.length;i++){
				str3 += $firstItem3.eq(i).prev('input').attr('data-cpsEntrance') + ',';
			}
			$cpsEntrance3 = str3.substring(0,str3.length-1);
			json3.cpsEntrance = $cpsEntrance3;
			if($('.inletBtnItem3').find('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){//第三列的按钮入口
				json3.entranceType = 0;//按钮
				var $btnsName3 = $('.btnsName3').val()||'';//第三列下的按钮名称
				var $insLink3 = $('.insLink3').val()||'';//第三列下的按钮链接
				if($btnsName3 && $insLink3 ){
					if($('.tooltip-btnsName3').hasClass('hide') && $('.tooltip-insLink3').hasClass('hide')){
						turnON = true;
						json3.entranceButtonName = $btnsName3;
						json3.entranceUrl = $insLink3;
						$cpsEntranceList.push(json3);
					}else{
						turnON = false;
					}
				}else{
					turnON = false;
					if(!$btnsName3){
						$('.tooltip-btnsName3').removeClass('hide');
					}else if(!$insLink3){
						$('.tooltip-insLink3').removeClass('hide');
					}
					return;
				}
			}else{//第三列的图片入口
				json3.entranceType = 1;//图片
				var $uploadgoodsShow2 = $('#uploadgoodsShow2').attr('src');//第三列下的图片地址
				var $insLink3 = $('.insLink3').val()||'';//第三列下的图片链接
				if($uploadgoodsShow2 && $insLink3 ){
					if($('.tooltip-btnsName3').hasClass('hide') && $('.tooltip-insLink3').hasClass('hide')){
						turnON = true;
						json3.entrancePicUrl = $uploadgoodsShow2;
						json3.entranceUrl = $insLink3;
						$cpsEntranceList.push(json3);
					}else{
						turnON = false;
					}
				}else{
					turnON = false;
					if(!$uploadgoodsShow2){
						$('.tooltip-uploadgoodsShow2').removeClass('hide');
					}else if(!$insLink3){
						$('.tooltip-insLink3').removeClass('hide');
					}
					return;
				}
			}
		}else{//没有选择就传空
			var json3 = {};//存放第三列对应的配置信息
			json3.entranceCategory = 2;
			json3.entranceButtonName = '';
			json3.entranceUrl = '';
			json3.cpsEntrance = '';
			json3.entranceType = '';
			$cpsEntranceList.push(json3);
		}
		dataCPS.cpsEntranceList = $cpsEntranceList;
		return {"turnON":turnON,"data":dataCPS};
	};
	//CPS配置项图片上传
	//轮播图上传
	$('#addGoodsImg').on('change', function (){//第二列图片上传 
		upLoadImgCPS('#addGoodsImg','.tooltip-addFlexImg','#uploadgoodsShow');//thisBtn-主按钮,tooltip-错误信息提示,imgLabel-img标签展示
	});
	$('#addGoodsImg2').on('change', function (){//第三列图片上传
		upLoadImgCPS('#addGoodsImg2','.tooltip-addFlexImg2','#uploadgoodsShow2');//thisBtn-主按钮,tooltip-错误信息提示,imgLabel-img标签展示
	});
	//上传图片方法总调
	function upLoadImgCPS(thisBtn,tooltip,imgLabel){//thisBtn-主按钮,tooltip-错误信息提示,imgLabel-img标签展示
		var fs = new FormData();
		if($(thisBtn)[0].files[0]){
            var imageFile = $(thisBtn)[0].files[0];
            var layLoad = layer.load(1);//加载等待
			fs.append("imageFile",imageFile);
			$.ajax({
				url:'/admin/file/image/upload.do', //上传接口	
				type:"post",
				dataType:"json",
				data:fs,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,
				cache: false,              
				success:function(json){				 
					layer.close(layLoad);//清除加载
					if(json.message == "成功"){
						layer.msg("上传成功");
						$(tooltip).addClass('hide');
						$(imgLabel).attr("src",json.data.httpPath);
						$(imgLabel).attr("data-url",json.data.httpsPath);
						$(imgLabel).addClass('updataFileImgSize');
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
			});                   
		}else{
			layer.msg('上传失败！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
		}
	}
});

//CPS配置项正则验证
$('.btnsName').blur(function() { //验证按钮名称(第一列)
	if(!$(".btnsName").check().character(1,10)) {
		$('.tooltip-btnsName').removeClass('hide');
		return;
	} else {
		$('.tooltip-btnsName').addClass('hide');
	}
});
$('.insLink').blur(function() { //验证按钮链接(第一列)
	if(!$(".insLink").check().http()) {
		$('.tooltip-insLink').removeClass('hide');
		return;
	} else {
		$('.tooltip-insLink').addClass('hide');
	}
});
$('.btnsName2').blur(function() { //验证按钮名称(第二列)
	if(!$(".btnsName2").check().character(1,10)) {
		$('.tooltip-btnsName2').removeClass('hide');
		return;
	} else {
		$('.tooltip-btnsName2').addClass('hide');
	}
});
$('.insLink2').blur(function() { //验证链接(第二列)
	if(!$(".insLink2").check().http()) {
		$('.tooltip-insLink2').removeClass('hide');
		return;
	} else {
		$('.tooltip-insLink2').addClass('hide');
	}
});
$('.btnsName3').blur(function() { //验证按钮名称(第三列)
	if(!$(".btnsName3").check().character(1,10)) {
		$('.tooltip-btnsName3').removeClass('hide');
		return;
	} else {
		$('.tooltip-btnsName3').addClass('hide');
	}
});
$('.insLink3').blur(function() { //验证图片链接(第三列)
	if(!$(".insLink3").check().http()) {
		$('.tooltip-insLink3').removeClass('hide');
		return;
	} else {
		$('.tooltip-insLink3').addClass('hide');
	}
});
//验证商品标签
$('.goodsLabel').blur(function (){
	var $val = $(this).val();
	var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,4}$/;
	if(reg.test($val)){
		$('.tooltip-btnsLabel').addClass('hide');
	}else{
		$('.tooltip-btnsLabel').removeClass('hide');
		return;
	}
});
