"use strict";
layui.use(['element', 'form', 'tree'], function() {

	//所有DOM节点操作
	var roleDom = {
		"roleName": $(".roleName"),
		"roleCode": $(".roleCode"),
		"roleText": $(".roleText")
	}
	var form = layui.form(); //加载form模块
	var roleId = ''
//	var _url = window.location.href;
	//监听提交按钮
	form.on('submit(saveUserAdd)', function(data) {
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			var data = {
//				"roleId":_url.split("?roleId=")[1],
				"name":$(".roleName").val(),
				"remarks":$(".roleText").val()
			}
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/admin/role/create.do",
				data: data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('保存成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
//							window.location.href="/system/roleManage";
						});
						roleId = json.data
					}else{
						layer.msg(json.message)
					}
				},
				error: function() {
					layer.msg('修改角色失败！', {
						time: 1500, //1s后自动关闭
						icon: 1
					});
				}
			})
		})
	});
	//设置权限
	var tree = "",
		
		currentPermissonTree = [],
		promptBox = "";
	//树形结构配置以及弹窗配置
	var initPromissionTree = function (treeConfig){
		tree = layui.tree({
			elem: '#permissionTreeContent', //指定元素，生成的树放到哪个元素上
			check: 'checkbox', //勾选风格
			//				skin: 'as', //设定皮肤
			drag: true, //点击每一项时是否生成提示信息
			checkboxName: 'aa[]', //复选框的name属性值
			checkboxStyle: "", //设置复选框的样式，必须为字符串，css样式怎么写就怎么写
			click: function(item) { //点击节点回调
				item.checked = !item.checked
				currentPermissonTree = treeConfig;
			},
			data: { //为元素添加额外数据，即在元素上添加data-xxx="yyy"，可选
				hasChild: true,
				"123":123
			},
			nodes: treeConfig
		});
		promptBox = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['60%', '70%'], //宽高
			title: ['权限管理', 'text-align: center; font-size: 16px;'],
			content: $('#goodsInfoBox')
		});
	}
	
	//打开弹窗并且获取权限配置
	$('.openModal').on('click', function() {
		if(!roleId){
			layer.msg('请先保存角色信息！');
			return;
		}
		var _this = this;
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/system/permissionManage",
			data:{
				"type":2,
				roleId:roleId
			},
			beforeSend:beforeSend(),
			success: function(result) {
				currentPermissonTree = result.data;
				$("#permissionTreeContent").empty()
				initPromissionTree(result.data)
			},
			error: function() {
				layer.msg('获取数据失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			},
		});
		
	});
	
	//保存配置
	$(".savePermissionMessage").on("click",function(){
		var permissionList = [];
		var curPermission = {};
		for(var i = 0; i < $("#permissionTreeContent input[type='checkbox']").length; i++){
			if($("#permissionTreeContent input[type='checkbox']")[i].hasAttribute("checked")){
				if($($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-type") == 6){
					curPermission = {
						"type":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-type"),
						"menuId":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-code")
					}
				}else{
					curPermission = {
						"type":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-type"),
						"menuId":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("id")
					}
				}
				permissionList.push(curPermission)
			}
			
		}
		permissionList = JSON.stringify(permissionList);
		var data = {
			"roleId":roleId,
			"resourceJson":permissionList
		}
		
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/system/permissionManage/setPermission",
			data:data,
			beforeSend:beforeSend(),
			success: function(result) {
				layer.msg('设置成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function(){
					layer.close(promptBox)
				});
			},
			error: function() {
				layer.msg('设置失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			},
		});
		

	 });
	//内容重置
	$(".clearRoleMessage").on("click",function(){
		roleDom.roleName.val("");
		roleDom.roleCode.val("");
		roleDom.roleText.val("");
	})
})