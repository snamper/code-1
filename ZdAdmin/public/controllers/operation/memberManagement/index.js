//删除
$(".deleteMember").on("click", function(){
	var _this = this;
	layer.confirm('您确定要删除吗？', {
		btn: ['确认', '取消'] //按钮
	}, function() {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/admin/vip/rank/info/delete.do",
			data:{
				"id":$(_this).attr("data-id"),
			},
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					layer.msg('删除成功！', {
						time: 1500, //1s后自动关闭
						icon: 1
					},function(){
						window.location.href = "/operation/memberManagement"
					});
					
					
				}
			},error: function(){
				layer.msg('删除失败！', {
					time: 1500, //1s后自动关闭
					icon: 1
				});
			}
		})
	})
})