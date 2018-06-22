"use strict";
layui.use(['element', 'form'], function() {
	//所有DOM节点操作
	var resourceDom = {
		"resourceType": $(".resourceType"),
		"resourceName": $(".resourceName"),
		"resourceCode": $(".resourceCode"),
		"parentResource": $(".parentResource"),
		"resourceUrl": $(".resourceUrl"),
		"resourceSort": $(".resourceSort")
	}
	var form = layui.form(); //加载form模块
	var allResource = "" , 	//所有资源列表
		resourceParentList = "", //一级资源列表
		resourceSecList = "", //二级资源列表
		curParentPid = "",//当前父id
		type = $(".resourceTypeContent").attr("data-type"),		//菜单类型
		_url = decodeURI(window.location.href),	//获取路径
		status = $(".clearMessage").attr("data-status"),
		menuId = _url.split("?menuId=")[1],//获取菜单id
		secPid = "",
		firstPid = "",
		parentPid = "";	//当前资源的父级

	function getResource(){
		
		var curPid = _url.split("?menuId=")[1];
		curParentPid = $(".sourceSelectContent").attr("data-value");   //当前菜单的父ID
		type = $(".resourceTypeContent").attr("data-type");
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/system/resourceManage/getResource",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					allResource = json.data;
					showParResource(type)
					if(type == 1){
						firstPid = "-1"
						$(".sourceSelectContent").hide()
					}else if(type == 2){
						firstPid = curParentPid;
						secPid = "";
						$(".sourceSelectContent").show()
						resourceParentList = '<div class="layui-input-inline resourceParent">'+
								'<select  lay-verify="require"  lay-filter="parentResource">'+
			        			'<option value="">请选择一级父资源</option>';
						
						for(var i = 0; i < allResource.length; i++){	
							if(allResource[i].type == 1){	//寻找父层
								if(curParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
									resourceParentList += '<option selected="selected" value= '+allResource[i].menu_id+'>' + allResource[i].name  +'</option>'
								}else{
									resourceParentList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
								}
							}
						}
						resourceParentList += "</select></div>";
						$(".sourceSelectContent").append(resourceParentList)
						form.render('select');	//重新初始化select标签
					}else if(type == 6){
						 secPid= curParentPid;
						 var thirPid = ""
						$(".sourceSelectContent").show();
						resourceSecList = '<div class="layui-input-inline secResource">'+
							'<select  lay-verify="require"  lay-filter="resourceSec">'+
							'<option value="">请选择二级父资源</option>';
						for(var i = 0; i < allResource.length; i++){	
							if(allResource[i].type == 2){	//寻找父层
								if(curParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
									firstPid = allResource[i].parent_id;
								}
							}else if(allResource[i].type == 3){
								if(curParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
									thirPid = allResource[i].parent_id;
								}
							}
						}
						if(thirPid){
							var resourceThirdList = '<div class="layui-input-inline resourceThird">'+
								'<select  lay-verify="require"  lay-filter="thirdResource">'+
								'<option value="">请选择三级父资源</option>';
							for(var i = 0; i < allResource.length; i++){
								if(allResource[i].type == 3){	//寻找父层(三级)
									if(curParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
										resourceThirdList += '<option selected="selected" value= '+allResource[i].menu_id+'>' + allResource[i].name  +'</option>'
									}else{
										resourceThirdList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
									}
								}
								if(thirPid == allResource[i].menu_id){
									firstPid = allResource[i].parent_id;
									var secParentPid = allResource[i].menu_id
								}
							}
							resourceThirdList += "</select></div>";
						}
						resourceParentList = '<div class="layui-input-inline resourceParent">'+
								'<select  lay-verify="require"  lay-filter="parentResource">'+
			        			'<option value="">请选择一级父资源</option>';
						for(var i = 0; i < allResource.length; i++){	
							if(allResource[i].type == 2){	//寻找父层(二级)
								if(firstPid == allResource[i].parent_id){	//匹配id，从而默认选中当前的资源
									if(thirPid){							//如果父为三级
										if(secParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
											resourceSecList += '<option selected="selected" value= '+allResource[i].menu_id+'>' + allResource[i].name  +'</option>'
										}else{
											resourceSecList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
										}
									}else{									//父为二级
										if(curParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
											resourceSecList += '<option selected="selected" value= '+allResource[i].menu_id+'>' + allResource[i].name  +'</option>'
										}else{
											resourceSecList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
										}
									}
								}
							}
							if(allResource[i].type == 1){	//寻找父层(一级)
								if(firstPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
									
									resourceParentList += '<option selected="selected" value= '+allResource[i].menu_id+'>' + allResource[i].name  +'</option>'
								}else{
									resourceParentList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
								}
							}
						}
						resourceParentList += "</select></div>";
						resourceSecList += '</select></div>';
						$(".sourceSelectContent").append(resourceParentList)
						$(".sourceSelectContent").append(resourceSecList)
						if(thirPid){
							$(".sourceSelectContent").append(resourceThirdList)
						}
						form.render('select');	//重新初始化select标签
					}else if(type == 3){
						secPid= curParentPid;
						$(".sourceSelectContent").show();
						resourceSecList = '<div class="layui-input-inline secResource">'+
							'<select  lay-verify="require"  lay-filter="resourceSec">'+
							'<option value="">请选择二级父资源</option>';
						for(var i = 0; i < allResource.length; i++){	
							if(allResource[i].type == 2){	//寻找父层
								if(curParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
									firstPid = allResource[i].parent_id;
									
								}
							}
						}
						resourceParentList = '<div class="layui-input-inline resourceParent">'+
								'<select  lay-verify="require"  lay-filter="parentResource">'+
			        			'<option value="">请选择一级父资源</option>';
						for(var i = 0; i < allResource.length; i++){	
							if(allResource[i].type == 2){	//寻找父层(二级)
								if(firstPid == allResource[i].parent_id){	//匹配id，从而默认选中当前的资源
									if(curParentPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
										resourceSecList += '<option selected="selected" value= '+allResource[i].menu_id+'>' + allResource[i].name  +'</option>'
									}else{
										resourceSecList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
									}
								
								}
							}
							if(allResource[i].type == 1){	//寻找父层(一级)
								if(firstPid == allResource[i].menu_id){	//匹配id，从而默认选中当前的资源
									
									resourceParentList += '<option selected="selected" value= '+allResource[i].menu_id+'>' + allResource[i].name  +'</option>'
								}else{
									resourceParentList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
								}
							}
						}
						resourceParentList += "</select></div>";
						resourceSecList += '</select></div>';
						$(".sourceSelectContent").append(resourceParentList)
						$(".sourceSelectContent").append(resourceSecList)
						form.render('select');	//重新初始化select标签
					}
					
				}
			},
			error: function() {
				layer.msg('获取资源失败！', {
					time: 1500, //1s后自动关闭
					icon: 1
				});
			}
		})
	}
	getResource()	//初始化数据
	
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
//	//改变一级菜单获取二级菜单
	form.on('select(parentResource)', function(data){
		secPid = "";
		firstPid = data.value;
		var secResourceList = 
				'<select  lay-verify="require"  lay-filter="resourceSec">'+
    			'<option value="">请选择二级父资源</option>';
		
		for(var i = 0; i < allResource.length; i++){	
			if(allResource[i].type == 2 && firstPid == allResource[i].parent_id){	
				secResourceList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
			}
		}
		var thirdResourceList = 
				'<select  lay-verify="require"  lay-filter="thirdResource">'+
    			'<option value="">请选择三级父资源</option>';

		thirdResourceList += "</select>";
		secResourceList += "</select>";
		$(".secResource").empty().append(secResourceList)
		$(".resourceThird").empty().append(thirdResourceList)
		form.render('select');
	})
	
	
	//监听获取菜单类型
	form.on('select(resourceType)', function(data){
		
		if(data.value == 2 && type == 1){
			var resourceParentList = '<label class="layui-form-label">父资源名:</label><div class="layui-input-inline resourceParent">'+
					'<select  lay-verify="require"  lay-filter="parentResource">'+
        			'<option value="">请选择一级父资源</option>';
			
			for(var i = 0; i < allResource.length; i++){	
				if(allResource[i].type == 1){	
					resourceParentList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>';
				}
			}
			resourceParentList += "</select></div>";
			$(".sourceSelectContent").empty()
			$(".sourceSelectContent").append(resourceParentList)
			form.render('select');	//重新初始化select标签
		}else if(data.value == 3){
			var resourceParentList = '<label class="layui-form-label">父资源名:</label><div class="layui-input-inline resourceParent">'+
					'<select  lay-verify="require"  lay-filter="parentResource">'+
        			'<option value="">请选择一级父资源</option>';
			
			for(var i = 0; i < allResource.length; i++){	
				if(allResource[i].type == 1){	
					resourceParentList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>';
				}
			}
			resourceParentList += "</select></div>";
			var resourceSecList = '<div class="layui-input-inline secResource">'+
							'<select  lay-verify="require"  lay-filter="resourceSec">'+
							'<option value="">请选择二级父资源</option></select></div>';
			$(".sourceSelectContent").empty()			
			$(".sourceSelectContent").append(resourceParentList)
			$(".sourceSelectContent").append(resourceSecList)
			form.render('select');	//重新初始化select标签
		}
//		else if(data.value == 3 && type == 2){
	
//			var resourceSecList = '<div class="layui-input-inline secResource">'+
//							'<select  lay-verify="require"  lay-filter="resourceSec">'+
//							'<option value="">请选择二级父资源</option>';
//			for(var i = 0; i < allResource.length; i++){	
//				if(allResource[i].type == 2 && curParentPid == allResource[i].parent_id){	
//					resourceSecList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>';
//				}
//			}			
//			resourceSecList += '</select></div>';
//			$(".sourceSelectContent").append(resourceSecList)
//			form.render('select');	//重新初始化select标签
//		}
		else if(data.value == 6){
			var resourceSecList = '<div class="layui-input-inline secResource">'+
							'<select  lay-verify="require"  lay-filter="resourceSec">'+
							'<option value="">请选择二级父资源</option>';
			var resourceThirdList = '<div class="layui-input-inline resourceThird">'+
								'<select  lay-verify="require"  lay-filter="thirdResource">'+
								'<option value="">请选择三级父资源</option>';
			var resourceParentList = '<label class="layui-form-label">父资源名:</label><div class="layui-input-inline resourceParent">'+
					'<select  lay-verify="require"  lay-filter="parentResource">'+
        			'<option value="">请选择一级父资源</option>';
			
			for(var i = 0; i < allResource.length; i++){	
				if(allResource[i].type == 1){	
					resourceParentList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>';
				}
			}
			
			resourceSecList += '</select></div>';
			resourceSecList += '</select></div>';
			resourceThirdList += '</select></div>';
			$(".sourceSelectContent").empty()
			$(".sourceSelectContent").append(resourceParentList)
			$(".sourceSelectContent").append(resourceSecList)
			$(".sourceSelectContent").append(resourceThirdList)
			
			form.render('select');	//重新初始化select标签
		}
//		secPid = $(".secondResource dd.layui-this").attr("lay-value");
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
			firstPid = "-1"
			$(".sourceSelectContent").hide();
			$(".resourceCode").hide()
			
		}else{
			$(".resourceCode").hide()
			$(".sourceSelectContent").show();
			if(type == 2){
				firstPid = "";
				$(".resourceParent").show();
				$(".secResource").hide();
				$(".resourceThir").hide()
			}else if(type == 6){
				secPid = "";
				firstPid = "";
				$(".resourceParent").show();
				$(".secResource").show();
				$(".resourceCode").show()
				$(".resourceThir").show()
			}else{
				secPid = "";
				firstPid = "";
				$(".resourceParent").show();
				$(".secResource").show();
				$(".resourceCode").hide()
				$(".resourceThir").hide()
			}
		}
	}
	//监听启用禁用
	form.on('radio', function(data){
	  	status = data.value;
	}); 
	//获取选中的二级菜单
	form.on('select(resourceSec)', function(data){
		secPid = data.value;
		var thirdResourceList = 
				'<select  lay-verify="require"  lay-filter="thirdResource">'+
    			'<option value="">请选择三级父资源</option>';
		
		for(var i = 0; i < allResource.length; i++){	
			if(allResource[i].type == 3 && secPid == allResource[i].parent_id){	
				thirdResourceList += '<option value= '+allResource[i].menu_id+'>' + allResource[i].name +'</option>'
			}
		}
		thirdResourceList += "</select>";
		$(".resourceThird").empty().append(thirdResourceList)
		form.render('select');
	})
	//监听三级
//	var thirdPid = "";
	form.on('select(thirdResource)', function(data){
		secPid = data.value
	})
	//监听提交按钮
	form.on('submit(saveUserAdd)', function(data) {
		if(type == 1){
			curParentPid = "-1";
		}else if(type == 2){
			if(!firstPid){
				layer.msg('请选择一级菜单！'); 
				return;
			}else{
				curParentPid = firstPid;
			}
		}else if(type == 3){
			if(!secPid){
				layer.msg('请选择二级菜单！'); 
				return;
			}else{
				curParentPid = secPid;
			}
		}else if(type == 6){
			if(!secPid){
				layer.msg('请至少选择二级菜单！'); 
				return;
			}else{
				curParentPid = secPid;
			}
		}
		layer.confirm('您确定要提交吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			
			var data = {
				"name":$(".resourceName").val(),
				"menuId":menuId,
				"parentId":curParentPid,
				"manuOrder":$(".resourceSort").val(),
				"manuUrl":$(".resourceUrl").val(),
				"type":type,
				"creator":1,
				"status":status,
				
			}
			if($(".code").val()){
				data.code = $(".code").val()
			}
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/system/resourceManage/editCurReource",
				data: data,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('修改成功！', {
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

})