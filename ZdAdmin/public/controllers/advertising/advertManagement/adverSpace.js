"use strict";
layui.use(['element', 'paging', 'form'], function(){
	$ = layui.jquery;
	var form = layui.form();
	var promptBox = "";
	var choosPositionList = [];
	var position = "";
	$(".setPosition").on("click", function(){
		position = $(this).attr("data-position")
		var adverList = $(this).attr("data-adverList");
		if(adverList){
			adverList = JSON.parse(adverList);
			for(var i = 0; i < adverList.length; i++){
				choosPositionList.push({id:adverList[i].ad_id})
			}	
		} 
		$(".coverScreen").show()
		reloadHtml(1)
		promptBox = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['700px', '500px'], //宽高
			title: ['请选择您要在该位置曝光的广告', 'text-align: center; font-size: 16px;'],
			content: $('#setBox'),
			cancel: function(index, layero){ 
			 	choosPositionList = [];
			 	$(".coverScreen").hide()
			} 
		});
	})
	
	form.on('checkbox(adver)', function(data){
		if(data.elem.checked){
			if(choosPositionList.length > 0){
				var flag = false;
				for(var  i = 0; i < choosPositionList.length; i++){
					if(choosPositionList[i].id == data.value)	flag = true;
				}
				if(!flag) choosPositionList.push({id:data.value})
			}else  choosPositionList.push({id:data.value})
		}else{
			if(choosPositionList.length > 0){
				for(var  i = 0; i < choosPositionList.length; i++){
					if(choosPositionList[i].id == data.value)	choosPositionList.splice(i, 1);
				}
			}
		}
	})
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				window.location.search="?status="+data.status+"&name="+
					escape(data.name)+"&tAdvertiserName="+escape(data.tAdvertiserName)+"&startDate="+escape(data.startDate)+"&pageNo="+
					obj.curr+"&pageSize="+escape(data.pageSize)+"&endDate="+escape(data.endDate);
			};
		}
	});	
	var getPage = function(pageNo,pages){
		var paging1 = layui.laypage({
			pages: pages, //分页数   总条数%单页显示条数  向上取整
			cont: "paging1", //组件容器
			curr: pageNo, //当前页
			groups: "10", //连续分页数
			jump: function(obj, first) {
				if(!first) {
					reloadHtml(obj.curr)
				};
			}
		});
	}
	$(".savePositionList").on("click", function() {
		var data = {positionList:[]}
		if(choosPositionList.length >= 1){
			for(var i = 0; i < choosPositionList.length; i++){
				data.positionList.push({
					"position":position,
					"adId":choosPositionList[i].id
				})
			}
		}else{
			data.positionList.push({
				"position":position,
				"adId":""
			})
		}
		$.ajax({
			url:'/admin/ad/position/configure/save.do', 
			type:"post",
			contentType: "application/json",
			dataType:"json",   
			data:JSON.stringify(data),
			success:function(json){	
				console.log(json)
				if(json.message == "成功"){
					layer.msg('设置广告成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href="/advertising/advertManage/adverSpace"
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					})
				}
			},
			error:function(){
				layer.msg('设置广告失败', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
	//应用设置
	$(".apply").on("click", function() {
		layer.confirm('确定应用该配置吗？', {
			btn: ['确认', '取消'] //按钮
		}, function(index) {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "/admin/ad/position/configure/valid.do",
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('应用成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href="/advertising/advertManage/adverSpace"
						})
					}else{
						layer.msg(json.message)
					}
				},error:function(){
					layer.msg('应用失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					})
				}
			})
		})
	})
	var reloadHtml = function(pageNo) {
		$.ajax({
			url:'/admin/ad/manage/list.do?pageSize='+10+"&pageNo=" + pageNo + "&status="+7, 
			type:"get",
			dataType:"json",             
			success:function(json){	
				console.log(json)
				if(json.message == "成功"){
					getPage(json.data.pageNo,json.data.totalPage)
					var html = "";
					var adverList = json.data.datas;
					for(var i = 0; i < adverList.length; i++){
						html += '<li>'+
									'<div class="adver_left">'
						if(choosPositionList.length > 0){
							var flag = false;
							for(var n = 0; n < choosPositionList.length; n++){
								if(choosPositionList[n].id == adverList[i].id){
									flag = true;
									html += '<i><input type="checkbox" checked class="checkboxChecked" lay-filter="adver" value="'+adverList[i].id+'"  lay-skin="primary"  ></i>'
								}
							}
							if(!flag){
								html += '<i><input type="checkbox" class="checkboxChecked" lay-filter="adver" value="'+adverList[i].id+'"  lay-skin="primary"  ></i>'
							}
						}else html += '<i><input type="checkbox" class="checkboxChecked" lay-filter="adver" value="'+adverList[i].id+'"  lay-skin="primary"  ></i>'
						
						html +=		'<span>'+adverList[i].name+'</span>'+
								'</div>'
							if(adverList[i].delivery_type == 1) html +=	'<p>CPM视频</p>'
							else if(adverList[i].delivery_type == 2)	html +=	'<p>CPC</p>'
							else	html +=	'<p>CPM</p>'
								
						html +=	'</li>'
					}
					$(".adverBox").empty().append(html)
					form.render("checkbox")
				}else{
					layer.msg(json.message);
				}
			},
			error:function(){
				layer.msg('获取列表失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});		 
	}
	
});
