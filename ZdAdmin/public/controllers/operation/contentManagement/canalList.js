"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	var status = $(".chooseType").attr("data-status");	//商品状态
	
	
	var listCode = getQueryString("thirdChannel")
	if( ! getQueryString("thirdChannel") ){
		$(".oUl").find('li').eq(0).addClass("layui-this")
	}else{
		var oLi = $(".oUl").find('li')
		for(var i=0 ; i<$(".oUl").find('li').length; i++) {
			if (oLi.eq(i).attr("data-code") == listCode ) {
				oLi.eq(i).addClass("layui-this")
			}else {
				oLi.eq(i).removeClass("layui-this")
			}
		}
	}
	
	
	
	var navLink = function($elem){	
		 var code = $elem.attr("data-code");
		 var pageNo = 1;
		 var pageSize = getQueryString("pageSize") ? getQueryString("pageSize") : 10 ;
		 var joinStatus = $elem.attr("data-joinStatus") ;
//		 console.log(code,escape(code))
		 var channelId = $elem.attr("data-id") ;
		 var lastTime = $elem.attr("data-time")
		 window.location.search="?thirdChannel="+ escape(code) +"&pageNo="+ escape(pageNo) + "&time="+ escape(lastTime) +"&pageSize="+escape(pageSize) +"&joinStatus="+escape(joinStatus)+"&channelId="+escape(channelId);
	}
	$(".oUl").find("li").click(function(){
		 navLink($(this));
	});
	
	
	$("body").find('.addThis').on('click', function (){
		layer.open({ //新建渠道弹窗
		  type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shadeClose: false, //开启遮罩关闭
		  area: ['350px', '260px'], //宽高
		  title: ['新建渠道', 'text-align: center; font-size: 16px;'],
		  content: 
			  '<div class="layui-form-item canalLayer">' +
			    '<label class="layui-form-label">渠道编码</label>' +
			    '<div class="layui-input-inline">' +
			      '<input type="text" name="title" id="canalCode"  class="layui-input canalCode">' +
			    '</div>' +
			  '</div>' +
			  '<div class="layui-form-item">' +
			    '<label class="layui-form-label">渠道名称</label>' +
			    '<div class="layui-input-inline">' +
			      '<input type="text" name="text" id="canalName" class="layui-input canalName">' +
			    '</div>' +
			   '</div>' +
			   '<div class="layui-form-item errInfo" style="text-align:center; color: red;">' +
			   '</div>' +
			   '<div class="layui-form-item">' +
				    '<div class="layui-input-block layui-canal">' +
				      '<a href="javascript:;" class="layui-btn" id="canalSure">保存</a>' +
				      '<a href="javascript:;" class="layui-btn layui-layer-close layui-btn-primary">关闭</a>' +
				    '</div>' +
				 '</div>' ,	
		})
	})
	
//	if( getQueryString("title") ) {
//		$("#shortName").val( getQueryString("title") )
//	}
//	
	var shortName = $("#shortName").val()
	$('#shortName').blur(function() {
		shortName = $("#shortName").val()
	})
	var categoryId = getQueryString("contentCat");
	form.on('select(categoryList)', function(data){
		categoryId = data.value
		
//		console.log(categoryId)
	})
	
	var listCodeShow = $(".oUl").find("li").eq(0).attr('data-code');
	var listCodeTime = $(".oUl").find("li").eq(0).attr('data-time');
	var listCodejoinStatus = $(".oUl").find("li").eq(0).attr('data-joinstatus');
	var listCodechannelId = $(".oUl").find("li").eq(0).attr('data-id');
	var search = function(pN) {
//		var pageNo = $("#paging").attr("data-page-no");
		var shortName = $("#shortName").val();
		var code = getQueryString("thirdChannel") ? getQueryString("thirdChannel") : listCodeShow;
		var joinStatus = getQueryString("joinStatus") ? getQueryString("joinStatus") : listCodejoinStatus;
		categoryId = categoryId ? categoryId : '';
		channelId = getQueryString("channelId") ? getQueryString("channelId") : listCodechannelId;
		var lastTime = getQueryString("time") ? getQueryString("time") : listCodeTime ;
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?thirdChannel="+ escape(code) +"&title="+ escape(shortName) +"&contentCat="+ escape(categoryId) + "&time="+ 
		escape(lastTime) +"&pageNo="+ escape(pN) +"&pageSize="+escape(pageSize) +"&joinStatus="+escape(joinStatus)+"&channelId="+escape(channelId);
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		search(1);
	});	
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=10&pageNo="+obj.curr+"&thirdChannel="+ listCodeShow );
			};
		}
	});
	
	
	 // 新建渠道
	var flag = false ;
	var canalCode = '';
	var canalName = '';
	$('body').delegate('#canalCode', 'blur', function() {
		var reg = /^[A-Za-z0-9]*$/;
		canalCode = $('#canalCode').val();
//		console.log(canalCode)
		if(!reg.test(canalCode) || canalCode.length <1) {
			$('.errInfo').text("渠道编码格式错误或未填写,请重新填写")
			flag = false;
		}else {
			$('.errInfo').text("");
			flag = true;
		}
	})
