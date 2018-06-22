"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function() {
	//评论管理-不良词屏蔽
	var $ = layui.jquery;
	var form = layui.form();

	//列表页全选用户
	form.on('checkbox(allChoose)', function(data) {
//		console.log(data);
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

	//初始化日期组件/////在页面上直接调用了
//	var dateIint = new dateComponent();

	var paging = layui.laypage({ //分页组件
		pages: $("#paging").attr("data-page"),
		cont: "paging",
		curr: $("#paging").attr("data-page-no"),
		groups: $("#paging").attr("data-page-size"),
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=10&pageNo="+obj.curr);
			}
		}
	});
	var search = function() {
		var $starTimes = $('#LAY_demorange_s').val()||'';
		var sensitiveWord =  $(".sensitiveWord").val()||'';
		var pageNo = $("#paging").attr("data-page-no");
		var pageSize = $("#paging").attr("data-page-size");
		window.location.search="?setTime="+escape($starTimes)+"&sensitiveWord="+escape(sensitiveWord)+"&pageNo="+escape(pageNo)+"&pageSize="+escape(pageSize);
	}
	//不良词单个的编辑
	$('.onlyEditorBtn').on('click', function() {
		var index = $(this).attr("data-index");
		$(this).hide().siblings().css("display","inline-block");
		$(this).parents('tr').find('.beforEditor').addClass('hide');
		$(this).parents('tr').find('.afterEditor').removeClass('hide');
	});
	//修改不良词 or 修改替换词
	$(".submitEdit").on("click",function() {
		if($(this).parent().siblings().find(".editSensitiveWord input").val()){
			var arr = [{
				"id":$(this).attr("data-id"),
				"sensitiveWord":$(this).parent().siblings().find(".editSensitiveWord input").val(),
				"replaceWord":$(this).parent().siblings().find(".editReplaceWord input").val()
			}]
			subEditorBtn(arr);
		}else{
			layer.msg('不良词不能为空！',{
				time: 1500,
				icon: 2
			});
		}
	})
	//添加不良词
	$(".addSubmit").on("click",function() {
		var data = {
			"sensitiveWord":$(".addSensitiveWord").val(),
			"replaceWord":$(".addReplaceWord").val()
		}
		$.ajax({						//异步获取所有菜单列表
			type: "post",
			dataType: "json",
			url: "/criticism/criticismManage/addSensitiveWord",
			data:data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('添加成功！', {
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
				layer.msg('修改失败！', {
					time: 1500,
					icon: 2
				});
			}
		})
	})
	//批量导入不良词
	$(".importSensitiveWord").on("click", function() {
		$("#importCode").click();
	})
	$("#importCode").on("change", function() {
		var fs = new FormData();
		fs.append("excelfile",$("#importCode")[0].files[0]);
		if($("#importCode")[0].files[0]){
			var layLoad = ""
		 	$.ajax({
				url:'/admin/sensitiveWord/import.do', //上传接口	
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
			        var url = URL.createObjectURL(dataURLtoBlob(realData));
					$('body').find('#downloadFiles').attr('href',url).attr('download',downFileName + '上传结果.xlsx');
					document.getElementById("downloadFiles").click();
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
	})
	
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
			return false;
		}
	};
	
	//选中多个进行操作
	$('#editorBtn').on('click',function (){
		var delLen = $('#htmlWrap .layui-form-checked');//当前页面被选中
		var arr = [];
		for(var i =0;i<delLen.length;i++){
			if(delLen.parents('.checkedBoxTr').eq(i).find(".editSensitiveWord input").val()){
				var jsonLis = {
					"id":delLen.parents('.checkedBoxTr').eq(i).attr("data-id"),
					"sensitiveWord":delLen.parents('.checkedBoxTr').eq(i).find(".editSensitiveWord input").val(),
					"replaceWord":delLen.parents('.checkedBoxTr').eq(i).find(".editReplaceWord input").val()
				};
				arr.push(jsonLis);
			}else{
				layer.msg('不良词不能为空！',{
					time: 1500,
					icon: 2
				});
			}
		}
		subEditorBtn(arr);
	});
	
	//修改后提交的方法
	function subEditorBtn($arr){
		var data = {
			"data":JSON.stringify($arr)
		}
		$.ajax({						//异步获取所有菜单列表
			type: "post",
			dataType: "json",
			url: "/criticism/criticismManage/updateSensitiveWord",
			data:data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('修改成功！', {
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
				layer.msg('修改失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	};

	//用户列表页搜索按钮
	$('#searchBtn').on('click', function() {
		$("#paging").attr("data-page-no",1);
		search();
	});

});
var base64ToBlob = function(byte){
	var byteLength =  new ArrayBuffer(byte.length);
	var byteArray = new Uint8Array(byteLength);
    for (var i = 0; i < byte.length; i++) {  
        byteArray[i] = byte.charCodeAt(i);  
    }  
    return new Blob( [byteLength] , {type:'application/vnd.ms-excel'});  
}
var blobToFile = function(blob){
	var fs = new FileReader();
	fs.readAsText(blob,"application/vnd.ms-excel"); 
	fs.onload=function(e){  
		console.log(this);
//		$('#test').html(this.result);
//      $("body").append('<iframe src="'+this.result+'"/>');      
    }  
}
 function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type:"application/vnd.ms-excel"});
}