"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	
	form.on('select(logins)', function(data){//登录状态的下拉选择
	    //console.log(data.value); //得到被选中的值
		$('.loginStas').attr('data-stats', data.value);
	});
	form.on('select(stats)', function(data){//状态的下拉选择
	    //console.log(data.value); //得到被选中的值
		$('.selStas').attr('data-stats', data.value);
	});
	form.on('select(sexs)', function(data){//性别的下拉选择
		$('.selSexs').attr('data-sexs', data.value);
	});
	form.on('select(integral)', function(data){//状态的下拉选择
		$('.selIntegral').attr('data-integral', data.value);
	});
	form.on('select(riskStatus)', function(data){//账号风险的下拉选择
		$('.selRiskStatus').attr('data-risk', data.value);
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
	form.on('checkbox(ones)', function(data){
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
	
	//初始化日期组件  
	var opt = {
		sMax: getQueryString("registTimeEnd") ? getQueryString("registTimeEnd") : laydate.now(),//开始日期的最大值
		eMin: getQueryString("registTimeStar") ? getQueryString("registTimeStar") : '2017-01-01'//结束日期的最小值
	};
	var dateIint = new dateComponent(opt);
	
	//出生年月区间查询
	var birthStart = getQueryString("birthEnd") ? getQueryString("birthEnd") : laydate.now();
	var birthEnd = getQueryString("birthStart") ? getQueryString("birthStart") : '1900-01-01';
	var start = {
		min: '1900-01-01',
		max: birthStart,
		istime: false,
		istoday: false, 
		format: 'YYYY-MM-DD',
		choose: function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	
	var end = {
		min: birthEnd,
		max: laydate.now(),
		istime: false,
		istoday: false, 
		format: 'YYYY-MM-DD',
		choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	
	document.getElementById('LAY_demorange_s_s').onclick = function() {
		start.elem = this;
		laydate(start);
	}
	document.getElementById('LAY_demorange_e_e').onclick = function() {
		end.elem = this
		laydate(end);
	}
	
	var paging = layui.laypage({//分页组件
		pages:$("#paging").attr("data-page"), 
		cont:"paging",
		curr:$("#paging").attr("data-page-no"),
		groups:$("#paging").attr("data-page-size"),
		jump: function(obj, first){	
			if(!first){
				jumpPage("pageSize=10&pageNo="+obj.curr);
			}			 
		}
	});
});

//双击设置/编辑备注
$('.remarkInpt').dblclick(function (){
	var $this = $(this);
	var thisName = $this.attr('data-name');//昵称
	var thisPoint = $this.attr('data-point');//积分余额
	var thisId = $this.attr('data-id');//用户id
	var oldVal = $this.attr('data-val')||'';//备注内容
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //加上边框
		area: ['450px', '330px'], //宽高
		title: '昵称：' + thisName + '　' + '积分余额：' + thisPoint,
		content: '<div class="remarkBox" data-id="'+ thisId +'">' +
				 	'<textarea class="remarkTextArea" maxlength="120" placeholder="限制120字以内">'+ oldVal +'</textarea>' +
				 	'<a href="javascript:;" class="layui-btn" id="remarkSaveBtn">保存</a>' +
				 '</div>'
	});
	
	
});
$("body").delegate('#remarkSaveBtn','click',function (){
	var $val = $('body').find('.remarkTextArea').val()||'';
	var $id = $('body').find('.remarkBox').attr('data-id');
	if(!$val){
		layer.msg('请完善信息！');
		return false;
	}else{
		var layLoad = layer.load(2);//加载等待
		var data = {id: $id,remark: $val};
	}
	$.ajax({
		type: "post",
		dataType: "json",
		url: "/appUserControl/appUserMan/userRemark",
		data: data,
		beforeSend:beforeSend(),
		success: function(json) {
			layer.close(layLoad);
			if(json.message == "成功") {
				$('body').find('.layui-layer-close1').click();
				location.reload(true);
			}else{
				layer.msg(json.message, {
					time: 1500, //1s后自动关闭
					icon: 2
				});
				return false;
			}
		},
		error: function() {
			layer.msg('保存失败！', {
				time: 1500, //1s后自动关闭
				icon: 2
			});
			return false;
		}
	});
});

//鼠标单机显示当前备注
$('.remarkInpt').on('click',function (){
	var $this = $(this);
	var $remarkTime = $this.attr('data-remarkTime');//备注修改时间
	if($this.html()){
		layer.tips("<font style='color: black;'>" + $this.attr('data-val') + "<br/>" + format($remarkTime) + "</font>", $this, {
			tips: [4, '#F0F0F0']
		});
	}
});
function add0(m){return m<10?'0'+m:m };
function format(shijianchuo){
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
};

//针对每个用户的操作 //frostRelieveBtn-解除和冻结  starQuitBtn-启用/停用
//启用/停用 用户按钮 (1-启用-on，2-停用-off，3-冻结-ons，4-解除-offs)
$('.starQuitBtn').on('click',function (){
	var $this = $(this);
//	var $loginStatus = $this.attr('data-loginStas');
	var $btnStatus = $this.attr('data-btnStatus');//按钮状态/on/off
	layer.confirm('您确定要改变用户状态吗？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		layer.closeAll('dialog');
		if($btnStatus == 'on'){
			getStatusMes('1','only','0',$this);
			$this.attr('data-btnStatus','off');
		}else{
			getStatusMes('2','only','-1',$this);
			$this.attr('data-btnStatus','on');
		}
	});
});

//冻结积分/解除冻结 按钮 (1-启用-on，2-停用-off，3-冻结-ons，4-解除-offs)
$('.frostRelieveBtn').on('click',function (){
	var $this = $(this);
//	var $loginStatus = $this.attr('data-loginStas');
	var $btnStatus = $this.attr('data-btnStatus');//按钮状态/ons/offs
	layer.confirm('您确定要改变用户积分的状态吗？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		layer.closeAll('dialog');
		if($btnStatus == 'ons'){
			getStatusMes('3','only','0',$this);
			$this.attr('data-btnStatus','offs');
		}else{
			getStatusMes('4','only','1',$this);
			$this.attr('data-btnStatus','ons');
		}
	});
});

