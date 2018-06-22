"use strict";
layui.use(['element', 'paging', 'laydate', 'form'], function(){
	$ = layui.jquery;
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
	var buyerType = 2
	form.on('select(type)', function(data){
		buyerType = data.value;
		if (buyerType == 2) {
			$(".shopBuyer1").show();
			$(".shopBuyer2").hide();
		} else {
			$(".shopBuyer2").show();
			$(".shopBuyer1").hide();
		}
	})
	function dateHandle(date) {
		var dateNew = date.split(" ");
		var dataDate = dateNew[0];
		var hour = dateNew[1].split(":")[0]
		var newDate = dataDate + " " + hour + ":00:00";
		return newDate;
	}
	//生成按钮
	var _this;
	$(".generate").on("click", function(){
		var dateStartEnd =dateHandle( getNowFormatDate() );
		var dateEnd ='2117-12-31 23:59:59';
		$("#LAY_demorange_ss").blur(function() {
			dateStartEnd = dateHandle( $(this).val() )
		})
		$("#LAY_demorange_ee").blur(function() {
			dateEnd = $(this).val()
		})
		var start = {
			min: dateStartEnd,
			max: dateEnd,
			istime: true,
			istoday: false, 
			format: 'YYYY-MM-DD hh:mm:ss',
			choose: function(datas) {
				end.min = dateHandle(datas); //开始日选好后，重置结束日的最小日期
				end.start = datas //将结束日的初始值设定为开始日
			}
		};
		var end = {
			min: dateStartEnd,
			max: '2117-12-31 23:59:59',
			istime: true,
			istoday: false, 
			format: 'YYYY-MM-DD hh:mm:ss',
			choose: function(datas) {
				start.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		document.getElementById('LAY_demorange_ss').onclick = function() {
			start.elem = this;
			laydate(start);
		}
		document.getElementById('LAY_demorange_ee').onclick = function() {
			end.elem = this
			laydate(end);
		}
		
		$(".coverScreen").removeClass("hide");
		$(".generateBox").removeClass("hide");
		_this = $(this)
		$(".generatePoint").html(_this.attr('data-score'))
	})
	//生成取消
	$(".cancel").on("click", function(){
		window.location.href = "/merchant/pointCard/pointCardMan"
	})
	$(".generateBtn").on("click", function(){
		var reg = /^[1-9][0-9]{0,}$/
		if ( !reg.test($("#number").val()) ) {
			layer.msg("生成数量必填且只能大于0的整数!", {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			return false;
		};
		var shopNameNew = ( buyerType == 2 ? $("#shopName2").val() : $("#shopName1").val() )
		var reg1 = /^[A-Za-z0-9\u4e00-\u9fa5]{1,}$/;
		if ( !reg1.test(shopNameNew) ) {
			layer.msg("商家名称必填且只能输入中英数!", {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			return false;
		}
		if( !$("#LAY_demorange_ss").val() || !$("#LAY_demorange_ee").val() ) {
			layer.msg("请选择有效期范围!", {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			return false;
		}
		var timestampStart = Date.parse($("#LAY_demorange_ss").val());
		var timestampEnd = Date.parse($("#LAY_demorange_ee").val());
		if ( timestampEnd <= timestampStart ) {
			layer.msg("有效期结束时间必须大于开始时间!", {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			return false;
		}
		var data = {
			scorecardBaseId:Number( _this.attr("data-id") ),
			genCount:Number( $("#number").val() ),
			buyerName: shopNameNew,
			useTimeStart:$("#LAY_demorange_ss").val(),
			useTimeEnd:$("#LAY_demorange_ee").val(),
			buyerType: buyerType
		}
		layer.confirm('确定生成'+data.genCount+'份积分卡？', {
			btn: ['生成', '取消'] //按钮
		}, function() {
					$(".generateBox").addClass("hide");
					layer.msg('生成中,请稍等');
					$.ajax({
						type: "post",
						dataType: "json",
						url: "/admin/scorecard/record/generate.do",
						data:data,
						beforeSend:function(){
							layer.msg('生成中,请稍等');
						},
						success: function(json) {
							if(json.message == "成功") {
								layer.msg('生成成功！', {
									time: 1000, //1s后自动关闭
									icon: 1
								},function(){
									window.location.href = "/merchant/pointCard/pointCardMan"
								});
							}else {
								layer.msg(json.message, {
									time: 1500, //1s后自动关闭
									icon: 2
								});
							}
						},error: function(){
							layer.msg('生成失败！', {
								time: 1500, //1s后自动关闭
								icon: 2
							});
						}
					})
				})
	})
});
//删除
$(".delete").on("click", function(){
	var id = $(this).attr("data-id")
	layer.confirm('删除后及时生效，是否删除？', {
		btn: ['确认', '取消'] //按钮
		}, function() {
				$.ajax({
					type: "post",
					dataType:"json",
					url: "/admin/scorecard/base/delete.do",
					data:{
						id:id
					},
					beforeSend:beforeSend(),
					success: function(json) {
						if(json.message == "成功") {
							layer.msg('删除成功！', {
								time: 1000, //1s后自动关闭
								icon: 1
							},function(){
								window.location.href = "/merchant/pointCard/pointCardMan"
							});
						}else {
							layer.msg(json.message, {
								time: 1500, //1s后自动关闭
								icon: 2
							});
						}
					},error: function(){
						layer.msg('删除失败！', {
							time: 1500, //1s后自动关闭
							icon: 2
						});
					}
				})
			})
})

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
	 window.location.search = "?scorecardName=" + escape(data.name) + "&scorecardPoint=" + escape(data.limit) + "&stDate=" + escape(data.startTime) + "&enDate=" + 
	 escape(data.endTime) + "&pNo=" + escape(data.pageNo) + "&pSize=" + escape(data.pageSize);
};
//当前时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + getMinutes
	            + seperator2 + getSeconds;
	    return currentdate;
	};

