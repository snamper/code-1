"use strict";
layui.use(['element', 'form', 'paging', 'laydate'], function() {
	$($('.course_nr2 li')[1]).find('.shiji').slideDown();
	var form = layui.form(); //加载form模块
	
	var promptBox = "", //弹窗
		prizeList = [],	//奖品列表
		prizeMiddleList = [],
		prizeChooseList = [];	//选择的奖品列表
	var editList = $(".choosePrize").attr("data-list");
	if(editList) editList = JSON.parse(editList);
	for(var i = 0; i < editList.length; i++){
		prizeMiddleList.push({
			name:editList[i].name,
			couponId:editList[i].id
		})
		prizeChooseList.push({
			name:editList[i].name,
			couponId:editList[i].id
		})
	}
	$(".choosePrize").on("click", function(e){
		
		if(e.target.nodeName == "i" || e.target.nodeName == "I"){
			for(var i = 0; i < prizeChooseList.length; i++){
				if(e.target.attributes[0].nodeValue == prizeChooseList[i].couponId){
					prizeChooseList.splice(i,1);
				}
			}
			var html = "";
			for(var i = 0; i < prizeChooseList.length; i++){
				html += '<span data-couponId="'+prizeChooseList[i].couponId+'">'+prizeChooseList[i].name+' <i attr-couponId="'+prizeChooseList[i].couponId+'">x</i></span>'
			}
			$(".choosePrize").html(html)
		}else{
			prizeMiddleList = [];
			for(var i = 0; i < prizeChooseList.length; i++){
				prizeMiddleList.push({
					name:prizeChooseList[i].name,
					couponId:prizeChooseList[i].couponId
				})
			}
			promptBox = layer.open({
				type: 1,
				skin: 'layui-layer-molv', //样式类名
				closeBtn: 1, //不显示关闭按钮
				anim: 1,
				shade: 0,
				area: ['1000px', '70%'],
				title: ['奖品选择', 'text-align: center; font-size: 16px;'],
				content: $('#prizeBox'),
				success: function(layero, index){
				    showChoosePrize(1)
				}
			});
			
		}
		
	})
	//查询
	$(".queryAdver").on("click", function(){
		showChoosePrize($("#paging").attr("data-page-no"),$(".name").val())
	})
	//回显选中的奖品
	var showChoosePrize = function(pageNo,name){
		
		if(name) var url = "/admin/active/getCouponList.do?pageNo="+pageNo+"&pageSize=10&name="+name;
		else var url = "/admin/active/getCouponList.do?pageNo="+pageNo+"&pageSize=10"+"&couponIds="
		$.ajax({
			type: "get",
			dataType: "json",
			url: url,
			beforeSend:beforeSend(),
			success: function(result) {
				console.log(result)
				if(result.message == "成功"){
					$("#paging").attr("data-page",result.data.totalPage)
					$("#paging").attr("data-page-no",result.data.pageNo)
					changePage()
					prizeList = result.data.datas;
					
					var html = ""
					if(prizeList && prizeList.length > 0){
						for(var i = 0; i < prizeList.length; i++){
							var flag = true;
							if(prizeMiddleList.length > 0){
								for(var n = 0; n < prizeMiddleList.length; n++){
									if(prizeMiddleList[n].couponId == prizeList[i].couponId) flag = false;
								}
							}
							if(flag) html += '<tr>'
							else     html += '<tr class="prize_choose">'
							
							html += '<td>'+prizeList[i].batch_num+'</td>'+
									'<td>'+prizeList[i].name+'</td>'+
									'<td>优惠券</td>'+
									'<td>'+prizeList[i].effective+'</td>'+
									'<td>'+prizeList[i].available + " / "+ prizeList[i].stock +'</td>'
							if(flag)
								html += '<td ><a class="layui-btn layui-save-btn prizeClick" attr-couponId="'+prizeList[i].couponId+'" attr-name="'+prizeList[i].name+'" attr-index="'+i+'">选取</a></td>'
							else	
								html += '<td ><a class="layui-btn layui-save-btn prizeClick" attr-couponId="'+prizeList[i].couponId+'" attr-name="'+prizeList[i].name+'" attr-index="'+i+'">取消</a></td>'
								html +='</tr>'
						}
					}else{
						html = '<span style="color:red">无可用优惠券</span>'
					}
					
					$("#htmlWrap").html(html)
					
				}else{
					layer.msg('获取奖品列表失败！', {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('获取奖品列表失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			},
		});
		
	}
	//选择或取消
	$("body").delegate(".prizeClick","click", function(){
		if($(this).text() == "选取"){
			if(prizeMiddleList.length >= 5){
				layer.msg('最多选取五个')
				return;
			}
			prizeMiddleList.push({
				"name":$(this).attr("attr-name"),
				"couponId":$(this).attr("attr-couponId")
			})
			$(this).html("取消")
			$($("#htmlWrap > tr")[$(this).attr("attr-index")]).addClass("prize_choose")
		}else{
			for(var i = 0; i < prizeMiddleList.length; i++){
				if(prizeMiddleList[i].couponId == $(this).attr("attr-couponId")){
					prizeMiddleList.splice(i,1);
					$(this).html("选取")
					$($("#htmlWrap > tr")[$(this).attr("attr-index")]).removeClass("prize_choose")
					return;
				}
			}
		}
		
	})
	//确定奖品
	$(".confirmPrize").on("click", function(){
		prizeChooseList = [];
		var html = "";
		for(var i = 0; i < prizeMiddleList.length; i++){
			html += '<span data-couponId="'+prizeMiddleList[i].couponId+'">'+prizeMiddleList[i].name+' <i attr-couponId="'+prizeMiddleList[i].couponId+'">x</i></span>'
			prizeChooseList.push({
				couponId:prizeMiddleList[i].couponId,
				name:prizeMiddleList[i].name
			})
		}
		if(prizeMiddleList.length <= 0) $(".tooltip-choosePrize").show()
		else $(".tooltip-choosePrize").hide()
		$(".choosePrize").html(html)
		layer.close(promptBox)
	})
	$(".cancelPrize").on("click", function(){
		layer.close(promptBox)
		prizeMiddleList = [];
	})
	//分页模块
	var changePage = function(){
		var paging = layui.laypage({
			pages: $("#paging").attr("data-page")?$("#paging").attr("data-page") : 1, //分页数   总条数%单页显示条数  向上取整
			cont: "paging", //组件容器
			curr: $("#paging").attr("data-page-no")?$("#paging").attr("data-page-no") : 1, //当前页
			groups: $("#paging").attr("data-page-size")?$("#paging").attr("data-page-size") : 10, //连续分页数
			jump: function(obj, first) {
				if(!first) showChoosePrize(obj.curr)
			}
				
		});
	}
	//保存配置
	$(".save").on("click",function(){
		if(!$('.activeName').val() || $('.activeName').val().length > 15){
			$(".tooltip-activeName").show()
			return;
		}
		if(!$("#LAY_demorange_s").val() || !$("#LAY_demorange_e").val()){
			layer.msg('请选择开始结束日期！', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
		var startTime =  Date.parse($("#LAY_demorange_s").val()),
			endTime = Date.parse($("#LAY_demorange_e").val())
		if(startTime - endTime > 0){
			layer.msg('开始时间不可大于结束时间', {
				time: 1000, //1s后自动关闭
				icon: 2
			});
			return;
		}
		if(prizeChooseList.length <= 0) {
			$(".tooltip-choosePrize").show()
			return;
		}
		var data = {
			activeType:getQueryString("id"),
			activeName:$(".activeName").val(),
			startTime:$("#LAY_demorange_s").val(),
			endTime:$("#LAY_demorange_e").val(),
			prizeType:1,	//优惠券
			couponIds:[],
			activeDescribe:$(".description").val(),
			id:getQueryString("id")
		}
		var couponIds = [];
		for(var i = 0; i < prizeChooseList.length; i++){
			couponIds.push({
				id:prizeChooseList[i].couponId
			})
		}
		data.couponIds = JSON.stringify(couponIds);

		console.log(data)
//		return;
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/active/updateActive.do",
			data:data,
			beforeSend:beforeSend(),
			success: function(result) {
				if(result.message == "成功"){
					layer.msg('修改成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/actManagement/activeList"
					});
				}else{
					layer.msg(result.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('设置失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
			},
		});

	 });
	//初始化日期组件
	var opt = {
		sMax: getQueryString("endDate") ? getQueryString("endDate") : laydate.now(),
		eMin: getQueryString("startDate") ? getQueryString("startDate") : laydate.now(),
		format:'YYYY-MM-DD hh:mm'
	};
	var dateStart = getQueryString("endTime") ? getQueryString("endTime") : laydate.now();
	var dateEnd = getQueryString("startTime") ? getQueryString("startTime") : '2017-01-01';
	var start = {
		min: laydate.now(),
//		max: '',
		istime: true,
		istoday: false, 
		format: 'YYYY-MM-DD hh:mm',
		choose: function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	
	var end = {
		min: laydate.now(),
		max: '2099-01-01',
		istime: true,
		istoday: false, 
		format: 'YYYY-MM-DD hh:mm',
		choose: function(datas) {
//			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	
	document.getElementById('LAY_demorange_s').onclick = function() {
		start.elem = this;
		laydate(start);
	}
	document.getElementById('LAY_demorange_e').onclick = function() {
		end.elem = this
		laydate(end);
	}
	//校验
	$(".activeName").on("blur", function() {
		if(!$('.activeName').val() || $('.activeName').val().length > 15){
			$(".tooltip-activeName").show()
		}else{
			$(".tooltip-activeName").hide()
		}
	})
})