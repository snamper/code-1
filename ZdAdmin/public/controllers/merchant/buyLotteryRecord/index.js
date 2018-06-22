"use strict";
/*商品管理-购彩记录*/
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	var lotteryType = '';//彩种类型初始化
	
	//选择彩种类型
	form.on('select(lotteryType)', function(data){
		lotteryType = data.value;
		$(".lotteryType").attr("data-lotteryType",lotteryType)
	});
	
	//动态获取渲染彩种下拉列表
	getLotteryTypes(lotteryType);
	function getLotteryTypes(lotteryType){//lotteryType 为彩种类型
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/pay/getProductList.do",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var datas = json.data;
			    	var str = '<option value=" ">请选择彩种</option>';
			    	if(datas && datas.length){
			    		lotteryType = $(".lotteryType").attr("data-lotteryType");
			    		for(var i=0;i<datas.length;i++){
			    			if(lotteryType == datas[i].orderName){
			    				str += '<option selected="selected" value="'+ datas[i].orderName +'">'+ datas[i].orderName +'</option>';
			    			}else{
			    				str += '<option value="'+ datas[i].orderName +'">'+ datas[i].orderName +'</option>';
			    			}
				    	}
		    			$('.lotteryType').empty().append(str);
		    			form.render('select');
			    	}
				}else{
					layer.msg(json.message)
				}
			},
			error: function() {
				layer.msg('彩种数据加载失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			}
		});//ajax
	};
	
	//导出订单表格
	$('.derivaBtn').on('click',function (){
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载
		lotteryType = getQueryString('orderNo')||'';//获取当前地址栏里面的彩种
		var $starTimes = getQueryString("startTime")||'';//开始时间
		var $endTimes = getQueryString("endTime")||'';//截止时间
		var phoneNum = getQueryString("phoneNum")||'';
		var orderNum = getQueryString("orderNum")||'';	
		var data = {
			orderNum: orderNum,
			startTime: $starTimes,
			endTime: $endTimes,
			phoneNum: phoneNum,
			orderNo: lotteryType
		}
		if(data.orderNum || data.startTime || data.endTime || data.phoneNum || data.orderNo){//搜索条件如果不为空，则可以导出
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/pay/orderExport.do",
				data:data,
				beforeSend:beforeSend(),
				success: function(json) {
					layer.close(layLoad);//清除加载
					if(json.message == "成功") {
						layer.msg('导出成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							var realData = "data:application/vnd.ms-excel;base64,"+json.data.file;
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
		lotteryType = $(".lotteryType").attr("data-lotteryType") == '0'?'':$(".lotteryType").attr("data-lotteryType");
		var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
		var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
		var phoneNum = $(".phoneNum").val()||'';
		var orderNum = $(".orderNum").val()||'';
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");

		window.location.search="?orderNo="+escape(lotteryType)+"&phoneNum="+escape(phoneNum)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+
		"&orderNum="+escape(orderNum)+"&pageNo="+escape(pageNo)+"&pageSize="+escape(pageSize);
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
	});
	
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
				jumpPage("pageSize=10&pageNo="+obj.curr);
			}
		}
	});
});