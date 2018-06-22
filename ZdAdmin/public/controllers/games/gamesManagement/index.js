"use strict";
//运营管理-小游戏管理-大转盘管理
var layLoad;
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("enDate") ? getQueryString("enDate") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("stDate") ? getQueryString("stDate") : '2017-01-01'//结束日期的最小值
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
				 $("#paging").attr("data-page-no",obj.curr);
				 jumpPage("pSize=10&pNo="+obj.curr);
			};
		}
	});	
});

$('#searchBtn').on('click', function (){//查询
	layLoad = layer.load(2,{
		shade: 0.6
	});//加载等待
	$("#paging").attr("data-page-no",1)
	search();
});

//导出数据
$("#downLoadBtn").on("click", function() {
	if($(this).attr('data-dataLis')){//说明当前列表没有数据
		layer.msg('暂无可导出的数据！');
		return;
	}else{
		var data = {
			stDate: getQueryString('stDate')||'',
			enDate: getQueryString('enDate')||'',
			userPhone: getQueryString('userPhone')||''
		}
		var index = layer.load(2, {
		  shade: [0.6,'#000'] //0.1透明度的白色背景
		});
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/game/lottery/record/excel/export.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(index);
				if(json.message == "成功") {
					var realData = "data:application/vnd.ms-excel;base64,"+json.data;
					var testUrl = realData;
			        var url = URL.createObjectURL(dataURLtoBlob(testUrl));
					$('body').find('#downloadFiles').attr('href',url).attr('download','导出结果.xlsx');
					document.getElementById("downloadFiles").click();			
					layer.msg('导出成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					});
				}else{
					layer.msg(json.message+"，请重新导出！");
				}
			},error: function(){
				layer.close(index);
				layer.msg('导出失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});//ajax
	}
});

//查询
var search = function() {
	if(layLoad){
		layer.closeAll('loading');
	}
	var $stDate = $('#LAY_demorange_s').val();//开始时间
	var $enDate = $('#LAY_demorange_e').val();//截止时间
	var $userPhone = $("#userPhone").val()||'';//手机号
	var pageNo = $("#paging").attr("data-page-no");
	var pageSize = $("#paging").attr("data-page-size");
	window.location.search="?userPhone="+escape($userPhone)+"&stDate="+escape($stDate)+"&enDate="+escape($enDate)+"&pNo="+
			escape(pageNo)+"&pSize="+escape(pageSize);
}