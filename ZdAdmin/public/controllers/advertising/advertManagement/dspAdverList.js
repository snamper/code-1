"use strict";
//页面操作DOM集合
var pageDom = {
 	search: $(".queryBtn"),
 	paging: $("#paging")
};
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	var type = 1;	//渠道类型默认后端
	//查询
	var search = function() {
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?status="+0+"&pageNo="+pageNo+"&pageSize="+escape(pageSize);
	}	
	//监听渠道类型
	form.on('radio(type)',function(data){
		type = data.value
	})
	//打开弹窗
	var promptBox = "",
		channelId = ""
	$(".openBox").on("click", function() {
		$(".coverScreen").show()
		channelId = $(this).attr("data-id");
		var channelName = $(this).attr("data-name");
		var code = $(this).attr("data-code");
		type = $(this).attr("data-type")
		var html = ""
		if(channelId){	//编辑
			var message = "渠道编辑"
			$(".channelId input").val(code)
			$(".channelId input").attr("readonly","readonly")
			$(".channelName input").val(channelName)
			
			if("1" == type){	//后端
				html += '<input type="radio" name="type" value="1" title="后端" lay-filter="type" checked="checked"/>'+		
						'<input type="radio" name="type" value="2" title="前端" lay-filter="type"/>	'	
			}else{				//前端
				html += '<input type="radio" name="type" value="1" title="后端" lay-filter="type" />'+		
						'<input type="radio" name="type" value="2" title="前端" lay-filter="type" checked="checked"/>	'
			}
			
		}else{			//创建
			var message = "创建渠道"
			$(".channelId input").removeAttr("readonly")
			$(".channelName input").val("")
			$(".code").val("")
			html += '<input type="radio" name="type" value="1" title="后端" lay-filter="type" checked="checked" />'+		
					'<input type="radio" name="type" value="2" title="前端" lay-filter="type" />	'
		}
		$(".channelType").empty().html(html)
			form.render("radio")
		promptBox = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['600px', '320px'], //宽高
			title: [message, 'text-align: center; font-size: 16px;'],
			content: $('#setBox'),
			cancel: function(index, layero){ 
			 	$(".coverScreen").hide()
			} 
		});
	})
	//提交
	$(".saveChannel").on("click", function(){
		if(!channelId){
			var url = "/admin/third/ad/channel/insert.do"
			var message = {
				name:$(".name").val(),
				type:type,
				code:$(".code").val()
			}
		}else{
			var url = "/admin/third/ad/channel/update.do"
			var message = {
				id:channelId,
				name:$(".name").val(),
				type:type
			}
		}
		layer.confirm('您确定要保存吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({
				type: "post",
				dataType: "json",
				url: url,
				data: message,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('保存成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							$(".coverScreen").hide()
							window.location.href = "/advertising/dspAdver/dspAdverList"
						});
					}else{
						layer.msg(json.message)
					}
				},
				error: function() {
					layer.msg('保存失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	
	
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
	
	
});