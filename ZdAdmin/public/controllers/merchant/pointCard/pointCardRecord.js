"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01',//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	var paging = layui.laypage({
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){		 
			if(!first){
				jumpPage("pSize=10&pNo="+obj.curr);			 
			}			 
		}
	});
	// 暂停充值/恢复充值操作
	var messageInfo = ''
	$(".suspend").on("click", function(){
		var id = $(this).attr("data-id");
		var state = $(this).attr("data-state");
		if( state == 1 ) {
			messageInfo = "暂停充值"
		}else {
			messageInfo = "恢复充值"
		}
		
		var data = {
			scorecardRecordId: id,
			state: state
		}
		layer.confirm(messageInfo+'后及时生效，是否'+ messageInfo +'？', {
		btn: ['确认', '取消'] //按钮
		}, function() {
				$.ajax({
					type: "post",
					dataType: "json",
					url: "/admin/scorecard/record/state/change.do",
					data:data,
					beforeSend:beforeSend(),
					success: function(json) {
						if(json.message == "成功") {
							layer.msg( messageInfo+'成功！', {
								time: 1000, //1s后自动关闭
								icon: 1
							},function(){
								window.location.href = "/merchant/pointCard/pointCardRecord"
							});
						}else {
							layer.msg(json.message, {
								time: 1500, //1s后自动关闭
								icon: 2
							});
						}
					},error: function(){
						layer.msg( messageInfo+'失败！', {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				})
			})
	})
	function dataURLtoBlob(dataurl) {
		var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
		while(n--) {
		u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {
		type: mime
		});
	}
	// 作废操作  
	$(".toVoid").on("click", function(){
		var id = $(this).attr("data-id")	
		var state = $(this).attr("data-state");
		if ( state == 0 ) {
			layer.msg('请先暂停充值！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			return false;
		}
		layer.confirm('充值码作废后将不允许作废，确定作废？', {
		btn: ['确认', '取消'] //按钮
			}, function() {
				layer.confirm('请导入作废充值码！', {
					btn: ['确认', '取消'] //按钮
					}, function() {
							$("#importCode").click();
					})
		})
		$("#importCode").on("change", function() {
			var fs = new FormData();
			fs.append("uploadFile",$("#importCode")[0].files[0]);
			fs.append("scorecardRecordId",Number( id ));
			if($("#importCode")[0].files[0]){
				var layLoad = "";
			 	$.ajax({
					url:'/admin/scorecard/code/cancel.do', //上传接口	
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
						var testUrl = realData;
			        	var url = URL.createObjectURL(dataURLtoBlob(testUrl));
						
						$('body').find('#downloadFiles').attr('href',url).attr('download',downFileName + '上传结果.xlsx');
						document.getElementById("downloadFiles").click();
						if(json.message == "成功"){
							layer.msg('上传成功！', {
								time: 1000, //1s后自动关闭
								icon: 1
							},function() {
								reloadPage('1');
							});
						}else{
							layer.msg(json.message+"，请重新上传！");
						}
					}
		    	});		 	
			}		
		})
	})
	
});
//列表查询按钮点击
$('#searchBtn').on('click', function (){
	searchBackList();
});
//不同的状态下的查询列表
function searchBackList(){
	var layLoad = layer.load(2,{
		shade: 0.6
	});//加载等待
	reloadPage('1');
	layer.close(layLoad);//清除加载
};

//商品类型转换
var getProducType = function(){
	 var IsGoodsTypeVirtual = $("#goodsTypeVirtual").next(0).hasClass("layui-form-checked")?"1":"";
	 return IsGoodsTypeVirtual;
};
//get 同步刷新页面
var reloadPage = function(pageNo){
	 var data = {
		 name:$("#pointName").val() || '', //积分卡名称
		 limit: $("#pointLimit").val() || '',//积分卡额度
		 startTime:$('#LAY_demorange_s').val() || '',
		 endTime:$('#LAY_demorange_e').val() || '',
		 pageNo:pageNo,
		 pageSize:$("#paging").attr("data-page-size")
	 };		
	 window.location.search = "?name=" + escape(data.name) + "&stDate=" + escape(data.startTime) + "&enDate=" + 
	 escape(data.endTime) + "&pNo=" + escape(data.pageNo) + "&pSize=" + escape(data.pageSize)+ "&score=" + escape(data.limit);
};