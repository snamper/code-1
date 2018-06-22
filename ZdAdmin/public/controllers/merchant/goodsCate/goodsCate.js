"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(),
		location = 1;
	
	//切换查询状态
	$(".chooseLocation>li").on("click", function() {
		location = $(this).attr("data-location")
		$("#paging").attr("data-page-no",1)
		$('.sortName').val("");
		$('#LAY_demorange_s').val("")
		$('#LAY_demorange_e').val("")
		$(".chooseLocation").attr("data-location",location)
		search()
	})
	//查询
	var search = function() {
		location = $(".chooseLocation").attr("data-location")
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var $sortName = $('.sortName').val();
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?location="+
			escape(location)+"&sortName="+escape($sortName)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+pageNo+"&pageSize="+escape(pageSize);
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1)
		search()
	});		
	//新建、编辑
	var promptBox = ""
	$(".openModal").on("click", function(){
		var goodsCateId = "", sortName = "";
		$(".tooltip-goodsCateName").hide();
		promptBox = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['400px', '210px'], //宽高
			title: ['商品分类', 'text-align: center; font-size: 16px;'],
			content: $('#goodsCateBox')
		});
		if($(this).attr("data-id")) {	//编辑
			goodsCateId = $(this).attr("data-id")
			$(".saveGoodsCate").attr("data-id",goodsCateId)
		}else{							//新增
			$(".saveGoodsCate").removeAttr("data-id")
		}
		if($(this).attr("data-sortName")){
			sortName = $(this).attr("data-sortName");
			$(".goodsCateName").val(sortName)
		} else 
			$(".goodsCateName").val("")
	})
	//新建或者编辑保存
	$(".saveGoodsCate").on("click", function() {
		var data = {}, url = "";
		if(!$(".saveGoodsCate").attr("data-id")){
			url = '/admin/product/sort/add.do';
			data = {sortName:$(".goodsCateName").val()}
		}else{
			url = '/admin/product/sort/update.do';
			data = {
				id:$(".saveGoodsCate").attr("data-id"),
				sortName:$(".goodsCateName").val()
			}
		}
		if(!$(".goodsCateName").check().number(0,20)){
			$(".tooltip-goodsCateName").empty().html("商户分类限制20字符，请重新输入").show();
			return;
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: url,
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						search()
					});
				}else{
					$(".tooltip-goodsCateName").empty().html(json.message).show()
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
	//删除
	$(".delGoodsCate").on("click", function() {
		var goodsCateId = $(this).attr("data-id")
		layer.confirm('您确定要删除该商品分类吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/product/sort/delete.do",
				data: {
					"id":goodsCateId
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
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
	//校验
	$(".goodsCateName").blur(function() {
		if(!$(".goodsCateName").check().number(0,20)){
			$(".tooltip-goodsCateName").empty().html("商户分类限制20字符，请重新输入").show();
		}else{
			$(".tooltip-goodsCateName").hide()
		}
	})
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=10&pageNo="+obj.curr+"&location="+$(".chooseLocation").attr("data-location"));
			};
		}
	});	
	
});