<template>
	<div class="aboutCenter">
		<div class="usLogoBox">
			<span class="iconLogo"><img src="../images/app.png" alt=""></span>
			<span class="iconText">赚动</span>
		</div>
		<div class="usBrief">
			<p class="briefText">
				赚动，是北京天悦互动科技有限公司自主开发研制的一款微积分消费类服务平台，致力于打造企业、商家、用户之间三方的微消费生态圈。让用户的各类积分不再被忽略浪费，具备消费价值。
			</p>
		</div>
		<div class="footerBox">
			<span class="copyRight">Copyright © 2017</span>
			<span class="usName">北京天悦互动科技有限公司</span>
		</div>
	</div>
</template>

<style>
	@import '../css/aboutus.css';
</style>
<script>
	/* eslint-disable */
export default {
	name:'aboutus',
	mounted(){
		  var num = document.documentElement.clientHeight/document.documentElement.clientWidth/1.77
          document.documentElement.style.fontSize = document.documentElement.clientWidth/7*num + 'px';
	}
}
</script>