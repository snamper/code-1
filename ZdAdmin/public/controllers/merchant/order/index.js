"use strict";

layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	var orderStatus = 0,status = "",productAdAttr="",productAdType="";
	//切换查询状态
	$(".chooseType>li").on("click", function() {
		orderStatus = $(this).attr("data-orderStatus")
		
		$("#paging").attr("data-page-no",1)
		status = "";
		$(".chooseType").attr("data-orderStatus",orderStatus)
		$(".status").attr("data-status","")
		search()
	})
	//全部订单下选择订单状态
	form.on('select(status)', function(data){
		status = data.value;
		$(".status").attr("data-status",status)
		orderStatus = status
	})
	//全部订单下选择商品广告属性
	form.on('select(productAdAttr)', function(data){
		productAdAttr = data.value;
		$(".productAdAttr").attr("data-productAdAttr",productAdAttr)
	})
	//全部订单下选择类型
	form.on('select(productAdType)', function(data){
		productAdType = data.value;
		$(".productAdType").attr("data-productAdType",productAdType)
	})
	
	//导出订单表格
	$('.derivaBtn').on('click',function (){
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载
		orderStatus = getQueryString('orderStatus')||'0';//支付状态
		productAdAttr = getQueryString('productAdAttr')||'0';//商品广告属性
		productAdType = getQueryString('orderType')||'0'; // 订单类型
		var $starTimes = getQueryString('createTimeBefore')||'';//开始时间
		var $endTimes = getQueryString('createTimeEnd')||'';//截止时间
		var productName = getQueryString('productName')||'';//商品名称
		var userPhone = getQueryString('userPhone')||'';//用户电话
		var orderno = getQueryString('orderno')||'';//订单编号
		var merchantName = getQueryString('merchantName')||'';//商户名称		
		var data = {
			orderStatus: orderStatus,
			productName: productName,
			merchantName: merchantName,
			orderno: orderno,
			createTimeBefore: $starTimes,
			createTimeEnd: $endTimes,
			userPhone: userPhone,
			productAdAttr: productAdAttr,
			orderType: productAdType
		}
		if(data.orderStatus != '0' || data.productName || data.merchantName || data.orderno || data.createTimeBefore || data.createTimeEnd || data.userPhone || 
		data.productAdAttr != '0' || data.orderType != '0'){//搜索条件如果不为空，则可以导出
			$.ajax({
				type: "get",
				dataType: "json",
				url: "/admin/order/manage/list/excel/export.do",
				data:data,
				beforeSend:beforeSend(),
				success: function(json) {
					layer.close(layLoad);//清除加载
					if(json.message == "成功") {
						layer.msg('导出成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							var realData = "data:application/vnd.ms-excel;base64,"+json.data;
							var url = URL.createObjectURL(dataURLtoBlob(realData));
							$('body').find('#downloadFiles').attr('href',url).attr('download', '导出结果.xlsx');
							document.getElementById("downloadFiles").click();
						});
					}else{
						layer.msg(json.message)
					}
				},
				error: function() {
					layer.close(layLoad);//清除加载
					layer.msg('导出失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			})
		}else{//搜索条件为空，则不允许导出(默认条件下由于数据量可能过大，所以不允许导出)
			layer.close(layLoad);//清除加载
			layer.msg('需选择您要导出的数据范围！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
		}
	});
	
	//查询
	var search = function() {
		orderStatus = $(".chooseType").attr("data-orderStatus")
		if($(".status").attr("data-status") ){
			orderStatus = $(".status").attr("data-status")
		}
		productAdAttr = $(".productAdAttr").attr("data-productAdAttr");
		productAdType = $(".productAdType").attr("data-productAdType"); // 订单类型
		if(!productAdAttr) productAdAttr = "0"
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var productName = $(".productName").val();
		var userPhone = $(".userId").val();
		var orderno = $(".orderno").val();
		if(!productName){
			productName = ""
		}
		if(!userPhone){
			userPhone = "";
		}
		var merchantName = $(".merchantName").val();
		if(!merchantName){
			merchantName = ""
		}
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");

		window.location.search="?orderStatus="+orderStatus+"&orderno="+orderno+"&orderType="+productAdType+"&productAdAttr="+productAdAttr+"&status="+status+"&productName="+
			escape(productName)+"&merchantName="+escape(merchantName)+"&userPhone="+escape(userPhone)+"&createTimeBefore="+escape($starTimes)+"&createTimeEnd="+escape($endTimes)+"&pageNo="+pageNo+"&pageSize="+escape(pageSize);
	}
	$('#search').on('click', function (){//订单查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$("#paging").attr("data-page-no",1)
		search()
	});		
	//复制订单编号
	$(".copy").on("click", function(){
		var order = $(this).attr("data-order");
		if(!order) return;
		var clipboard = new Clipboard('.copy', {
			text: function() {
				return order;
			}
		});
		layer.msg("复制成功！")
	})
	//退款
	$(".refund").on("click", function() {
		var orderId = $(this).attr("data-id")
		layer.confirm('您确定要执行退款操作吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "/admin/order/refund.do?orderId="+orderId,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('退款成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},
				error: function() {
					layer.msg('退款失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//发货
	$(".shipping").on("click", function() {
		var orderId = $(this).attr("data-id")
		layer.confirm('您确定要执行发货操作吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "/admin/order/manage/set/shipStatus.do?orderId="+orderId,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('发货成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},
				error: function() {
					layer.msg('修改失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("buyEndTime") ? getQueryString("buyEndTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("buyStartTime") ? getQueryString("buyStartTime") : '2017-01-01'//结束日期的最小值
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
				var data = {
				"orderStatus":getQueryString("orderStatus") || 0,
				"orderno":getQueryString("orderno") || "",
				"orderType":getQueryString("orderType") || 0,
				"productAdAttr":getQueryString("productAdAttr") || "0",
				"status":getQueryString("status") || "",
				"productName":getQueryString("productName") || "",
				"merchantName":getQueryString("merchantName") || "",
				"userPhone":getQueryString("userPhone") || "",
				"pageNo":getQueryString("pageNo") || 1,
				"pageSize":getQueryString("pageSize") || 10,
				"buyStartTime":getQueryString("createTimeBefore") || "",
				"buyEndTime":getQueryString("createTimeEnd") || ""
			}
			window.location.search="?orderStatus="+data.orderStatus+"&productAdAttr="+escape(data.productAdAttr)+"&productName="+escape(data.productName)+
				"&orderno="+escape(data.orderno)+"&orderType="+escape(data.orderType)+"&status="+escape(data.status)+"&userPhone="+escape(data.userPhone)+
				"&merchantName="+escape(data.merchantName)+"&createTimeBefore="+escape(data.buyStartTime)+"&pageNo="+
				obj.curr+"&pageSize="+escape(data.pageSize)+"&createTimeEnd="+escape(data.buyEndTime);
			
			};
		}
	});
	
	//当前时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + getMinutes
	            + seperator2 + getSeconds;
	    return currentdate;
	};
});