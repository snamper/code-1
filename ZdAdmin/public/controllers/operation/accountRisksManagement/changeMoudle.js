"use strict";
layui.use(['element', 'form'], function() {
	var noRiskLow=0, noRiskHigh= $(".noRiskHigh").val() ? $(".noRiskHigh").val() : 0, noRiskDate = 1, lowRiskHigh= $(".lowRiskHigh").val() ? $(".lowRiskHigh").val() : 0, lowRiskDate, highRiskHigh=100, highRiskDate;
		//无风险分段结束
		var noFlag = true, lowFlag = true, noFlagInfo = true, lowFlagInfo = true, highFlagInfo = true;
		$(".noRiskHigh").on("blur", function() {
			noRiskHigh = parseInt( $(this).val() );
			if( !$(this).check().isNum() || $(this).val() <= 0 || $(this).val() >= 100) {
				$(".noRisInfo").html("请输入大于0且小于"+lowRiskHigh+"的数");
				$(".noRiskHigh").val("");
				noFlag = false;
			}else {
				if( lowRiskHigh != 0) {
					if( parseInt(noRiskHigh) >= parseInt(lowRiskHigh) ) {
						$(".noRisInfo").html("请输入小于"+lowRiskHigh+"的数字");
						$(".noRiskHigh").val("");
						noFlag = false;
					}else {
						$(".noRisInfo").empty();
						$(".noRiskHigh").val(noRiskHigh);
						noFlag = true
					}
				}else{
					$(".lowRisInfo").empty();
					$(".noRiskHigh").val(noRiskHigh);
					noFlag = true;
				}		
			}
			
			if( 0<noRiskHigh && lowRiskHigh > noRiskHigh && lowRiskHigh <=100 ) {
				noFlag = true;
				lowFlag = true;
				$(".lowRisInfo").empty();
				$(".noRisInfo").empty();
			}
			
		});
		//低风险分段结束
		$(".lowRiskHigh").on("blur", function() {
			lowRiskHigh =parseInt( $(this).val() );
			if( !$(this).check().isNum() || $(this).val() <= 0 || $(this).val() > 100) {
				$(".lowRiskHigh").val("");
				$(".lowRisInfo").html("请输入大于"+noRiskHigh+"且不大于100的数");
				lowFlag = false;
			}else {
				if( noRiskHigh != 0) {	
					if(parseInt( lowRiskHigh )<= parseInt( noRiskHigh ) ) {
						$(".lowRiskHigh").val("");
						$(".lowRisInfo").html("请输入大于"+noRiskHigh+"的数字");
						lowFlag = false;
					}else{
						$(".lowRisInfo").empty();
						$(".lowRiskHigh").val(lowRiskHigh);
						lowFlag = true;
					}
				}else {
					$(".lowRisInfo").empty();
					$(".lowRiskHigh").val(lowRiskHigh);
					lowFlag = true;
				}
			}
			
			if( 0<noRiskHigh && lowRiskHigh > noRiskHigh && lowRiskHigh <=100 ) {
				noFlag = true;
				lowFlag = true;
				$(".lowRisInfo").empty();
				$(".noRisInfo").empty();
			}
		})

		$(".highRiskDate").on("blur", function() {
			highRiskDate =  $(this).val();
			if( !$(this).check().isNum() || $(this).val() <= 0 ) {
				$(".highRisInfo").html("监测周期不小于0");
				highFlagInfo = false;
			}else {
				$(".highRisInfo").empty();
				highFlagInfo = true;
			}
		})
		$(".noRiskDate").on("blur", function() {
			noRiskDate =  $(this).val();
			if( !$(this).check().isNum() || $(this).val() <= 0 ) {
				$(".noRisInfo").html("监测周期不小于0");
				noFlagInfo = false;
			}else {
				$(".noRisInfo").empty();
				noFlagInfo = true;
			}
		})
		$(".lowRiskDate").on("blur", function() {
			lowRiskDate =  $(this).val();
			if( !$(this).check().isNum() || $(this).val() <= 0 ) {
				$(".lowRisInfo").html("监测周期不小于0");
				lowFlagInfo = false;
			}else {
				$(".lowRisInfo").empty();
				lowFlagInfo = true;
			}
		})
		
		//点击天数加一
		$(".addBtn").on("click", function() {
			var num = $(this).prev().val();
			num++
			$(this).prev().val(num)
		})
		//点击天数减一
		$(".reduceBtn").on("click", function() {
			var num = $(this).next().val();
			if(num >1) {
				num--;	
			}
			$(this).next().val(num)
		})
		
		$(".changeConfigSure").on("click", function() {
			if( noFlag && lowFlag && noFlagInfo && lowFlagInfo && highFlagInfo ){
				noRiskDate =  $(".noRiskDate").val();
				lowRiskDate = $(".lowRiskDate").val();
				highRiskDate = $(".highRiskDate").val();
				noRiskHigh = $(".noRiskHigh").val();
				lowRiskHigh = $(".lowRiskHigh").val();
				console.log(noRiskHigh, lowRiskHigh, noRiskDate, lowRiskDate, highRiskDate)	
				var data = {
					riskFreeDetectCycle: noRiskDate,
					lowRiskDetectCycle: lowRiskDate,
					highRiskDetectCycle: highRiskDate,
					riskFreeRangeEnd: noRiskHigh,
					lowRiskRangeEnd: lowRiskHigh
				}
				layer.confirm('您确定要保存吗？', {
					btn: ['确认', '取消'] //按钮
					},function (){
						$.ajax({
						     url:"/admin/risk/model/config.do",
						     type:"post",
						     data:data,     
						     success:function(json){
						     	if(json.message == "成功"){		
							     	layer.msg('保存成功！', {
										time: 1500, //1s后自动关闭
										icon: 1
									},function(){
										window.location.href="/operation/accountRiskRating/colligate";
									});
							
						        }else {
						        	layer.msg(json.message, {
										time: 1500, //1s后自动关闭
										icon: 2
									});
						        }
						     },
						     error: function(){
								layer.msg('保存失败！', {
									time: 1500, //1s后自动关闭
									icon: 2
								});
							}
					     });
						$(".video-config-live").removeClass("hide")
						$(".video-config-no").addClass("hide")
						$("#noCannel").addClass('hide')
						
					})
				
				
			}else{
				layer.msg('区间值不符合要求！', {
						time: 1500, //1s后自动关闭
						icon: 2
					})
			}
		})
});
		