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
				console.log(json)
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
							setCookie(i, ''+JSON.stringify(curCodeLength), 30,i);
						}
					}
					window.location.href = "/";
				}else{
					layer.msg('获取菜单失败', {
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
					setCookie('userMessage', ''+JSON.stringify(userMessage), 30);
					$.ajax({
						type: "post",
						dataType: "json",
						url: "/admin/login/user/resource/meuns.do",
						success: function(result) {
							console.log(result)
							getMenu()
							if(result.message == "成功") {
								var firResource = [];
								for(var i = 0; i < result.data.length; i++){
									if(result.data[i].children){
										if(result.data[i].children[0].children && result.data[i].children[0].children.length > 0)
											firResource.push({"name":escape(result.data[i].name),"manu_url":result.data[i].children[0].children[0].manu_url,"menu_id":result.data[i].menu_id})
										else
											firResource.push({"name":escape(result.data[i].name),"manu_url":result.data[i].children[0].manu_url,"menu_id":result.data[i].menu_id})
									}else{
										firResource.push({"name":escape(result.data[i].name),"manu_url":result.data[i].manu_url,"menu_id":result.data[i].menu_id})
									}
								}
								setCookie('resource', ''+JSON.stringify(firResource), 30);
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
