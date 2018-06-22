"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form()
	var bit = "",contentSource = "",content = "",contentType = "",contentCat = "",id="",newflag = false;
	
	//内容类型
	form.on('select(contentType)', function(data){
		contentType = data.value;
		if (contentType == "1") {
			$(".content_cat_show").show();
			$(".content_choose_show").hide();
			getSource('',contentType)
		}else {
			$(".content_choose_show").show();
			$(".content_cat_show").hide();
			getSource('',contentType)
		}
		
		getSource('',data.value);
		getContentCat("","")
		
	})
	//内容来源
	form.on('select(contentSource)', function(data){   //111111 
		contentSource = data.value
		getContentChoose("")
		getContentCat(contentSource,"")
	if(contentSource == 'self') {
		$(".content_choose_show").show()
	}else {
		$(".content_choose_show").hide()
	}
		
	})
	//内容分类
	form.on('select(contentCat)', function(data){
		contentCat = data.value;
		
	})
	//内容选择
	form.on('select(contentChoose)', function(data){
		content = data.value;
		
	})


	//保存编辑数据
	$(".saveContent").on("click", function() {
		contentSource = contentSource ? contentSource  : oldSource;
		if(!$(".content_bit").val() || !$(".content_bit").check().isNum() || !$(".content_bit").check().number(1,999)){
			layer.msg("推荐位请输入1-999之间的数字", {
				time: 1500, //1s后自动关闭
				icon: 2
			})
			return false;
		}
		var $this = $(this),systemTypeNew="";
		if( $this.parents('.homeReferLayer').find('.systemTypeBoxNew').find('.layui-form-checked').length == 2 ){
			systemTypeNew=0;
		}else if( $this.parents('.homeReferLayer').find('.systemTypeBoxNew').find('.layui-form-checked').length == 1  ){
			
			if ( $this.parents('.homeReferLayer').find('.systemTypeBoxNew').find('.layui-form-checked').find('span').html() == "ios"){
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
		
		var data = {
			recommendBit:$(".content_bit").val(),
			channelCode:contentSource,
			systemType:systemTypeNew
		}
		if(!newflag) data.id = id
		if(contentSource == "self") {
			data.content = content
		}else {
			data.contentCat = contentCat;
			data.contentType = contentType
		}
		if (newflag) var url = "/admin/index/recommended-bit/insert.do"
		else var url = "/admin/index/recommended-bit/update.do"
		
		$.ajax({
			type: "post",
			dataType: "json",
			data:data,
			url: url,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/contentManagement/homeReferMan"
					});
					
				}else{
					layer.msg(json.message)
				}
			},error:function(){
				layer.msg('保存失败', {
					time: 1500, //1s后自动关闭
					icon: 2
				})
			}
		})
		
	})
	var getSource = function (source,type) {
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/index/recommended-bit/update/source/list.do?type="+type,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var html = "";
					html += '<option value="">内容来源</option>'
					if(!json.data || json.data.length <= 0) return;
					for(var i = 0; i < json.data.length; i++){
						if(source && source == json.data[i].code) html += '<option selected="selected" value="'+ json.data[i].code +'">'+ json.data[i].name +'</option>'
						else html += '<option value='+ json.data[i].code +'>'+ json.data[i].name +'</option>'
					}
					$(".contentChooseCanal").empty().html(html);
					form.render('select')
				}else{
					layer.msg(json.message)
				}
			}
		})
	}
	var getContentCat = function(contentSource,cat) {
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/index/recommended-bit/update/cat/list.do?contentSource="+contentSource,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var html = "";
					html += '<option value="">内容类目</option>'
					if(!json.data || json.data.length <= 0) {
						$(".contentCat").empty().html(html);
						form.render('select')
						return;
					}
					for(var i = 0; i < json.data.length; i++){
						if(cat && cat == json.data[i].code) html += '<option selected="selected" value="'+ json.data[i].code +'">'+ json.data[i].name +'</option>'
						else html += '<option value='+ json.data[i].code +'>'+ json.data[i].name +'</option>'
					}
					$(".contentCat").empty().html(html);
					form.render('select')
				}else{
					layer.msg(json.message)
				}
			}
		})
	}
	var getContentType = function(type1) {   //   llllll
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/index/recommended-bit/update/type/list.do",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var html = "";
					html += '<option value="">内容类型</option>'
					if(!json.data || json.data.length <= 0) return;
					for(var i = 0; i < json.data.length; i++){
						if(type1 && type1 == json.data[i].code) html += '<option selected="selected" value='+ json.data[i].code +'>'+ json.data[i].name +'</option>'
						else html += '<option value='+ json.data[i].code +'>'+ json.data[i].name +'</option>'
					}
					$(".contentType").empty().html(html);
					form.render('select')
				}else{
					layer.msg(json.message)
				}
			}
		})
	}
	var getContentChoose = function(choose) {
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/index/recommended-bit/update/content/list.do",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					var html = "";
					html += '<option value="">内容选择</option>'
					if(!json.data || json.data.length <= 0) return;
					for(var i = 0; i < json.data.length; i++){
						if(choose && choose == json.data[i].code) html += '<option selected="selected" value='+ json.data[i].code +'>'+ json.data[i].name +'</option>'
						else html += '<option value='+ json.data[i].code +'>'+ json.data[i].name +'</option>'
					}
					$(".contentChoose").empty().html(html);
					form.render('select')
				}else{
					layer.msg(json.message)
				}
			}
		})
	}
	
	//删除
	$(".delete").on("click", function() {
		var id = $(this).attr("data-id")
		layer.confirm('确定删除吗？', {
			btn: ['确认', '取消'] //按钮
		}, function(index) {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "/admin/index/recommended-bit/delete.do?id="+id,
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href="/operation/contentManagement/homeReferMan"
						})
					}else{
						layer.msg(json.message)
					}
				}
			})
		})
	})
	//打开编辑弹窗