//唤醒风险/解除风险 按钮 (1-启用-on，2-停用-off，3-冻结-ons，4-解除-offs  5-唤醒风险-turnOn ，6-解除风险-turnOff)
$('.risksStatusBtn').on('click',function (){
	var $this = $(this);
	var $btnStatus = $this.attr('data-btnStatus');//按钮状态/turnOn/turnOff
	layer.confirm('您确定要改变用户的账号风险状态吗？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		layer.closeAll('dialog');
		if($btnStatus == 'turnOn'){
			getStatusMes('5','only','2',$this);
			$this.attr('data-btnStatus','turnOff');
		}else{
			getStatusMes('6','only','0',$this);
			$this.attr('data-btnStatus','turnOn');
		}
	});
});

//批量操作
//启用用户按钮
$('#enableBtn').on('click', function (){
	var $this = $(this);
	differAll('1',$this);
});
//停用用户按钮
$('#disableBtn').on('click', function (){
	var $this = $(this);
	differAll('2',$this);
});
//冻结积分按钮
$('#frostIntegralBtn').on('click', function (){
	var $this = $(this);
	differAll('3',$this);
});
//解除冻结按钮
$('#relieveIntegralBtn').on('click', function (){
	var $this = $(this);
	differAll('4',$this);
});
//唤醒风险按钮
$('#rouseRisksBtn').on('click', function (){
	var $this = $(this);
	differAll('5',$this);
});
//解除风险按钮
$('#relieveRisksBtn').on('click', function (){
	var $this = $(this);
	differAll('6',$this);
});


