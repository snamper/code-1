"use strict"
layui.use(['element', 'paging', 'laydate'],function(){
	var $ = layui.jquery;
	var laydate = layui.laydate;
	
	//初始化日期组件
	var dateIint = new dateComponent();
	
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数  总条数%单页显示的条数 向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=10&pageNo="+obj.curr);
			};
		}
	});
	
});
//查询
function search(pN) {
	var $starTimes = $('#LAY_demorange_s').val() || '';//开始时间
	var $endTimes = $('#LAY_demorange_e').val() || '';//截止时间
	var $shortName = $('.merchantName').val() || '';//商户名称
	var $fullName = $('.goodsName').val() || '';//商品名称
	var $userId = $('.userIdInt').val() || '';//用户ID
	var pageNo = pN;
	var pageSize = $('#paging').attr('data-page-size');
	window.location.search = "?productName=" + escape($fullName) + "&merchantFullName=" + escape($shortName) + "&userPhone=" + escape($userId) + 
	"&refundTimeStart=" + escape($starTimes) + "&refundTimeEnd=" + escape($endTimes) +"&pageNo=" + escape(pageNo) + "&pageSize=" + escape(pageSize);
}
$('.queryGoods').on('click', function() {
	search(1);
})
