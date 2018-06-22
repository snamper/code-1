"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	//切换平台查询
	form.on('select(systemType)', function(data){
		$('.systemType').attr('data-systemType', data.value);
	});
	var canalValue = getQueryString("channelId") || '', categoryValue = getQueryString("categoryCode") || '', canalCode=getQueryString("channelCode") || '';
	//切换渠道
	form.on('select(canalList)', function(data){
		canalValue =( (data.value).split(";")[0] == "empty" ? "" : (data.value).split(";")[0]);
		canalCode =( (data.value).split(";")[1] == "empty" ? "" : (data.value).split(";")[1]);

		getCategoryList( canalValue );
		categoryValue=' '
	});
	//切换内容类目
	form.on('select(categoryList)', function(data){
		categoryValue = data.value;
	});
	//查询
	var search = function(pn) {
		var pageNo = pn;
		var pageSize = $("#paging").attr("data-page-size");
		var $starTimes = $('#LAY_demorange_s').val()||'';//开始时间
		var $endTimes = $('#LAY_demorange_e').val()||'';//截止时间
		var systemType = $('.systemType').attr('data-systemType')||'';
		systemType = (systemType == '0' ? '' : systemType);
		var channelCode = canalCode;
		var id = canalValue
		var categoryCode = categoryValue;   // 日期 和 类型 搜索有问题 
		window.location.search="?startTime="+escape($starTimes)+"&channelCode="+escape(channelCode)+"&categoryCode="+escape(categoryCode)+"&endTime="+
		escape($endTimes)+"&pageNo="+pageNo+"&pageSize="+escape(pageSize)+"&channelId="+escape(id)+"&systemType="+escape(systemType);
	}
	$('#searchBtn').on('click', function (){//查询
		var layLoad = layer.load(2,{
			shade: 0.6
		});//加载等待
		search('1');
	});	
	
	var channelOld = getQueryString("channelCode") || '';
	var categoryOld = getQueryString("categoryCode") || '';
	var idOld = getQueryString("channelId") || '';
// 获取渠道列表
	getChannel( channelOld )
	
	function getChannel( channelOld ) {
		$.ajax({
		     type:"get",
		     dataType: "json",
		     url: "/admin/third/channel/list.do",
		     success:function(json){
		     	if (json.message == '成功') {
		     		var list = json.data.datas;
		     		var length = list.length;
		     		var str = '<select name="canalList" lay-filter="canalList" id="canalList"><option value="empty;empty">选择渠道</option>';
		     		for ( var i=0 ; i<length ; i++ ) {
		     			if ( channelOld && list[i].code == channelOld ) {
		     				str += '<option selected="selected" data-code="'+ list[i].code +'" value="'+ list[i].id+";"+ list[i].code  +'">' + list[i].name +'</option>'
		     			}else {
		     				str += '<option data-code="'+ list[i].code +'" value="'+ list[i].id+";"+ list[i].code +'">' + list[i].name +'</option>'
		     			}
		     		}
					str += '</select>'
		     		$(".canalList").empty().append(str)
		     		form.render('select')
		     	}
		     	
		     }
	   });
	}
	
	getCategoryList(idOld,categoryOld)

   function getCategoryList(id,categoryOld) {
	   	if(id) {
	       $.ajax({
			     type:"get",
			     dataType: "json",
			     url: "/admin/third/content/category/list.do?status=2&thirdChannelId="+id,
			     success:function(json){
			     	if (json.message == '成功') {
			     		var list = json.data;
			     		var length = list.length;
			     		var str = '<select name="categoryList" lay-filter="categoryList" id="categoryList"><option value=" ">选择内容类目</option>';
			     		for ( var i=0 ; i<length ; i++ ) {
			     			if (categoryOld && list[i].categoryId == categoryOld) {
			     				str += '<option selected="selected" value="'+ list[i].categoryId +'">' + list[i].name +'</option>'
			     			}else {
			     				str += '<option value="'+ list[i].categoryId +'">' + list[i].name +'</option>'
			     			}
			     		}
						str += '</select>'
			     		$(".categoryList").empty().append(str)
			     		form.render('select')
			     	}
			     	
			     }
		   });	
	   	}else{
	   		var str = '<select name="categoryList" lay-filter="categoryList" id="categoryList"><option value=" ">选择内容类目</option></select>';
	   		$(".categoryList").empty().append(str)
			form.render('select')
	   	}
   }
   
	
	//初始化日期组件
	if($('.layui-form').eq(0).hasClass('dataPlug')){//判断数据是否请求成功
		var opt = {
			sMax: getQueryString("endTime") ? getQueryString("endTime") : laydate.now(),//开始日期的最大值
			eMin: getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01'//结束日期的最小值
		};
		var dateIint = new dateComponent(opt);
	}
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=20&pageNo="+obj.curr);
			};
		}
	});	
		
	$("#downLoadBtn").on("click", function() {
	  	var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
		var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
		var channelCode = canalCode;
		var categoryCode = categoryValue; 
		var systemType = $('.systemType').attr('data-systemType')||'';
		systemType = (systemType == '0' ? '' : systemType);
		var data = {
			startTime: $starTimes,
			endTime: $endTimes,
			channel: channelCode,
			category: categoryCode,
			systemType: systemType
		}
		var index = layer.load(2, {
		  shade: [0.6,'#000'] //0.1透明度的白色背景
		});
   		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/content/statistics/export.do",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				layer.close(index);
				if(json.message == "成功") {
					var realData = "data:application/vnd.ms-excel;base64,"+json.data;
					var testUrl = realData;
			        var url = URL.createObjectURL(dataURLtoBlob(testUrl));
					$('body').find('#downloadFiles').attr('href',url).attr('download','下载结果.xlsx');
					document.getElementById("downloadFiles").click();			
//					$('body').find('#downloadFiles').attr('href',realData).attr('download','下载结果.xlsx');
//					document.getElementById("downloadFiles").click();
					layer.msg('下载成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					});
				}else{
					layer.msg(json.message+"，请重新下载！");
				}
			},error: function(){
				layer.close(index);
				layer.msg('下载失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})
	})
});