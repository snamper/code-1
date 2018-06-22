"use strict";
layui.use(['element', 'form', 'laypage' ], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	
	var promptBox = "";
	$(".showPrize").on("click", function(){
		var id = $(this).attr("data-id");
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		$.ajax({
			type: "get",
			url: "/admin/active/getCouponDetail.do?id="+id,
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(layLoad)
				console.log(json)
				if(json.message == "成功") {
					var prizeList = json.data;
					var html = ""
					promptBox = layer.open({
						type: 1,
						skin: 'layui-layer-molv', //样式类名
						closeBtn: 1, //不显示关闭按钮
						anim: 1,
						shade: 0,
						area: ['1000px', '70%'],
						title: ['奖品列表', 'text-align: center; font-size: 16px;'],
						content: $('#prizeBox'),
						success:function(){
							for(var i = 0; i < prizeList.length; i++){
								html += '<tr>'+
											'<td>'+prizeList[i].batch_num+'</td>'+
											'<td>'+prizeList[i].name+'</td>'+
											'<td>优惠券</td>'+
											'<td>'+prizeList[i].effective+'</td>'+
											'<td>'+prizeList[i].available + "/" +prizeList[i].stock +'</td>'+
										'</tr>'
							}
							console.log(html)
							$("#prizeTable").empty().append(html)
						}
					});
					
					
				}else{
					layer.close(layLoad)
					layer.msg(json.message)
				}
			}
		})
		
	})
	var status = "";
	form.on('select(status)', function(data){
		status = data.value;
		if(status == "-1") status = ""
	})
	//查询
	$(".queryAdver").on("click", function() {
		window.location.href = "/operation/actManagement/activeList?pageNo="+$("#paging").attr('data-page-no')+"&pageSize="+$("#paging").attr('data-page-size')+"&name="+escape($(".name").val())+"&status="+status
	})
	
	//上线
	$(".lineopration").on("click", function(){
		var message = "",
			message1 = "",
			id = $(this).attr("data-id"),
			status = $(this).attr("data-status")
		if($(this).attr("data-status") == 1) {
			message="上线成功";
			message1  = "确定上线？"
		}else {
			message="下线成功";
			message1="确定下线？";
		}
		layer.confirm(message1, {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				url: "/admin/active/updateActiveStatus.do",
				data:{
					id:id,
					status:status
				},
				beforeSend:beforeSend(),
				success: function(json) {
					console.log(json)
					if(json.message == "成功") {
						layer.msg("操作成功", {
							time: 1000, //1s后自动关闭
							icon: 1
						}, function(){
							window.location.href = "/operation/actManagement/activeList"
						});
						
					}else{
						layer.msg(json.message, {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				},error: function(){
					layer.msg("操作失败", {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
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
	

});