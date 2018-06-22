"use strict";
var $thisPreInt;//初始化当前点击选择商品按钮的兄弟节点(input输入框)
//运营管理-任务管理-抽奖任务设置&编辑页面选择商品弹窗事件集合方法   
layui.use(['element', 'paging'], function(){
	$ = layui.jquery;
	$('.selGoodsBtn').on('click', function (){//选择轮播图链接
		$('.secleUrl').removeClass('hide');
		var $this = $(this);
		$thisPreInt = $this.parents('.selGoodsBox').find('.selGoodsInt');//当前点击选择商品按钮的兄弟节点(input输入框)
		layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //关闭按钮
			anim: 1,
			shade: 0,
			area: ['650px', '450px'], //宽高
			title: ['选择商品', 'text-align: center; font-size: 16px;'],
			content: '<div class="secleUrl" class="secleAdvUrl">' +
					'<div class="secleUrlTop">' + 
						'<input type="text" name="urlSearch" class="layui-input urlSearch">' + 
						'<a href="javascript:;" class="layui-btn urlSearchBtn">搜索</a>' + 
					'</div>' + 
					'<div class="secleUrlCont">' + 
						'<ul class="urlContItem">' + 
						'</ul>' +
					'</div>' +
					'<div id="paging" class="pagings" data-page-no="1" data-page="8" data-page-size="10"></div>' +
					'<div class="marginAuto">' + 
						'<a href="javascript:;" class="layui-btn layui-layer-close sureBtnFlex">确定</a>' +
						'<a href="javascript:;" class="layui-btn layui-layer-close cancleBtnFlex">取消</a>' +
					'</div>' +
				'</div>',
			end:function (){//回调执行图片渲染到页面上
			},
			success:function(){//回调函数调出分页组件
				var layLoad = layer.load(1);//加载等待
				var iData = {pNo:"1",pSize:"10",status:"4"};
				$.ajax({
					method:"post",
					data:iData,
					url:"/admin/product/recommend/slaves/list.do",
					dataType:"json",
					success:function(json){
						if(json.message == "成功"){
							layer.close(layLoad);//清除加载
							flexRenderLists(json);//弹窗列表渲染&搜索后列表渲染方法调用
						}
					},
				});
			}
		});
	});
});
var _flexImgUrlId = '';//点击弹窗商品列表后获取当前点击商品的id
var _flexImgUrlVal = '';//点击弹窗商品列表后获取当前点击商品的名称
//弹窗内的搜索点击事件
$("body").delegate(".urlSearchBtn","click",function(){
	var urlSearchVal = $('.urlSearch').val();//搜索的内容
	if(!urlSearchVal){
		layer.msg('请输入内容进行搜索！');
		return false;
	}else{//搜索内容不为空
		var layLoad = layer.load(1);//加载等待
		var data = {
			shortName:urlSearchVal,
			status:'4',
			pNo:"1",
			pSize:"10"
		};
		$.ajax({
			method:"post",
			data:data,
			url:"/admin/product/recommend/slaves/list.do",
			dataType:"json",
			success:function(json){
				if(json.message == "成功"){
					layer.close(layLoad);//清除加载
					flexRenderLists(json);//弹窗列表渲染&搜索后列表渲染方法调用
				}
			}
		});
	}
})
//弹窗列表渲染&搜索后列表渲染
function flexRenderLists(json){
	getFlexImgDatas(json);//渲染搜索商品列表
	$('body').find('#paging').attr('data-page-no',json.data.pageNo);
	$('body').find('#paging').attr('data-page',json.data.totalPage);
	$('body').find('#paging').attr('data-page-size',json.data.pageSize);
	var paging = layui.laypage({
		pages:$('#paging').attr("data-page"), 
		cont:"paging",
		curr:$('#paging').attr("data-page-no"),
		groups:$('#paging').attr("data-page-size"),
		jump: function(obj, first){	
			 if(!first){
			 	var layLoad = layer.load(1);//加载等待
			 	var data = {
			 		status:'4',
			 		pNo: obj.curr,
			 		pSize:$('#paging').attr("data-page-size")
			 	};
			 	$.ajax({
					method:"post",
					data:data,
					url:"/admin/product/recommend/slaves/list.do",
					dataType:"json",
					success:function(json){
						if(json.message == "成功"){
							layer.close(layLoad);//清除加载
							getFlexImgDatas(json);//渲染搜索商品列表
						}
					}
				});
			 }			 
		}
	});//分页组件
};
//弹窗商品列表的点击事件
$("body").delegate(".urlContLis","click",function(){
	$('.urlContLis').removeClass('urlContLisHover');
	var _this = $(this);
	_this.addClass('urlContLisHover');
	_flexImgUrlId = _this.find(".urlContLisText").attr('data-id');
	_flexImgUrlVal = _this.find(".urlContLisText").html();
	$(".sureBtnFlex").attr('data-id',_flexImgUrlId);
});
//弹窗确定按钮
$("body").delegate(".sureBtnFlex","click",function(){//$thisPreInt为选择商品按钮前面的input输入框
	$('.secleUrl').remove();
	$thisPreInt.attr('data-id', _flexImgUrlId);
	$thisPreInt.val(_flexImgUrlVal);
	$thisPreInt.parents('.selGoodsBox ').find('.selGoodsBtn').attr('data-id', _flexImgUrlId);
	$thisPreInt.removeClass('taskPointBorder');
});

//选择商品弹窗数据加载
function getFlexImgDatas(json){
	$('.urlContItem').empty();
	var iHtml = '';
	if(json.data.datas.length == 0){
		iHtml = '<li style="text-align:center; color:red; line-height:50px;">暂无匹配结果！</li>';
		$('.marginAuto').hide();//列表无结果的时候隐藏确认按钮
	}else{
		var len = json.data.datas.list;
		for(var i=0;i<len.length;i++){
			if($(".selGoodsBtn").attr('data-goodsId') && $(".selGoodsBtn").attr('data-goodsId') == len[i].id){//修改
				iHtml += '<li class="urlContLis urlContLisHover">'+ (i+1) +'. <span class="urlContLisText" data-id="'+ len[i].id +'">'+ len[i].full_name +'</span></li>';
			}else{//初次设置
				iHtml += '<li class="urlContLis">'+ (i+1) +'. <span class="urlContLisText" data-id="'+ len[i].id +'">'+ len[i].full_name +'</span></li>';
			}
		}
		$('.marginAuto').show();//列表有结果的时候显示确认按钮
	}
	$('.urlContItem').append(iHtml);
};
