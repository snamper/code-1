"use strict";
//运营管理-标签库管理
var layLoad;
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				 $("#paging").attr("data-page-no",obj.curr);
				 jumpPage("pageSize=10&pageNo="+obj.curr);
			};
		}
	});	
	
	//列表页全选用户
	form.on('checkbox(allChoose)', function(data){
//		console.log(data);
	    var child = $(data.elem).parents('form').find('table').find('tbody input[type="checkbox"]');
	    child.each(function(index, item){
	    	item.checked = data.elem.checked;
	    });
	    form.render('checkbox');
	});
	
	//列表页单个用户勾选
	form.on('checkbox(tagLis)', function(data){
		var childBox = $(data.elem).parents('form').find('table').find('tbody .layui-form-checkbox');//当前页面内有复选框的选项
	    var child = $(data.elem).parents('form').find('table').find('tbody .layui-form-checked');//当前页面被选中的选项
	    if(data.othis.hasClass('layui-form-checked')){
	    	$(data.elem).attr('getSelect','on');
	    }else{
	    	$(data.elem).attr('getSelect','off');
	    }
	    if(child.length == childBox.length){
	    	$(data.elem).parents('form').find('.fnBtns').find('input[type="checkbox"]').prop("checked",true);
        	form.render();
	    }else{
	    	$(data.elem).parents('form').find('.fnBtns').find('input[type="checkbox"]').prop("checked",false);
    		form.render();
	    }
	});
	
	//添加标签按钮弹窗
	$('.addLabels').on('click', function (){
		popupTagFn('添加标签','','');
	});
	//修改标签按钮弹窗
	$('.editorTagsBtn').on('click', function (){
		var $tagId = $(this).attr('data-id');
		var $tagName = $(this).attr('data-name');
		popupTagFn('修改标签',$tagId,$tagName);
	});
	//添加/修改标签弹窗
	function popupTagFn(title,tagId,$tagName){
		layer.open({
		    type: 1,
		    title: title,
		    skin: 'layui-layer-molv', //加上边框
		    area: ['500px', '200px'], //宽高
		    content: '<div class="tagBox">' +
            		'<div class="tagText">' +
            			'<input type="text" value="'+ $tagName +'" name="tagName" class="layui-input newTagName" lay-verify="text" autocomplete="off" placeholder="请输入标签名">' +
            		'</div>' +
            		'<div class="handelBox">' +
            			'<a href="javascript:;" class="layui-btn saveTagBtn" data-id="'+ tagId +'" style="margin-right:35px;">保存</a>' +
            			'<a href="javascript:;" class="layui-btn layui-btn-warm layui-layer-close cancelBtn">取消</a>' +
            		'</div>' +
            	'</div>'
		});
	}
	
});

$('#searchBtn').on('click', function (){//查询
	layLoad = layer.load(2,{
		shade: 0.6
	});//加载等待
	$("#paging").attr("data-page-no",1)
	search();
});

