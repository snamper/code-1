"use strict";
layui.use(['element', 'form'], function() {

	//所有DOM节点操作
	var resourceDom = {
		"resourceType": $(".resourceType"),
		"resourceName": $(".resourceName"),
		"resourceCode": $(".resourceCode"),
		"resourceUrl": $(".resourceUrl"),
		"resourceSort": $(".resourceSort")
	}
	var firstPid = "",secPid = "",type = 1,status=1,allResource = "";
	
	var form = layui.form(); //加载form模块
	//表单验证

	form.verify({
		//角色编号
		roleCode: function(value, item) { //value：表单的值、item：表单的DOM对象
			if((!(/^\d{6}$/.test(value)))) {
				return '请输入6位纯数字！';
			}else{
				$(".tooltip-roleCode").hide()
			}
		}
	});
	
	//根据一级菜单获取二级菜单
	form.on('select(parentResource)', function(data){
		firstPid = data.value.split("/")[0];
		$.ajax({						//异步获取所有菜单列表
			type: "post",
			dataType: "json",
			url: "/system/resourceManage/getResource",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					allResource = json.data;
					var secResourceList = '<option value="">请选择二级父资源</option>';
					for(var i = 0; i < allResource.length; i++){	//一级菜单
						if(allResource[i].type == 2 && firstPid == allResource[i].parent_id){
							secResourceList += '<option data-parentId='+allResource[i].parent_id+' value= '+allResource[i].menu_id+'/'+allResource[i].parent_id+'>' + allResource[i].name +'</option>'
						}
					}
					$(".secResource").empty().append(secResourceList)
						form.render('select');
				}
			},
			error: function() {
				layer.msg('获取资源失败！', {
					time: 1500, //1s后自动关闭
					icon: 1
				});
			}
		})
	})
	//根据二级菜单获取三级菜单
	form.on('select(secondResourceContainer)', function(data){
		secPid = data.value.split("/")[0]
		var secPid1 = data.value.split("/")[0];
		var thirResourceList = '<option value="">请选择三级父资源</option>';
		for(var i = 0; i < allResource.length; i++){
			if(allResource[i].type == 3 && secPid1 == allResource[i].parent_id){
				thirResourceList += '<option data-parentId='+allResource[i].parent_id+' value= '+allResource[i].menu_id+'/'+allResource[i].parent_id+'>' + allResource[i].name +'</option>'
			}
		}
		$(".thirdResourceSelect").empty().append(thirResourceList)
		form.render('select');
	})
	//监听获取菜单类型
	form.on('select(resourceType)', function(data){
		switch(data.value) {	
			case "1":
				type = 1;
				showParResource(type);
				break;
			case "2":
				type = 2;
				showParResource(type);
				break;
			case "3":
				type = 3;
				showParResource(type);
				break;
			case "6":
				type = 6;
				showParResource(type);
				break;
			default:
                layer.msg("无该类型！", {
			         icon: 5,						 
					 time: 500
		        });				
				break;
		}	

	})
	//根据选择菜单类型选择显示父资源
	var showParResource = function(type){
		if(type == 1){
			$(".ifShowPar").hide();
			$(".resourceCode").hide()
		}else{
			$(".ifShowPar").show();
			$(".resourceCode").hide();
			if(type == 2){
				$(".resourceParent").show();
				$(".secondResource").hide();
				$(".thirdResource").hide();
			}else if(type == 6){
				$(".resourceParent").show();
				$(".secondResource").show();
				$(".resourceCode").show()
				$(".thirdResource").show();
			}else if(type == 3){
				$(".resourceParent").show();
				$(".secondResource").show();
				$(".resourceCode").hide()
				$(".thirdResource").hide();
			}
		}
	}
	//监听是否启用禁用
	form.on('radio', function(data){
	  	status = data.value;
	}); 
	
	//监听三级菜单
	form.on('select(thirdResource)', function(data){
		secPid = data.value.split("/")[0]
	})
	//监听提交按钮
	form.on('submit(saveUserAdd)', function(data) {
		if(!$(".resourceUrl").check().notNull()){
			$(".tooltip-resourceUrl").show()
			return;
		}
		if(!$(".resourceSort").check().notNull()){
			$(".tooltip-resourceSort").show()
			return;
		}
		
		if(type == 1){
			var sourcePid = "-1";
		}else if(type == 2){
			if(!firstPid){
				layer.msg('请选择一级菜单！'); 
				return;
			}else{
				var sourcePid = firstPid;
			}
		}else if(type == 3){
			if(!firstPid){
				layer.msg('请选择二级菜单！'); 
				return;
			}else{
				var sourcePid = secPid;
			}
		}
		else if(type == 6){
			if(!secPid){
				layer.msg('请选择二级菜单！'); 
				return;
			}else{
				var sourcePid = secPid;
			}
			if(!$(".code").val()){
				layer.msg('请输入资源编码！'); 
				return;
			}
		}
		
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {

			var data = {
				"name":$(".resourceName").val(),
				"parentId":sourcePid,
				"manuOrder":$(".resourceSort").val(),
				"manuUrl":$(".resourceUrl").val(),
				"type":type,
				"creator":1,
				"status":status
			}
			if($(".code").val()){
				data.code = $(".code").val()
			}
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/system/resourceManage/addReource",
				data: data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('新增成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href = "/system/resourceManage"
						});
					}else if(json.code == "4010"){
						layer.msg('该资源已存在！', {
							time: 1500, //1s后自动关闭
							icon: 2
						})
					}
				},
				error: function() {
					layer.msg('新增资源失败！', {
						time: 1500, //1s后自动关闭
						icon: 1
					});
				}
			})
		})
	});
	//内容重置
	$(".clearMessage").on("click",function(){
		for(var i in resourceDom){
			resourceDom[i].val("")
		}
	})
	//校验
	$(".resourceName").on("blur", function() {			//资源名称
		if(!$(".resourceName").check().notNull()){
			$(".tooltip-resourceName").show()
		}else{
			$(".tooltip-resourceName").hide()
		}
	})
	$(".code").on("blur", function() {					//资源编码
		if(!$(".code").check().notNull()){
			$(".tooltip-code").show()
		}else{
			$(".tooltip-code").hide()
		}
	})
	$(".resourceUrl").on("blur", function() {					//url
		if(!$(".resourceUrl").check().notNull()){
			$(".tooltip-resourceUrl").show()
		}else{
			$(".tooltip-resourceUrl").hide()
		}
	})
	$(".resourceSort").on("blur", function() {					//url
		if(!$(".resourceSort").check().notNull()){
			$(".tooltip-resourceSort").show()
		}else{
			$(".tooltip-resourceSort").hide()
		}
	})
	
})