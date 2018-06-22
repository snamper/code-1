"use strict";
//任务管理-抽奖任务设置/编辑
layui.use(['element', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	
	//选择奖品类型
	form.on('select(taskTypes)',function (data){
		$(data.elem).parents('tr').find('.selTaskTypes').attr('data-task',data.value);
		if(data.value == '1'){//奖励积分
			$(data.elem).parents('tr').find('.selGoodsInt').removeClass('taskPointBorder');//选择的如果不是商品，那么就去掉提示框
			$(data.elem).parents('tr').find('.selGoodsBox').find('.disUseBox').removeClass('hide');
			$(data.elem).parents('tr').find('.setPointsBox').find('.disUseBox').addClass('hide');
		}else if(data.value == '2'){//商品
			$(data.elem).parents('tr').find('.selGoodsBox').find('.disUseBox').addClass('hide');
			$(data.elem).parents('tr').find('.setPointsBox').find('.disUseBox').removeClass('hide');
		}else{//谢谢参与&默认值
			$(data.elem).parents('tr').find('.selGoodsInt').removeClass('taskPointBorder');//选择的如果不是商品，那么就去掉提示框
			$(data.elem).parents('tr').find('.selGoodsBox').find('.disUseBox').removeClass('hide');
			$(data.elem).parents('tr').find('.setPointsBox').find('.disUseBox').removeClass('hide');
		}
	});
	
	//奖品位置示例按钮弹窗
	$('.posExampleBtn').on('click', function (){
		layer.open({
		    type: 1,
		    title: '奖品位置示例',
		    skin: 'layui-layer-molv', //加上边框
		    area: ['350px', '350px'], //宽高
		    content: '<div id="loteryBox">' +
            		'<ul class="awardPos">' +
            			'<li>1</li>' +
            			'<li class="awardShowPosMarngin">2</li>' +
            			'<li>3</li>' +
            			'<li>8</li>' +
            			'<li class="awardShowPosMarngin awardShowPosCenter"></li>' +
            			'<li>4</li>' +
            			'<li>7</li>' +
            			'<li class="awardShowPosMarngin">6</li>' +
            			'<li>5</li>' +
            		'</ul>' +
            	'</div>'
		});
	});
});

//调整奖品积分（+-）  
$('.cutPointsBtn').on('click',function (){//-
	var $this = $(this);
	var $intVal = Number($this.parents('.adPoints').find('.pointsNumInpt').val());
	if($intVal == 1){
		layer.msg('限制1-1000的整数！');
		return false;
	}else{
		$this.parents('.adPoints').find('.pointsNumInpt').val($intVal-1);
	}
});
$('.addPointsBtn').on('click',function (){//+
	var $this = $(this);
	var $intVal = Number($this.parents('.adPoints').find('.pointsNumInpt').val());
	if($intVal == 1000){
		layer.msg('限制1-1000的整数！');
		return false;
	}else{
		$this.parents('.adPoints').find('.pointsNumInpt').val($intVal+1);
	}
});

//设置奖项为商品时添加商品图标
$('.addLotteryIcon').change(function (){
	var $this = $(this);
	var fs = new FormData();
	if($this.attr("data-url")){
		fs.append("oldPath",$this.attr("data-url"));
	}
	if($this[0].files[0]){
		var layLoad = layer.load(1);//加载等待
		fs.append("imageFile",$this[0].files[0]);
		$.ajax({
			url:'/admin/file/image/upload.do', //上传接口	
			type:"post",
			dataType:"json",
			data:fs,
			processData: false,  // 告诉jQuery不要去处理发送的数据
			contentType: false,
			cache: false,              
			success:function(json){				 
				layer.close(layLoad);//清除加载
				if(json.message == "成功"){
					layer.msg("上传成功");
					$this.parents('.getImgBox').find(".uploadLotteryIcon").attr("src",json.data.httpPath);
					$this.parents('.getImgBox').find(".uploadLotteryIcon").attr("data-url",json.data.httpsPath);
					$this.parents('.getImgBox').find(".uploadLotteryIcon").addClass('imgSize');
					$this.parents('.fileBtnBox').removeClass('taskContBorder');
				}else{
					layer.msg(json.message+"，请重新上传！");
				}
			}
		});		 	
	}
});

