"use strict";
layui.use(['element', 'form', 'laypage' ], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form(); //加载form模块
	var type = 1;
		
	//选择类型
	form.on('radio', function(data){
		type = data.value;
		if(type == 1) {
			$(".act-edit-active").removeClass("hide");
			$(".act-channel-main").addClass("hide");
		}else {
			$(".act-edit-active").addClass("hide");
			$(".act-channel-main").removeClass("hide");
		}
	})
	
	
	
	
	var nameflag=false,registerFundflag=true,nextdayFundflag=true,nextweekFundflag=true,downloadFundflag=true;
	
	//验证
	
	if( getQueryString("name") ){
		nameflag = true
	}
	
	$('#moudle-name').blur(function(){
		var message = ""
		if(!$("#moudle-name").check().number(1,10)){
			message = "请输入10字内模板名称"
			$('.moudle-info').empty().html(message).show();
			nameflag=false
		}else{
			$('.moudle-info').hide()
			if(!$("#moudle-name").check().specialChar()){
				message = "模板名称不能有特殊字符"
				$('.moudle-info').empty().html(message).show();
				nameflag=false;
			}else{
				$('.moudle-info').hide();
				nameflag = true;
			}
		}
	});
	
	
	
	//注册佣金验证
	$('.registerFund').blur(function(){
		var message = "";
		var val = $(this).val()
		var reg = /(^[0-9]{1,})+(.[0-9]{0,2})?$/;
		if( !reg.test(val) || val == 0 ){
			message = "请输入大于0的数字且最多保留两位小数"
			$('.registerFund-info').empty().html(message);
			registerFundflag=false;
		}else{
			$('.registerFund-info').empty();
			registerFundflag=true
		}
	});
	
	//次日留存
	$('.nextdayFund').blur(function(){
		var message = "";
		var val = $(this).val()
		var reg = /(^[0-9]{1,})+(.[0-9]{0,2})?$/;
		if( !reg.test(val) || val == 0 ){
			message = "请输入大于0的数字且最多保留两位小数"
			$('.nextdayFund-info').empty().html(message);
			nextdayFundflag=false;
		}else{
			$('.nextdayFund-info').empty();
			nextdayFundflag=true
		}
	});
	//周留存
	$('.nextweekFund').blur(function(){
		var message = "";
		var val = $(this).val()
		var reg = /(^[0-9]{1,})+(.[0-9]{0,2})?$/;
		if( !reg.test(val) || val == 0  ){
			message = "请输入大于0的数字且最多保留两位小数"
			$('.nextweekFund-info').empty().html(message);
			nextweekFundflag=false;
		}else{
			$('.nextweekFund-info').empty();
			nextweekFundflag=true;
		}
	});
	//下载
	$('.downloadFund').blur(function(){
		var message = "";
		var val = $(this).val()
		var reg = /(^[0-9]{1,})+(.[0-9]{0,2})?$/;
		if( !reg.test(val) || val == 0 ){
			message = "请输入大于0的数字且最多保留两位小数"
			$('.downloadFund-info').empty().html(message);
			downloadFundflag=false;
		}else{
			$('.downloadFund-info').empty();
			downloadFundflag=true;
		}
	});
	
	
	form.on('checkbox', function(data){
	 if( data.elem.checked ) {
		 	$(data.elem).parents('.layui-form-item').find('.layui-input').attr('disabled',false)
		 }else {
		 	$(data.elem).parents('.layui-form-item').find('.layui-input').attr('disabled',true)
		 	$(data.elem).parents('.layui-form-item').find('.info').empty();
		 	$(data.elem).parents('.layui-form-item').find('.layui-input').val("")
		}
	});  
	
	//保存设置 
	$('.changeSure').on('click', function() {
		var flag = false;
		for (var i=0; i < $(".input-value ").length; i++) {
			if( !$(".input-value ").eq(i).attr('disabled') ) {
				if( !$(".input-value ").eq(i).val().length ) {
					flag = true;
				}
			}
		}
		if(!flag) {
			
			if( nameflag && registerFundflag && nextdayFundflag && nextweekFundflag && downloadFundflag ) {
				var name = $('#moudle-name').val();
				var registerFund = $(".registerFund").val();
				var nextdayFund = $(".nextdayFund").val();
				var nextweekFund = $(".nextweekFund").val();
				var downloadFund = $(".downloadFund").val();
				
				if ($(".changeSure").attr("data-id")) {
					var id = $(".changeSure").attr("data-id")
					var data = {
						id:id,
						name:name,
						registerFund: registerFund,
						nextdayFund: nextdayFund,
						nextweekFund: nextweekFund,
						downloadFund: downloadFund
					}
					
					layer.confirm('确定更改设置吗？', {
						btn: ['确认', '取消'] //按钮
						}, function() {
							$.ajax({
								type: "post",
								url: "/admin/spread/channel/updatefund.do",
								data:data,
								beforeSend:beforeSend(),
								success: function(json) {
									if(json.message == "成功") {
										layer.msg("保存成功！", {
											time: 1000, //1s后自动关闭
											icon: 1
										},function(){
											window.location.href="/operation/actManagement/spreadChannel";
										})
									}else{
										layer.msg(json.message)
									}
								}
							})
						})						
				}else{
					
					var data = {
						name:name,
						registerFund: registerFund,
						nextdayFund: nextdayFund,
						nextweekFund: nextweekFund,
						downloadFund: downloadFund
					}

					layer.confirm('确定保存设置吗？', {
					btn: ['确认', '取消'] //按钮
					}, function() {
						$.ajax({
							type: "post",
							url: "/admin/spread/channel/addfund.do",
							data:data,
							beforeSend:beforeSend(),
							success: function(json) {
								if(json.message == "成功") {
									layer.msg("保存成功！", {
										time: 1000, //1s后自动关闭
										icon: 1
									},function(){
										window.location.href="/operation/actManagement/spreadChannel";
									})
								}else{
									layer.msg(json.message)
								}
							}
						})
					})
				}
						
			}else {
				layer.msg("渠道名称未填写或佣金格式不正确！", {
					time: 1000, //1s后自动关闭
					icon: 2
				})
			}
			
		}else {
			layer.msg("存在选中条件，佣金未填写！", {
					time: 1000, //1s后自动关闭
					icon: 2
			})
		}
	})
	//删除模板
	$(".deleteMoudle").on("click", function() {
		var id = $(this).attr("data-id");
		layer.confirm('确定删除吗？', {
		btn: ['确认', '取消'] //按钮
			}, function() {
				$.ajax({
					type: "get",
					url: "/admin/spread/channel/deletefund.do",
					data:{
						id:id
					},
					beforeSend:beforeSend(),
					success: function(json) {
						if(json.message == "成功") {
							layer.msg("删除成功！", {
								time: 1000, //1s后自动关闭
								icon: 1
							},function(){
								window.location.href="/operation/actManagement/spreadChannel";
							})
						}else{
							layer.msg(json.message)
						}
					}
				})
			})
	})
	
	
	$(".editMoudle").on("click", function() {
		var id = $(this).attr("data-id");
		var name = $(this).attr("data-name");
		var day = $(this).attr("data-day");
		var down = $(this).attr("data-down");
		var week = $(this).attr("data-week");
		var register = $(this).attr("data-register");

		window.location.href="/operation/actManagement/newMoudle?name="+ escape(name) +"&id="+ escape(id) + "&day="+ escape(day) +"&down="+escape(down) +"&week="+escape(week)+"&register="+escape(register);
		
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