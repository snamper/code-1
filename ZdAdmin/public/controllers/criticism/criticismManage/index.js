"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function() {
	//评论管理-评论列表
	var $ = layui.jquery;
	var form = layui.form();

	//列表页全选用户
	form.on('checkbox(allChoose)', function(data) {
		var child = $(data.elem).parents('form').find('table').find('tbody input[type="checkbox"]');
		child.each(function(index, item) {
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});
	form.on('checkbox(thisInpt)', function(data) {
		var child = $(data.elem).parents('form').find('table').find('tbody input[type="checkbox"]');
		if($('#htmlWrap .layui-form-checkbox').length == $('#htmlWrap .layui-form-checked').length){
			$('.allSelects .layui-form-checkbox').addClass('layui-form-checked');
		}else{
			$('.allSelects .layui-form-checkbox').removeClass('layui-form-checked');
		}
	});

	var paging = layui.laypage({ //分页组件
		pages: $("#paging").attr("data-page"),
		cont: "paging",
		curr: $("#paging").attr("data-page-no"),
		groups: $("#paging").attr("data-page-size"),
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=10&pageNo="+obj.curr+"&status="+$(".status").attr("data-status"));
			}
		}
	});
	//选择评论状态
	form.on('select(status)', function(data) {
		status = data.value;
		$(".status").attr("data-status", status)
	})

	//不良词单个的编辑
	$('.onlyEditorBtn').on('click', function() {
		var $this = $(this);
		editorSureFn('editor', $this);
	});
	//不良词修改后提交
	$('.onlySureBtn').on('click', function() {
		var $this = $(this);
		editorSureFn('sure', $this);
	});
	//单个修改/提交操作
	function editorSureFn(btnNum, $this) { //btnNum为区分 修改/提交
		var $sureText = $this.parents('.checkedBoxTr').find('.sureText');
		var $replaceTextInt = $this.parents('.checkedBoxTr').find('.replaceTextInt');
		var $editorBtn = $this.parents('.checkedBoxTr').find('.onlyEditorBtn');
		var $sureBtn = $this.parents('.checkedBoxTr').find('.onlySureBtn');
		if($this.parents('.checkedBoxTr').find('.layui-form-checkbox').hasClass('layui-form-checked')) {
			if(btnNum == 'editor') {
				$sureText.addClass('hide');
				$replaceTextInt.removeClass('hide');
				$editorBtn.addClass('hide');
				$sureBtn.removeClass('hide');
			} else {
				$replaceTextInt.addClass('hide');
				$sureText.removeClass('hide');
				$editorBtn.removeClass('hide');
				$sureBtn.addClass('hide');
			}
		} else {
			layer.msg('请勾选对应内容！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
		}
	};
	var search = function() {
		var data = {
			status: $(".status").attr("data-status"),
			userId:$(".userId").val(),
			startIp: $(".startIp").val(),
			endIp: $(".endIp").val(),
			pageNo: $("#paging").attr('data-page-no'),
			pageSize: getQueryString("pageSize")?getQueryString("pageSize"):"10",
		};
		window.location.search = "?status=" + escape(data.status) + "&userId=" +escape(data.userId)+ "&startIp=" + escape(data.startIp) + "&endIp=" + 
			escape(data.endIp) + "&pageNo=" + escape(data.pageNo) + "&pageSize=" + escape(data.pageSize);
	}
	//用户列表页搜索按钮
	$('#searchBtn').on('click', function() {
		$("#paging").attr("data-page-no", 1)
		search();
	});
	//单个删除
	$(".deleteOneWord").on("click", function() {
		var ids = $(this).attr("data-id");
		delDiscuss(ids);
	})
	//多个删除
	$('#deleBtn').on('click', function (){
		var delLen = $('#htmlWrap .layui-form-checked');//当前页面被选中
		var ids = '';
		for(var i =0;i<delLen.length;i++){
			ids += delLen.parents('.checkedBoxTr').eq(i).attr("data-id") + ',';
		}
		ids = ids.substring(0,ids.length - 1);
		delDiscuss(ids);
	});
	//评论删除方法
	function delDiscuss($ids){
		var data = {
			ids:$ids
		};
		layer.confirm('您确定删除吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			$.ajax({						//异步获取所有菜单列表
				type: "post",
				dataType: "json",
				url: "/criticism/criticismManage/deleteCommont",
				data:data,
				beforeSend:beforeSend(),
				success: function(json) {
//					console.log(json)
					if(json.message == "成功") {
						layer.msg('删除成功！', {
							time: 1000, //1s后自动关闭
							icon: 1
						},function(){
							search();
						});
						
					}else{
						layer.msg(json.message)
					}
				},
				error: function() {
					layer.msg('删除失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	}

});