//保存设置按钮跳转
var selectFlag = true;//奖项选择框
var goodsFlag = true;//商品选择
var pointFlag = true;//积分
var lottoFlag = true;//抽奖概率
var prizeFlag = true;//奖品图标
var lottosNumMes;//中奖概率提示信息
var $taskTbody = $('#taskTbody');
var $selTaskTypes = $('.selTaskTypes');//下拉选择框
var $selGoodsInt = $('.selGoodsInt');//商品的选择
var $pointsNumInpt = $('.pointsNumInpt');
var $lottosNumInpt = $('.lottosNumInpt');
var $fileBtnBox = $('.fileBtnBox');//上传图标的input的父级
var $uploadLotteryIcon = $('.uploadLotteryIcon');//上传图标的img标签
var pointAwardReg = /^(?!00)(?:[0-9]{1,3}|1000)$/;//积分验证条件(1-1000)
var lottoReg = /^[0-9]+(.[0-9]{1,2})?$/;//抽奖概率验证条件（0.01-100）保留2位小数
$('.saveTaskSetBtn').on('click',function (){
	getPassFn();//调用验证条件方法
	if(selectFlag && goodsFlag && pointFlag && lottoFlag && prizeFlag){
		var $selTaskTypes = $('.selTaskTypes');//奖品类型选择框
		var data = {};//数据对象
		var dataArr = [];//数据数据	
		for(var i=0;i<$selTaskTypes.length;i++){
			var dataLis = {};
			dataLis.drawLocation = i + 1;//奖品位置
			if($selTaskTypes.eq(i).attr('data-task') == '1'){//选择积分
				dataLis.type = '1';
				dataLis.lackyDraw = $selTaskTypes.eq(i).parents('tr').find('.pointsNumInpt').val();//积分值
				dataLis.productId = '';//商品id
			}else if($selTaskTypes.eq(i).attr('data-task') == '2'){//选择商品
				dataLis.type = '2';
				dataLis.lackyDraw = $selTaskTypes.eq(i).parents('tr').find('.selGoodsInt').val();//商品名字
				dataLis.productId = $selTaskTypes.eq(i).parents('tr').find('.selGoodsBtn').attr('data-id');//商品id
			}else{//选择谢谢参与
				dataLis.type = '3';
				dataLis.lackyDraw = '';//奖品
				dataLis.productId = '';//商品id
			}
			dataLis.probability = parseFloat($selTaskTypes.eq(i).parents('tr').find('.lottosNumInpt').val()*100/10000).toFixed(4);//中奖率
			dataLis.drawImage = $selTaskTypes.eq(i).parents('tr').find('.uploadLotteryIcon').attr('data-url');//奖品图标
			dataArr.push(dataLis);
		}
		data.tTaskLuckyDrawsList = dataArr;
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/task/lucky/draw/create.do",
			data:JSON.stringify(data),
			contentType : "application/json",
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('保存成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/taskManagement/lotteryTaskList";
					});
				}else{
					layer.msg(json.message, {
						time: 1000, //1s后自动关闭
						icon: 2
					});
					return false;
				}
			},
			error: function(error) {
				layer.msg('保存失败！', {
					time: 1000, //1s后自动关闭
					icon: 2
				});
				return false;
			}
		});//ajax请求
	}else{//保存条件不成立
		if(!lottoFlag){
			layer.msg(lottosNumMes?lottosNumMes:'填写信息有误！');
			return false;
		}else if(!pointFlag){
			layer.msg('填写信息有误！');
			return false;
		}else if(!prizeFlag){
			layer.msg('请上传图标！');
			return false;
		}
	}
});
//保存设置时的验证条件
function getPassFn (){
	for(var i=0;i < $selTaskTypes.length;i++){
		if($selTaskTypes.eq(i).attr('data-task') == '0'){
			selectFlag = false;
			$selTaskTypes.eq(i).parents('.selAwardsBox').addClass('taskPointBorder');
		}else{
			$selTaskTypes.eq(i).parents('.selAwardsBox').removeClass('taskPointBorder');
		}
	}
	if(!$('.selAwardsBox').hasClass('taskPointBorder')){
		selectFlag = true;
	}
	for(var i=0;i<$selTaskTypes.length;i++){//验证所有的商品选择框是否选择
		if($selTaskTypes.eq(i).attr('data-task') == '2'){
			if(!$selGoodsInt.eq(i).val() || !$selGoodsInt.eq(i).attr('data-id')){
				goodsFlag = false;
				$selGoodsInt.eq(i).addClass('taskPointBorder');
			}else{
				$selGoodsInt.eq(i).removeClass('taskPointBorder');
			}
		}
	}
	if(!$taskTbody.find('.selGoodsInt').hasClass('taskPointBorder')){
		goodsFlag = true;
	}
	var pointAwardLen = $pointsNumInpt.length;//积分输入框的length
	for(var i=0;i<pointAwardLen;i++){//验证所有的积分输入框是否填写
		if(!pointAwardReg.test($pointsNumInpt.eq(i).val()) && !Number($pointsNumInpt.eq(i).val()) > 0){
			pointFlag = false;
			$pointsNumInpt.eq(i).addClass('taskPointBorder');
		}else{
			$pointsNumInpt.eq(i).removeClass('taskPointBorder');
		}
	}
	if(!$taskTbody.find('.pointsNumInpt').hasClass('taskPointBorder')){
		pointFlag = true;
	}
	var lottosNumInptLen = $lottosNumInpt.length;//抽奖概率的length
	var allLottosNum = 0;//中奖概率初始值
	for(var i=0;i<lottosNumInptLen;i++){//验证所有的概率输入框是否填写
		if(!lottoReg.test($lottosNumInpt.eq(i).val()) && Number($lottosNumInpt.eq(i).val()) > 0 && Number($lottosNumInpt.eq(i).val()) < 100){
			lottoFlag = false;
			$lottosNumInpt.eq(i).addClass('taskContBorder');
		}else{
			allLottosNum += Number($lottosNumInpt.eq(i).val());//概率之和
			$lottosNumInpt.eq(i).removeClass('taskContBorder');
		}
	}
	if(parseFloat(allLottosNum).toFixed(4) != 100){
		lottoFlag = false;
		$lottosNumInpt.addClass('taskContBorder');
		lottosNumMes = '所有概率之和必须等于100%！';
	}
	if(!$taskTbody.find('.lottosNumInpt').hasClass('taskContBorder')){
		lottoFlag = true;
	}
	var prizeImgLen = $uploadLotteryIcon.length;
	for(var i=0;i<prizeImgLen;i++){//验证所有的奖品图标是否上传
		if(!$uploadLotteryIcon.eq(i).attr("data-url")){
			prizeFlag = false;
			$fileBtnBox.eq(i).addClass('taskContBorder');
		}else{
			$fileBtnBox.eq(i).removeClass('taskContBorder');
		}
	}
	if(!$taskTbody.find('.fileBtnBox').hasClass('taskContBorder')){
		prizeFlag = true;
	}
}
