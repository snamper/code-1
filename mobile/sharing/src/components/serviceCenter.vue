<template>
	<div class="service_center">
			<div class="service">
				<div class="service_header">
					<img src="../images/service/service.png" alt="" />
				</div>
				<div class="service_content" >
					<div class="service_title">
						我猜您想了解：
					</div>
					<ul class="service_message" >
						<li >
							<h2>联系我们</h2>
							<p>客服电话：<span><a href="tel:400-888-5275">400-888-5275</a></span></p>
							<p>
								<i>微信账号：zhuandong110</i> 
								<a href="wx:zhuandong110"><img src="../images/service/copy.png" alt="" /></a>
							</p>
							<p>工作时间：正常工作日 9:00-18:00</p>
							<p>更多问题请点击<span><a href="feedBack:feedBack">意见反馈</a></span></p>
							<div class="liBorder"></div>
						</li>
						<li attr-source="afterSale" class="question" v-on:click="showQuestion('afterSale')">
							<h2>售前问题<img src="../images/service/arrow.png" alt="" /></h2>
						</li>
						<li attr-source="exchange" class="question" v-on:click="showQuestion('exchange')">
							<h2>兑换问题<img src="../images/service/arrow.png" alt="" /></h2>
						</li>
					</ul>
					<div v-for="item in showMsgList" :key="item[0]" v-html="item"></div>
				</div>
				<div style="clear:both;height:0;overflow:hidden;"></div>
			</div>
		</div>
</template>

<style>
	@import '../css/serviceCenter.css';
