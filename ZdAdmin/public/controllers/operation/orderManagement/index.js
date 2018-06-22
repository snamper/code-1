"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	//切换商品广告属性查询(购买商品&广告商品)
	form.on('select(productAdAttr)', function(data){
		$('.productAdAttr').attr('data-productAdAttr', data.value);
	});
	
	//查询
	var search = function(pn) {
		var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
		var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
		var shortName = $("#shortName").val()||'';
		var productAdAttr = $('.productAdAttr').attr('data-productAdAttr')||'';
		if(productAdAttr == '0'){
			productAdAttr = '';
		}
		var pageNo = pn;
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?productAdAttr="+escape(productAdAttr)+"&stDate="+escape($starTimes)+"&shortName="+escape(shortName)+"&enDate="+
		escape($endTimes)+"&pNo="+pageNo+"&pSize="+escape(pageSize);
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		search('1');
	});		

	//商品提交审核
	$(".submitGoods").on("click", function() {
		var advertId = $(this).attr("data-id")
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/merchant/cmdMan/submit",
				data: {
					"id":advertId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('提交成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search('1');
						});
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						})
					}
				},
				error: function() {
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
	//初始化日期组件
	if($('.layui-form').eq(0).hasClass('dataPlug')){//判断数据是否请求成功
		var opt = {
			sMax: getQueryString("enDate") ? getQueryString("enDate") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("stDate") ? getQueryString("stDate") : '2017-01-01'//结束日期的最小值
		};
		var dateIint = new dateComponent(opt);
	}
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				var $starTimes = getQueryString('stDate')||'';//开始时间
				var $endTimes = getQueryString('enDate')||'';//截止时间
				var fullName = getQueryString('stDate')||'';
				var shortName = getQueryString('shortName')||'';
				var productAdAttr = $('.productAdAttr').attr('data-productAdAttr')||'';
				if(productAdAttr == '0'){
					productAdAttr = '';
				}
				var pageNo = obj.curr;
				var pageSize = $("#paging").attr("data-page-size");
				window.location.search="?productAdAttr="+escape(productAdAttr)+"&stDate="+escape($starTimes)+"&shortName="+escape(shortName)+
					"&enDate="+escape($endTimes)+"&pNo="+pageNo+"&pSize="+escape(pageSize);
			};
		}
	});	
});