//	var oldSource = '', oldcontentType = '', oldcontentCat = '', oldcontent = ''; //已有内容来源记录
	var oldSource = '',systemType='';
	var openEditBox = function(that) {
		
		id = $(that).attr("data-id");
		contentSource = $(that).attr("data-sour") ;
		systemType = $(that).attr("data-system")
		getSource($(that).attr("data-sour"), $(that).attr("data-type"))
		oldSource = $(that).attr("data-sour");
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
		form.render()
		
		if($(that).attr("data-sour") == "self"){
			$(".content_choose_show").show()
			$(".content_cat_show").hide()
			$(".content_type_show").show()
			contentType = ""
			contentCat = ""
			content = $(that).attr("data-choose");
			getContentType($(that).attr("data-type"));
			getContentChoose($(that).attr("data-choose"))
			$(".homeReferLayer").height(350)
		}else{
			$(".content_choose_show").hide()
			$(".content_cat_show").show()
			$(".content_type_show").show()
			content = "";
			contentType = $(that).attr("data-type");
			contentCat = $(that).attr("data-cat");
			getContentCat($(that).attr("data-sour"),$(that).attr("data-cat"))
			getContentType($(that).attr("data-type"));
			$(".homeReferLayer").height(350)
		}
		
	}
	//编辑
	$(document).on("click",".homeEdit",function(){
		if($(this).attr("data-source") == "add") {
			newflag = true;
			contentType = ""
			contentCat = ""
			$(".content_bit").val("")
			var html1 = '<option value="">渠道选择</option>'
			var html2 = '<option value="">渠道选择</option>'
			$(".contentChooseCanal").html(html1)
			$(".contentCat").html(html2)
			
			$("input[name='systemType[ios]']").prop("checked",false);
			$("input[name='systemType[android]']").prop("checked",false);
			form.render()
		}else{
			newflag = false
		}
		if($(this).attr("data-source") && $(this).attr("data-source") == "edit") {
			bit = $(this).attr("data-bit");
			$(".content_bit").val(bit)
			openEditBox($(this))
		}else {
			
			$(".content_cat_show ").show()
			$(".content_choose_show").hide()
			$(".content_type_show").show()
			$(".homeReferLayer").height(350)
			getContentType();
//			getContentChoose()
		}
		$(".coverScreen").removeClass("hide")
		$(".homeReferLayer").removeClass("hide")
	})
	$(".homeReferClose").click(function (){
		bit = "";
		$(".coverScreen").addClass("hide")
		$(".homeReferLayer").addClass("hide")
	})
	//应用设置
	$(".apply").on("click", function() {
		layer.confirm('确定应用该配置吗？', {
			btn: ['确认', '取消'] //按钮
		}, function(index) {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "/admin/index/recommended-bit/apply.do",
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						layer.msg('应用成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							window.location.href="/operation/contentManagement/homeReferMan"
						})
					}else{
						layer.msg(json.message)
					}
				}
			})
		})
	})
	
	//查询
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
	
	
});