//	\u4e00-\u9fa5  汉字匹配
	$('body').delegate('#canalName', 'blur', function() {
		canalName = $("#canalName").val();
//		console.log(canalName.length)
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]*$/;
		if( !reg.test(canalName) || canalName == 0 ) {
			$('.errInfo').text("渠道名称不能含有特殊字符")
			flag = false;
		}else {
			$('.errInfo').text("");
			flag = true;
		}
	})
	 
	$("body").delegate('#canalSure', 'click', function (){
		if( !flag ) {
			alert("错误")
		}else {
			flag = false;
//			console.log(canalName)
			var data = {'name':canalName,'code':canalCode}	
			
			layer.confirm('您确定要新建吗？', {
				btn: ['确认', '取消'] //按钮
			}, function() {
				$.ajax({
					url:"/admin/third/channel/add.do",
				    type:"post",
				    dataType:"json",
				    data:data, 
					beforeSend:beforeSend(),
					success: function(json) {
						if(json.message == "成功") {
							layer.msg('新建成功！', {
								time: 1500, //1s后自动关闭
								icon: 1
							},function(){
								window.location.href="/operation/contentManagement/canalList";
							});	
						}else{
						    layer.msg(json.message);
						    return false;
					    }
					}
				})
			})
			
			$("#noCannel").removeClass('hide')
			$(".video-config-live").addClass("hide")
			$(".video-config-no").removeClass("hide")
		}
	})
	
   //获取内容类目
  
   var channelId = getQueryString("channelId") ? getQueryString("channelId") : $(".oUl").find("li").eq(0).attr("data-id");
   
   var categoryValue = getQueryString("contentCat"); //已选内容类目
   
