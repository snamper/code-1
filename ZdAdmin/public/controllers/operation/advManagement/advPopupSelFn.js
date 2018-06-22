"use strict";
//运营管理-广告管理-设置&编辑页面选择广告弹窗事件集合方法   
layui.use(['element'], function(){
	$ = layui.jquery;
	$('#selectAdvsBtn').on('click', function (){//选择轮播图链接
		$('.secleUrl').removeClass('hide');
		var $this = $(this);
		layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //关闭按钮
			anim: 1,
			shade: 0,
			area: ['50%', '60%'], //宽高
			title: ['选择链接', 'text-align: center; font-size: 16px;'],
			content: '<div id="secleUrl" class="secleAdvUrl">' +
					'<div class="secleUrlTop">' + 
						'<input type="text" name="urlSearch" class="layui-input" id="urlSearch">' + 
						'<a href="javascript:;" class="layui-btn" id="urlSearchBtn">搜索</a>' + 
					'</div>' + 
					'<div id="ibackMes" class="hide" style="text-align:center; color:red; line-height:50px;"></div>' +
					'<div class="secleUrlCont">' + 
						'<ul class="urlContItem">' + 
						'</ul>' +
					'</div>' +
					'<div id="paging" class="pagings" data-page-no="1" data-page="8" data-page-size="10"></div>' +
					'<div class="marginAuto">' + 
						'<a href="javascript:;" class="layui-btn layui-layer-close" id="sureBtnFlex">确定<i id="showNum" class="hide">0</i></a>' +
						'<a href="javascript:;" class="layui-btn layui-layer-close" id="cancleBtnFlex">取消</a>' +
					'</div>' +
				'</div>',
			end:function (){//回调执行图片渲染到页面上
			},
			success:function(){//回调函数调出分页组件
				var layLoad = layer.load(1);//加载等待
				var iData = {pageNo:"1",pageSize:"10",status:"7"};
				$.ajax({
					method:"post",
					data:iData,
					url:"/operation/advManagement/popupAdv",
					dataType:"json",
					success:function(json){
						if(json.message == "成功"){
							layer.close(layLoad);//清除加载
							if($('#chooseAdv').attr('data-id')){
								$('#sureBtnFlex').attr('data-id',$('#chooseAdv').attr('data-id') + ',');
								$('#sureBtnFlex').attr('data-vals',$('#chooseAdv').val() + ',');
							}else{
								$('#sureBtnFlex').attr('data-id','');
								$('#sureBtnFlex').attr('data-vals','');
							}
							
							$('#paging').attr('data-page-no',json.data.pageNo);
							$('#paging').attr('data-page',json.data.totalPage);
							$('#paging').attr('data-page-size',json.data.pageSize);
							getFlexImgDatas(json.data.datas);//渲染广告列表
							
							var paging = layui.laypage({
								pages:$("#paging").attr("data-page"), 
								cont:"paging",
								curr:$("#paging").attr("data-page-no"),
								groups:$("#paging").attr("data-page-size"),
								jump: function(obj, first){	
									 if(!first){
									 	var layLoad = layer.load(1);//加载等待
									 	var data = {
									 		pageNo: obj.curr,
									 		pageSize:$("#paging").attr("data-page-size")
									 	};
									 	$.ajax({
											method:"post",
											data:data,
											url:"/operation/advManagement/popupAdv",
											dataType:"json",
											success:function(json){
												if(json.message == "成功"){
													layer.close(layLoad);//清除加载
													getFlexImgDatas(json.data.datas);//渲染搜索广告列表
												}
											}
										});
									 }			 
								}
							});
						}
					},
				});
			}
		});
	});
});
//弹窗内的搜索点击事件
$("body").delegate("#urlSearchBtn","click",function(){
	var urlSearchVal = $('#urlSearch').val();//搜索的内容
	if(!urlSearchVal){
		showFlexSearchMes('请输入内容进行搜索！');
	}else{//搜索内容不为空
		$('.secleUrlCont').removeClass('hide');
		$('.marginAuto').removeClass('hide');
		$('#ibackMes').addClass('hide');
		var layLoad = layer.load(1);//加载等待
		var data = {
			name:urlSearchVal,
			pageNo:"1",
			pageSize:"10"
		};
		$.ajax({
			method:"post",
			data:data,
			url:"/operation/advManagement/popupAdv",
			dataType:"json",
			success:function(json){
				if(json.message == "成功"){
					layer.close(layLoad);//清除加载
					if(!json.data.datas.length){//内容搜索无数据返回
						showFlexSearchMes('未查询到您输入的内容！');
					}else{//内容搜索有数据返回
						getFlexImgDatas(json.data.datas);//渲染搜索广告列表
						$('body').find('#paging').attr('data-page-no',json.data.pageNo);
						$('body').find('#paging').attr('data-page',json.data.totalPage);
						$('body').find('#paging').attr('data-page-size',json.data.pageSize);
						var paging = layui.laypage({
							pages:$("#paging").attr("data-page"), 
							cont:"paging",
							curr:$("#paging").attr("data-page-no"),
							groups:$("#paging").attr("data-page-size"),
							jump: function(obj, first){	
								 if(!first){
								 	var layLoad = layer.load(1);//加载等待
								 	var data = {
								 		pageNo: obj.curr,
								 		pageSize:$("#paging").attr("data-page-size")
								 	};
								 	$.ajax({
										method:"post",
										data:data,
										url:"/operation/advManagement/popupAdv",
										dataType:"json",
										success:function(json){
											if(json.message == "成功"){
												layer.close(layLoad);//清除加载
												getFlexImgDatas(json.data.datas);//渲染搜索广告列表
											}
										}
									});
								 }			 
							}
						});//分页组件
					}
				}
			}
		});
	}
})
//弹窗搜索结果反馈操作(隐藏广告列表，显示搜索反馈信息)
function showFlexSearchMes(showMes){//参数为反馈展示的信息
	$('.secleUrlCont').addClass('hide');
	$('.marginAuto').addClass('hide');
	$('#ibackMes').removeClass('hide').html(showMes);
}
//弹窗列表点击事件
var onOff = '1';//1代表选中，0代表取消
var $selLis = Number($("#selectAdvsBtn").attr('data-nums')) || 0;
if($selLis){
	var num = $selLis;//选中的个数
}else{
	var num = 0;//选中的个数
}
var sureBtnIds = '';//列表点击的时候生成新的id字符传
var sureBtnVals = '';//列表点击的时候生成新的名称字符传
$("body").delegate(".urlContLis","click",function(){
	var _this = $(this);
	if(_this.hasClass('urlContLisHover')){
		_this.attr('onOff','0');
	}else{
		if(_this.attr('onOff') == '1'){
			_this.attr('onOff',onOff);
		}else{
			_this.attr('onOff','1');
		}
	}
	var _thisOnOff = _this.attr('onOff');
	if(_thisOnOff == '1'){
		$('#showNum').removeClass('hide');
		num++;
		$('#showNum').html(num);
		_this.addClass('urlContLisHover');
		sureBtnIds += _this.find(".urlContLisText").attr('data-id')+',';
		sureBtnVals += _this.find(".urlContLisText").html()+',';
	}else{
		num--;
		if(num <= 0){
			num = 0;
			$('#showNum').addClass('hide');
		}
		$('#showNum').html(num);
		_this.removeClass('urlContLisHover');
		_thisOnOff = '0';
		if(num == 0){
			sureBtnIds = '';
			sureBtnVals = '';
		}else{
			var arrVals = sureBtnVals.substring(0,sureBtnVals.length-1).split(',');
			var arrIds = sureBtnIds.substring(0,sureBtnIds.length-1).split(',');
			arrVals.splice($.inArray(_this.find(".urlContLisText").html(),arrVals),1);
			arrIds.splice($.inArray(_this.find(".urlContLisText").attr('data-id'),arrIds),1);
			sureBtnIds = arrIds.join() + ',';
			sureBtnVals = arrVals.join() + ',';
		}
	}
	onOff = '0';
	$('#sureBtnFlex').attr('data-id',sureBtnIds);
	$('#sureBtnFlex').attr('data-vals',sureBtnVals);
	$('#selectAdvsBtn').attr('data-newIds',sureBtnIds);
	$('#selectAdvsBtn').attr('data-names',sureBtnVals);
});
//弹窗确定按钮
$("body").delegate("#sureBtnFlex","click",function(){
	var $this = $(this);
	var $nums = $this.find('#showNum').html()||0;//记录选中广告的条数
	var _flexImgUrlId = '';//点击弹窗广告列表后获取当前点击广告的id
	var _flexImgUrlVal = '';//点击弹窗广告列表后获取当前点击广告的内容
	var str = '';
	$("#chooseAdv").val(str);
	$("#chooseAdv").attr('title',str);
	if($this.attr('data-id')){
		_flexImgUrlId = $this.attr('data-id');
		_flexImgUrlVal = $this.attr('data-vals');
		_flexImgUrlId = _flexImgUrlId.substring(0,_flexImgUrlId.length-1);
		_flexImgUrlVal = _flexImgUrlVal.substring(0,_flexImgUrlVal.length-1);
	}
	$('#secleUrl').remove();
	$('#selectAdvsBtn').attr('data-selAdvs',_flexImgUrlId);
	$("#chooseAdv").attr('data-id', _flexImgUrlId);
	$("#selectAdvsBtn").attr('data-nums',$nums);
	if($('#selectAdvsBtn').attr('data-names')){
		var iVal = $('#selectAdvsBtn').attr('data-names');
		iVal = iVal.substring(0,iVal.length-1);
		$("#chooseAdv").val(iVal);
		$("#chooseAdv").attr('title',iVal);
	}else{
		$("#chooseAdv").val(_flexImgUrlVal);
		$("#chooseAdv").attr('title',_flexImgUrlVal);
	}
});
//选择轮播图弹窗数据 加载
function getFlexImgDatas(data){
	$('.urlContItem').empty();
	var iHtml = '';
	for(var i=0;i<data.length;i++){
		iHtml += '<li class="urlContLis">'+ (i+1) +'. <span class="urlContLisText" data-id="'+ data[i].id +'">'+ data[i].name +'</span></li>';
	}
	$('.urlContItem').append(iHtml);
	
	var $hasAdvIds = $('#sureBtnFlex').attr('data-vals');//把之前选中的数据带回来重新渲染在列表里
	var $sureBtnId = $('#sureBtnFlex').attr('data-id');
	if($sureBtnId){//把之前选中的数据带回来重新渲染在列表里
		var lenBox = $sureBtnId.substring(0,$sureBtnId.length - 1).split(',');
		var len = lenBox.length;
		$('#showNum').removeClass('hide').html(len);//选中的个数
		for(var i=0;i<data.length;i++){
			var lis = $('.urlContLisText').eq(i).attr('data-id');
			for(var j=0;j<len;j++){
				if(lis == lenBox[j]){
					$('.urlContLis').eq(i).addClass('urlContLisHover');
				}
			}
		};
	}
};
