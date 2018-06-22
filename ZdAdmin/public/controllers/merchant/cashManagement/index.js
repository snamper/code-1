"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	var form = layui.form();
	
	//选择兑换状态
	form.on('select(exchangeStatus)', function(data){
//		console.log(data.value)
		$(".exchangeStatus").attr("data-exchangeStatus",data.value)
	})
	
	//初始化日期组件
	var dateIint = new dateComponent();
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=10&pageNo="+obj.curr+"&exchangeStatus="+$(".exchangeStatus").attr("data-exchangeStatus"));
			};
		}
	});	
	
});
//查询
function search(pN) {
	var $status = $(".exchangeStatus").attr("data-exchangeStatus");
	var $starTimes = $('#LAY_demorange_s').val()||'';//购买开始时间
	var $endTimes = $('#LAY_demorange_e').val()||'';//购买截止时间
	var $starTime1 = $('#LAY_demorange_ss').val()||'';//兑换开始时间
	var $endTime1 = $('#LAY_demorange_ee').val()||'';//兑换截止时间
	var $shortName = $(".merchantName").val()||'';//商户名称
	var $fullName = $(".goodsName").val()||'';//商品名称
	var $userPhone = $(".userIdInt").val()||'';//用户手机号
	var pageNo = pN;
	var pageSize = $("#paging").attr("data-page-size");
	window.location.search = "?exchangeStatus=" + escape($status) + "&productName=" + escape($fullName) + "&merchantName=" + escape($shortName) +
		"&userPhone=" + escape($userPhone) + "&buyStartTime=" + escape($starTimes) + "&buyEndTime=" + escape($endTimes) + "&exchangeSatrtTime=" + 
		escape($starTime1) + "&exchangeEndTime=" + escape($endTime1) + "&pageNo=" + escape(pageNo) + "&pageSize=" + escape(pageSize);
}
$('.queryGoods').on('click', function (){//查询按钮
	search(1);
});	

//商品兑换异常回退积分
$(".intBackBtn").on("click", function() {
	var $goodsId = $(this).attr("data-id");
	layer.confirm('确认此次操作？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		layer.closeAll('dialog');
		$.ajax({
			type: "get",
			dataType: "json",
			url: "/merchant/cashMan/integralBack?cardId=" + $goodsId,
			beforeSend:beforeSend(),
			success:function(json){	
				if(json.message == "成功"){								 
					layer.msg("操作成功！");	
					location.reload(true);
				}else{
					layer.msg(json.message);
					return false;
				}
			},
		    error:function(error){
				layer.msg("操作失败！");
				return false;
			}//成功
		})//ajax
	});
});