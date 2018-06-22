"use strict";
layui.use(['element','paging', 'laydate', 'upload', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var iosType = false,		//ios开关
		AndroidType = false,	//安卓开关
		AndroidVersion = "",
		iosVersion = "",
		androidStatus = 1,//安卓状态 0:是 1：否
		isoStatus = 1,  //ios状态 0:是 1：否
		isoVersionStatus = 1, //isoVersionStatus 版本号状态,1:等于 2：大于等于 3：小于等于
		androidVersionStatus = 1, // 版本号状态
		AndroidVersionFlag = false,
		iosVersionFlag = false,
		sendTime = 1,			//发送时间类型，默认立即发送
		userScope = 1,			//用户范围，默认为全部用户
		AndroidTypeList = [],	//安卓机型list
		iosTypeList = [],
		AndroidVersionList = [],	//安卓版本list
		iosVersionList = [],
		phoneList = [],
		modelName = "",	//模板名称
		modelId = ""		//模板ID
	var repeatType = 1,chooseWeek = "",chooseMouth = ""
	//选择类型
	form.on('radio(userScope)', function(data){
		userScope = data.value;
		if(userScope == 1)$(".partUser,.assignUser").hide();
		else if(userScope == 3)	$(".partUser").show().parent().find(".assignUser").hide();
		else $(".assignUser").show().parent().find(".partUser").hide();
	})
	$(document).on("click", function(e){
		var iosTypeClick = $(".iosType"),
			AndroidTypeClick = $(".AndroidType"),
			curAndroidVersion = $(".AndroidVersion"),
			curIosVersion = $(".iosVersion"),
			iosVersionChoose = $(".iosVersionContainer1 > ul"),
			AndroidVersionChoose = $(".AndroidVersionContainer1 > ul")
		if(e.target.className != "chooseIosType" && e.target.className != "iosType" && !$(e.target).is('.iosType *') && iosTypeClick.has(e.target).length == 0){
			$(".iosType").hide()
			iosType = false
		}
		if(e.target.className != "AndroidType" && e.target.className != "chooseAndroidType" && !$(e.target).is('.AndroidType *') && AndroidTypeClick.has(e.target).length == 0){
			$(".AndroidType").hide()
			AndroidType = false
		}
		if(e.target.className != "AndroidVersionContainer1" && !$(e.target).is('.AndroidVersionContainer1 *') && AndroidVersionChoose.has(e.target).length == 0){
			$(".AndroidVersionContainer1 > ul").hide()
			AndroidVersionFlag = false
		}
		if( e.target.className != "iosVersionContainer1" && !$(e.target).is('.iosVersionContainer1 *') && iosVersionChoose.has(e.target).length == 0){
			$(".iosVersionContainer1 > ul").hide()
			iosVersionFlag = false
		}
	})
	//保存
	$('.saveAdd').on('click', function (){
		var data = {
			scope:userScope,	//用户范围 1 全部 2 指定 3 部分
			sendType:sendTime,				//:及时发送 2:定时发送 3:重复发送
			modelName:modelName,			//模板名称
			modelId:modelId					//模板ID
		}
		if(data.scope == 3){		//部分用户
			//ios
			data.isoStatus = isoStatus;
			if(isoStatus == 0){		//是
				if(iosTypeList.length == $(".iosType > li").length - 1)	//机型全选
					data.isoType = 0;
				else{
					var type = "";
					if(iosTypeList.length <= 0){
						$(".tooltip-iosType").show()
						return;
					}
					for(var i = 0; i < iosTypeList.length; i++){	//需要传ios机型
						type += iosTypeList[i].id;
						if(i < iosTypeList.length - 1)
							type += ","
					}
					data.isoType  = type
				}
				data.isoVersionStatus = isoVersionStatus;
				if(isoVersionStatus == 1){	//等于，可以复选
					if(iosVersionList.length == $(".iosVersionContainer1  li").length - 1)	//ios版本
						data.isoVersion = 0;
					else{
						var version = ""
						if(iosVersionList.length <= 0){
							$(".tooltip-iosVersion").show();
							return;
						}
						for(var i = 0; i < iosVersionList.length; i++){	
							version += iosVersionList[i].id;
							if(i < iosVersionList.length - 1)
								version += ","	
						}
						data.isoVersion  = version
					}
				}else					//小于等于或者大于等于，只能单选
					data.isoVersion = iosVersion;
				if(!data.isoVersion && data.isoVersion !== 0){
					$(".tooltip-iosVersion").show();
					return;
				}
			}else					//否
				isoStatus = 1;
			//安卓
			data.androidStatus = androidStatus;
			if(androidStatus == 0){		//是
				if(AndroidTypeList.length == $(".AndroidType > li").length - 1)	//安卓版本全选
					data.androidType = 0;
				else{
					var type = ""
					if(AndroidTypeList.length <= 0){
						$(".tooltip-AndroidType").show();
						return;
					}
					for(var i = 0; i < AndroidTypeList.length; i++){	//需要传ios机型
						type += AndroidTypeList[i].id;
						if(i < AndroidTypeList.length - 1)
							type += ","
					}
					data.androidType  = type
				}
				data.androidVersionStatus = androidVersionStatus;
				if(androidVersionStatus == 1){	//等于，可以复选
					if(AndroidVersionList.length == $(".AndroidVersionContainer1  li").length - 1)
						data.androidVersion = 0;
					else{
						var version = ""
						if(AndroidVersionList.length <= 0){
							$(".tooltip-AndroidVersion").show();
							return;
						}
						for(var i = 0; i < AndroidVersionList.length; i++){	
							version += AndroidVersionList[i].id;
							if(i < AndroidVersionList.length - 1)
								version += ","	
						}
						data.androidVersion  = version
						
					}
				}else					//小于等于或者大于等于，只能单选
					data.androidVersion = androidVersion;
				if(!data.androidVersion && data.androidVersion !== 0){
					$(".tooltip-AndroidVersion").show();
					return;
				}
			}else					//否
				androidStatus = 1;
		}else if(data.scope == 2){		//指定用户
			if($(".valid") && $(".valid").length > 0){
				var userInfo = [];
				for(var i = 0; i < $(".valid").length; i++){
//					userInfo.push({
//						phoneNum: $($(".valid")[i]).text(),
//						userId: $($(".valid")[i]).attr("data-userId")
//					})
					userInfo.push($($(".valid")[i]).text())
				}
				data.telnums = userInfo
//				data.telnums = JSON.stringify(userInfo)
			}else{
				layer.msg('请导入有效手机号！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
				return;
			}
		}
		if(!modelId){
			$(".tooltip-sysModal").show();
			return;
		}
		if(sendTime == 2){	//定时发送
			data.sendTime = $("#LAY_demorange_e").val();
			if(!$("#LAY_demorange_e").val()) $(".tooltip-setTimeSend").show()
		}else if(sendTime == 3){	//重复发送
			data.sendTime = $(".time_hour").val() + ":" + $(".time_minute").val() + ":" + $(".time_second").val();
			data.repeatType = repeatType;	//重复频率：1：每日 2：每周 3：每月
//			if(repeatType == 1)	data.sendWeek = chooseWeek
			if(repeatType == 2)	data.sendWeek = chooseWeek
			else if(repeatType == 3) data.sendDay = chooseMouth
		}
		console.log(data)
//		return;
		
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		
		
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/message/model/info/add.do",
			data:JSON.stringify(data),
			contentType: 'application/json',
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(layLoad);//清除加载
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/pushMessage/sms";
					});
					
				}else{
					layer.msg(json.message)
				}
			},error: function(){
				layer.close(layLoad);//清除加载
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
		if(layLoad){
			layer.close(layLoad);//清除加载
		}
		
	});		
	//选择模板
	form.on('select(sysModal)', function(data){
		modelId = data.value.split("/")[0];
		modelName = data.value.split("/")[1];
		$(".tooltip-sysModal").hide();
	})
	//是否选择ios机型
	form.on('select(ios)', function(data){
		isoStatus = data.value;
		if(data.value == 1){
			$(".iosTypeContainer,.iosVersionShow").hide();
			$(".chooseIosType").val("")
			iosTypeList = []
		}else{
			$(".iosTypeContainer,.iosVersionShow").show();
			getPhoneType("ios")
			getVersionType("ios")
//			getIosdType()
		}
	})
	//获取机型列表
	var getPhoneType = function(systemType) {
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/mobile/type.do?systemType="+systemType,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功"){
					var phoneTypeList1 = json.data,
						html1 = '',
						system = "",
						container1 = ""
					if(systemType == "ios"){
						html1 = '<li><input type="checkbox"  lay-filter="iosType" value="-1"  title="全选" lay-skin="primary"></li>'
						system = "iosType";
						container1 = $(".iosType")
					}else{
						html1 = '<li><input type="checkbox"  lay-filter="AndroidType" value="-1"  title="全选" lay-skin="primary"></li>'
						system = "AndroidType";
						container1 = $(".AndroidType")
					}
					
					for(var i = 0; i < phoneTypeList1.length; i++){
						html1 += '<li><input type="checkbox"  lay-filter="'+system+'" value="'+phoneTypeList1[i].phone_type+'"  title="'+phoneTypeList1[i].phone_type+'" lay-skin="primary"></li>'
					}
					
					$(container1).empty().html(html1);
					form.render("checkbox")
				}
			},error: function(){
				layer.msg('获取机型失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})	
	}
	//获取版本列表
	var getVersionType = function(systemType) {
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/mobile/version/type.do?systemType="+systemType,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功"){
//					console.log(json)	
					var versionList1 = json.data,
						html1 = "",
						html2 = "",
						system = "",
						container = "",
						container1 = ""
					if(systemType == "ios"){
						html1 = '<li><input type="checkbox"  lay-filter="iosVersion" value="-1"  title="全选" lay-skin="primary"></li>'
						html2 = '<option value="" >请选择</option>'
						system = "iosVersion";
						container = $(".iosVersionContainer1 > ul")
						container1 = $(".iosVersionChoose")
					}else{
						html1 = '<li><input type="checkbox"  lay-filter="AndroidVersion" value="-1"  title="全选" lay-skin="primary"></li>'
						html2 = '<option value="" >请选择</option>'
						system = "AndroidVersion";
						container = $(".AndroidVersionContainer1  > ul")
						container1 = $(".AndroidVersionChoose")
					}
					
					for(var i = 0; i < versionList1.length; i++){
						html1 += '<li><input type="checkbox"  lay-filter="'+system+'" value="'+versionList1[i].system_version+'"  title="'+versionList1[i].system_version+'" lay-skin="primary"></li>'
						html2 += '<option value="'+versionList1[i].system_version+'" >'+versionList1[i].system_version+'</option>'
					}
					
					$(container).empty().html(html1);
					$(container1).empty().html(html2);
					form.render("select")
					form.render("checkbox")
				}
			},error: function(){
				layer.msg('获取机型失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})	
	}
//	//获取ios机型
//	var getIosdType = function() {
//		var html = "";
//		for(var i = 0; i < $(".iosType li input").length; i++){
//			if($($(".iosType li input")[i]).attr("value") != "-1")
//				$($(".iosType li .layui-form-checkbox")[i]).addClass("layui-form-checked");
//			if($($(".iosType li input")[i]).attr("value") == "-1") continue;
//			iosTypeList.push({
//				id:$($(".iosType li input")[i]).attr("value"),
//				name:$($(".iosType li input")[i]).attr("title")
//			})
//			html += $($(".iosType li input")[i]).attr("title");
//			if(i < $(".iosType li input").length - 1)  html += ",";
//		}
//		$(".chooseIosType").val(html)
//	}
	//是否选择安卓机型
	form.on('select(Android)', function(data){
		androidStatus = data.value;
		if(data.value == 1)	{
			AndroidTypeList = [];
			$(".chooseAndroidType").val("")
			$(".AndoidContainer,.AndroidVersionShow").hide();
		}else{
//			getAndroidType()
			getPhoneType("Android")
			getVersionType("Android")
			$(".AndoidContainer,.AndroidVersionShow").show();
		}
	})
//	//获取安卓机型
//	var getAndroidType = function() {
//		var html = "";
//		for(var i = 0; i < $(".AndroidType li input").length; i++){
//			
//			if($($(".AndroidType li input")[i]).attr("value") == "-1") continue;
//			AndroidTypeList.push({
//				id:$($(".AndroidType li input")[i]).attr("value"),
//				name:$($(".AndroidType li input")[i]).attr("title")
//			})
//			html += $($(".AndroidType li input")[i]).attr("title");
//			if(i < $(".AndroidType li input").length - 1)  html += ",";
//		}
//		$(".chooseAndroidType").val(html)
//		form.render("select")
//	}
	//选择ios版本
	form.on('select(iosVersionFlag)', function(data){
		isoVersionStatus = data.value;
		if(data.value == 1) $(".iosVersionContainer1").show().parent().find(".iosVersionContainer").hide();
		else	$(".iosVersionContainer").show().parent().find(".iosVersionContainer1").hide();
	})
	//选择安卓版本
	form.on('select(AndroidVersionFlag)', function(data){
		androidVersionStatus = data.value;
		if(data.value == 1)	{	//等于
			$(".AndroidVersionContainer").hide().parent().find(".AndroidVersionContainer1").show();
		}else{					//小于等于或者大于等于
			$(".AndroidVersionContainer").show().parent().find(".AndroidVersionContainer1").hide();
		}
	})
	//展开隐藏ios机型下拉列表
	$(".chooseIosType").on("click", function(e){
		iosType = !iosType
		if(iosType) $(".iosType").show()
		else	$(".iosType").hide()
	})
	//更新
	var renderCheckBox = function(dom,checked,indexDom){
		var child = $(dom).find("input")
		if(indexDom == 0){
			child.each(function(index, item){
				if(indexDom == index)
		    		item.checked = checked;
		    });
		}else{
			child.each(function(index, item){
		    	item.checked = checked;
		    });
		}
		form.render("checkbox")
//		$(dom).removeClass("hide").css("display","block !important")
	}
	//选择ios设备类型
	form.on('checkbox(iosType)',function(data){
		var html = "";
		if(data.elem.checked){		
			if(data.value == "-1"){			//全选
				iosTypeList = [];
				for(var i = 0; i < $(".iosType li input").length; i++){
					if($($(".iosType li input")[i]).attr("value") != "-1"){		//不显示全选
						iosTypeList.push({
							id:$($(".iosType li input")[i]).attr("value"),
							name:$($(".iosType li input")[i]).attr("title")
						})
					}
				}
				var child = $(".iosType li input")
				renderCheckBox($(".iosType"),data.elem.checked)
			}else{							//单个选中
				iosTypeList.push({
					id:data.value,
					name:$(data.elem).attr("title")
				})
				if(iosTypeList.length == $(".iosType li input").length - 1){
					renderCheckBox($(".iosType"),data.elem.checked,0)
				}
			}
		}else{
			if(data.value == "-1"){			//反选
				iosTypeList = []
				renderCheckBox($(".iosType"),data.elem.checked)
			}else{							//单个取消
				for(var i = 0; i < iosTypeList.length; i++){
					if(iosTypeList[i].id == data.value){
						iosTypeList.splice(i, 1);
					}
				}
				if($($(".iosType .layui-form-checkbox")[0]).hasClass("layui-form-checked")){
					renderCheckBox($(".iosType"),data.elem.checked,0)
				}
			}
		}
		for(var i = 0; i < iosTypeList.length; i++){
			html += iosTypeList[i].name;
			if(i < iosTypeList.length - 1)  html += ",";
		}
		if(iosTypeList.length > 0) $(".tooltip-iosType").hide()
		$(".chooseIosType").val(html)
	})
	//选择IOS版本(大于等于或者小于等于时)
	form.on('select(iosVersionChoose)', function(data){
		iosVersion = data.value;
		$(".tooltip-iosVersion").hide();
	})
	$(".iosVersionContainer1 > textarea").on("click", function(e){
		iosVersionFlag = !iosVersionFlag;
		if(iosVersionFlag) $(".iosVersionContainer1 > ul").show()
		else $(".iosVersionContainer1 > ul").hide()
	})
	form.on('checkbox(iosVersion)',function(data){
		var html = "";
		if(data.elem.checked){		
			if(data.value == "-1"){			//全选
				iosVersionList = [];
				for(var i = 0; i < $(".iosVersionContainer1 li input").length; i++){
					if($($(".iosVersionContainer1 li input")[i]).attr("value") != "-1"){		//不显示全选
						iosVersionList.push({
							id:$($(".iosVersionContainer1 li input")[i]).attr("value"),
							name:$($(".iosVersionContainer1 li input")[i]).attr("title")
						})
					}
				}
				renderCheckBox($(".iosVersionContainer1"),data.elem.checked)
			}else{							//单个选中
				iosVersionList.push({
					id:data.value,
					name:$(data.elem).attr("title")
				})
				if(iosVersionList.length == $(".iosVersionContainer1 li input").length - 1)
					renderCheckBox($(".iosVersionContainer1"),data.elem.checked,0)
			}
		}else{
			if(data.value == "-1"){			//反选
				iosVersionList = []
				renderCheckBox($(".iosVersionContainer1"),data.elem.checked)
			}else{							//单个取消
				for(var i = 0; i < iosVersionList.length; i++){
					if(iosVersionList[i].id == data.value){
						iosVersionList.splice(i, 1);
					}
				}
				$($(".iosVersionContainer1 li .layui-form-checkbox")[0]).hasClass("layui-form-checked")
					renderCheckBox($(".iosVersionContainer1"),data.elem.checked,0)
			}
		}
		for(var i = 0; i < iosVersionList.length; i++){
			html += iosVersionList[i].name;
			if(i < iosVersionList.length - 1)  html += ",";
		}
		if(iosVersionList.length > 0) $(".tooltip-iosVersion").hide()
		$(".iosVersionContainer1 > textarea").val(html)
	})
	//选择安卓机型
	$(".chooseAndroidType").on("click", function(e){
		AndroidType = !AndroidType
		if(AndroidType) $(".AndroidType").show()
		else	$(".AndroidType").hide()
	})
	form.on('checkbox(AndroidType)',function(data){
		var html = "";
		if(data.elem.checked){		
			if(data.value == "-1"){			//全选
				AndroidTypeList = [];
				for(var i = 0; i < $(".AndroidType li input").length; i++){
					if($($(".AndroidType li input")[i]).attr("value") != "-1"){		//不显示全选
						AndroidTypeList.push({
							id:$($(".AndroidType li input")[i]).attr("value"),
							name:$($(".AndroidType li input")[i]).attr("title")
						})
					}
				}
				renderCheckBox($(".AndroidType"),data.elem.checked)
			}else{							//单个选中
				AndroidTypeList.push({
					id:data.value,
					name:$(data.elem).attr("title")
				})
				if(AndroidTypeList.length == $(".AndroidType li input").length - 1)
					renderCheckBox($(".AndroidType"),data.elem.checked,0)
			}
		}else{
			if(data.value == "-1"){			//反选
				AndroidTypeList = []
				renderCheckBox($(".AndroidType"),data.elem.checked)
			}else{							//单个取消
				for(var i = 0; i < AndroidTypeList.length; i++){
					if(AndroidTypeList[i].id == data.value){
						AndroidTypeList.splice(i, 1);
					}
				}
				if($($(".AndroidType li .layui-form-checkbox")[0]).hasClass("layui-form-checked"))
					renderCheckBox($(".AndroidType"),data.elem.checked,0)
			}
		}
		for(var i = 0; i < AndroidTypeList.length; i++){
			html += AndroidTypeList[i].name;
			if(i < AndroidTypeList.length - 1)  html += ",";
		}
		if(AndroidTypeList.length > 0) $(".tooltip-AndroidType").hide()
		$(".chooseAndroidType").val(html)
	})
	
	//选择安卓版本(大于等于或者小于等于时)
	form.on('select(AndroidVersionChoose)', function(data){
		AndroidVersion = data.value;
		$(".tooltip-AndroidVersion").hide();
	})
	$(".AndroidVersionContainer1 > textarea").on("click", function(e){
		AndroidVersionFlag = !AndroidVersionFlag;
		if(AndroidVersionFlag) $(".AndroidVersionContainer1 > ul").show()
		else $(".AndroidVersionContainer1 > ul").hide()
	})
	form.on('checkbox(AndroidVersion)',function(data){
		var html = "";
		if(data.elem.checked){		
			if(data.value == "-1"){			//全选
				AndroidVersionList = [];
				for(var i = 0; i < $(".AndroidVersionContainer1 li input").length; i++){
					if($($(".AndroidVersionContainer1 li input")[i]).attr("value") != "-1"){		//不显示全选
						AndroidVersionList.push({
							id:$($(".AndroidVersionContainer1 li input")[i]).attr("value"),
							name:$($(".AndroidVersionContainer1 li input")[i]).attr("title")
						})
					}
				}
				renderCheckBox($(".AndroidVersionContainer1"),data.elem.checked)
			}else{							//单个选中
				AndroidVersionList.push({
					id:data.value,
					name:$(data.elem).attr("title")
				})
				if(AndroidVersionList.length == $(".AndroidVersionContainer1 li input").length - 1)
					renderCheckBox($(".AndroidVersionContainer1"),data.elem.checked,0)
			}
		}else{
			if(data.value == "-1"){			//反选
				AndroidVersionList = []
				renderCheckBox($(".AndroidVersionContainer1"),data.elem.checked)
			}else{							//单个取消
				for(var i = 0; i < AndroidVersionList.length; i++){
					if(AndroidVersionList[i].id == data.value){
						AndroidVersionList.splice(i, 1);
					}
				}
				if($($(".AndroidVersionContainer1 li .layui-form-checkbox")[0]).hasClass("layui-form-checked"))
					renderCheckBox($(".AndroidVersionContainer1"),data.elem.checked,0)
			}
		}
		for(var i = 0; i < AndroidVersionList.length; i++){
			html += AndroidVersionList[i].name;
			if(i < AndroidVersionList.length - 1)  html += ",";
		}
		if(AndroidVersionList.length > 0) $(".tooltip-AndroidVersion").hide()
		$(".AndroidVersionContainer1 > textarea").val(html)
	})
	//插入单条手机号
	$(".insertSingel").on("click", function(){
		if(!$(".userPhone").check().mobile()){
			layer.msg('请输入正确的手机号！', {
				time: 1500, //1s后自动关闭
				icon: 2
			})
			return;
		}
		if($(".showUserPhone li") && $(".showUserPhone li").length > 0){
			for(var i = 0; i < $(".showUserPhone li").length; i++){
				if($(".showUserPhone li").text() == $(".userPhone").val()){
					layer.msg("该手机号已导入！请勿重复导入");
					return;
				}
			}
		}
		var layLoad = ""
		 	$.ajax({
				url:'/admin/msg/letter/importOne.do', //上传接口	
				type:"post",
				dataType:"json",
				data:{
					phoneNum:$(".userPhone").val()
				},
				beforeSend:function(){
					layLoad = layer.load(2,{
						shade: 0.6
					});//加载等待
				},
				success:function(json){		
					layer.close(layLoad)
					if(json.message == "成功"){
						
						
						layer.msg("插入成功");
						if(json.data.userId) var html = '<li class="valid" data-userId="'+json.data.userId+'">'+json.data.phoneNum+'</li>';
						else	var html = '<li class="userPhoneActive">' + json.data.phoneNum + '</li>';
						$(".showUserPhone").append(html)
					}else{
						layer.msg(json.message+"，请重新输入！");
					}
				},error:function(){
					layer.close(layLoad)
				}
	    	});		 	
		
	})
	//批量导入手机号并回显
	$(".insertMore").click(function(){	
		 $(".uploadFile").trigger("click");
	});
	
	$(".uploadFile").change(function(){
		var fs = new FormData();
		fs.append("uploadFile",$(".uploadFile")[0].files[0]);
		if($(".uploadFile")[0].files[0]){
			var layLoad = ""
		 	$.ajax({
				url:'/admin/msg/letter/import.do', //上传接口	
				type:"post",
				dataType:"json",
				data:fs,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,
				cache: false,     
				beforeSend:function(){
					layLoad = layer.load(2,{
						shade: 0.6
					});//加载等待
				},
				success:function(json){		
					layer.close(layLoad)
					if(json.message == "成功"){
						layer.msg("上传成功");
//						console.log(json)
						var html = ""
						if(json.data && json.data.valid) phoneList = json.data.valid;
						if(json.data.valid && json.data.valid.length > 0){
							for(var i = 0; i < json.data.valid.length; i++){
								if(json.data.valid[i].phoneNum)
									html += '<li class="valid" data-userId="'+json.data.valid[i].userId+'">'+json.data.valid[i].phoneNum+'</li>'
							}
						}
						if(json.data.invalid && json.data.invalid.length > 0){
							for(var i = 0; i < json.data.invalid.length; i++){
								if(json.data.invalid[i])
									html += '<li class="userPhoneActive" >'+json.data.invalid[i]+'</li>'
							}
						}
						$(".showUserPhone").empty().html(html)
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				},error:function(){
					layer.close(layLoad)
				}
	    	});		 	
		}		
	})

	//选择发送时间类型
	form.on('radio(sendTime)', function(data){
		sendTime = data.value;
		if(sendTime == 1)$(".setTimeSend,.repeatSend").hide();
		else if(sendTime == 2)	{
			
			$(".setTimeSend").show().parent().find(".repeatSend").hide();
		}
		else {
			showTimer('timer1')
			console.log($(".time_hour").val() + ":" + $(".time_minute").val() + ":" + $(".time_second").val())
			$(".repeatSend").show().parent().find(".setTimeSend").hide();
		}
	})
	
	//选择重复周期
	form.on('select(repeatType)', function(data){
		repeatType = data.value;
		if(repeatType == 1){ 	//每日
			$(".chooseWeek,.chooseMouth").hide()
			chooseWeek = "",chooseMouth = "";
		}else if(repeatType == 2){ //每周
			$(".chooseWeek").show().parent().find(".chooseMouth").hide()
			chooseWeek = 1;
		}else{					//每月
			$(".chooseWeek").hide().parent().find(".chooseMouth").show()
			chooseMouth = 1;
		}
	})
	//选择周几发送
	form.on('select(chooseWeek)', function(data){
		chooseWeek = data.value;
	})
	//选择哪一天发送
	form.on('select(chooseMouth)', function(data){
		chooseMouth = data.value;
	})
	var getTime = function() {
		var date = new Date();
		var strDate = date.getDate();
		var year = date.getFullYear()
		 var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    console.log(date.getMonth())
		if(date.getMonth()+1 == 12) {
			var month =  1;
			year += 1;
		}else var month = date.getMonth() + 2;
		if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
		 var generatedate = date.getFullYear() + "-" + month + "-" + strDate
	            + " " + date.getHours() + ":" + getMinutes
	            + ":" + getSeconds;
	    return generatedate
	}
	//时间插件
	var end = {
		min: laydate.now(),
		max: getTime(),
		istime: true,
		format: 'YYYY-MM-DD hh:mm:ss',
		choose: function(datas) {
//			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	
	document.getElementById('LAY_demorange_e').onclick = function() {
		end.elem = this
		$(".tooltip-setTimeSend").hide()
		laydate(end);
	}

	//验证
	$('.title').blur(function(){
		if(!$(".title").check().number(1,20))
			$('.tooltip-title').show()
		else
			$('.tooltip-title').hide()
		
	});
	$('.content').blur(function(){
		if(!$(".content").check().number(1,50))
			$('.tooltip-content').show()
		else
			$('.tooltip-content').hide()
		
	});

});