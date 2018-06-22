//删除
"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	var parendId = "",
		channelId = "",
		channelParendId = "",
		thirdChannelList = [],
		categoryList = [];	//用来存储渠道所对应的类目
	var thirdChannelCodeList = [];	//选择的类目列表
	var editChanlleCodeList = [];	//用来回显
	var thirdChannelIds = [];
	var channelList = [];
	var systemType = "";
	var ifParent = true;
	//获取渠道列表
	var getChannelList = function(parentId,message) {
		if(message) {
			if(message[0] == '"'){	//去掉“”
				message = message.slice(1,message.length -1)
			}
			if(!message.thirdChannelList)
				message = JSON.parse(message);
			if(message.thirdChannelList) thirdChannelList = message.thirdChannelList;
			$(".channelName").val(message.name);
			$(".sort").val(message.sort)
		}
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/third/channel/list.do",
			beforeSend:beforeSend(),
			success: function(json) {
				editCateList(message)
				if(json.message == "成功") {
					var html = "";
					if(!json.data.datas || json.data.datas.length <= 0 ) return;
					channelList = json.data.datas;
					for(var i = 0; i < channelList.length; i++){
						var flag = false;
						if(thirdChannelList.length > 0){
							for(var n = 0; n < thirdChannelList.length; n++){
								if(channelList[i].id == thirdChannelList[n].id){
									flag = true;
									html += '<li>'+
										'<input type="checkbox" checked class="checkboxChecked" thirdChannelCode="'+channelList[i].thirdChannelCode+'" code="'+channelList[i].code+'" lay-filter="position" value="'+channelList[i].id+'"  title="'+channelList[i].name+'" lay-skin="primary"  >'+
									'</li>'
								}
							}
						}
						if(!flag || thirdChannelList.length <= 0){
							html += '<li>'+
								'<input type="checkbox" class="checkboxChecked" thirdChannelCode="'+channelList[i].thirdChannelCode+'" code="'+channelList[i].code+'" lay-filter="position" value="'+channelList[i].id+'"  title="'+channelList[i].name+'" lay-skin="primary"  >'+
							'</li>'
						}
						
					}
					$(".configCategory").empty().html(html)
					form.render("checkbox")
				}else{
					layer.msg(json.message , {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			}
		})
	}
	//获取来源类目
	var getCatList = function(id,message,ids) {
		if(!id){
			generateList(id,message);
			return;
		}
		
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/third/content/channel/cat/list.do",
			beforeSend:beforeSend(),
			data:{
				thirdChannelId:id
			},
			success: function(json) {
				if(json.message == "成功") {
					var num = 0;
					if(ids && ids.length > 1){
						for(var i = 0; i < ids.length -1; i++){
							if(id == ids[i].id){
								num = i;
								getCatList(ids[i+1].id,message,ids);
							}
						}
					}
					
					if(!json.data || json.data.length <= 0 ) return;
					var catList = json.data;
					
					categoryList = categoryList.concat(catList)
					if(message && ids && ((ids.length > 1 && id == ids[length].id) || ids.length <= 1)){
						console.log(message)
						if(message.thirdContentCategoryList && message.thirdContentCategoryList.length > 0){
							for(var n = 0; n < message.thirdContentCategoryList.length; n++){
								for(var i = 0; i < categoryList.length; i++){
									if(message.thirdContentCategoryList[n] && message.thirdContentCategoryList[n].id && message.thirdContentCategoryList[n].id == categoryList[i].id)
										thirdChannelCodeList.push(categoryList[i])
								}
							}
							generateList(id,message)
						}else{
							generateList(id,message)
						}
					}else{
						generateList(id,message)
					}
				}else{
					layer.msg(json.message , {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			}
		})
	}
	//编辑时类目回显
	var curMessage = ""
	var editCateList = function(message) {
		curMessage = message;
		$(".saveContentMessage").attr("data-message",JSON.stringify(curMessage))
		if(!message || !thirdChannelList || thirdChannelList.length <= 0) return;
		var ids = [];
		for(var i = 0; i < thirdChannelList.length; i++){
			ids.push(thirdChannelList[i])
		}
		thirdChannelIds = ids;
		getCatList(ids[0].id,message,ids)
		
	}
	//查找渠道名称
	var getChannelName = function(code) {
		for(var i = 0; i < channelList.length; i++){
			if(code == channelList[i].code){
				return channelList[i].name
			}
		}
	}
	var generateList = function(id,message,list) {	//类目选项显示
		var html = "",
			thirdContentCategoryList = []
		if(message && message.thirdContentCategoryList) {
			thirdContentCategoryList = message.thirdContentCategoryList;
		}
		for(var i = 0; i < categoryList.length; i++){
			if(thirdContentCategoryList.length > 0){
				var flag = true;
				for(var n = 0; n < thirdContentCategoryList.length; n++){
					if(thirdContentCategoryList[n] && thirdContentCategoryList[n].id && thirdContentCategoryList[n].id == categoryList[i].id){
						if(thirdContentCategoryList[n].id == "-1" && thirdContentCategoryList[n].thirdChannelCode == categoryList[i].thirdChannelCode || thirdContentCategoryList[n].id != "-1"){
							flag = false;
							html += '<li>'+
								'<input type="checkbox" checked class="checkboxCat" lay-filter="category" thirdChannelCode="'+categoryList[i].thirdChannelCode+'"  thirdChannelId="'+categoryList[i].thirdChannelId+'" channelId="'+categoryList[i].thirdChannelId+'" categoryId="'+categoryList[i].categoryId+'" value="'+categoryList[i].id+'"  title="'+categoryList[i].name+'('+getChannelName(categoryList[i].thirdChannelCode)+')" lay-skin="primary"  >'+
							'</li>'
						}
					}
				}
				if(flag){
					html += '<li>'+
							'<input type="checkbox" class="checkboxCat" lay-filter="category" thirdChannelCode="'+categoryList[i].thirdChannelCode+'"  thirdChannelId="'+categoryList[i].thirdChannelId+'" channelId="'+categoryList[i].thirdChannelId+'" categoryId="'+categoryList[i].categoryId+'" value="'+categoryList[i].id+'"  title="'+categoryList[i].name+'('+getChannelName(categoryList[i].thirdChannelCode)+')"" lay-skin="primary"  >'+
						'</li>'
				}
			}else{
				html += '<li>'+
							'<input type="checkbox" class="checkboxCat" lay-filter="category" thirdChannelCode="'+categoryList[i].thirdChannelCode+'"  thirdChannelId="'+categoryList[i].thirdChannelId+'" channelId="'+categoryList[i].thirdChannelId+'" categoryId="'+categoryList[i].categoryId+'" value="'+categoryList[i].id+'"  title="'+categoryList[i].name+'('+getChannelName(categoryList[i].thirdChannelCode)+')"" lay-skin="primary"  >'+
						'</li>'
			}
			
		}
		$(".catSource").empty().append(html)
		form.render("checkbox")
	}
	//来源渠道
	form.on("checkbox(position)", function(data){
		var thirdChannelId = data.value;
		if(data.elem.checked){
			
			if(thirdChannelCodeList.length > 0){
				var message = {
					thirdContentCategoryList:[]
				}
				for(var i = 0; i < thirdChannelCodeList.length; i++){
					message.thirdContentCategoryList.push(thirdChannelCodeList[i])
				}
				for(var n = 0; n < curMessage.thirdContentCategoryList.length; n++){
					var flag = false;
					for(var i = 0; i < message.thirdContentCategoryList.length; i++){
						if(curMessage.thirdContentCategoryList[n] && curMessage.thirdContentCategoryList[n].id && message.thirdContentCategoryList[i] && message.thirdContentCategoryList[i].id &&  curMessage.thirdContentCategoryList[n].id == message.thirdContentCategoryList[i].id){
							flag = true;
						}
					}
					if(!flag)	message.thirdContentCategoryList.push(curMessage[i])
				}
				getCatList(data.value,message,data.value)
			}else{
				getCatList(data.value,curMessage,data.value)
			}
		}else{
			
			curMessage = $(".saveContentMessage").attr("data-message")
			if(curMessage) curMessage = JSON.parse(curMessage)
			for(var i = 0; i < categoryList.length; i++){
				if(categoryList[i].thirdChannelId == thirdChannelId){
					categoryList.splice(i,1);
					--i;
				}
			}
			var message = {thirdContentCategoryList:[]};
			if(thirdChannelCodeList.length > 0){
				for(var i = 0; i < thirdChannelCodeList.length; i++){
					if(thirdChannelCodeList[i].thirdChannelId == thirdChannelId){
						thirdChannelCodeList.splice(i,1);
						i--;
					}
				}
			
				for(var n = 0; n < curMessage.thirdContentCategoryList.length; n++){
					var flag = false;
					for(var i = 0; i < message.thirdContentCategoryList.length; i++){
						if(curMessage.thirdContentCategoryList[n].id == message.thirdContentCategoryList[i].id){
							flag = true;
							continue;
						}
					}
					if(!flag)	message.thirdContentCategoryList.push(curMessage.thirdContentCategoryList[i])
				}
			}else {
				if(curMessage && curMessage.length > 0){
					for(var n = 0; n < curMessage.length; n++){
						message.thirdContentCategoryList.push(curMessage.thirdContentCategoryList[i])
					}
				}
				
			}
			getCatList("",message);
			form.render("checkbox");
		}
	})
	//来源类目
	form.on("checkbox(category)", function(data){
		var categoryId = $(data.elem).attr("categoryId")
		var cateId = data.value;
		var thirdChannelId = $(data.elem).attr("thirdChannelId")
		if(data.elem.checked){		//选中
			if(categoryId == 0){	//全选
				var thirdChannelId = $(data.elem).attr("thirdChannelId")
				for(var i = 0; i < $(".checkboxCat").length; i++){
					if($($(".checkboxCat")[i]).attr("channelId") == thirdChannelId){
						$($(".checkboxCat")[i]).attr("checked","checked")
						thirdChannelCodeList.push({
							thirdChannelCode:$($(".checkboxCat")[i]).attr("thirdChannelCode"),
							id:$($(".checkboxCat")[i]).attr("value"),
							categoryId:$($(".checkboxCat")[i]).attr("value"),
							code:$($(".checkboxCat")[i]).attr("categoryId"),
							thirdChannelId:$($(".checkboxCat")[i]).attr("thirdChannelId")
						})
					}
				}
				
				form.render("checkbox")
			}else{				//单选
				thirdChannelCodeList.push({
					thirdChannelId:thirdChannelId,
					categoryId:categoryId,
					id:cateId,
					thirdChannelCode:$(data.elem).attr("thirdChannelCode"),
					code:$(data.elem).attr("categoryId"),
				})
			}
		}else{						//取消选择
			if(categoryId == 0){	//反选
				var thirdChannelId = $(data.elem).attr("thirdChannelId")
				for(var i = 0; i < $(".checkboxCat").length; i++){
					if($($(".checkboxCat")[i]).attr("channelId") == thirdChannelId){
						$($(".checkboxCat")[i]).removeAttr("checked","checked")
					}
				}
				for(var n = 0; n < thirdChannelCodeList.length; n++){
					if(thirdChannelCodeList[n].thirdChannelId == thirdChannelId){
						thirdChannelCodeList.splice(n,1);
						--n;
					}
				}
				form.render("checkbox")
			}else{
				for(var i = 0; i < thirdChannelCodeList.length; i++){
					if(thirdChannelCodeList[i].categoryId == categoryId){
						thirdChannelCodeList.splice(i,1);
					}
				}
			}
		}
	})
	//上传事件传递
	$("#asImportCode").click(function(){	
		 $(".uploadLogo").trigger("click");
	});
	$("#uploadLogoShow").click(function(){	
		 $(".uploadLogo").trigger("click");
	});
	//商品列表上传
	$(".uploadLogo").change(function(){
		var fs = new FormData();
		if($("#uploadLogoShow").attr("data-url")){
			fs.append("oldPath",$("#uploadLogoShow").attr("src"));
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
						$(".tooltip-image").hide()
						$("#asImportCode").hide()
						$("#uploadLogoShow").show().attr("src",json.data.httpsPath)
						layer.msg("上传成功");
					}else{
						layer.msg(json.message+"，请重新上传！");
					}
				}
	    	});		 	
		}		
	})
	//保存内容频道内容
	$(".saveContentMessage").on("click", function(){
		var thirdChannelCategoryList1 = [];

		for(var i = 0; i < $(".catSource li .layui-form-checked").length; i++){
			var inputMessage = $($(".catSource li .layui-form-checked")[i]).parent().find("input");
			thirdChannelCategoryList1.push({
				id:inputMessage.attr("value"),
				categoryId:inputMessage.attr("categoryId"),
				thirdChannelCode:inputMessage.attr("thirdChannelCode")
			})
		}
		var channelListHtml = $(".configCategory .layui-form-checked");
		var thirdChannelId = ""
		for(var i = 0; i < channelListHtml.length; i++){
			if($($(channelListHtml)[i]).parent().find(".checkboxChecked").attr("code") == "self" ){
				thirdChannelId = $($(channelListHtml)[i]).parent().find(".checkboxChecked").attr("value")
			}
		}
		var data = {
			name:$(".channelName").val(),
			sort:$(".sort").val(),
			thirdContentCategoryListString:JSON.stringify(thirdChannelCategoryList1),
			thirdChannelId:thirdChannelId,
//			systemType:0,
			parentId: channelParendId,
		}
		if(!ifParent) data.image = $("#uploadLogoShow").attr("src")
		var $this = $(this),systemTypeNew="";
		if( $('.systemTypeBoxNew').find('.layui-form-checked').length == 2 ){
			systemTypeNew=0;
		}else if( $('.systemTypeBoxNew').find('.layui-form-checked').length == 1  ){
			
			if ( $('.systemTypeBoxNew').find('.layui-form-checked').find('span').html() == "ios"){
				systemTypeNew=1;
			}else{
				systemTypeNew=2;
			}
		}else{
			layer.msg("请选择显示平台", {
				time: 1500, //1s后自动关闭
				icon: 2
			})
			return false;
		}
		data.systemType = systemTypeNew;
		if(!$(".channelName").check().notNull()) {
			$('.tooltip-channelName').show();
			return
		} 
		if(!$(".sort").check().isNum() || !$(".sort").check().notNull()) {
			$('.tooltip-sort').show();
			return
		} 
		
		if(!channelId) var url = "/admin/third/content/channel/insert.do"
		else {
			var url = "/admin/third/content/channel/update.do"
			data.id = channelId;
		}
		if(!data.image && !ifParent) {
			$(".tooltip-image").show()
			return;
		}
		console.log(thirdChannelCategoryList1)
//		return
		$.ajax({
			type: "post",
			dataType:"json", 
			url: url,
			data:data, 
			beforeSend:function(){
//				layLoad = layer.load(2,{
//					shade: 0.6
//				});//加载等待
			},
			success: function(json) {
				if(json.message == "成功"){
					layer.msg('保存成功' , {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/contentManagement/channel"
					})
				}else{
					layer.msg(json.message , {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			},error:function(){
				layer.msg('保存成功' , {
					time: 1500, //1s后自动关闭
					icon: 2
				})
			}
		})
	})
	//获取子频道名称
	var getChildChannleName = function(channelList1,code){
		for(var i = 0; i < channelList1.length; i++){
			if(code == channelList1[i].code){
				return channelList1[i].name
			}
		}
	}
	$("body").delegate(".expand","click",function(){
		parendId = $(this).attr("data-id")
		var layLoad = "",
			that = this;
		var sort = $(this).attr("data-sort");
		var name = $(this).attr("data-name")
		var menu = $(this).attr("data-menu")
		if(menu) menu = JSON.parse(menu)
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/third/content/channel/children/list.do?parendId="+parendId,
			beforeSend:function(){
				layLoad = layer.load(2,{
					shade: 0.6
				});//加载等待
			},
			success: function(json) {
				layer.close(layLoad)
				if(json.message == "成功") {
					if(json.data && json.data.length > 0){
						var childrenChannel = json.data,
							html = ""	
						for(var i = 0; i < childrenChannel.length; i++){
							html += '<tr class="childrenChannel childrenChannel'+sort+'">'+
										'<td></td>'+
										'<td>'+childrenChannel[i].name+'</td>'+
										'<td>'+childrenChannel[i].sort+'</td>';
							if(childrenChannel[i].thirdChannelList && childrenChannel[i].thirdChannelList.length > 0){
								html += '<td>';
								for(var n = 0; n < childrenChannel[i].thirdChannelList.length; n++){
									html += childrenChannel[i].thirdChannelList[n].name;
									if(n < childrenChannel[i].thirdChannelList.length - 1) html += "、";
								}
								html += '</td>';
							}else html += '<td>--</td>';
							if(childrenChannel[i].thirdContentCategoryList && childrenChannel[i].thirdContentCategoryList.length > 0){
								html += '<td style="max-width: 200px;">';
								for(var n = 0; n < childrenChannel[i].thirdContentCategoryList.length; n++){
									if(childrenChannel[i].thirdContentCategoryList[n] && childrenChannel[i].thirdContentCategoryList[n].name && childrenChannel[i].thirdContentCategoryList[n].id != "-1"){
										html += childrenChannel[i].thirdContentCategoryList[n].name + "(" +getChildChannleName(childrenChannel[i].thirdChannelList,childrenChannel[i].thirdContentCategoryList[n].thirdChannelCode) +")";
										if(n < childrenChannel[i].thirdContentCategoryList.length - 1) html += "、";
									}
								}
								html += '</td>';
							}else html += '<td>--</td>';
							
							html +=	'<td>'+
									'<a href="javascript:;" class="layui-btn  layui-btn-mini openBox" data-systemType="'+childrenChannel[i].systemType+'" data-image="'+childrenChannel[i].image+'" data-parentId="'+parendId+'" data-message=\'"'+JSON.stringify(childrenChannel[i])+'"\' data-id="'+childrenChannel[i].id+'" data-sort="'+i+'">编辑</a>'+
									'<a href="javascript:;" data-parentId="'+parendId+'"  data-id="'+childrenChannel[i].id+'" class="layui-btn  layui-btn-mini layui-btn-danger deleteChannel">删除</a>'+
									'</td>'+
									'</tr>'		
								
						}
						$($(".parentChannel")[sort]).after(html)
						var html1 = '<i class="layui-icon shrink" data-id="'+parendId+'" data-name="'+name+'" data-sort="'+sort+'" style="font-size: 16px;cursor: pointer;">&#xe625;</i>  '
						html1 += name;
						$($(".parentChannel")[sort]).find(".expandIcon").html(html1)
						form.render()
					}else{
						layer.msg("当前频道没有子频道，请去创建子频道" )
					}
					
				}else{
					layer.msg(json.message , {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			},error:function(){
				layer.close(layLoad)
			}
		})
	})
	//收起
	$("body").delegate(".shrink","click",function(){
		var that = this,
			parendId = $(this).attr("data-id"),
			sort = $(this).attr("data-sort"),
			name = $(this).attr("data-name")
		var html1 = '<i class="layui-icon expand" data-id="'+parendId+'" data-name="'+name+'" data-sort="'+sort+'" style="font-size: 16px;cursor: pointer;">&#xe623;</i>  '
			html1 += name;
		var childChannel = ".childrenChannel"+sort
		for(var i = 0; i < $(childChannel).length; i++){
			$(childChannel).remove()
		}
		
		$($(".parentChannel")[sort]).find(".expandIcon").html(html1)
		form.render()
	})
	$("body").delegate(".openBox","click",function(){
		thirdChannelList = [];
		categoryList = [];	
		thirdChannelCodeList = [];
		curMessage = ""
		$(".configCategory").html("")
		$(".catSource").html("")
		$(".channelName").val("")
		$(".sort").val("")
		$("input[name='systemType[ios]']").prop("checked",false);
		$("input[name='systemType[android]']").prop("checked", false);
		$(".coverScreen").show()
		if($(this).attr("data-image")) {
			$("#asImportCode").hide();
			$("#uploadLogoShow").attr("src",$(this).attr("data-image")).show()
		}else{
			$("#asImportCode").show();
			$("#uploadLogoShow").attr("src","").hide()
		}
		if($(this).attr("data-source") == "parent"){
			ifParent = true;
			$(".uploadFile").hide()
		}else{
			ifParent = false;
			$(".uploadFile").show()
		}
			
		channelParendId = $(this).attr("data-parentId");
		var message = $(this).attr("data-message")
		channelId = $(this).attr("data-id")
		
		if(channelId){
			var title = "编辑频道";
			if(!$(this).attr("data-parentId"))
				systemType = JSON.parse(message).systemType
			else systemType = $(this).attr("data-systemType")
			if( systemType == 0 ) {
				$("input[name='systemType[ios]']").prop("checked",true);
				$("input[name='systemType[android]']").prop("checked",true);
			}else if(systemType == 1 ) {
				$("input[name='systemType[ios]']").prop("checked",true);
				$("input[name='systemType[android]']").prop("checked",false);
			}else if( systemType == 2 ) {
				$("input[name='systemType[ios]']").prop("checked",false);
				$("input[name='systemType[android]']").prop("checked", true);
			}
		}else{
			var title = "新建频道"
		}
		getChannelList(channelParendId,message)
		layer.open({
		  type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shade: 0, //开启遮罩关闭
		  area: ['500px', '650px'], //宽高
		  title: [title, 'text-align: center; font-size: 16px;'],
		  content:$("#setBox"),
		  cancel:function(){
		  	$(".coverScreen").hide()
		  }
			
		})
	})
	//应用配置
	$(".apply").on("click", function() {
		$.ajax({
			type: "post",
			dataType: "json",
//			contentType:application,
			url: "/admin/third/content/channel/config/apply.do",
			beforeSend:function(){

			},
			success: function(json) {
				if(json.message == "成功"){
					layer.msg('配置成功' , {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/contentManagement/channel"
					})
				}else{
					layer.msg(json.message , {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			},error:function(){
				layer.msg('配置失败' , {
					time: 1500, //1s后自动关闭
					icon: 2
				})
			}
		})
	})
	//编辑保存
	form.on("select(contentCategory)", function(data) {
		contentCategoryId = data.value;
	})
	$(".channelName").on("blur",function(){
		if(!$(".channelName").check().notNull()) {
			$('.tooltip-channelName').show();
		} else {
			$('.tooltip-channelName').hide();
		}
	})
	$(".sort").on("blur",function(){
		if(!$(".sort").check().isNum() || !$(".sort").check().notNull()) {
			$('.tooltip-sort').show();
		} else {
			$('.tooltip-sort').hide();
		}
	})
	
	$("#cannelSet").on("click", function() {
		applyConfigure()
	})
	
	function applyConfigure() {
		$.ajax({
			type: "post",
			url: "/admin/third/content/channel/config/update.do",
			contentType:"application/json",
			data:JSON.stringify(saveEditCanal),
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg("配置成功" , {
						time: 1500, //1s后自动关闭
						icon: 1
					},function() {
						saveEditCanal=[];
						window.location.href="/operation/contentManagement/channel"
					})
				}else{
					layer.msg(json.message , {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			}
		})
	}
	$("body").delegate(".deleteChannel","click",function(){
		var id = $(this).attr('data-id');
		var parentId = $(this).attr("data-parentId");
		if(parentId)
			var message = "您确定要删除该频道吗？"
		else 
			var message = "您确定要删除该频道及其下子频道吗？"
		layer.confirm(message, {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				url: "/admin/third/content/channel/delete.do",
				data:{
					id:id
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg("删除成功" , {
							time: 1000, //1s后自动关闭
							icon: 1
						},function() {
							window.location.href="/operation/contentManagement/channel"
						})
					}else{
						layer.msg(json.message , {
							time: 1500, //1s后自动关闭
							icon: 2
						})
					}
				},error:function(){
					layer.msg('删除失败！' , {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			})
		})
		
	})
	function getLocalTime(nS) {  
	 	return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');  
	}
	
	
	
	
	var search = function() {
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?pageNo="+pageNo+"&pageSize="+escape(pageSize);
	}	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {

			if(!first) {
				$("#paging").attr("data-page-no",obj.curr)
				search()
			};
		}
	});
	
})