//批量操作时区别被选中的是否需求一致
function differAll(difCode,_this){//difCode为6种按钮的分类代号  oneCode为六种按钮的功能代号
	var oneCode = '';
	if($("#htmlWrap .layui-form-checked") && $("#htmlWrap .layui-form-checked").length != 10){
		var len = Number($("#htmlWrap .layui-form-checked").length);//本页列表的用户数
	}else{
		var len = Number($('tr:last').find('.orderN').html());//本页列表的用户数
	}
	if(difCode == '1'){
		for(var i = 0;i < len;i++){//循环拿到被选中的用户项
			if($("#htmlWrap .layui-form-checked").eq(i).parents("tr").children(".statusMes").find("a:first").html() != '启用'){
				oneCode = '1';
			}
		};
	}else if(difCode == '2'){
		for(var i = 0;i < len;i++){//循环拿到被选中的用户项
			if($("#htmlWrap .layui-form-checked").eq(i).parents("tr").children(".statusMes").find("a:first").html() != '停用'){
				oneCode = '2';
			}
		};
	}else if(difCode == '3'){
		for(var i = 0;i < len;i++){//循环拿到被选中的用户项
			if($("#htmlWrap .layui-form-checked").eq(i).parents("tr").children(".statusMes").find("a:nth-child(2)").html() != '冻结积分'){
				oneCode = '3';
			}
		};
	}else if(difCode == '4'){
		for(var i = 0;i < len;i++){//循环拿到被选中的用户项
			if($("#htmlWrap .layui-form-checked").eq(i).parents("tr").children(".statusMes").find("a:nth-child(2)").html() != '解除冻结'){
				oneCode = '4';
			}
		};
	}else if(difCode == '5'){
		for(var i = 0;i < len;i++){//循环拿到被选中的用户项
			if($("#htmlWrap .layui-form-checked").eq(i).parents("tr").children(".statusMes").find("a:last").html() != '唤醒风险'){
				oneCode = '5';
			}
		};
	}else if(difCode == '6'){
		for(var i = 0;i < len;i++){//循环拿到被选中的用户项
			if($("#htmlWrap .layui-form-checked").eq(i).parents("tr").children(".statusMes").find("a:last").html() != '解除风险'){
				oneCode = '6';
			}
		};
	}
	
	if(difCode == '1' || difCode == '2'){
		if(oneCode == difCode){
			layer.msg('所选择的用户待操作功能不统一！');
			return;
		}else{
			var $btnStatus = _this.attr('data-btnStatus');//按钮状态/on/off
			if($(".checkedBoxTr").find(".layui-form-checkbox").hasClass("layui-form-checked")){
				layer.confirm('您确定要改变用户状态吗？', {
					btn: ['确认', '取消'] //按钮
				}, function() {
					layer.closeAll('dialog');
					if(_this.html() == '启用'){
						if($btnStatus == 'on'){
							getStatusMes('1','all','0','');
							_this.attr('data-btnStatus','off');
						}else{
							getStatusMes('1','all','0','');
							_this.attr('data-btnStatus','on');
						}
					}else{
						if($btnStatus == 'on'){
							getStatusMes('2','all','-1','');
							_this.attr('data-btnStatus','off');
						}else{
							getStatusMes('2','all','-1','');
							_this.attr('data-btnStatus','on');
						}
					}
				});
			}else{
				layer.msg('请选择要操作的对象！');
				return;
			}
		}
	}else if(difCode == '3' || difCode == '4'){
		if(oneCode == difCode){
			layer.msg('所选择的用户待操作功能不统一！');
			return;
		}else{
			var $btnStatus = _this.attr('data-btnStatus');//按钮状态/on/off
			if($(".checkedBoxTr").find(".layui-form-checkbox").hasClass("layui-form-checked")){
				layer.confirm('您确定要改变用户积分的状态吗？', {
					btn: ['确认', '取消'] //按钮
				}, function() {
					layer.closeAll('dialog');
					if(_this.html() == '冻结积分'){
						if($btnStatus == 'ons'){
							getStatusMes('3','all','0','');
							_this.attr('data-btnStatus','offs');
						}else{
							getStatusMes('3','all','0','');
							_this.attr('data-btnStatus','ons');
						}
					}else{
						if($btnStatus == 'ons'){
							getStatusMes('4','all','1','');
							_this.attr('data-btnStatus','offs');
						}else{
							getStatusMes('4','all','1','');
							_this.attr('data-btnStatus','ons');
						}
					}
				});
			}else{
				layer.msg('请选择要操作的对象！');
				return;
			}
		};
	}else if(difCode == '5' || difCode == '6'){
		if(oneCode == difCode){
			layer.msg('所选择的用户待操作功能不统一！');
			return;
		}else{
			var $btnStatus = _this.attr('data-btnStatus');//按钮状态/on/off
			if($(".checkedBoxTr").find(".layui-form-checkbox").hasClass("layui-form-checked")){
				layer.confirm('您确定要改变用户的账号风险状态吗？', {
					btn: ['确认', '取消'] //按钮
				}, function() {
					layer.closeAll('dialog');
					if(_this.html() == '唤醒风险'){
						if($btnStatus == 'turnOn'){
							getStatusMes('5','all','2','');
							_this.attr('data-btnStatus','turnOff');
						}else{
							getStatusMes('5','all','2','');
							_this.attr('data-btnStatus','turnOn');
						}
					}else{
						if($btnStatus == 'turnOn'){
							getStatusMes('6','all','0','');
							_this.attr('data-btnStatus','turnOff');
						}else{
							getStatusMes('6','all','0','');
							_this.attr('data-btnStatus','turnOn');
						}
					}
				});
			}else{
				layer.msg('请选择要操作的对象！');
				return;
			}
		};
	}
};

