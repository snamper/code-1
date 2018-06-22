"use strict";
layui.use(['element', 'paging', 'laydate', 'upload'], function(){
	$ = layui.jquery;
	
	//初始化弹窗内 广告&商品状态切换值
	var $selType = $('.selectBtnF').attr('data-selType')||'2';
	$('.selectBtnF').on('click', function (){//选择轮播图链接
		$('.secleUrl').removeClass('hide');
		layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //关闭按钮
			anim: 1,
			shade: 0,
			area: ['50%', '60%'], //宽高
			title: ['选择链接', 'text-align: center; font-size: 16px;'],
			content: '<div id="secleUrl">' +
					'<div class="secleUrlTop">' + 
						'<input type="text" name="urlSearch" class="layui-input" id="urlSearch">' + 
						'<a href="javascript:;" class="layui-btn" id="urlSearchBtn">搜索</a>' + 
					'</div>' + 
					'<div class="layui-tab tabChange flex-tabChange" data-selType="">' +
						'<ul class="layui-tab-title tabLis" id="tabLis">' +
							'<li data-linkType="2" class="layui-this">广告</li>' +
							'<li data-linkType="3">商品</li>' +
						'</ul>' +
					'</div>' +
					'<div id="ibackMes" class="hide" style="text-align:center; color:red; line-height:50px;"></div>' +
					'<div class="secleUrlCont">' + 
						'<ul class="urlContItem">' + 
						'</ul>' +
					'</div>' +
					'<div id="paging" class="pagings" data-page-no="1" data-page="8" data-page-size="10"></div>' +
					'<div class="marginAuto">' + 
						'<a href="javascript:;" class="layui-btn layui-layer-close" id="sureBtnFlex">确定</a>' +
						'<a href="javascript:;" class="layui-btn layui-layer-close" id="cancleBtnFlex">取消</a>' +
					'</div>' +
				'</div>',
			end:function (){//回调执行图片渲染到页面上
//				console.log('123123132')
			},
			success:function(){//回调函数调出分页组件
				var layLoad = layer.load(1);//加载等待
				if($('.selectBtnF').attr('data-selType') == '3'){
					$("body").find('#tabLis').find('li').removeClass('layui-this');
					$("body").find('#tabLis').find('li').eq(1).addClass('layui-this');
					var $Url = "/admin/product/recommend/slaves/list.do";
					var iData = {pNo:"1",pSize:"10",status:'4'};
				}else{
					$("body").find('#tabLis').find('li').removeClass('layui-this');
					$("body").find('#tabLis').find('li').eq(0).addClass('layui-this');
					var $Url = "/admin/ad/examine/list.do";
					var iData = {pageNo:"1",pageSize:"10",status:'0'};
				}
				
				$.ajax({
					method:"post",
					data:iData,
					url:$Url,
					dataType:"json",
					success:function(json){
						layer.close(layLoad);//清除加载
						if(json.message == "成功"){
							flexRenderLists(json);//弹窗列表渲染&搜索后列表渲染
						}
					}
				});
			}//ajax结束
		});
	});
	
	//判断轮播图链接是外链还是内链
	$('.layui-form-radio').on('click', function (){
		var $this = this;
		if($this.lastChild.innerText == '内部'){
			$('#flexImgUrlOut').val('');
			$('.tooltip-flexImgUrl').addClass('hide');
			$('.flexImgUrlBox').removeClass('hide');
			$('.flexImgUrlOutBox').addClass('hide');
		}else{
			$('.flexImgUrlOutBox').removeClass('hide');
			$('.flexImgUrlBox').addClass('hide');
		}
	});
	
	//弹窗内选择商品还是广告，切换状态
	$("body").delegate(".tabLis>li","click",function(){
     	var layLoad = layer.load(1);//加载等待
		$selType = $(this).attr("data-linkType")
		$(".tabChange").attr("data-selType",$selType);
		$(".selectBtnF").attr("data-seltype",$selType)
		if($selType == '3'){
			var $Url = "/admin/product/recommend/slaves/list.do";
			var iData = {pNo:"1",pSize:"10",status:'4'};
		}else{
			var $Url = "/admin/ad/examine/list.do";
			var iData = {pageNo:"1",pageSize:"10",status:'0'};
		}
		$.ajax({
			method:"post",
			data:iData,
			url:$Url,
			dataType:"json",
			success:function(json){
				if(json.message == "成功"){
					layer.close(layLoad);//清除加载
					flexRenderLists(json);//弹窗列表渲染&搜索后列表渲染
				}
			},
		});
	});

	//弹窗内的搜索点击事件
	$("body").delegate("#urlSearchBtn","click",function(){
		var urlSearchVal = $('#urlSearch').val();//搜索的内容
		if(!urlSearchVal){
			layer.msg('请输入内容进行搜索！');
			return false;
		}else{//搜索内容不为空
			$('.secleUrlCont').removeClass('hide');
			$('.marginAuto').removeClass('hide');
			$('#ibackMes').addClass('hide');
			var layLoad = layer.load(1);//加载等待
			if($('.selectBtnF').attr('data-selType') == '3'){
				var $Url = "/admin/product/recommend/slaves/list.do";
				var data = {
					shortName:urlSearchVal,
					pNo:"1",
					pSize:"10",
					status:'4'
				};
			}else{
				var data = {
					name:urlSearchVal,
					pageNo:"1",
					pageSize:"10",
					status:'0'
				};
				var $Url = "/admin/ad/examine/list.do";
			}
			$.ajax({
				method:"post",
				data:data,
				url:$Url,
				dataType:"json",
				success:function(json){
					if(json.message == "成功"){
						layer.close(layLoad);//清除加载
						if($('.selectBtnF').attr('data-selType') == '3'){
							if(!json.data.datas.list.length){//内容搜索无数据返回
								showFlexSearchMes('未查询到您输入的内容！');
							}else{//内容搜索有数据返回
								flexRenderLists(json);//弹窗列表渲染&搜索后列表渲染
							}
						}else{
							if(!json.data.datas.length){//内容搜索无数据返回
								showFlexSearchMes('未查询到您输入的内容！');
							}else{//内容搜索有数据返回
								flexRenderLists(json);//弹窗列表渲染&搜索后列表渲染
							}
						}
					}
				}
			});
		}
	})
	//弹窗列表渲染&搜索后列表渲染
	function flexRenderLists(jsons){
		if($selType == '3'){//商品
			var json = jsons.data;
			getFlexImgDatas(json.datas.list);//渲染搜索广告列表
		}else{//广告
			var json = jsons.data;
			getFlexImgDatas(json.datas);//渲染搜索广告列表
		}
		$('#paging').attr('data-page-no',json.pageNo);
		$('#paging').attr('data-page',json.totalPage);
		$('#paging').attr('data-page-size',json.pageSize);
		var paging = layui.laypage({
			pages:$("#paging").attr("data-page"), 
			cont:"paging",
			curr:$("#paging").attr("data-page-no"),
			groups:$("#paging").attr("data-page-size"),
			jump: function(obj, first){	
				 if(!first){
				 	var layLoad = layer.load(1);//加载等待
					if($selType == '3'){
						var $Url = "/admin/product/recommend/slaves/list.do";
						var data = {
					 		pNo: obj.curr,
					 		pSize:$("#paging").attr("data-page-size"),
					 		status:'4'
					 	};
					}else{
						var $Url = "/admin/ad/examine/list.do";
						var data = {
					 		pageNo: obj.curr,
					 		pageSize:$("#paging").attr("data-page-size"),
					 		status:'0'
					 	};
					}
				 	$.ajax({
						method:"post",
						data:data,
						url:$Url,
						dataType:"json",
						success:function(json){
							if(json.message == "成功"){
								layer.close(layLoad);//清除加载
								if($selType == '3'){//商品
									getFlexImgDatas(json.data.datas.list);//渲染搜索广告列表
								}else{//广告
									getFlexImgDatas(json.data.datas);//渲染搜索广告列表
								}
							}
						}
					});
				 }			 
			}
		});
	};
	
	//弹窗搜索结果反馈操作(隐藏广告列表，显示搜索反馈信息)
	function showFlexSearchMes(showMes){//参数为反馈展示的信息
		$('.secleUrlCont').addClass('hide');
		$('.marginAuto').addClass('hide');
		$('#ibackMes').removeClass('hide').html(showMes);
	}
	//新建轮播图保存
	$('#flexImgSave').on('click', function (){
		var data = btnClickFlex("saveBtn");
		if(data && data.ok){
			var layLoad = layer.load(1);//加载等待
			$.ajax({
				method:"post",
				data:data,
				url:"/operation/flexManagement/addFlexImgMan",
				dataType:"json",
				success:function(json){
					layer.close(layLoad);//清除加载
					if(json.message == "成功"){
						window.location.href="/operation/flexManagement/flexMan";
					}
				},
			});
		}
	});
	//新建轮播图上架
	$('#flexImgUp').on('click', function (){
		var data = btnClickFlex();
		if(data && data.ok){
			if(!data.sort){
				layer.msg('请规范输入排序号！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return false;
			}
			var layLoad = layer.load(1);//加载等待
			$.ajax({
				method:"post",
				data:data,
				url:"/operation/flexManagement/addFlexImgMan",
				dataType:"json",
				success:function(json){
					layer.close(layLoad);//清除加载
					if(json.message == "成功"){
						window.location.href="/operation/flexManagement/flexMan";
					}else{
						layer.msg(json.message);
					}
				}
			});
		}
	});
	function btnClickFlex(btnName){//新建保存时的验证
		var $flexImgName = $('#flexImgName').val() || ''; //轮播图名称
		var $uploadFlexShow = $('#uploadFlexShow').attr('data-url'); //轮播图图片地址
		var $flexSort = $("#flexSort").val()||'';//轮播图排序号
		var platShow = $('.getShowPlats').find('.layui-form-checked').length;//显示平台的勾选项
		var $imgUrls = $('#flexImgUrl').val() || $('#flexImgUrlOut').val() || '';//图片链接内容
		
		if(btnName == 'saveBtn'){//保存时候排序号可以为空
			if($uploadFlexShow || $flexSort || platShow || $imgUrls){
				//4选1可以保存
				//轮播图名称
				var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,15}$/;
				if($flexImgName){
					if(reg.test($flexImgName)){
						$('.tooltip-flexImgName').addClass('hide');
					}else{
						$('.tooltip-flexImgName').removeClass('hide');
						return;
					}
				}
				var reg = /^[1-5]*$/;//轮播图排序号
				if($flexSort){//没有排序号可以保存，但是不能上架
					if(reg.test($flexSort) && $flexSort > 0 && $flexSort < 6){
						$('.tooltip-flexSort').addClass('hide');
					}else{
						$('.tooltip-flexSort').removeClass('hide');
						return;
					}
					
				}
			}else{
				layer.msg("请完善信息");
				return;
			}
		}else{
			if(!$uploadFlexShow && !$flexSort && !platShow){
				layer.msg("请完善信息");
				return;
			}
		}
		
		if($('.layui-form-radio').eq(0).hasClass('layui-form-radioed')){//内部选择广告则传id
			var $types = '2';//作为区分选内部还是外部的字段，后台单独用（和linkType作用几乎一样）
			$('.tooltip-flexImgUrl').addClass('hide');
			var $adld = ''; //轮播图链接
			var $goodsId = ''; //轮播图链接
			if($selType == '3'){
				var $linkType = '3';//1代表外部 2代表内部的广告 3代表内部的商品
				$goodsId = $('#flexImgUrl').attr('data-id')||''; //轮播图链接
			}else{
				var $linkType = '2';//1代表外部 2代表内部的广告 3代表内部的商品
				$adld = $('#flexImgUrl').attr('data-id')||''; //轮播图链接
			}
			var $linkUrl = '';
			if($adld || $goodsId){//验证轮播图链接是否为空(内部)
				$('.tooltip-flexImgUrlLink').addClass('hide');
			}
		}else{
			var $types = '1';//作为区分选内部还是外部的字段，后台单独用（和linkType作用几乎一样）
			$('.tooltip-flexImgUrlLink').addClass('hide');
			var $linkType = '1';
			var $adld = '';
			var $goodsId = '';
			var $linkUrl = $('#flexImgUrlOut').val()||''; //轮播图链接
			if($linkUrl && infoVerify($linkUrl, 'btnUrl')){
				$('.tooltip-flexImgUrl').addClass('hide');
			}else{
				if($linkUrl){
					$('.tooltip-flexImgUrl').removeClass('hide');
					return;
				}
			}
		}
		if(!$uploadFlexShow){//验证轮播图图片地址是否为空
			if(btnName != 'saveBtn'){//保存时候排序号可以为空
				$('.tooltip-addFlexImg').removeClass('hide');
				return;
			}
		}else{
			$('.tooltip-addFlexImg').addClass('hide');
		}
		if(!$flexSort){//验证轮播图排序号是否为空
			if(btnName != "saveBtn"){
				$('.tooltip-flexSort').removeClass('hide');
			}
		}else{
			var reg = new RegExp("^[1-5]{1}$");
			if(reg.test($flexSort)){
				$('.tooltip-flexSort').addClass('hide');
			}else{
				if(btnName != 'saveBtn'){//保存时候排序号可以为空
					$('.tooltip-flexSort').removeClass('hide');
					return;
				}
			}
		}
		var $current = getQueryString('current');//区分是首页还是商城  homePage/mall
		if($current == 'homePage'){
			var $locationType = '1';//首页
		}else if($current == 'mall'){
			var $locationType = '2';//商城
		}else{
			var $locationType = '';
		}
		var data = {
			ok:'1',
			name:$flexImgName,
			type:$types,
			linkType:$linkType||'',
			linkUrl:$linkUrl||'',
			adId:$adld||'',
			goodsId:$goodsId||'',
			imageUrl:$uploadFlexShow,
			sort:$flexSort,
			locationType:$locationType
		};
		if(btnName == "saveBtn"){
			data.handleType = '1';
		}else{
			data.handleType = '2';
		};
		var _id = getQueryString('id');//区分新建时的保存上架还是编辑时的保存上架(有id的为编辑状态)
		if(_id){
			data.circulationId = _id;
		}
		if($('.getShowPlats').find('.layui-form-checkbox').eq(0).hasClass('layui-form-checked') && $('.getShowPlats').find('.layui-form-checkbox').eq(1).hasClass('layui-form-checked')){
			data.platform = '0';//全部
		}else{
			if($('.getShowPlats').find('.layui-form-checkbox').eq(0).hasClass('layui-form-checked') && !$('.getShowPlats').find('.layui-form-checkbox').eq(1).hasClass('layui-form-checked')){//获取显示平台
				data.platform = '2';//安卓
			}else if(!$('.getShowPlats').find('.layui-form-checkbox').eq(0).hasClass('layui-form-checked') && $('.getShowPlats').find('.layui-form-checkbox').eq(1).hasClass('layui-form-checked')){
				data.platform = '1';//IOS
			}else{
				if(btnName != 'saveBtn'){//保存时候排序号可以为空
					layer.msg("请选择显示平台！");
					return;
				}else{
					data.platform = '3';
				}
			}
		}
		return data;
	};
	//弹窗列表点击事件
	var _flexImgUrlId = '';//点击弹窗广告列表后获取当前点击广告的id
	var _flexImgUrlVal = '';//点击弹窗广告列表后获取当前点击广告的内容
	$("body").delegate(".urlContLis","click",function(){
		$('.urlContLis').removeClass('urlContLisHover');
		var _this = $(this);
		_this.addClass('urlContLisHover');
		_flexImgUrlId = _this.find(".urlContLisText").attr('data-id');
		_flexImgUrlVal = _this.find(".urlContLisText").html();
		$("#sureBtnFlex").attr('data-id',_flexImgUrlId);
	});
	//弹窗确定按钮
	$("body").delegate("#sureBtnFlex","click",function(){
		$('#secleUrl').remove();
		$("#flexImgUrl").attr('data-id', _flexImgUrlId);
		$("#flexImgUrl").val(_flexImgUrlVal);
		$('.selectBtnF').attr('data-id', _flexImgUrlId);
		$('.tooltip-flexImgUrlLink').addClass('hide');
	});
	//选择轮播图弹窗数据加载
	function getFlexImgDatas(data){
		$('.urlContItem').empty();
		var iHtml = '';
		for(var i=0;i<data.length;i++){
			if($("#flexImgUrl").attr('data-id') && $("#flexImgUrl").attr('data-id') == data[i].id){//修改
				if($selType == '3'){
					iHtml += '<li class="urlContLis urlContLisHover">'+ (i+1) +'. <span class="urlContLisText" data-id="'+ data[i].id +'">'+ data[i].full_name +'</span></li>';
				}else{
					iHtml += '<li class="urlContLis urlContLisHover">'+ (i+1) +'. <span class="urlContLisText" data-id="'+ data[i].id +'">'+ data[i].name +'</span></li>';
				}
			}else{//初次设置
				if($selType == '3'){
					iHtml += '<li class="urlContLis">'+ (i+1) +'. <span class="urlContLisText" data-id="'+ data[i].id +'">'+ data[i].full_name +'</span></li>';
				}else{
					iHtml += '<li class="urlContLis">'+ (i+1) +'. <span class="urlContLisText" data-id="'+ data[i].id +'">'+ data[i].name +'</span></li>';
				}
			}
		}
		$('.urlContItem').append(iHtml);
	};
});

