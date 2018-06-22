"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	var spreadType = "",        //类型
		status = ""			//状态
	
	//选择类型
	form.on('select(type)', function(data){
		spreadType = data.value;
		$(".adverType").attr("data-type",spreadType)
	})
	//选择状态
	form.on('select(status)', function(data){
		status = data.value;
		$(".Adverstatus").attr("data-status",status)
	})
	
	$('.queryAdvertiser').on('click', function (){ //查询
		$("#paging").attr("data-page-no",1)
		search()
		
	});	
	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val();//开始时间
		var $endTimes = $('#LAY_demorange_e').val();//截止时间
		var $oTypes = $("#merchantId").val();
		
		var data = {
			status:$(".Adverstatus").attr("data-status"),
			spreadType:$(".adverType").attr("data-type"),
			stDate: $starTimes,
			enDate: $endTimes,
			spreadName: $oTypes,
			pageNo:$("#paging").attr("data-page-no"),
			pageSize:$("#paging").attr("data-page-size")
		};
		window.location.search="?startTime="+escape(data.stDate)+"&closed="+status+"&spreadType="+
			escape(data.spreadType)+"&endTime="+escape(data.enDate)+"&spreadName="+escape(data.spreadName)+"&pageNo="+escape(data.pageNo)+"&pageSize="+escape(data.pageSize);
	}
	//关闭渠道
	$(".closeChannel").on("click", function(){
		var _this = this;
		console.log($(_this).attr("data-id"))
		layer.confirm('您确定要关闭改渠道吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/spread/channel/closechannel.do",
				data:{
					"channelId":$(_this).attr("data-id"),
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('关闭成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});	
					}else {
						layer.msg(json.message)
					}
				},error: function(){
					layer.msg('关闭失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//恢复渠道  openChannel
	
	$(".openChannel").on("click", function(){
		var _this = this;
		console.log($(_this).attr("data-id"))
		layer.confirm('您确定要恢复渠道吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/spread/channel/openchannel.do",
				data:{
					"channelId":$(_this).attr("data-id"),
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('恢复成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});	
					}else {
						layer.msg(json.message)
					}
				},error: function(){
					layer.msg('恢复失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
	
	// 恢复/关闭活动
	$(".openActive").on("click", function(){
		var _this = this;
		console.log($(_this).attr("data-state"));
		
		if( $(_this).attr("data-state") == 0 ) {
			var mesInfo =  "您确定要恢复活动吗？";
			var info = "恢复成功";
			var err = "恢复失败" ;
		}else {
			var mesInfo =  "您确定要关闭活动吗？";
			var info = "关闭成功";
			var err = "关闭失败" ;
		}
		
		layer.confirm(mesInfo, {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/spread/event/state/change.do",
				data:{
					"spreadEventId":$(_this).attr("data-id"),
					"state": $(_this).attr("data-state")
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg(info, {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							search()
						});	
					}else{
						layer.msg(json.message)
					}
				},error: function(){
					layer.msg(err, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
	//修改活动
	
	

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
	
	
	
	
	
});