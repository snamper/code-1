"use strict";
layui.use(['element', 'form'], function() {
	//所有DOM节点操作
	var addUserDom = {
		"addUserName": $(".addUserName"),
		"addRealName": $(".addRealName")
	}
	var form = layui.form(); //加载form模块
	var roleId = "", roleName = $(".userSearch").attr("data-roleName");
	var _url = window.location.href;

	//监听角色选择
	form.on('select(userSearch)',function(data){
		roleId = data.value.split("/")[0];
		roleName = data.value.split("/")[1]
		$(".tooltip-userSearch").hide()
	})
	//监听提交按钮
	form.on('submit(saveUserAdd)', function(data) {
		if(!roleId){
			$(".tooltip-userSearch").show();
			return;
		}
		if(!$(".addUserName").val()){
			$(".tooltip-username").show();
			return;
		}
		if(!$(".password").val()){
			$(".tooltip-password").show();
			return;
		}
		if(!$(".realName").val()){
			$(".tooltip-realName").show();
			return;
		}
		if(!(/^1[3|4|5|7|8]\d{9}$/.test($(".phone").val()))){
			$(".tooltip-phone").show();
			return;
		}
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			var data = {
				"ename":$(".addUserName").val(),
				"name":$(".realName").val(),
				"password":$(".password").val(),
				"roleName":roleName,
				"roleId":roleId,
				"userId":_url.split("?userId=")[1],
				"phone":$(".phone").val()
			}
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/system/userManage/editUser",
				data: data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						
						layer.msg('修改成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href="/system/userManage"
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
				},
			});
		})
	});
	//获取角色列表
	var getRoleList = function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/system/userManage/getRoleList",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					
					if(json.data && json.data.datas.length > 0){
						var html = '<option value="">选择角色</option>';
						var roleList = json.data.datas;
						var roleName = $(".userSearch").attr("data-roleName");
						for(var i = 0; i < roleList.length; i++){
							if(roleName == roleList[i].name){
								roleId = roleList[i].roleId
								html += '<option selected="true" value=' + roleList[i].roleId + '/'+ roleList[i].name +  '>'+roleList[i].name+'</option>'
							}else{
								html += '<option value=' + roleList[i].roleId + '/'+ roleList[i].name +  '>'+roleList[i].name+'</option>'
							}
						}
						$(".userSearch").empty().append(html)
						form.render('select')
					}
					
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			}
		});
	}
	getRoleList()
	//校验
	$(".addUserName").on("blur",function() {
		if(!$(".addUserName").val()){
			$(".tooltip-username").show();
		}else{
			$(".tooltip-username").hide();
		}
	})
	$(".password").on("blur",function() {
		if(!$(".password").val()){
			$(".tooltip-password").show();
		}else{
			$(".tooltip-password").hide();
		}
	})
	$(".realName").on("blur",function() {
		if(!$(".realName").val()){
			$(".tooltip-realName").show();
		}else{
			$(".tooltip-realName").hide();
		}
	})
	//内容重置
	$(".clearUserMessage").on("click",function(){
		addUserDom.addUserName.val("");
		addUserDom.addRealName.val("");
		layer.msg('重置成功！', {
			time: 500, //1s后自动关闭
			icon: 1
		});
	})
})