//轮播图上传
$('.copyUploadBtn').on('click', function (){
	$('#addFlexImg').click();
	$('#addFlexImg').change(function (){
		var fs = new FormData();
		if($("#addFlexImg").attr("data-url")){
			fs.append("oldPath",$("#addFlexImg").attr("data-url"));
		}
		if($("#addFlexImg")[0].files[0]){
			var layLoad = layer.load(1);//加载等待
			fs.append("imageFile",$("#addFlexImg")[0].files[0]);
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
						$('.tooltip-addFlexImg').addClass('hide');
						$("#uploadFlexShow").attr("src",json.data.httpPath);
						$("#uploadFlexShow").attr("data-url",json.data.httpsPath);
						$("#uploadFlexShow").attr("class","imgSize");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
			});		 	
		}
	});
});
//验证轮播图名称
$('#flexImgName').blur(function (){
	var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,15}$/;
	var flexN = $('#flexImgName').val();
	if(flexN && reg.test(flexN)){
		$('.tooltip-flexImgName').addClass('hide');
	}else{
		if(!flexN){
			$('.tooltip-flexImgName').addClass('hide');
			return
		}else{
			$('.tooltip-flexImgName').removeClass('hide');
		}
	}
})
//验证轮播图名称是否符合规范
function getFlexName(){
	var flexN = $('#flexImgName').val();
	if(flexN){
		return infoVerify(flexN, 'goodsNames')
	}else{
		return;
	}
}
//验证手动输入的轮播图链接
$('#flexImgUrlOut').blur(function (){
	var flexImgUrlOutVal = $('#flexImgUrlOut').val() || '';
	if(flexImgUrlOutVal && infoVerify(flexImgUrlOutVal, 'btnUrl')){
		$('.tooltip-flexImgUrl').addClass('hide');
	}else{
		if(flexImgUrlOutVal){
			$('.tooltip-flexImgUrl').removeClass('hide');
			return;
		}
	}
});
//验证轮播图排序
$('#flexSort').blur(function (){
	var flexSortVal = $('#flexSort').val();
	var reg = /^[1-5]*$/;
	if(reg.test(flexSortVal) && flexSortVal > 0 && flexSortVal < 6){
		$('.tooltip-flexSort').addClass('hide');
	}else{
		if(flexSortVal){//没有排序号可以保存，但是不能上架
			$('.tooltip-flexSort').removeClass('hide');
			return;
		}
	}
});
//get 同步刷新页面
var reloadPage = function(pageNo){
	 var data = {
		 producType:getProducType(),
		 shortName:$("#shortName").val(),				 
		 pageNo:pageNo,
		 pageSize:$("#paging").attr("data-page-size"),
	 };		
	 window.location.search = "?producType=" + escape(data.producType) + "&shortName=" +
	 escape(data.shortName) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);	
};
//查询
var queryClick = function(){	 
	 reloadPage($("#paging").attr("data-page-no"));
};