layui.use('paging', function() {
	var pageNo = $("#paging").attr('data-page-no') ? $("#paging").attr('data-page-no') : "1";
	var pageSize = $("#paging").attr('data-page-size') ? $("#paging").attr('data-page-size') : "10";
	var pages = Math.ceil($("#paging").attr('data-page') / pageSize);
	var paging = layui.laypage({
		pages: pages, //分页数   总条数%单页显示条数  向上取整
		cont: "paging", //组件容器
		curr: pageNo, //当前页
		groups: pageSize, //连续分页数
		jump: function(obj, first) {
			//得到了当前页，用于向服务端请求对应数据
			//var curr = obj.curr;
			if(!first) {
				window.location.href = "/system/permissionManage?pageNo=" + obj.curr + "&pageSize=" + pageSize;
			}
		}
	});
});
var currentPermissonTree = "";
layui.use('tree', function() {
 
	var tree = "",
		roleId = '',
		promptBox = "";
	//树形结构配置以及弹窗配置
	var initPromissionTree = function (treeConfig){
		tree = layui.tree({
				elem: '#permissionTreeContent', //指定元素，生成的树放到哪个元素上
				check: 'checkbox', //勾选风格
				//				skin: 'as', //设定皮肤
				drag: true, //点击每一项时是否生成提示信息
				checkboxName: 'aa[]', //复选框的name属性值
				checkboxStyle: "", //设置复选框的样式，必须为字符串，css样式怎么写就怎么写
				click: function(item) { //点击节点回调
					item.checked = !item.checked;
					currentPermissonTree = treeConfig;
				},
				data: { //为元素添加额外数据，即在元素上添加data-xxx="yyy"，可选
					hasChild: true,
					"123":123
				},
				nodes: treeConfig
			});
			promptBox = layer.open({
				type: 1,
				skin: 'layui-layer-molv', //样式类名
				closeBtn: 1, //不显示关闭按钮
				anim: 1,
				shade: 0,
				area: ['60%', '70%'], //宽高
				title: ['权限管理', 'text-align: center; font-size: 16px;'],
				content: $('#goodsInfoBox')
			});
}
	
	//打开弹窗并且获取权限配置
	$('.openModal').on('click', function() {
		var _this = this;
		roleId = $(_this).attr("data-id")
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/system/permissionManage",
			data:{
				"type":2,
				roleId:$(_this).attr("data-id")
			},
			beforeSend:beforeSend(),
			success: function(result) {
				currentPermissonTree = result.data;
				$("#permissionTreeContent").empty()
				initPromissionTree(result.data)
			},
			error: function() {
				layer.msg('获取数据失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			},
		});
		
	});
	
	//保存配置
	$(".savePermissionMessage").on("click",function(){
		var permissionList = [];
		var curPermission = {};
		for(var i = 0; i < $("#permissionTreeContent input[type='checkbox']").length; i++){
			if($("#permissionTreeContent input[type='checkbox']")[i].hasAttribute("checked")){
				if($($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-type") == 6){
					curPermission = {
						"type":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-type"),
						"menuId":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-code")
					}
				}else{
					curPermission = {
						"type":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("data-type"),
						"menuId":$($("#permissionTreeContent input[type='checkbox']")[i]).attr("id")
					}
				}
				permissionList.push(curPermission)
			}
			
		}
		permissionList = JSON.stringify(permissionList);
		var data = {
			"roleId":roleId,
			"resourceJson":permissionList
		}
		
		$.ajax({
			type: "post",
			dataType: "json",
			url: "/system/permissionManage/setPermission",
			data:data,
			beforeSend:beforeSend(),
			success: function(result) {
				layer.msg('设置成功！', {
					time: 1000, //1s后自动关闭
					icon: 1
				},function(){
					layer.close(promptBox)
				});
			},
			error: function() {
				layer.msg('设置失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			},
		});

	 });
	
	
	
	
	
})