//新建/修改标签弹窗保存按钮
$('body').delegate('.saveTagBtn','click',function (){
	var $this = $(this);
	addEditorTags($this)
});
//添加/修改标签方法
function addEditorTags($this){
	var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/;//10个汉字
	var tagVal = $this.parents('.tagBox').find('.newTagName').val()||'';
	if(!reg.test(tagVal)){
		layer.msg('不能超出10个汉字/不能包含特殊字符！', {
			time: 1000, //1s后自动关闭
			icon: 2
		})
		return false;
	}
	if($this.attr('data-id')){
		var data = {
			"lableName":tagVal,
			"id": $this.attr('data-id')
		}
		var $url = '/admin/user/lable/updateLable.do';
	}else{
		var data = {
			"lableName":tagVal
		}
		var $url = '/admin/user/lable/addLable.do';
	}
	$.ajax({
		type: "post",
		dataType: "json",
		url: $url,
		data: data,
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('操作成功', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function (){
					search();
				});
			}else{
				layer.msg(json.message, {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return false;
			}
		},
		error: function() {
			layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return false;
		}
	});//ajax
}
//删除标签事件
$('.delTagsBtn').on('click',function (){
	var $this = $(this);
	var delId = $this.attr('data-id');
	$.ajax({
		type: "post",
		dataType: "json",
		url: '/admin/user/lable/deleteLable.do',
		data: {"id": delId},
		beforeSend:beforeSend(),
		success: function(json) {
			if(json.message == "成功") {
				layer.msg('删除成功', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function (){
					if($('#htmlWrap').find('tr').length <= 1){//删除某一页最后一条数据的时候，直接返回第一个
						$("#paging").attr("data-page-no",'1');//当前页的数据被删除完的时候直接返回第一页
					}
					search();
				});
			}
		},
		error: function() {
			layer.msg('操作失败！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return false;
		}
	});//ajax
});

//启用/禁用标签
$(".disabelTask").on("click", function() {
	var $this = $(this);
	var taskId = $this.attr("data-id");
	var status = $this.attr('data-allSta');//状态区分 1/启用   0/禁用
	var message = "";
	var url = ""
	if(status == '0'){	//去禁用
		message = "是否确定要禁用该标签？";
		url = "/admin/user/lable/closeLable.do"
	}else{				//去启用
		message = "是否确定要启用该标签？";
		url = "/admin/user/lable/openLable.do"
	}
	layer.confirm(message, {
		btn: ['确认', '取消'] //按钮
	}, function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: url,
			data: {
				"id":taskId
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					if(status == '0'){	//去禁用
						message = "禁用成功";
					}else{				//去启用
						message = "启用成功";
					}
					layer.msg(message, {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						search();
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
});

//批量禁用/启用/删除
$('.batchTagsBtns').on('click',function (){
	var $this = $(this);
	var allFlag = true;
	var btnStatus = $this.attr('data-btnStatus');//1：批量删除  2：批量恢复   3：批量失效
	var $allCheck = $('#htmlWrap').find('.layui-form-checked');//当前列表内被选中的标签个数
	var idStr = '';
	for(var i=0;i<$allCheck.length;i++){
		if(btnStatus == '1'){
			if($allCheck.eq(i).parents('tr').find('.delTagsBtn').attr('data-status') == btnStatus){
				idStr += 'id='+$allCheck.eq(i).parents('tr').find('.tagNames').attr('data-id')+'&';
			}else{
				allFlag = false;
			}
		}else{
			if($allCheck.eq(i).parents('tr').find('.disabelTask').attr('data-status') == btnStatus){
				idStr += 'id='+$allCheck.eq(i).parents('tr').find('.tagNames').attr('data-id')+'&';
			}else{
				allFlag = false;
			}
		}
	}
	if(!allFlag){
		layer.msg('选择的内容与操作功能不一致！', {
			time: 1500, //1s后自动关闭
			icon: 2
		});
		return false;
	}else{
		idStr = idStr.substring(0,idStr.length-1);
		$.ajax({
			type: "post",
			dataType: "json",
			url: '/admin/user/lable/updateList.do?flag='+btnStatus+'&'+idStr,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('操作成功', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function (){
						if($('.fnBtns').find('.layui-form-checkbox').hasClass('layui-form-checked')){
							$("#paging").attr("data-page-no",'1');
						}
						search();
					});
				}
			},
			error: function() {
				layer.msg('操作失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return false;
			}
		});//ajax
	}
})

//批量导入标签  
$('#importCode').change(function (){
	var fs = new FormData();
	fs.append("uploadFile",$("#importCode")[0].files[0]);
	if($("#importCode")[0].files[0]){
		var layLoad = ""
	 	$.ajax({
			url:'/admin/user/lable/import/labelname.do', //上传接口	
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
				//zhuanhuan
				layer.close(layLoad)
				var $files = $("#importCode")[0].files[0].name;
				var downFileName = $files.substring(0,$files.indexOf('.'));//文件名
				var realData = "data:application/vnd.ms-excel;base64,"+json.data;
//				$('body').find('#downloadFiles').attr('href',realData).attr('download',downFileName + '上传结果.xlsx');
//				document.getElementById("downloadFiles").click();
				if(json.message == "成功"){
					layer.msg('上传成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function() {
						search();
					});
				}else{
					layer.msg(json.message+"，请重新上传！");
				}
			}
    	});		 	
	}
});

//查询
var search = function() {
	if(layLoad){
		layer.closeAll('loading');
	}
	var $starTimes = $('#LAY_demorange_s').val();//开始时间
	var $endTimes = $('#LAY_demorange_e').val();//截止时间
	var tagName = $("#tagName").val()||'';//标签名称
	var pageNo =  $("#paging").attr("data-page-no");
	var pageSize = $("#paging").attr("data-page-size");
	window.location.search="?lableName="+escape(tagName)+"&startTime="+escape($starTimes)+"&endTime="+escape($endTimes)+"&pageNo="+escape(pageNo)+"&pageSize="+escape(pageSize);
}