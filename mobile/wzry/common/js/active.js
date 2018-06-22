$(window).load(function() {
	//轮播
	$('#full_feature').swipeslider();
	$('#content_slider').swipeslider({
		transitionDuration: 1200,
		autoSwipe: true,
		speed: 1000,
		transitionType: "linear",
		sliderHeight: '300px',
		lazyLoad: true,
		continuousScroll: true,
	});
	
	
});
function getQueryString(name){
 	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
     var r = window.location.search.substr(1).match(reg);				 
     if (r != null) {				    
         return decodeURI(r[2]);
     }
     return null;
 };	
var _url = window.location.href;
var spreadEventId = getQueryString("id");
function getEquipment(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid) return 'android'
    else if(isiOS) return 'ios'
}
var goodsList = [];
goodsList.push({
		productId: $(".active_changeName").attr("attr-productId"),
		name: $(".active_changeName").attr("attr-code")
	})
for(var i = 0; i < $(".sw-slide").length; i++){
	goodsList.push({
		productId: $($(".sw-slide")[i]).attr("attr-productId"),
		name: $($(".sw-slide")[i]).attr("attr-code")
	})
}
for(var i = 0; i < $(".bargainGoodsList li").length; i++){
	goodsList.push({
		productId: $($(".bargainGoodsList li")[i]).attr("attr-productId"),
		name: $($(".bargainGoodsList li")[i]).attr("attr-code")
	})
}

var inviteScore = 0;

	var listLength = 0;
	function getList() {
			if(!spreadEventId) {
				var html = '<li style="text-align:center;">暂无兑换榜单</li>';
		 		$(".carousel_list").empty().append(html);
		 		return;
			};
			$.ajax({
			    dataType:"json",
				type:"get",
				url:"/share/spread/event/exchange/list.do?spreadEventId="+spreadEventId,
				success:function(data){
				 	if(data.message != "成功"){
				 		return;
				 	}
				 	var html = '';
					listLength = data.data.eventOrderList.length;
					var memberList = data.data.eventOrderList
					var point = listLength+1+"00%" ;
					$(".carousel_list").width(point);
					var lipoint = (1/(listLength+1))*100 + "%"
					
					
					var str = '';
					for(var i = 0; i < memberList.length; i++){
						if(i == 0) {
							str += '<li>'
					 		if(memberList[i].userImage) str += '<span><img src="'+memberList[i].userImage+'"/></span>';
					 		else str += '<span><img src="../common/images/test1.png"/></span>';
							str +=	'<span>'+memberList[i].userPhone+'</span>';
							for(var n = 0; n < goodsList.length; n++){
								if(memberList[i].productId == goodsList[n].productId){
									str +='<span>兑换了'+goodsList[n].name+'</span>'
								}
							}
						}
				 		html += '<li>'
				 		if(memberList[i].userImage) html += '<span><img src="'+memberList[i].userImage+'"/></span>';
				 		else html += '<span><img src="../common/images/test1.png"/></span>';
						html +=	'<span>'+memberList[i].userPhone+'</span>';
						for(var n = 0; n < goodsList.length; n++){
							if(memberList[i].productId == goodsList[n].productId){
								html +='<span>兑换了'+goodsList[n].name+'</span>'
							}
						}	
				 	}
					var html = html + str
					$(".carousel_list").html(html)	
					$(".active_carousel_info ul li").width(lipoint);
					console.log( $(".active_carousel_info ul li").width() )
				}
			});	
		}
	getList() //榜单轮播
	
	
	var index = 10
	function scroll(){
		index+=1;
		if(index > listLength * 350) {
			index = 0
		}
		$(".active_carousel_info ul").css("margin-left", -index+"px")
	}
	setInterval(scroll,20)
	

var getACtionDetail = function() {
	$.ajax({
	    dataType:"json",
		type:"get",
		url:"/share/spread/event/detail.do?spreadEventId="+spreadEventId,
		success:function(data){
		 	if(data.message != "成功"){
		 		return;
		 	}
		 	if(data.data && data.data.inviteScore) inviteScore = data.data.inviteScore
		}
	});	
}
getACtionDetail()
//免费领取
function pickUp(goodsId,king) {
	if(!goodsId) return;
	$.ajax({
	    dataType:"json",
		type:"get",
		url:"/share/app/product/detail.do?productId="+goodsId,
		success:function(data){
			console.log(data)
		 	if(data.message != "成功"){
		 		return;
		 	}
		 	var code = 0;
		 	if(data.data.exchange_points) code = data.data.exchange_points;
			var message = {
				"activeId":spreadEventId,
				"title":'王者荣耀活动',
				"videoContent":'王者荣耀皮肤免费领',
				"videoIcon": "https://oss.eratpay.com/146b9077671447069bea50ea00345336.png",
				"goodsId":goodsId,
				"code": code,
				"inviteScore":Number(inviteScore),
				"king":king
			}
			console.log(message)
			message = JSON.stringify(message)
			if(getEquipment() == "android") window.androidjs.activeLogin(message)
			else activeLogin(message)
		}
	});	
	
}
//商品详情
function showGoods(goodsId,king){
	if(!goodsId) return;
	var message = {
		"goodsId":goodsId,
		"activeId":spreadEventId,
		"king":king
	}
	console.log(message)
	message = JSON.stringify(message)
	if(getEquipment() == "android") window.androidjs.showGoodsDetail(message)
	else showGoodsDetail(message)
}
//告诉app去分享
function toshare() {
	var message = {
		"inviteScore":inviteScore,
		"activeId":spreadEventId,
		"title":'王者荣耀活动',
		"videoContent":'王者荣耀皮肤免费领',
		"videoIcon": "https://oss.eratpay.com/146b9077671447069bea50ea00345336.png"
	}
	message = JSON.stringify(message)
	if(getEquipment() == "android") window.androidjs.share(message)
	else share(message)
}
//点击特价商品
$(".bargainGoodsList").delegate("li","click",function(e){
	if(e.target.className == "bargainGoods_right" || e.target.className == "goodsBargin"){
		var goodsId = $(this).attr("attr-productId");
		pickUp(goodsId,0)
		
	}else {
		var goodsId = $(this).attr("attr-productId");
		showGoods(goodsId,0)
	}
});
//商品详情或者兑换
$(".sw-slides").delegate(".sw-slide","click",function(e){
	if(e.target.className == "showGoods"){
		var goodsId = $(this).attr("attr-productId");
		showGoods(goodsId,1)
	}else if(e.target.className == "pickUp") {
		var goodsId = $(this).attr("attr-productId");
		pickUp(goodsId,1)
	}
});
$(".active_changeName").on("click", function() {
	var goodsId = $(this).attr("attr-productId");
	showGoods(goodsId,1)
})
