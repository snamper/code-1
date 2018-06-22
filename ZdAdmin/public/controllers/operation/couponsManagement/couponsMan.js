"use strict";
/*运营管理-优惠券管理-优惠券分类管理*/
var coupIfy;//下拉列表优惠券类型的初始化值 
layui.use(['element','paging', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	
	//选择优惠券类型下拉列表
	form.on('select(couponsIfy)',function(data){
//		coupIfy = data.value;
		$('.selCoupons').attr('data-selIfy',data.value);
	});
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				 $("#paging").attr("data-page-no",obj.curr);
				 jumpPage("pSize=10&pNo="+obj.curr);
			};
		}
	});	
});

//搜索
$('#searchBtn').on('click',function (){
	refreshPage();
});

//按条件刷新页面
var refreshPage = function (){
	var batchNum = $('.batchNum').val()||'';//优惠券分类
	var couponType = $('.selCoupons').attr('data-selify')||'';//获取优惠券的类型
	var pageNo =  '1';
	var pageSize = $("#paging").attr("data-page-size");
	window.location.search="?batchNum="+escape(batchNum)+"&couponType="+escape(couponType)+"&pNo="+escape(pageNo)+"&pSize="+escape(pageSize);
};
