<template>
	<div class="hello">
		<img src="../assets/banner1.jpg" style="width: 100%;"/>
		<div class="content">
			<div class="content-word">
				<h1 class="word-one">天悦互动能做什么</h1>
				<p>充分发挥赚动积分通兑平台价值，整合各个行业平台积分，通过区块链技术实现积分，商户，商品的互联互通，打造积分消费新生态。</p>
			</div>
		</div>
		<div class="content-one">
			<div class="content-word-one">
				<h1 class="word-one">天悦互动的团队</h1>
				<p>由原上市公司 管，硅 技术 归，原百度业务骨干及若 互联精英组成管团队和业务团队，在积分，消费等领域积累有大量的经验，并在区块链，数据，信息安全等领域掌握大量尖端技术。</p>
			</div>
		</div>
		<div class="content-two">
			<div class="content-word">
				<h1 class="word-one">天悦互动的成长</h1>
				<p>公司2017年4月成立，2017年10月完成首轮5300万（人民币）机构融资，2017年12月赚动c端平台上线，2018年4月B端平台上线，目前日服务用户20W+</p>
			</div>
		</div>
		<div class="content-three">
				<div class="content-word-one">
					<h1 class="word-one">天悦互动的团队</h1>
					<p>为企业提供商品销售，用户引流，用户粘性，流量变现的多维度的解决方案。</p>
				</div>
			</div>
		<div class="content-four">
			<p>我们的合作伙伴</p>
			<div class="content-img">
				<img src="../assets/logo/阿姨帮.jpg" />
				<img src="../assets/logo/闪送.jpg" />
				<img src="../assets/logo/世纪佳缘.jpg" />
				<img src="../assets/logo/话费.jpg" />
				<img src="../assets/logo/滴滴.jpg" />
				<img src="../assets/logo/来一份.jpg" />
				<img src="../assets/logo/中石油.jpg" />
				<img src="../assets/logo/优酷.jpg" />
				<img src="../assets/logo/京东.jpg" />
				<img src="../assets/logo/暑期.jpg" />
				<img src="../assets/logo/叮当.jpg" />
				<img src="../assets/logo/沃尔玛.jpg" />
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
		margin-top: 2rem;
	}
	
	.content {
		width: 100%;
		height: 12.52rem;
		background: url(../assets/1.jpg) no-repeat center center;
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
	}
	
	.content-one {
		width: 100%;
		height: 12.52rem;
		background: url(../assets/2.jpg) no-repeat center center;
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
		background: url(../assets/3.jpg) no-repeat center center;
		background-size: 100% 100%;
		position: relative;
	}
	.content-three {
		width: 100%;
		height: 12.52rem;
		background: url(../assets/4.jpg) no-repeat center center;
		background-size: 100% 100%;
		position: relative;
	}
	.content-four{
		width: 100%;
		text-align: center;
	}
	.content-four p{
		font-size: 30px;
		margin: 1rem 0;
	}
	.content-img{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 10%;
	}
	.content-img img{
		width: 15%;
	}
</style>