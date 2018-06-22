<template>
	<div class="hello">
		<div class="content">
			<div class="content-word">
				<p>赚动APP是由天悦互动公司研发的产品，致力于为用户打造积分微消费平台，一站式解决用户日常生活高频次消费需求。</p>
			</div>
		</div>
		<div class="content-one">
			<div class="content-word-one">
				<h1 class="word-one">闲置积分当钱花</h1>
				<p>您可用运营商，信用卡，航空，商超等平台积分，一键通兑成“赚动积分”</p>
				<p>您还可利用碎片化时间参与“赚动”活动，任务获取积分</p>
			</div>
		</div>
		<div class="content-two">
			<div class="content-word">
				<h1 class="word-one">海量商品随心兑</h1>
				<p>赚动APP整合大量微消费商家，从线上到线下，为您提供高效多样的消费环境，满足您购物，出行，饮食，视频等日常需求，真正实现“0元”消费。</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	.hello {
		width: 100%;
		min-width: 1200px;
		margin: 0 auto;
		margin-top: 2rem;
	}
	
	.content {
		width: 100%;
		height: 12.52rem;
		background: url(../assets/web2/第一瓶.jpg) no-repeat center center;
		background-size: 100% 100%;
		position: relative;
	}
	
	.content-word {
		position: absolute;
		top: 45%;
		right: 20%;
		width: 30%;
		font-size: 20px;
		text-align: center;
	}
	
	.content-word p {
		line-height: 0.8rem;
	}
	
	.word-one {
		margin-bottom: 0.9rem;
		font-size: 25px;
		color: #FF6767;
	}
	
	.content-one {
		width: 100%;
		height: 12.52rem;
		background: url(../assets/web2/第二瓶.jpg) no-repeat center center;
		background-size: 100% 100%;
		position: relative;
	}
	
	.content-word-one {
		position: absolute;
		top: 45%;
		left: 20%;
		width: 30%;
		font-size: 20px;
		text-align: center;
	}
	
	.content-word-one p {
		line-height: 0.8rem;
	}
	.content-two {
		width: 100%;
		height: 12.52rem;
		background: url(../assets/web2/第三瓶.jpg) no-repeat center center;
		background-size: 100% 100%;
		position: relative;
	}
</style>