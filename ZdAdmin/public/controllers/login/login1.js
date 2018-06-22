"use strict";
layui.use(['element', 'form'], function() {
	$ = layui.jquery;
	var form = layui.form(); //加载form模块
	var ifNeddCode = false; //用来记录是否需要验证码
	form.verify({
		//验证用户名是否正确（手机号）
		phone: function(value, item) { //value：表单的值、item：表单的DOM对象
			if((!(/^1[3|4|5|7|8]\d{9}$/.test(value)))) {
				return '手机号输入不正确，请重新输入！';
			}
		}
	});
	//监听回车键
	document.onkeydown=function(event){
	    var e = event || window.event || arguments.callee.caller.arguments[0];

	     if(e && e.keyCode==13 && !ifNeddCode){ // enter 键
         //要做的事情
         	$('#checkBtn').click();
    	}
	}
	var loadCover = ""
	$(".savePermissionMessage").on("click", function() {
		if(!$(".code").val()){
			layer.msg('请输入验证码!')
		}else{
			layer.close(loadCover)
			ifNeddCode = false
		}
	})
	
	var getMenu = function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/login/getMenu",			
			success: function(json) {
				if(json.message == "成功"){
					var menuList = json.data;
					for(var i in menuList){
						
						if(menuList[i] && menuList[i].length > 0){
							var curCodeLength = [];
							for(var n = 0; n < menuList[i].length; n++){
								var message = {};
								message.name = escape(menuList[i][n].name)
								curCodeLength.push(message)
							}
							setCookie(i, ''+JSON.stringify(curCodeLength), 1,i);
						}
					}
					window.location.href = "/";
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
				
			}
		})
	}
	
	var login = $("#checkBtn").on("click",function(){
		if(!(/^1[3|4|5|7|8]\d{9}$/.test($(".phone").val()))){
			layer.msg('手机号输入不正确！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
		if(!$(".userPwd").val()){
			layer.msg('请输入密码！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
		if(ifNeddCode && !$(".code").val()){
			layer.msg('请输入验证码！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
			loadCover = layer.open({
				type: 1,
				skin: 'layui-layer-molv', //样式类名
				closeBtn: 0, //不显示关闭按钮
				anim: 1,
				shade: 0,
				area: ['30%', '230px'], //宽高
				title: ['验证码', 'text-align: center; font-size: 16px;'],
				content: $('#codeBox')
			});
			ifNeddCode = true;
			return;
		}
		var data = {
			"phone":$(".phone").val(),
			"userPwd":$(".userPwd").val()
		}
		if($(".code").val()){
			data.vilidateCode = $(".code").val()
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/user/login.do",
			data: data,
			beforeSend:function(){
				
			},
			success: function(json) {
				if(json.message == "成功") {
					
					layer.msg('登录成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					});
					var userMessage = {
						"userId":json.data.id,
						"phone":json.data.phone,
						"name": escape(json.data.name)
					}
					setCookie('userMessage', ''+JSON.stringify(userMessage), 1);
					$.ajax({
						type: "post",
						dataType: "json",
						url: "/login/getResource",
						success: function(result) {
							getMenu()
							if(result.message == "成功") {
								var resourceList = [];
								var firResource = [];
								var name1 = [], name2 = [], name3 = [], name4 = [];
								for(var i = 0; i < result.data.length; i++){
									var resource = {};
									resource.name = escape(result.data[i].name);
									resource.manu_url = result.data[i].manu_url;
									resource.menu_id = result.data[i].menu_id;
									
									
									if(result.data[i].children){
										for(var n = 0; n < result.data[i].children.length; n++){
											result.data[i].children[n].name = escape(result.data[i].children[n].name)
											if(result.data[i].children[n].children && result.data[i].children[n].children.length > 0){
												for(var j = 0; j < result.data[i].children[n].children.length; j++){
													result.data[i].children[n].children[j].name = escape(result.data[i].children[n].children[j].name)
												}
											}
										}
										resource.children = result.data[i].children;
										firResource.push({"name":escape(result.data[i].name),"manu_url":result.data[i].children[0].manu_url,"menu_id":result.data[i].menu_id})
									}else{
										firResource.push({"name":escape(result.data[i].name),"manu_url":result.data[i].manu_url,"menu_id":result.data[i].menu_id})
									}
//									if(i <= 2){
//										name1.push(resource)
//									}else if(i > 2 && i <= 5){
//										name2.push(resource)
//									}else if(i > 5 && i <= 9){
//										name3.push(resource)
//									}else{
//										name4.push(resource)
//									}
									resourceList.push(resource)
									
								}
								localStorage.resource=JSON.stringify(resourceList);
//								if(menu1 && menu1.length > 0){
//									setCookie('menu1', ''+JSON.stringify(name1), 1);
//								}
//								if(menu2 && menu2.length > 0){
//									setCookie('menu2', ''+JSON.stringify(name2), 1);
//								}
//								if(menu3 && menu3.length > 0){
//									setCookie('menu3', ''+JSON.stringify(name3), 1);
//								}
//								if(menu4 && menu4.length > 0){
//									setCookie('menu4', ''+JSON.stringify(name4), 1);
//								}
								
								setCookie('resource', ''+JSON.stringify(firResource), 1);
//								setCookie('menu', ''+JSON.stringify(resourceList), 1);
								
							}else{
								layer.msg(json.message, {
									time: 1000, //1s后自动关闭
									icon: 2
								});
							}
						},
						error: function() {
							layer.msg('获取权限失败！', {
								time: 1500, //1s后自动关闭
								icon: 2
							});
						}
					})
				}else if(json.code == "4004"){	//	密码错误
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}else if(json.code == "4003"){	//该用户不存在
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}else if(json.code == "4007"){	//输入验证码

					ifNeddCode = true;
					loadCover = layer.open({
						type: 1,
						skin: 'layui-layer-molv', //样式类名
						closeBtn: 0, //不显示关闭按钮
						anim: 1,
						shade: 0,
						area: ['30%', '230px'], //宽高
						title: ['验证码', 'text-align: center; font-size: 16px;'],
						content: $('#codeBox')
					});
				}else if(json.code == "4043"){ //该用户已封停
					layer.msg('该用户已封停！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('登陆失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		}) 
	})
 
});
