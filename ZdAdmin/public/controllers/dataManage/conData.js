"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();


	//查询
	var search = function(pn) {
		var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
		var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
		var pageNo = pn;
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+pageNo+"&pageSize="+escape(pageSize);
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		search('1');
	});	
//下载
	$("#downLoadBtn").on("click", function() {
	  	var id = getQueryString('id') ;
	  	var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
		var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
		var data = {
			startTime: 	$starTimes,
			endTime: $endTimes
		}
		// 
		var index = layer.load(2, {
		  shade: [0.6,'#000'] //0.1透明度的白色背景
		});
   		$.ajax({
			type: "post",
			dataType: "json",
			url: '/admin/goods/statistics/export.do',
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(index);
				if(json.message == "成功") {
					var realData = "data:application/vnd.ms-excel;base64,"+json.data;
					var testUrl = realData;
			        var url = URL.createObjectURL(dataURLtoBlob(testUrl));
					$('body').find('#downloadFiles').attr('href',url).attr('download','下载结果.xlsx');
					document.getElementById("downloadFiles").click();	
					layer.msg('下载成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					});
				}else{
					layer.msg(json.message+"，请重新下载！");
				}
			},
			error: function(){
				layer.close(index);
				layer.msg('下载失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
	
	//初始化日期组件
	if($('.layui-form').eq(0).hasClass('dataPlug')){//判断数据是否请求成功
		var opt = {
			sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
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
				jumpPage("pageSize=20&pageNo="+obj.curr);
			};
		}
	});	
});