function getStatusMes(mark,btnPos,$loginStatus,_this){//mark按钮的功能区分 ,btnPos为区分右侧的按钮或者底部的按钮 ,$loginStatus为（用户的登录状态/积分状态/账号风险状态）,_this为右侧按钮单操作
	var $ids = '',str = '';//启用/停用
	var $ids1 = '',str1 = '';//冻结/解冻
	var $ids2 = '',str2 = '';//唤醒风险/解除风险
	var len = Number($('table').find('tr').find('.layui-form-checkbox').length);//本页列表的用户数
	var allSelectBox = $('table').find('tr').find('.layui-form-checked');//被选中的
	if(mark == '1' || mark == '2'){//启用/停用
		if(btnPos == 'only'){
			$ids = _this.parents(".checkedBoxTr").children(".statusMes").find("a:first").attr("data-id")||'';
		}else if(btnPos == 'all'){
			if(!allSelectBox.length){
				layer.msg('请选择要操作的对象！');
				return;
			}
			for(var i = 0;i < len;i++){//循环拿到被选中的用户项
				if($("#htmlWrap .layui-form-checkbox").eq(i).hasClass("layui-form-checked")){
					str = $(".layui-form-checkbox").eq(i+1).parents("tr").children(".statusMes").find("a:first").attr("data-id")||'';
					$ids += str + ',';
				}
			};
			$ids = $ids.substring(0,$ids.length - 1);
		}
		var data = {
			"loginStatus":$loginStatus,
			"ids[]":$ids
		};
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/appUserControl/appUserMan/allAbled",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					if(mark == '1'){
						if(btnPos == 'only'){
							_this.html("停用");
							_this.addClass("layui-btn-danger");
						}else{
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:first").html("停用");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:first").addClass("layui-btn-danger");
						}
						
					}else if(mark == '2'){
						if(btnPos == 'only'){
							_this.html("启用");
							_this.removeClass("layui-btn-danger");
						}else{
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:first").html("启用");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:first").removeClass("layui-btn-danger");
						}
					}
					reloadPage($("#paging").attr("data-page-no"));
				}else{
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('本次操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	}else if(mark == '3' || mark == '4'){//冻结/解冻
		if(btnPos == 'only'){
			$ids1 = _this.parents(".checkedBoxTr").children(".statusMes").find("a:first").attr("data-id")||'';
		}else if(btnPos == 'all'){
			if(!allSelectBox.length){
				layer.msg('请选择要操作的对象！');
				return;
			}
			for(var i = 0;i < len;i++){//循环拿到被选中的用户项
				if($("#htmlWrap .layui-form-checkbox").eq(i).hasClass("layui-form-checked")){
					str1 = $(".layui-form-checkbox").eq(i+1).parents("tr").children(".statusMes").find("a:first").attr("data-id")||'';
					$ids1 += str1 + ',';
				}
			};
			$ids1 = $ids1.substring(0,$ids1.length - 1);
		}
		var data = {
			"scoreStatus":$loginStatus,
			"userIds[]":$ids1
		};
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/appUserControl/appUserMan/allFrost",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					if(mark == '3'){
						if(btnPos == 'only'){
							_this.html("解除冻结");
							_this.addClass("layui-btn-normal");
							_this.removeClass('layui-btn-warm');
						}else{
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:nth-child(1)").html("解除冻结");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:nth-child(1)").removeClass("layui-btn-warm");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:nth-child(1)").addClass("layui-btn-normal");
						}
					}else if(mark == '4'){
						if(btnPos == 'only'){
							_this.html("冻结积分");
							_this.removeClass("layui-btn-normal");
							_this.addClass('layui-btn-warm');
						}else{
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:nth-child(1)").html("冻结积分");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:nth-child(1)").removeClass("layui-btn-normal");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:nth-child(1)").addClass("layui-btn-warm");
						}
					}
					reloadPage($("#paging").attr("data-page-no"));
				}else{
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('本次操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	}else if(mark == '5' || mark == '6'){//唤醒风险/解除风险
		if(btnPos == 'only'){
			$ids2 = _this.parents(".checkedBoxTr").children(".statusMes").find("a:first").attr("data-id")||'';
		}else if(btnPos == 'all'){
			if(!allSelectBox.length){
				layer.msg('请选择要操作的对象！');
				return;
			}
			for(var i = 0;i < len;i++){//循环拿到被选中的用户项
				if($("#htmlWrap .layui-form-checkbox").eq(i).hasClass("layui-form-checked")){
					str2 = $(".layui-form-checkbox").eq(i+1).parents("tr").children(".statusMes").find("a:first").attr("data-id")||'';
					$ids2 += str2 + ',';
				}
			};
			$ids2 = $ids2.substring(0,$ids2.length - 1);
		}
		var data = {
			"riskStatus":$loginStatus,
			"userIds[]":$ids2
		};
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/appUserControl/appUserMan/allRisks",
			data: data,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					if(mark == '5'){
						if(btnPos == 'only'){
							_this.html("解除风险");
							_this.addClass("layui-btn-relieve");
							_this.removeClass('layui-btn-rouse');
						}else{
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:last").html("解除风险");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:last").removeClass("layui-btn-rouse");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:last").addClass("layui-btn-relieve");
						}
					}else if(mark == '6'){
						if(btnPos == 'only'){
							_this.html("唤醒风险");
							_this.removeClass("layui-btn-relieve");
							_this.addClass('layui-btn-rouse');
						}else{
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:last").html("唤醒风险");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:last").removeClass("layui-btn-relieve");
							$(".layui-form-checkbox").filter(".layui-form-checked").parents("tr").children(".statusMes").find("a:last").addClass("layui-btn-rouse");
						}
					}
					reloadPage($("#paging").attr("data-page-no"));
				}else{
					layer.msg(json.message, {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			},
			error: function() {
				layer.msg('本次操作失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		});
	}
};

//用户列表页搜索按钮
$('#searchBtn').on('click',function (){
	reloadPage('1');
});

//get 同步刷新页面
var reloadPage = function(pageNo){
	var data = {
		name:$("#userPetName").val() || '',
		birthStart:$('#LAY_demorange_s_s').val() || '',
		birthEnd:$('#LAY_demorange_e_e').val() || '',
		registTimeStart:$('#LAY_demorange_s').val() || '',
		registTimeEnd:$('#LAY_demorange_e').val() || '',
		lastLoginIp:$('#userPetIp').val()||'',
		remark: $('#userPetRemark').val()||'',//备注
		remarkStatus:$('.selRemarkStatus').find('.layui-form-checkbox').hasClass('layui-form-checked')?'1':'',
		pageNo:pageNo,
		pageSize:$("#paging").attr("data-page-size")
	};
	var $loginStas = $('.loginStas').attr('data-stats');//用户登录状态
	var $status= $('.selStas').attr('data-stats');//账号状态的选择
	var $sexs = $('.selSexs').attr('data-sexs');//性别的选择
	var $integral = $('.selIntegral').attr('data-integral');//积分状态的选择
	var $risks = $('.selRiskStatus').attr('data-risk');//账号风险状态的选择
	if($loginStas == '1' || $loginStas == '0'){
		data.userType = $loginStas;
	}else{
		data.userType = '';
	}
	if($status == '-1' || $status == '0'){
		data.loginStatus = $status;
	}else{
		data.loginStatus = '';
	}
	if($sexs == '1' || $sexs == '2'){
		data.sex = $sexs;
	}else{
		data.sex = '';
	}
	if($integral == '1' || $integral == '0'){
		data.scoreStatus = $integral;
	}else{
		data.scoreStatus = '';
	}
	if($risks == '0' || $risks == '1' || $risks == '2'){
		data.riskStatus = $risks;
	}else{
		data.riskStatus = '';
	}
	var scoreFloor = $('#balanceAreaEnd').val()||'';//积分余额查询的起始值
	var scorePlatfond = $('#balanceAreaStar').val()||'';//积分余额查询的截止值
	var reg = /^[1-9]\d*$/;
	if(scorePlatfond && scoreFloor){
		if(reg.test(scorePlatfond) && reg.test(scoreFloor) && Number(scorePlatfond) > Number(scoreFloor)){
			var $scorePlatfond = scorePlatfond;
			var $scoreFloor = scoreFloor;
		}else{
			layer.msg('积分余额搜索条件不合法！');
			return false;
		}
	}else{
		if((scorePlatfond && !scoreFloor) || (!scorePlatfond && scoreFloor)){
			layer.msg('积分余额搜索条件不合法！');
			return false;
		}else{
			var $scorePlatfond = '';
			var $scoreFloor = '';
		}
	}
	
	window.location.search = "?name=" + escape(data.name) + "&birthStart=" + escape(data.birthStart) + "&birthEnd=" + escape(data.birthEnd) + 
			"&loginStatus=" + escape(data.loginStatus) + "&sex=" + escape(data.sex) + "&lastLoginIp=" + escape(data.lastLoginIp) + "&pageNo=" + 
			escape(data.pageNo) + "&scoreStatus=" + escape(data.scoreStatus) + "&remark=" + escape(data.remark) + "&remarkStatus=" + 
			escape(data.remarkStatus) + "&riskStatus=" + escape(data.riskStatus) + "&pageSize=" + escape(data.pageSize) + "&userType=" + 
			escape(data.userType) + "&registTimeStart=" + escape(data.registTimeStart) + "&registTimeEnd=" + escape(data.registTimeEnd) +
			"&scorePlatfond=" + escape($scorePlatfond) + "&scoreFloor=" + escape($scoreFloor);
	
};
