"use strict";
layui.use(['element', 'laydate', 'upload', 'form', 'paging'], function(){
	var $ = layui.jquery;
	var form = layui.form(); //加载form模块
	var type = 1;
	//选择 活动/渠道 类型
	form.on('radio(type1)', function(data){
		type = data.value;
		if(type == 1) {
			$(".act-edit-active").removeClass("hide");
			$(".act-channel-main").addClass("hide");
		}else {
			$(".act-edit-active").addClass("hide");
			$(".act-channel-main").removeClass("hide");
		}
	});
	
	//选择 打包活动/类王者荣耀 类型
	form.on('radio(type2)', function(data){
		type = data.value;
		if(type == 1) {
			$(".act-edit-active").removeClass("hide");
			$(".act-channel-main").addClass("hide");
		}else {
			$(".act-edit-active").addClass("hide");
			$(".act-channel-main").removeClass("hide");
		}
	});
	
	
	// 活动验证
	
	var nameFlag = false, intFlag = false, limitFlag = true;
	
	//名称验证
	$('.active-name').blur(function(){
		var message = "",_this=this;
		if(!$('.active-name').check().number(1,50)){
			message = "请输入50字内活动名称";
			nameFlag = false;
			$('.tooltip-name').empty().html(message).show()
		}else{
			$('.tooltip-name').hide()
			if(!$('.active-name').check().specialChar()){
				message = "活动名称不能有特殊字符";
				nameFlag = false
				$('.tooltip-name').empty().html(message).show()
			}else{
				$('.tooltip-name').hide();
				nameFlag = true;
			}
		}
	});
	//积分验证
	$('.get-integral').blur(function(){
		var message = ""
		if( !isNaN( $('.get-integral').val() ) ){
			if( $('.get-integral').val() < 0  ) {
				message = "请输入不小于0数字";
				intFlag = false
				$('.tooltip-integral').empty().html(message).show()	
			}else {
				$('.tooltip-integral').empty().hide();
				intFlag = true;
			}
		}else {
			message = "请输入不小于0数字"
			$('.tooltip-integral').empty().html(message).show();
			intFlag = false;
		}
		
	});
	//数量限制
	$('.number-limit').blur(function(){
		var message = ""
		if( !isNaN( $('.number-limit').val() ) ){
			if( $('.number-limit').val() < 0  ) {
				message = "请输入不小于0数字";
				 limitFlag = false;
				$('.tooltip-limit').empty().html(message).show()	
			}else {
				$('.tooltip-limit').empty().hide();
				 limitFlag = true;
			}
		}else {
			message = "请输入不小于0数字"
			$('.tooltip-limit').empty().html(message).show();
			limitFlag = false;
		}
		
	});
	
	
	// 活动保存
	$(".saveAddActive").on("click", function() {

		if(nameFlag && intFlag && limitFlag) {
			var name = $('.active-name').val();
			var integral = $('.get-integral').val();
			var limit = $('.number-limit').val();
			
			var data = {
				name: name,
				inviteScore: integral,
				inviteLimit: limit,
			}
			layer.confirm('保存后及时生效，是否保存？', {
			btn: ['确认', '取消'] //按钮
				}, function() {
					$.ajax({
						type: "post",
						dataType: "json",
						url: "/admin/spread/event/add.do",
						data:data,
						beforeSend:beforeSend(),
						success: function(json) {
							if(json.message == "成功") {
								layer.msg('保存成功！', {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									window.location.href = "/operation/actManagement/channelList"
								});
							}else {
								layer.msg(json.message, {
									time: 1500, //1s后自动关闭
									icon: 2
								});
							}
						},error: function(){
							layer.msg('保存失败！', {
								time: 1500, //1s后自动关闭
								icon: 2
							});
						}
					})
				})
			console.log(data)
		}else {
			layer.msg('格式不正确！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
		}
	})
	
	/*渠道*/
	
	//佣金模板
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/spread/channel/fundList.do",
			data: {
				pageNo:1,
				pageSize:10
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var html = "";
					html += '<option value="">佣金模板</option><option value=" ">请选择佣金模板</option>'
					if(!json.data.datas.list || json.data.datas.list <= 0) return;
					for(var i = 0; i < json.data.datas.list.length; i++){
						 html += '<option value='+ json.data.datas.list[i].id +'>'+ json.data.datas.list[i].name +'</option>'
					}
					$("#moneyMoudle").empty().html(html);
					form.render('select')
					
				}else{
					layer.msg(json.message)
				}
			}
		})
	
	
	//渠道验证
	var channelFlag = false, contactsFlag = false, phonelFlag = false, detailFlag = true, bankFlag = true, accountslFlag = true,remarksFlag = true;	
	$('.channel-name').blur(function(){
		var message = "";
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,20}$/;
		if( !reg.test( $('.channel-name').val() ) ){
			message = "限20字节内(只包含中英数)";
			channelFlag = false;
			$('.tooltip-channel').empty().html(message).show()
		}else{
			if(  strlen( $('.channel-name').val()) >20  ) {
				message = "限20字节内(只包含中英数)";
				channelFlag = false;
				$('.tooltip-channel').empty().html(message).show()
			}else {
				$('.tooltip-channel').empty().hide();
				channelFlag = true;
			}
		}
		
	});
	
	
	//字节长度函数
	function strlen(str){  
		var len = 0;  
	    for (var i=0; i<str.length; i++) {  
	         var c = str.charCodeAt(i);  
	         //单字节加1  
	         if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
	               len++;  
	         }else {  
	               len+=2;  
	         }  
	    }  
		return len;  
	}  
	
	//联系人
	$('.contacts').blur(function(){
		var message = "";
		var reg = /^[A-Za-z\u4e00-\u9fa5]{1,10}$/;
		if( !reg.test( $('.contacts').val() ) ){
			message = "限10个字节内(只包含中英文)";
			contactsFlag = false;
			$('.tooltip-contacts').empty().html(message).show()
		}else{
			if(  strlen( $('.contacts').val()) >10  ) {
				message = "限10个字节内(只包含中英文)";
				contactsFlag = false;
				$('.tooltip-contacts').empty().html(message).show()
			}else {
				$('.tooltip-contacts').empty().hide();
				contactsFlag = true;		
			}
		}
	});
	
	//手机号
	
	$('.phone').blur(function(){
		var message = "";
		var reg = /^1\d{10}$/
		if(!reg.test( $('.phone').val() )){
			message = "手机号格式不正确";
			phonelFlag = false;
			$('.tooltip-phone').empty().html(message).show()
		}else{
			
				$('.tooltip-phone').hide();
				phonelFlag = true;
		}
	});
	
	
	//详细地址
	$('.detail-address').blur(function(){
		var message = "";
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,80}$/;
		if( !reg.test( $('.detail-address').val() ) ){
			message = "限80个字节内(只包含中英数)";
			detailFlag = false;
			$('.tooltip-detail').empty().html(message).show()
		}else{
			if(  strlen( $('.detail-address').val()) >80  ) {
				message = "限80个字节内(只包含中英数)";
				detailFlag = false;
				$('.tooltip-detail').empty().html(message).show()
			}else {
				$('.tooltip-detail').empty().hide();
				detailFlag = true;		
			}
		}
	});
	
	//支行验证
	$('.bank').blur(function(){
		var message = "";
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,40}$/;
		if( !reg.test( $('.bank').val() ) ){
			message = "限40个字节内(只包含中英数)";
			bankFlag = false;
			$('.tooltip-bank').empty().html(message).show()
		}else{
			if(  strlen( $('.bank').val()) >40  ) {
				message = "限40个字节内(只包含中英数)";
				bankFlag = false;
				$('.tooltip-bank').empty().html(message).show()
			}else {
				$('.tooltip-bank').empty().hide();
				bankFlag = true;		
			}
		}
	});
	//帐号  accounts
	$('.accounts').blur(function(){
		var message = "";
		var reg = /^[0-9]{0,25}$/
		if(!reg.test( $('.accounts').val() )){
			message = "纯数字不得超过25个数字长度";
			accountslFlag = false;
			$('.tooltip-accounts').empty().html(message).show()
		}else{
			$('.tooltip-accounts').empty().hide();
			accountslFlag = true;
		}
	});
	//备注验证  remarks
	$('.remarks').blur(function(){
		var message = "";
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,300}$/;
		if( !reg.test( $('.remarks').val() ) ){
			message = "限300个字节内(只包含中英数)";
			remarksFlag = false;
			$('.tooltip-remarks').empty().html(message).show()
		}else{
			if(  strlen( $('.remarks').val()) >300  ) {
				message = "限80个字节内(只包含中英数)";
				remarksFlag = false;
				$('.tooltip-remarks').empty().html(message).show()
			}else {
				$('.tooltip-remarks').empty().hide();
				remarksFlag = true;		
			}
		}
	});
	//渠道保存
	$(".saveAdd").on("click", function() {
//		console.log($("#provid").find("option:selected").text())
		var provid = $("#provid").val();
		var cityid = $("#cityid").val();
		var areaid = $("#areaid").val();
		
		console.log(provid,cityid,areaid)
		if(  channelFlag && contactsFlag && phonelFlag && detailFlag && bankFlag && accountslFlag && remarksFlag ) {
			
			var data = {
				name: $(".channel-name").val() ,
				contact: $(".contacts").val() ,
				phoneNumber: $(".phone").val() ,   
				province: $("#provid").find("option:selected").text() ,
				city: $("#cityid").find("option:selected").text() ,   
				district: $("#areaid").find("option:selected").text() ,  
				addressDetail: $(".detail-address").val() ,    
				fundId: $("#moneyMoudle").val(), 
				bank:$("#bankSelect").val(), 
				subBank: $(".bank").val() ,
				account: $(".accounts").val() ,
				remark: $(".remarks").val() ,
				provinceCode: provid,
				cityCode: cityid,
				districtCode: areaid
			}
			
			console.log(data)
			
			layer.confirm('保存后及时生效，是否保存？', {
				btn: ['确认', '取消'] //按钮
					}, function() {
						$.ajax({
							type: "post",
							dataType: "json",
							url: "/admin/spread/channel/addchannel.do",
							data:data,
							beforeSend:beforeSend(),
							success: function(json) {
								if(json.message == "成功") {
									layer.msg('保存成功！', {
										time: 1000, //1s后自动关闭
										icon: 1
									},function(){
										window.location.href = "/operation/actManagement/channelList"
									});
								}else {
									layer.msg(json.message, {
										time: 1000, //1s后自动关闭
										icon: 2
									})
								}
							},error: function(){
								layer.msg('保存失败！', {
									time: 1500, //1s后自动关闭
									icon: 2
								});
							}
						})
					})
		}else{
			layer.msg('必选项未填写或填写内容格式不正确！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
		}
	})
});