</style>
<script>
/* eslint-disable */
export default {
	name:'serviceCenter',
	data () {
		return {
			showMsgList:[],
			customerImg:require('../images/service/copy.png'),
			// imgList:[
			// 	require('../images/service/customer.png'),
			// 	require('../images/service/jiao.png'),
			// 	require('../images/service/service.png'),
			// 	require('../images/service/loadding.gif'),
			// 	require('../images/service/arrow.png')
			// ],
			msgList:[
				[	"afterSale",
					'<div class="customer afterSale">'+
						'<div class="customer_header">'+
							'<img src="" alt="" />'+
						'</div>'+
						'<div class="customer_message">售前问题<img v-bind:src="{{customerImg}}" alt="" /></div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service afterSale">'+
						'<div class="service_header">'+
							'<img src="../images/service/service.png" alt="" />'+
						'</div>'+
						'<div class="service_content">'+
							'<img class="loadding" src="../images/service/loadding.gif" alt="" />'+
						'</div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service_title">售前问题：</div>'+
					'<ul class="service_message">'+
						'<li attr-source="getCode" class="question" v-on:click="showQuestion(\'afterSale\')">'+
							'<h2>如何获取积分？<img src="../images/service/arrow.png" alt="" /></h2>'+
						'</li>'+
						'<li attr-source="codeDetail" class="question">'+
							'<h2>如何查看积分明细？<img src="../images/service/arrow.png" alt="" /></h2>'+
						'</li>'+
						'<li attr-source="bugGoods" class="question">'+
							'<h2>如何购买商品<img src="../images/service/arrow.png" alt="" /></h2>'+
						'</li>'+
						'<li attr-source="goodsDetail" class="question">'+
							'<h2>如何查看已购买商品？<img src="../images/service/arrow.png" alt="" /></h2>'+
						'</li>'+
					'</ul>'
				],[	'getCode',
					'<div class="customer getCode" >'+
						'<div class="customer_header">'+
							'<img src="../images/service/customer.png" alt="" />'+
						'</div>'+
						'<div class="customer_message">如何获取积分？<img src="../images/service/jiao.svg" alt="" /></div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>	',
					'<div class="service getCode">'+
						'<div class="service_header">'+
							'<img src="../images/service/service.png" alt="" />'+
						'</div>'+
						'<div class="service_content">'+
							'<img class="loadding" src="../images/service/loadding.gif" alt="" />'+
						'</div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service_title">如何获取积分：</div>'+
					'<ul class="service_answer">'+
						'<li>1.新手福利，登录即送代金券（全场通用）；</li>'+
						'<li>2.在首页找到对应的积分兑入商家，进入积分兑入，将商家积分兑入赚动账户（目前已开通京东钢镚）；</li>'+
						'<li>3.邀请好友，好友受邀下载并成功消费后，邀请即获得相应积分奖励（只限受邀者首单消费）；</li>'+
					'</ul>'
				],[	'codeDetail',
					'<div class="customer codeDetail">'+
						'<div class="customer_header">'+
							'<img src="../images/service/customer.png" alt="" />'+
						'</div>'+
						'<div class="customer_message" >如何查看积分明细？<img src="../images/service/jiao.svg" alt="" /></div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service codeDetail">'+
						'<div class="service_header">'+
							'<img src="../images/service/service.png" alt="" />'+
						'</div>'+
						'<div class="service_content">'+
							'<img class="loadding" src="../images/service/loadding.gif" alt="" />'+
						'</div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service_title">如何查看积分：</div>'+
					'<ul class="service_answer">'+
						'<li>用户登录后在首页可查看全部积分，或进入个人中心，可以查看积分明细。</li>'+
					'</ul>'
				],[	'bugGoods',
					'<div class="customer bugGoods">'+
						'<div class="customer_header">'+
							'<img src="../images/service/customer.png" alt="" />'+
						'</div>'+
						'<div class="customer_message">如何购买商品？<img src="../images/service/jiao.svg" alt="" /></div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service bugGoods" >'+
						'<div class="service_header">'+
							'<img src="../images/service/service.png" alt="" />'+
						'</div>'+
						'<div class="service_content">'+
							'<img class="loadding" src="../images/service/loadding.gif" alt="" />'+
						'</div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service_title">如何购买商品：</div>'+
					'<ul class="service_answer">'+
						'<li>用户可在商城页面使用积分购买商品，首次购买商品需设置交易密码，或通过“我的”—“我的账户”进行设置和密码修改。现在平台支持的支付方式分为三种：积分支付、微信支付、支付宝支付，因平台出售商品均为虚拟商品，故暂时不支持退换货。</li>'+
					'</ul>'
				],[	'goodsDetail',
					'<div class="customer goodsDetail">'+
						'<div class="customer_header">'+
							'<img src="../images/service/customer.png" alt="" />'+
						'</div>'+
						'<div class="customer_message">如何查看已购买商品？<img src="../images/service/jiao.svg" alt="" /></div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service goodsDetail">'+
						'<div class="service_header">'+
							'<img src="../images/service/service.png" alt="" />'+
						'</div>'+
						'<div class="service_content">'+
							'<img class="loadding" src="../images/service/loadding.gif" alt="" />'+
						'</div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service_title">如何查看已购买商品：</div>'+
					'<ul class="service_answer">'+
						'<li>除充值类商品(话费、流量）购买后直接充值到对应账户外，其余商品购买后均可在“我的”-“我的卡包”中查看并使用。</li>'+
					'</ul>'
				],[	'exchange',
					'<div class="customer exchange">'+
						'<div class="customer_header">'+
							'<img src="../images/service/customer.png" alt="" />'+
						'</div>'+
						'<div class="customer_message">兑换问题<img src="../images/service/jiao.svg" alt="" /></div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service exchange">'+
						'<div class="service_header">'+
							'<img src="../images/service/service.png" alt="" />'+
						'</div>'+
						'<div class="service_content">'+
							'<img class="loadding" src="../images/service/loadding.gif" alt="" />'+
						'</div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service_title">兑换问题：</div>'+
					'<ul class="service_message">'+
						'<li class="question" attr-source="codeBack">'+
							'<h2>商品兑换失败，积分什么时候退回？<img src="../images/service/arrow.png" alt="" /></h2>'+
						'</li>'+
					'</ul>'
				],[	'codeBack',
					'<div class="customer codeBack">'+
						'<div class="customer_header">'+
							'<img src="../images/service/customer.png" alt="" />'+
						'</div>'+
						'<div class="customer_message">商品兑换失败，积分什么时候退回？<img src="../images/service/jiao.svg" alt="" /></div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service codeBack" >'+
						'<div class="service_header">'+
							'<img src="../images/service/service.png" alt="" />'+
						'</div>'+
						'<div class="service_content">'+
							'<img class="loadding" src="../images/service/loadding.gif" alt="" />'+
						'</div>'+
						'<div style="clear:both;height:0;overflow:hidden;"></div>'+
					'</div>',
					'<div class="service_title">商品兑换失败，积分什么时候退回：</div>'+
					'<ul class="service_answer">'+
						'<li>1.因系统或商家原因导致用户购买商品后无法正常兑换使用，经系统核实后积分将立即返还，现金支付金额部分将在3-5个工作日内返还（不可抗因素除外）。</li>'+
						'<li>2.因用户自身原因导致兑换账号错误，无法正常使用已兑换商品，积分及支付金额不予退还。</li>'+
					'</ul>'
				]
			]
		}
	},
	methods: {
		showQuestion: function(msg) {
			if(this.showMsgList.length > 0){
				const questionList = this.showMsgList;
				for(var i = 0; i < questionList.length; i++){
					if(questionList[i][0] == msg){
						alert("1")
				        // var $top = $(className).offset().top;
				        // $("body,html").animate({
				        //   scrollTop: $top
				        // }, 500);
						return;
					}
				}
			}
			const json = this.msgList;
			const that = this;
			for(var i = 0; i < json.length; i++){
				if(json[i][0] == msg){
					const curObj = json[i];
					this.showMsgList.push(curObj[1])
					setTimeout(function() {
						console.log(that.showMsgList)
						that.showMsgList.push(curObj[2])
						setTimeout(function() {
							that.showMsgList.push(curObj[3])
						},1000)
					},200)
					// var $top = $(className).offset().top;
					// $("body,html").animate({
					// 	scrollTop: $top
					// }, 500);
				}
			}

		}
	}
}
</script>