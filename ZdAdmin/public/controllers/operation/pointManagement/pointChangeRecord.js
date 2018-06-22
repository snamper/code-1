"use strict";
layui.use(['element', 'paging', 'form'], function(){
	var $ = layui.jquery;
	var form = layui.form();
	
	//切换商品广告属性查询(购买商品&广告商品)
	form.on('select(productAdAttr)', function(data){
		if(data.value == '1'){//内容
			window.location.href = "/operation/pointMan/changeRecordCONT?productAdAttr=1&pageNo=1&pageSize=10";
		}else if(data.value == '2'){//注册
			window.location.href = "/operation/pointMan/changeRecordREGIST?productAdAttr=2&pageNo=1&pageSize=10";
		}else if(data.value == '3'){//邀请
			window.location.href = "/operation/pointMan/changeRecordNVITE?productAdAttr=3&pageNo=1&pageSize=10";
		}else{//cpm
			window.location.href = "/operation/pointMan/changeRecordCPM?productAdAttr=0&pageNo=1&pageSize=10";
		}
		$('.productAdAttr').attr('data-productAdAttr', data.value);
	});
	
	//查询
	var search = function(pn) {
		var pageNo = pn;
		var pageSize = $("#paging").attr("data-page-size");
		var productAdAttr = $('.productAdAttr').attr('data-productAdAttr')||'';
		if(productAdAttr == '1'){//内容
			window.location.href = "/operation/pointMan/changeRecordCONT?productAdAttr="+escape(productAdAttr)+"&pageNo="+escape(pageNo)+"&pageSize=10";
		}else if(productAdAttr == '2'){//注册
			window.location.href = "/operation/pointMan/changeRecordREGIST?productAdAttr="+escape(productAdAttr)+"&pageNo="+escape(pageNo)+"&pageSize=10";
		}else if(productAdAttr == '3'){//邀请
			window.location.href = "/operation/pointMan/changeRecordNVITE?productAdAttr="+escape(productAdAttr)+"&pageNo="+escape(pageNo)+"&pageSize=10";
		}else{//cpm
			window.location.href = "/operation/pointMan/changeRecordCPM?productAdAttr="+escape(productAdAttr)+"&pageNo="+escape(pageNo)+"&pageSize=10";
		}
	};
		
	//分页模块
	var paging = layui.laypage({
		pages: $("#paging").attr("data-page"), //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: $("#paging").attr("data-page-no"), //当前页
		groups: $("#paging").attr("data-page-size"), //连续分页数
		jump: function(obj, first) {
			if(!first) {
				jumpPage("pageSize=10&pageNo="+obj.curr+"&productAdAttr="+$('.productAdAttr').attr('data-productAdAttr')||'');
			};
		}
	});
});