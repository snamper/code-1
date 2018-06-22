//config for navbar
layui.config({
	base: '/js/'
}).use(['element', 'layer', 'navbar','form','layedit', 'laydate'], function() {
	//判断是否登录
	var loginStatus = getCookie("userMessage");

	var element = layui.element();
	$ = layui.jquery,
    layer = layui.layer,
    navbar = layui.navbar(),
    form = layui.form(),
	layedit = layui.layedit,
	laydate = layui.laydate;
	var $menu = $('#menu');

	
	
	

	//修改密码弹窗
	$(".editPassword").on("click",function(){
		layer.open({
			type: 1,
			skin: 'layui-layer-molv', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 1,
			shade: 0,
			area: ['60%', '200px'], //宽高
			title: ['密码修改', 'text-align: center; font-size: 16px;'],
			content: $('#editPasswordBox')
		});
	})
	//修改密码
	form.on('submit(submitEdit)', function(data) {
		layer.confirm('您确定要修改吗？', {
			btn: ['确认', '取消'] //按钮
		}, function() {
			if($(".newPassword").val() != $(".againPassword").val()){
				layer.msg('两次密码不一致！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
			var getCookies = getCookie("userMessage");
			if(getCookies){
				getCookies = JSON.parse(getCookies)
			}
			console.log(data)
			$.ajax({
				type: "post",
				dataType: "json",
				url: "/editPassword",
				data: {
					"userId":getCookies.userId,
					"userPwd":$(".newPassword").val()
				},
				beforeSend:beforeSend(),
				success: function(json) {
					if(json.message == "成功") {
						console.log(json)
						layer.msg('修改成功,请重新登陆！', {
							time: 1500, //1s后自动关闭
							icon: 1
						}, function(){
						  layer.close();
						  localStorage.clear();
						  delCookie("userMessage");
						  window.open("/login","_self")
						});	
						
					}
				},
				error: function() {
					layer.msg('修改失败！', {
						time: 1500, //1s后自动关闭
						icon: 2
					});
				}
			})
		})
	})
	//退出登录
	$(".goToLogin").on("click",function(){
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/login/out",
			beforeSend:beforeSend(),
			success: function(json) {
				console.log(json)
				if(json.message == "成功") {
					layer.msg('退出成功！', {
						time: 1000, //1s后自动关闭
						icon: 1
					},function(){
						delCookie("userMessage");
						delCookie("resource");
						delCookie("JSESSIONID");
						window.location.href = "/login"
					});
					
				}
			},
			error: function() {
				layer.msg('退出失败！', {
					time: 1500, //1s后自动关闭
					icon: 1
				});
			}
		})
		
	})
    //侧边栏toggle
	$('.beg-layout-side-toggle').on('click', function() {
		var sideWidth = $('.beg-layout-side').width();
		if(sideWidth === 200) {
			$('.beg-layout-body').animate({
				left: '0'
			});
			$('.beg-layout-footer').animate({
				left: '0'
			});
			$('.beg-layout-side').animate({
				width: '0'
			});
		} else {
			$('.beg-layout-body').animate({
				left: '200px'
			});
			$('.beg-layout-footer').animate({
				left: '200px'
			});
			$('.beg-layout-side').animate({
				width: '200px'
			});
		}
	});	
	
});
