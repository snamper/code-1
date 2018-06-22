"use strict";
$($('.course_nr2 li')[0]).find('.shiji').slideDown();
layui.use(['element', 'laydate', 'upload', 'form' ], function(){
	var $ = layui.jquery;
	var form = layui.form();
	var adLength = "";	//视频长度
	var adverId = "";//广告id
	var tAdvertiserId = "";	//广告主id
	var tAdvertiserName = "";	//广告主名称
	var contentType = 2;	//广告类型
	var deliveryType = 1;  //投放类型默认为1（CPM视频）
	var choosePositionList = [];
	var middlePositionList = [];
	//下一页
	$(".nextPage").on("click", function() {
		var $nextPage = $(this).attr("data-nextPage");
		if($nextPage == 2){
			saveFirstMessage()
		}else if($nextPage == 3){
			saveSecMessage()
		}
	})
	//上一步
	$(".prePage").on("click", function() {
		var $prePage = $(this).attr("data-prePage");
		$('.course_nr2 li').find('.shiji').slideUp();
		if($prePage == 1){	//返回第一步
			$(".firstPage").removeClass("hide").siblings().addClass("hide")
			$($('.firstPage .course_nr2 li')[0]).find('.shiji').slideDown();
		}else if($prePage == 2){	//返回第二步
			$(".secondPage").removeClass("hide").siblings().addClass("hide")
			$($('.secondPage .course_nr2 li')[1]).find('.shiji').slideDown();
		}
	})
	//广告主选择
	form.on('select(short_name)', function(data){
		tAdvertiserId = data.value.split("/")[0];
		tAdvertiserName = data.value.split("/")[1];
		$(".tooltip-short_name").hide();
	});
	//广告类型选择
	form.on('radio(contentType)', function(data) {
		contentType = data.value;
	})
	//广告投放类型
	form.on('radio(deliveryType)', function(data) {
		deliveryType = data.value;
		if(deliveryType == 1) {	//CPM视频
			$(".cpmoneshow").show();
			$(".cpmonehide").hide();
		}else{
			$(".cpmoneshow").hide();
			$(".cpmonehide").show();
		}
	})
	//上传事件传递
	$("#asImportCode").click(function(){	//视频封面     
		 $(".uploadLogo").trigger("click");
	});
	$("#asImportVedio").click(function(){	//视频上传     
		 $(".uploadVedio").trigger("click");
	});
	//点击图片重新上传
	$("#uploadLogoShow").on("click", function() {
		$(".uploadLogo").trigger("click");
	})
	//点击视频重新上传
	$("#uploadVedioFile").on("click", function() {
		$(".uploadVedio").trigger("click");
	})
	//视频封面上传
	$(".uploadLogo").change(function(){
		var fs = new FormData();
		if($("#uploadLogoShow").attr("data-url")){
			fs.append("oldPath",$("#uploadLogoShow").attr("data-url"));
		}
		fs.append("imageFile",$(".uploadLogo")[0].files[0]);
		if($(".uploadLogo")[0].files[0]){
			var layLoad = ""
		 	$.ajax({
				url:'/admin/file/image/upload.do', //上传接口	
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
						$("#uploadLogoShow").attr("src",json.data.httpsPath)
						$("#uploadLogoShow").attr("data-url",json.data.httpsPath)
						$(".tooltip-image").hide()
						layer.msg("上传成功");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
	    	});		 	
		}		
	})
	//视频上传
	$(".uploadVedio").change(function(){
		var fs = new FormData();
		if($("#uploadVedioShow").attr("data-url")){
			fs.append("oldPath",$("#uploadVedioShow").attr("data-url"));
		}
		fs.append("videoFile",$(".uploadVedio")[0].files[0]);
		if($(".uploadVedio")[0].files[0]){
			var layLoad = ""
		 	$.ajax({
				url:'/admin/file/video/upload.do', //上传接口	
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
						var html = 
							'<div><video id="uploadVedioFile"  controls>'+
			 				'<source id="uploadVedioShow" data-url='+json.data.httpsPath+' src='+json.data.httpsPath+' type="video/mp4"></source>'+
			 			'</video>'+
			 			'<span class="coverVedio"></span></div>'
						$(".vedioContainer").empty().append(html)
						adLength = json.data.adLength;
						$(".tooltip-vedio").hide()
						layer.msg("上传成功");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
	    	});		 	
		}		
	})
	$(".choosePosition").on("click",function() {
		var expand = $(this).attr("attr-expand");
		if(expand && expand == 1){
			$(".adverPosition_area").show()
			$(".choosePosition").removeAttr("attr-expand");
		}else{
			$(".adverPosition_area").hide()
			$(".cancelPosition").click()
			$(this).attr("attr-expand","1");
		}
		
	})
	
	form.on('checkbox(position)', function(data){
		$(".tooltip-position").hide()
		console.log(data.elem.checked)
		if(data.elem.checked){
			if(middlePositionList.length > 0){
				var flag = false
				for(var  i = 0; i < middlePositionList.length; i++){
					if(middlePositionList[i].id == data.value)	flag = true;
				}
				if(!flag) middlePositionList.push({id:data.value,name:$(data.elem).attr("title")})
			}else  middlePositionList.push({id:data.value,name:$(data.elem).attr("title")})
		}else{
			if(middlePositionList.length > 0){
				for(var  i = 0; i < middlePositionList.length; i++){
					if(middlePositionList[i].id == data.value)	middlePositionList.splice(i, 1);
				}
			}
		}
	}); 
	$(".confirmPosition").on("click", function(){
		if(middlePositionList.length <= 0) {
			$(".choosePosition").val("")
			$(".adverPosition_area").hide()
			choosePositionList = [];
			return;
		};
		$(".adverPosition_area").hide()
		var showChoose = "";
		choosePositionList = [];
		for(var i = 0; i < middlePositionList.length; i++){
			showChoose += middlePositionList[i].name
			if(i < middlePositionList.length - 1) showChoose += "，"
			choosePositionList.push(middlePositionList[i])
		}
		$(".choosePosition").val(showChoose)
	})
	$(".cancelPosition").on("click", function() {
		$(".adverPosition_area").hide()
		if(choosePositionList.length > 0 && $(".checkboxChecked") && $(".checkboxChecked").length > 0){
			var html = "";
			for(var i = 0; i < $(".checkboxChecked").length; i++){
				var flag = true;
				for(var n = 0; n < choosePositionList.length; n++){
					if($($(".checkboxChecked")[i]).attr("value") == choosePositionList[n].id){
						html += '<li>'+
								'<input type="checkbox" checked class="checkboxChecked" lay-filter="position" value="'+choosePositionList[n].id+'"  title="第'+choosePositionList[n].id+'位" lay-skin="primary"  >'+
							'</li>'
						flag = false;
					}
				}
				if(flag){
					html += '<li>'+
							'<input type="checkbox" class="checkboxChecked" lay-filter="position" value="'+$($(".checkboxChecked")[i]).attr("value")+'"  title="第'+$($(".checkboxChecked")[i]).attr("value")+'位" lay-skin="primary"  >'+
						'</li>'
				}
			}
			$(".configCategory").empty().html(html)
			form.render("checkbox");
		}
	})
	//第一步
	var saveFirstMessage = function(){
		var data = {
			"handleType":2,						//第一页的下一步
			"tAdvertiserId":tAdvertiserId,		//广告主id
			"tAdvertiserName":tAdvertiserName,
			"cycleStartTime":$('#LAY_demorange_s').val(),
			"cycleEndTime":$('#LAY_demorange_e').val(),
			"name":$('.name').val(),
			"adHomepage":$("#uploadLogoShow").attr("data-url"),
			"mobileVersionUrl":$("#uploadVedioShow").attr("data-url"),
			"adLength":adLength,
			"description":$(".description").val(),
			"contentType":contentType,
			"deliveryType":deliveryType
		}
		if(adverId){
			data.id = adverId
		}
		
		if(!data.tAdvertiserId){
//			layer.msg('请选择广告主！')
			$(".tooltip-short_name").show()
			return;
		}
		if(!$('.name').check().number(1,30)){
//			layer.msg('请输入30字内的广告名称！')
			var message = "请输入30字内的广告名称"
			$(".tooltip-name").empty().html(message).show()
			return;
		}
		if(!$('.name').check().specialChar()){ 
			var message = "广告名不能有特殊字符"
			$(".tooltip-name").empty().html(message).show()
			return;
		}
		if(!data.cycleStartTime || !data.cycleEndTime){
//			layer.msg('请选择投放周期！')
			$(".tooltip-time").show()
			return;
		}
//		if(choosePositionList.length <= 0) {
//			$(".tooltip-position").show()
//			return;
//		}
		data.positionList = ""
		for(var i = 0; i < choosePositionList.length; i++){
			data.positionList += choosePositionList[i].id
			if(i < choosePositionList.length - 1) data.positionList += ","
		}
		if(!data.adHomepage){
			$(".tooltip-image").show()
			return;
		}
		if(!data.mobileVersionUrl){
//			layer.msg('请上传视频！');
			$(".tooltip-vedio").show()
			return;
		}
		if(!$(".description").check().number(0,200)){
			$(".tooltip-description").show()
			return
		}
		var source = $(this).attr("data-nextPage");
		$('.course_nr2 li').find('.shiji').slideUp();
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/ad/manage/save.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						adverId = json.data
						$(".secondPage").removeClass("hide").siblings().addClass("hide")
						$($('.secondPage .course_nr2 li')[1]).find('.shiji').slideDown();
					});
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	};
	//返回强提示
	$(".backAdvert").on("click", function() {
		layer.confirm('您确定返回吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			window.location.href = "/advertising/advertManage/advertManageSelf"
		}, function(index){
		  	
		})
	})
	var userFlag = 1;	//默认全部用户
	var userMessageBox = ""
	//监听用户标签
	form.on('radio(flag)', function(data) {
		userFlag = data.value;
		if(userFlag == 2){	//制定用户
			userMessageBox = layer.open({
				type: 1,
				skin: 'layui-layer-molv', //样式类名
				closeBtn: 0, //不显示关闭按钮
				anim: 1,
				shade: 0,
				area: ['800px', '360px'], //宽高
				title: ['设置投放信息', 'text-align: center; font-size: 16px;'],
				content: $('#userFlagBox')
			});
		}else{			//全部用户
			$(".chooseFlag .layui-input-checked").empty()
		}
	})
	
	//取消弹框
	$(".cancelSet").on("click",function(){
		alert("1")
		userFlag = 1;
		var html = '<input type="radio" name="flag" value="1" checked="checked" lay-filter="flag" title="全部用户" >' + 
					'<input type="radio" name="flag" value="2" lay-filter="flag" title="指定用户">'
		$(".userFlagChoose>div").empty().append(html)
		form.render('radio');
		layer.close(userMessageBox)
	})
	//监听用户性别
	var userSex = 0, userSexName = "全部";	//用户性别，默认全部
	form.on('radio(sex)', function(data) {
		userSex = data.value;
		userSexName = data.elem.title;
	})

	//指定用户保存
	$(".makeUser").on("click", function() {
		var minAge = $(".minAge").val();
		var maxAge = $(".maxAge").val();
		var reg = /^[0-9]*$/;
		if((minAge && !reg.test(minAge)) || (maxAge && !reg.test(maxAge))){
			layer.msg('年龄必须为数字！');
			return;
		}
		if(maxAge && minAge && maxAge < minAge){
			layer.msg('最大年龄不可小于最小年龄！');
			return;
		}
		var html = 	'<div class="layui-form-item" >'+
						'<label class="layui-input-inline" style="width: 70px;"> 用户性别:</label>' +
					'<div class="layui-input-inline userSex" data-sex='+userSex+' style="width: 30px;">' + userSexName + '</div>'+
					'<div class="layui-form-item" >'+
						'<label class="layui-input-inline" style="width: 70px;"> 用户年龄:</label>'
		if(minAge && maxAge){
			html += '<div class="layui-input-inline ageContent" data-minAge='+minAge+' data-maxAge='+maxAge+' style="width: 80px;">' + minAge +' - '+ maxAge + '岁</div>'
		}else if(minAge && !maxAge){
			html += '<div class="layui-input-inline ageContent" data-minAge='+minAge+' style="width: 80px;">最小' + minAge + '岁</div>'
		}else if(!minAge && maxAge){
			html += '<div class="layui-input-inline ageContent" data-maxAge='+maxAge+' style="width: 80px;">最大' + maxAge + '岁</div>'
		}else{
			html += '<div class="layui-input-inline ageContent"  style="width: 80px;">不限</div>'
		}
						
		html += '</div>'
		$(".chooseFlag .layui-input-checked").empty().append(html)
		layer.close(userMessageBox)				
	})
	
	//监听投放设备（CPM、CPC）
	form.on('checkbox(platem)', function(data) {
		var checkBoxFlag = $(".platemCheck>.layui-form-checkbox");
		if($($(checkBoxFlag)[0]).hasClass("layui-form-checked") && $($(checkBoxFlag)[1]).hasClass("layui-form-checked")){
			$(".platemCheck").attr("data-check","0")
		}else if($($(checkBoxFlag)[0]).hasClass("layui-form-checked") && !$($(checkBoxFlag)[1]).hasClass("layui-form-checked")){
			$(".platemCheck").attr("data-check","1")	//IOS
		}else if(!$($(checkBoxFlag)[0]).hasClass("layui-form-checked") && $($(checkBoxFlag)[1]).hasClass("layui-form-checked")){
			$(".platemCheck").attr("data-check","2")	//IOS
		}else{
			$(".platemCheck").attr("data-check","")
		}
	})
	
	//设置投放信息
	var saveSecMessage = function(){
		var data = {
			"handleType":3,					//第二页下一步
			"platformType":0,
			"deviceType":$(".platemCheck").attr("data-check"),
			"scopeType":Number(userFlag)
		}
		if(!data.deviceType){
			$(".tooltip-platemCheck").show()
			return;
		}
		if(userFlag == 2){	//指定用户
			var userSex = $(".userSex").attr("data-sex");	//	用户性别
			data.personSex = userSex;
			if($(".ageContent").attr("data-minAge")){
				data.personMinAge = $(".ageContent").attr("data-minAge");
			}
			if($(".ageContent").attr("data-maxAge")){
				data.personMaxAge = $(".ageContent").attr("data-maxAge");
			}
		}
		if(adverId){
			data.id = adverId
		}
		$('.course_nr2 li').find('.shiji').slideUp();
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/ad/manage/save.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						adverId = json.data
						$(".thirdPage").removeClass("hide").siblings().addClass("hide")
						$($('.thirdPage .course_nr2 li')[2]).find('.shiji').slideDown();
					});
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	}
	//获取列表页位置
	var getPositionList = function() {
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/ad/manage/position/list.do",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var html = "";
					if(json.data && json.data.length > 0){
						var positionList = json.data;
						for(var i = 0; i < positionList.length; i++){
							html += '<li>'+
								'<input type="checkbox" class="checkboxChecked" lay-filter="position" value="'+positionList[i]+'"  title="第'+positionList[i]+'位" lay-skin="primary"  >'+
							'</li>'
						}
						$(".configCategory").empty().html(html)
						form.render("checkbox")
					}else{
						$(".configCategory").empty().html("当前没有列表页位置！")
					}
				}else{
					$(".tooltip-position").html("获取列表页位置失败！").show()
				}
			},error:function() {
				$(".tooltip-position").html("获取列表页位置失败！").show()
			}
		})
		
	}
	getPositionList()
	//监听投放设备（CPM视频）
	form.on('checkbox(platemCpm)', function(data) {
		var checkBoxFlag = $(".platemCpm>.layui-form-checkbox");
		if($($(checkBoxFlag)[0]).hasClass("layui-form-checked") && $($(checkBoxFlag)[1]).hasClass("layui-form-checked")){
			$(".platemCpm").attr("data-check","0")
		}else if($($(checkBoxFlag)[0]).hasClass("layui-form-checked") && !$($(checkBoxFlag)[1]).hasClass("layui-form-checked")){
			$(".platemCpm").attr("data-check","1")	//IOS
		}else if(!$($(checkBoxFlag)[0]).hasClass("layui-form-checked") && $($(checkBoxFlag)[1]).hasClass("layui-form-checked")){
			$(".platemCpm").attr("data-check","2")	//IOS
		}else{
			$(".platemCpm").attr("data-check","")
		}
	})
  	//cpm视频保存
  	$(".commitAdver").on("click", function() {
  		var data = {
			"handleType":1,						//保存
			"tAdvertiserId":tAdvertiserId,		//广告主id
			"tAdvertiserName":tAdvertiserName,		//广告主名称
			"name":$('.name').val(),			//广告名称
			"scopeType":Number(userFlag),		//类型
			"cycleStartTime":$('#LAY_demorange_s').val(),
			"adHomepage":$("#uploadLogoShow").attr("data-url"),
			"mobileVersionUrl":$(".mobileVersionUrl").val(),
			"cycleEndTime":$('#LAY_demorange_e').val(),
			"description": $(".description").val(),
			"advertiserUnitPrice":$(".advertiserUnitPrice").val(),	//广告主单价
			"dayBudgetCeiling":	$(".dayBudgetCeiling").val(), 		//单日预算上限
			"deliveryType":deliveryType,							//投放类型
			"amount":$(".amount").val(),							//投放金额
			"platformType": 0,										//投放平台，只有手机
			"deviceType":$(".platemCpm").attr("data-check"),		//投放设备
			"contentType":contentType,
		};
		if(!$('.name').val() || $('.name').val().length > 30){
			layer.msg('请输入30字内的广告名称！')
			return;
		}
		if(data.name && !infoVerify(data.name,"goodsNames")){
			layer.msg('广告名称不能有特殊字符！')
			return;
		}
		if(!data.tAdvertiserId){
			layer.msg('请选择广告主！')
			return;
		}
		if(!$('#LAY_demorange_s').val() || !$('#LAY_demorange_e').val()){
			$(".tooltip-time").show();
			return;
		}
//		if(choosePositionList.length <= 0) {
//			$(".tooltip-position").show()
//			return;
//		}
		data.positionList = "";
		for(var i = 0; i < choosePositionList.length; i++){
			data.positionList += choosePositionList[i].id;
			if(i < choosePositionList.length - 1) data.positionList += ",";
		}
		if(!data.adHomepage){
			$(".tooltip-image").show();
			return;
		}
		var message = ""
		if(!$(".advertiserUnitPrice").check().notNull()){
			message = "请输入广告主单价"
			$(".advertiserUnitPrice").parent().parent().find(".tooltip-advertiserUnitPrice").html(message).show()
			return;
		}else{
			if(!$(".advertiserUnitPrice").check().isNum()){
				message = "只能输入数字"
				$(".advertiserUnitPrice").parent().parent().find(".tooltip-advertiserUnitPrice").html(message).show()
				return;
			}
		}
		if(!$(".dayBudgetCeiling").check().notNull()){
			message = "请输入单日预算上限"
			$(".dayBudgetCeiling").parent().parent().find(".tooltip-dayBudgetCeiling").html(message).show()
			return;
		}else{
			if(!$(".dayBudgetCeiling").check().isNum()){
				message = "只能输入数字"
				$(".dayBudgetCeiling").parent().parent().find(".tooltip-dayBudgetCeiling").html(message).show()
				return;
			}
		}
		if(!$(".amount").check().notNull()){
			message = "请输入投放金额"
			$(".amount").parent().parent().find(".tooltip-amount").html(message).show()
			return;
		}else{
			if(!$(".amount").check().isNum()){
				message = "只能输入数字"
				$(".amount").parent().parent().find(".tooltip-amount").html(message).show()
				return;
			}
		}
		if(!data.deviceType){
			$(".tooltip-platemCpm").show();
			return;
		}
		if(!data.mobileVersionUrl){
			$(".tooltip-mobileVersionUrl").show();
			return;
		}
		console.log(data)
		saveAdverMessage(data)
  	})
  	//调取保存数据接口
  	var saveAdverMessage = function(data){
  		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/ad/manage/save.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/advertising/advertManage/advertManageSelf"
					});
				}
			},
			error: function() {
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
  	}
	//保存
	$(".saveAdver").on("click", function(){
		var data = {
			"handleType":1,						//保存
			"name":$(".name").val(),
			"id":adverId
		};
		if($(".kpi").val() && !$('.kpi').check().number(1,9)){
			var message = "只能输入1-9位数字"
			$(".tooltip-kpi").show()
			return
		}else{
			if($('.kpi').val()){
				data.targetNumber = $(".kpi").val();
				data.tarNumber = $(".kpi").val();
			}
		}
		if($(".setMoney").val() && !$('.kpi').check().number(1,9)){
			var message = "只能输入1-9位数字"
			$(".tooltip-money").show()
			return
		}else{
			if($(".setMoney").val()){
				data.amount = $(".setMoney").val();
				data.adAmount = $(".setMoney").val();
			}
		}

		$('.course_nr2 li').find('.shiji').slideUp();
		saveAdverMessage(data)
	})
	//提交
	$(".submitAdvert").on("click", function() {
		var data = {
			"handleType":1,						//保存
			"name":$(".name").val(),
			"id":adverId
		};
		if($(".kpi").val() && !$('.kpi').check().number(1,9)){
			var message = "只能输入1-9位数字"
			$(".tooltip-kpi").show()
			return
		}else{
			if($('.kpi').val()){
				data.targetNumber = $(".kpi").val();
				data.tarNumber = $(".kpi").val();
			}
		}
		if($(".setMoney").val() && !$('.kpi').check().number(1,9)){
			var message = "只能输入1-9位数字"
			$(".tooltip-money").show()
			return
		}else{
			if($(".setMoney").val()){
				data.amount = $(".setMoney").val();
				data.adAmount = $(".setMoney").val();
			}
		}
		$('.course_nr2 li').find('.shiji').slideUp();
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/advertising/advertManage/saveAdver",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var data = {
						"id":adverId,
					}
					$.ajax({
						type: "post",
						dataType: "json",
						url: "/advertising/advertManage/submitAdvert",
						data: data,
						beforeSend:beforeSend(),
						success: function(json) {
							if(json.message == "成功") {
								layer.msg('提交成功！', {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									window.location.href = "/advertising/advertManage/advertManageSelf"
								});
							}else{
								layer.msg(json.message)
							}
						},
						error: function() {
							layer.msg('提交失败！', {
								time: 1500, //1s后自动关闭
								icon: 2
							});
						}
					})
				}
			},
			error: function() {
				layer.msg('提交失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
	//视频预览
	$(".adverPreview").on("click", function() {
		console.log($(".mobileVersionUrl").val())
//		console.log()
		var url = $(".mobileVersionUrl").val();
		console.log($(".mobileVersionUrl").check().http())
		if($(".mobileVersionUrl").check().http())
			window.open(url,"_target")
		else
			$(".tooltip-mobileVersionUrl").show()
	})
	$(".mobileVersionUrl").on("blur",function() {
		if($(".mobileVersionUrl").check().http())
			$(".tooltip-mobileVersionUrl").hide()
		else
			$(".tooltip-mobileVersionUrl").show()
	})
	//H5预览
	$('.previewH5Btn').on('click', function (){
		var videoStr = '<video id="uploadVedio" controls>' +
							'<source id="uploadVedioShow" src="' + $("#uploadVedioShow").attr("data-url") + '" type="video/mp4"></source>' +
					'</video>';
		$('.videoBox').html(videoStr);//广告视频地址
		$('.view_title').find('h1').html($(".name").val());//广告标题
		$('.view_time').html();
		$('.playNum').html(0);//播放次数
		$('.view_item_box').html("暂无相关推荐视频");
		$('.H5PreviewBox').removeClass('hide');
		
	});
	//关闭预览
	$('.closePreview').on('click',function (){
		$('.H5PreviewBox').addClass('hide');
	});
	
	 var start = {
	    min: laydate.now(),
	    max: '2099-06-16 23:59:59',
	    istoday: false,
	    istime: true,
	    format: 'YYYY-MM-DD hh:mm:ss',
	    choose: function(datas){
		    end.min = datas; //开始日选好后，重置结束日的最小日期
		    end.start = datas //将结束日的初始值设定为开始日
		}
	};
  	
	  var end = {
	    min: laydate.now(),
	    max: '2099-06-16 23:59:59',
	    istoday: false,
	     istime: true,
	    format: 'YYYY-MM-DD hh:mm:ss',
	    choose: function(datas){
	      start.max = datas; //结束日选好后，重置开始日的最大日期
	    }
	  };
	  
	  document.getElementById('LAY_demorange_s').onclick = function(){
	    start.elem = this;
	    laydate(start);
	  }
	  document.getElementById('LAY_demorange_e').onclick = function(){
	    end.elem = this
	    laydate(end);
	  }

	//当前时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + getMinutes
	            + seperator2 + getSeconds;
	    return currentdate;
	};
	$('#LAY_demorange_s').on("change", function() {
		if($('#LAY_demorange_s').val() && $('#LAY_demorange_e').val()){
			$(".tooltip-time").hide()
		}
	})
	$('#LAY_demorange_e').on("change", function() {
		if($('#LAY_demorange_s').val() && $('#LAY_demorange_e').val()){
			$(".tooltip-time").hide()
		}
	})
	
	//校验
	$(".name").on("blur", function() {
		if($('.name').val() && !$('.name').check().number(1,30)){
			var message = "请输入30字内的广告名称"
			$(".tooltip-name").empty().html(message).show()
			return;
		}else{
			if($('.name').val() && !$('.name').check().specialChar()){
				var message = "广告名不能有特殊字符"
				$(".tooltip-name").empty().html(message).show()
			}else{
				$(".tooltip-name").hide()
			}
		}
	})
	
	$(".description").on("blur", function() {
		if($(".description").val() && !$(".description").check().number(0,200)){
			$(".tooltip-description").show()
		}else{
			$(".tooltip-description").hide()
		}
	})
	$("#LAY_demorange_s").on("blur", function() {
		if($("#LAY_demorange_s").val() && $("#LAY_demorange_e").val()){
			$(".tooltip-time").hide()
		}
	})
	$(".kpi").on("blur", function() {
		if($(".kpi").val() && !$('.kpi').check().number(1,9)){
			var message = "只能输入1-9位数字"
			$(".tooltip-kpi").show()
		}else{
			if(!$('.kpi').check().isNum()){
				$(".tooltip-kpi").show()
			}else{
				$(".tooltip-kpi").hide()
			}
			
		}
	})
	$(".setMoney").on("blur", function() {
		if($(".setMoney").val() && !$('.kpi').check().number(1,9)){
			var message = "只能输入1-9位数字"
			$(".tooltip-money").show()
		}else{
			if(!$('.kpi').check().isNum()){
				$(".tooltip-money").show()
			}else{
				$(".tooltip-money").hide()
			}
		}
	})
	$(".advertiserUnitPrice").on("blur", function() {
		var message = ""
		if(!$(this).check().notNull()){
			message = "请输入广告主单价"
			$(this).parent().parent().find(".tooltip-advertiserUnitPrice").html(message).show()
		}else{
			if(!$(this).check().isNum()){
				message = "只能输入数字"
				$(this).parent().parent().find(".tooltip-advertiserUnitPrice").html(message).show()
			}else{
				$(this).parent().parent().find(".tooltip-advertiserUnitPrice").hide()
			}
		}
	})
	$(".dayBudgetCeiling").on("blur", function() {
		var message = ""
		if(!$(this).check().notNull()){
			message = "请输入单日预算上架"
			$(this).parent().parent().find(".tooltip-dayBudgetCeiling").html(message).show()
		}else{
			if(!$(this).check().isNum()){
				message = "只能输入数字"
				$(this).parent().parent().find(".tooltip-dayBudgetCeiling").html(message).show()
			}else{
				$(this).parent().parent().find(".tooltip-dayBudgetCeiling").hide()
			}
		}
	})
	$(".amount").on("blur", function() {
		var message = ""
		if(!$(this).check().notNull()){
			message = "请输入投放金额"
			$(this).parent().parent().find(".tooltip-amount").html(message).show()
		}else{
			if(!$(this).check().isNum()){
				message = "只能输入数字"
				$(this).parent().parent().find(".tooltip-amount").html(message).show()
			}else{
				$(this).parent().parent().find(".tooltip-amount").hide()
			}
		}
	})
});