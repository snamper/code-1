"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	
	$('.queryAdvertiser').on('click', function (){ //查询
		$("#paging").attr("data-page-no",1)
		search()
		
	});	
	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间

		var data = {
			stDate: $starTimes,
			enDate: $endTimes,
			id: getQueryString("id"),
			pageNo:$("#paging").attr("data-page-no"),
			pageSize:$("#paging").attr("data-page-size")
		};
		window.location.search="?startTime="+escape(data.stDate)+"&endTime="+escape(data.enDate)+"&id="+escape(data.id)+"&pageNo="+escape(data.pageNo)+"&pageSize="+escape(data.pageSize);
	}
	
	$(".userBtn").on('click', function(){
		var _this = this;
		var data = {
			id: getQueryString("id"),
			pageNo:1,
			pageSize:10,
			regTime: $(_this).attr("data-date")
		};
		window.location.href="/operation/actManagement/userList?id="+escape(data.id)+"&pageNo="+escape(data.pageNo)+"&pageSize="+escape(data.pageSize)+"&regTime="+escape(data.regTime);
	})
	//分页模块Math.ceil		
	var pageNo = $("#paging").attr('data-page-no') ? $("#paging").attr('data-page-no') : "1";
	var pageSize = $("#paging").attr('data-page-size') ? $("#paging").attr('data-page-size') : "10";
	var pages = Math.ceil($("#paging").attr('data-page') / pageSize);
	var paging = layui.laypage({
		pages: pages, //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: pageNo, //当前页
		groups: pageSize, //连续分页数
		jump: function(obj, first) {
			//得到了当前页，用于向服务端请求对应数据
			//var curr = obj.curr;
			if(!first) {
				$("#paging").attr('data-page-no',obj.curr)
				jumpPage("pageSize=10&pageNo="+obj.curr );
			}
		}
	});
	
	var dateStart = getQueryString("endTime") ? getQueryString("endTime") : laydate.now();
	var dateEnd = getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01';
	var start = {
		min: '2017-01-01',
		max: dateStart,
		istime: false,
		istoday: false, 
		format: 'YYYY-MM-DD',
		choose: function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	
	var end = {
		min: dateEnd,
		max: laydate.now(),
		istime: false,
		istoday: false, 
		format: 'YYYY-MM-DD',
		choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	
	document.getElementById('LAY_demorange_s').onclick = function() {
		start.elem = this;
		laydate(start);
	}
	document.getElementById('LAY_demorange_e').onclick = function() {
		end.elem = this
		laydate(end);
	}
	
	//复制链接
	
	
	var btn = document.getElementById('copy');
	    var clipboard = new Clipboard(btn);//实例化
	
	    //复制成功执行的回调
	    clipboard.on('success', function(e) {
	        layer.msg('链接已复制到剪切板！', {
					time: 1500, //1s后自动关闭
					icon: 1
				});
	    });

	    clipboard.on('error', function(e) {
	        layer.msg('链接复制失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
	    });  
	  //导出表格
	  
	  $("#getExcealBtn").on("click", function() {
	  	var id = getQueryString('id') ;
	  	var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
		var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
   		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/spread/channel/exportchanneldetail.do?id="+ id+"&startTime="+ $starTimes +"&endTime="+ $endTimes,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var realData = "data:application/vnd.ms-excel;base64,"+json.data.file;
					$('body').find('#downloadFiles').attr('href',realData).attr('download','导出结果.xlsx');
					document.getElementById("downloadFiles").click();
					if(json.message == "成功"){
						layer.msg('导出成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						});
					}else{
						layer.msg(json.message+"，请重新导出！");
					}
				}
			},error: function(){
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	  })
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