// console.log(categoryValue)
  
  if( channelId ) {
  	
   $.ajax({
	     type:"get",
	     dataType: "json",
	     url: "/admin/third/content/category/list.do?status=2&thirdChannelId="+channelId,

	     success:function(json){
	     	if (json.message == '成功') {
	     		var list = json.data;
	     		var length = list.length;
	     		var str = '<select name="categoryList" lay-filter="categoryList" id="categoryList"><option value=" ">选择内容类目</option>';
	     		for ( var i=0 ; i<length ; i++ ) {
	     			if ( list[i].categoryId == categoryValue) {
	     				str += '<option selected="selected" value=" '+ list[i].categoryId +' ">' + list[i].name +'</option>'
	     			}else {
	     				str += '<option value=" '+ list[i].categoryId +' ">' + list[i].name +'</option>'
	     			}
	     		}
				str += '</select>'
	     		$(".categoryList").empty().append(str)
	     		form.render('select')
	     	}
	     	
	     }
   });
  }
  
   
   //获取配置内容类目
   var configContent1 = [];//已配置内容类目
   
   var thirdChannel = getQueryString("thirdChannel") ? getQueryString("thirdChannel") : $(".oUl").find("li").eq(0).attr("data-code");
  
  if (   thirdChannel != "eyepetizer"  ) {
  	 $.ajax({
	     type:"get",
	     dataType: "json",
	     url: "/admin/third/content/category/list.do?thirdChannelId="+channelId,
	     success:function(json){
	     	if (json.message == '成功') {
//   		console.log(json)
		    var str1='';
		    var str2='';		    
			var configCategory = json.data ;
			var configContentNum = 0;
			for(var i=0; i<configCategory.length; i++) {
				if(json.data[i].status == 2 ) { //  修改 2 位3
					str1 += '<li>' +
							'<input type="checkbox" class="checkboxChecked" data-id="'+ json.data[i].id +'" name="unable" disabled title="'+ json.data[i].name +'" lay-skin="primary" checked >' +
						'</li>'	
					configContentNum++;
					configContent1.push('' + json.data[i].id)	
				}else {
					str2 += '<li>' +
							'<input type="checkbox" class="checkboxChecked" data-id="'+ json.data[i].id +'" name="able"  title="'+ json.data[i].name +'" lay-skin="primary" >' +
						'</li>'
				}
			}
	     		 $(".configCategory").empty().append(str1+str2)
	     		 var titleContent = '内容类目: 已选'+ configContentNum +'个类目'
	     		 $(".configActive").find("h3").eq(0).text(titleContent)
	     		 form.render()
	     	}
	     	
	     }
   	});
  }else {
  	console.log("开眼")
  }
  
  
   
   var codeConfig = getQueryString("thirdChannel") ? getQueryString("thirdChannel") : listCodeShow;
   var infoNumber = '';
   $.ajax({
		url:"/admin/third/channel/list.do",
	    type:"get",
	    dataType:"json",
		beforeSend:beforeSend(),
		success: function(json) {
			for(var i=0; i<json.data.datas.length; i++) {
				if(json.data.datas[i].code == codeConfig) {
					$("#infoNum").val(json.data.datas[i].contentUpdateSize)
				}
			}
		}
	})
   
   
   
   //每条类目信息数验证
   var inforFlag = true;
   $("#infoNum").blur(function() {
   		var num = $(this).val()
   		var reg = /^[1-9]\d*$/
   		if(reg.test(num)) {
	   		if( 24 < num ) {
	   		 	if ( num > 1000) {
	   		 		$(".isNumInfo").html("信息数字数不能大于1000");
	   		 		inforFlag = false;
	   		 	}else {
	   		 		$(".isNumInfo").html("");
	   		 		inforFlag = true;
	   		 	}
	   		}else {
	   			$(".isNumInfo").html("信息数字数不能小于25");
	   			inforFlag = false;
	   		}		
   		}else {
   			$(".isNumInfo").html("信息数字数只能是数字且开头不能为0");
   			inforFlag = false;
   		}
   })
   var configChecked = []; //已选类目
   var checkIdsStr = [];//新增内容类目
   form.on("checkbox", function(data) {
   		var elem = data.elem;
   		var str = [];
   		checkIdsStr = [];
		for (var i=0; i<$('.configCategory').find('.layui-form-checked').length;i++){
//			console.log( $('.configCategory').find('.layui-form-checked').eq(i).prev()[0].getAttribute("data-id")) 
			str.push( $('.configCategory').find('.layui-form-checked').eq(i).prev()[0].getAttribute("data-id") )
		}
		configChecked = str
	   for(var i=0; i< configChecked.length; i++){
	   	if( configContent1.indexOf(configChecked[i]) == -1 ){
	   		checkIdsStr.push(configChecked[i])
	   	}
	   }
	   var checkIdsStrRepeat = []
	   for(var i=0; i<checkIdsStr.length; i++) {
	   		if (checkIdsStrRepeat.indexOf(checkIdsStr[i])  == -1 ) {
	   			checkIdsStrRepeat.push(checkIdsStr[i])
	   		}
	   }
	   checkIdsStr = checkIdsStrRepeat;
   })
    
   	//更改渠道配置
   	
   	$("#configSure").on("click", function() {
   		if (inforFlag) {
   			var contentUpdateSize = $("#infoNum").val();
   			var thirdChannelId = getQueryString("channelId") ? getQueryString("channelId") : $(".oUl").find("li").eq(0).attr('data-id');
   			var checkIdsJson = ''
   			for (var i=0; i<checkIdsStr.length; i++) {
   				if(i>0) {
   					checkIdsJson += ","+checkIdsStr[i]	
   				}else {
   					checkIdsJson += checkIdsStr[i]
   				}
   				
   			}
			layer.confirm('确定保存吗？', {
				btn: ['确认', '取消'] //按钮
				}, function() {
					$.ajax({
						type: "post",
						url: "/admin/third/channel/config.do",
						data:{
							thirdChannelId : thirdChannelId,
							checkIdsStr : checkIdsJson,
							contentUpdateSize : contentUpdateSize
						},
						beforeSend:beforeSend(),
						success: function(json) {
							if(json.message == "成功") {
								layer.msg("保存成功！", {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									$(".canal-getConfig").addClass("configActive");
									$(".coverScreen").addClass("hide");
								})
							}else{
								layer.msg(json.message)
							}
						}
					})
				})
   			
   		}
   	})
   
	
	//删除渠道
	var channel_id = $(".oUl").find("li").eq(0).attr("data-id")
	if (getQueryString("channelId")){
		channel_id = getQueryString("channelId")
	}

	$(".cannelDel").click(function (){
		layer.confirm('您确定要删除吗？', {
		btn: ['确认', '取消'] //按钮
		},function (){
			$.ajax({
			     url:"/admin/third/channel/delete.do",
			     type:"post",
			     dataType:"json",
			     data:{id:channel_id},     
			     success:function(json){
			     	if(json.message == "成功"){		
				     	layer.msg('删除成功！', {
							time: 1500, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href="/operation/contentManagement/canalList";
						});
				
			        }
			     },error: function(){
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
		     });
			$(".video-config-live").removeClass("hide")
			$(".video-config-no").addClass("hide")
			$("#noCannel").addClass('hide')
			
		})
	})
	
	
	
	//获取配置
	$("body").delegate('#getConfig', 'click', function (){
		$(".coverScreen").removeClass("hide");
		$(".canal-getConfig").removeClass("configActive");
	})
	$("body").delegate('#configCancel', 'click', function (){
		$(".canal-getConfig").addClass("configActive");
		$(".coverScreen").addClass("hide");
	})

	function getLocalTime(nS) {  
	 return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');  
	}
	
	//倒计时时间
	
	if( getQueryString("time") ) {	
		upDateTime( getQueryString("time") ) 
	}else {
		var time = $(".oUl").find("li").eq(0).attr('data-time');
		upDateTime( time ) 
	}
	
	function upDateTime( upTimeCode ) {	
		
		//开眼 1个小时更新一次
		if (  thirdChannel != "eyepetizer" ) {
			var upTime = upTimeCode - 1 + 1800001 ;
		}else {
			var upTime = upTimeCode - 1 + 3600001 ;
		}
		
		var timestamp = Date.parse(new Date());
		var time = upTime - timestamp ;
		
		var time=time/1000;
		var second= time%60;
		var minutes= (time - second)/60; 
		
		setInterval(function(){
//			minutes = minutes < 10 ? "0" + minutes : minutes
			if (minutes == 30) {
				minutes = 29
			};
			//开眼
			if (minutes == 60) {
				minutes = 59
			};
			
			second = second < 10 ? "0" + second : second
			var str = '将于' + minutes + '分' + second + '秒后自动更新视频信息'
			$('.updateTime').text(str)
			if(second > 0) {
				second--
			}else {
				minutes--;
				if ( minutes < 0 ) {
					minutes = 30
					
					if (  thirdChannel != "eyepetizer"  ) {
						minutes = 30;
					}else {
						minutes = 60;
					}
					
				}
				second=59;
			}	
		}, 1000)
	}
	//立即更新时间
	$(".nowUpdate").click(function() {
		var listCode = getQueryString("thirdChannel") ? getQueryString("thirdChannel") : listCodeShow;
		var channelId = getQueryString("channelId") ? getQueryString("channelId") : listCodechannelId;
		var joinStatus = getQueryString("joinStatus");
		layer.confirm('确定更新吗？', {
				btn: ['确认', '取消'] //按钮
				}, function() {
					var layLoad = layer.load(2,{
						shade: 0.6
					});//加载等待
					$.ajax({
						type: "post",
						url: "/admin/third/channel/data/update.do?code="+listCode,	
						beforeSend:beforeSend(),
						success: function(json) {
							layer.close(layLoad);
							if(json.message == "成功") {
								layer.msg("更新成功！", {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									window.location.href="/operation/contentManagement/canalList?thirdChannel="+listCode+"&channelId="+channelId;
								})
							}else{
								layer.msg(json.message)
							}
						},error: function(err){
							layer.msg('更新失败！', {
								time: 1500, //1s后自动关闭
								icon: 2
							},function(){
								window.location.href="/operation/contentManagement/canalList?thirdChannel="+listCode+"&channelId="+channelId;
							});
						}
					})
				}) 
	})
	


	//切换查询状态
	var code; //渠道编码
	$(".chooseType>li").on("click", function() {
		status = $(this).attr("data-status")
		code=status;
//		console.log(status)
//		$(".chooseType").attr("data-status",status)
	})//切换查询状态
	
	//切换商品属性查询(特价商品&全部商品)
	form.on('select(goodsStatus)', function(data){
	    $('.selectStatus').attr('data-stats', data.value);
	});
	
	
});