<template>
	<div class="hello">
		<div class="row">
			<div class="word">
				<p style="font-size: 50px;">合作流程</p>
				<p style="font-size: 25px;">我们的服务流程</p>
			</div>
			<div class="svg">
				<div class="svg-one yi"><li><img src="../assets/web/合同7.png" /></li><p>签订合同</p></div>
				<div class="svg-one"><li><img src="../assets/web/创建账号.png" /></li><p>创建账号</p></div>
				<div class="svg-one"><li><img src="../assets/web/商城模版.png" /></li><p>商城模板</p></div>
				<div class="svg-one"><li><img src="../assets/web/积分同队.png" /></li><p>积分通兑</p></div>
				<div class="svg-one"><li><img src="../assets/web/商品对接.png" /></li><p>商品对接</p></div>
				<div class="svg-one"><li><img src="../assets/web/商品选品.png" /></li><p>商品选品</p></div>
				<div class="svg-one er"><li><img src="../assets/web/物流.png" /></li><p>物流管理</p></div>				
			</div>
		</div>
		<p class="content-one">您通过邮箱，电话等快速与天悦互动商务人员进行联系，达成合作意向并签订合同</p>
	    <div class="content-three">
	    	<div class="word-one">
	    		<p style="font-size: 40px;">合作案例-京东</p>
	    		<p style="font-size: 25px;">双方同时完成销售转化与用户跨平台导入</p>
	    	</div>
	    </div>
	    <div class="content-four">
	    	<div class="word-o">
	    		<p style="font-size: 40px;">合作案例-千城智联</p>
	    		<p style="font-size: 25px;">赚动积分商城服务为“千城智联”的各APP带来的价值</p>
	    	</div>
	    	<img src="../assets/web/千城质量.jpg" class="word-img"/>
	    </div>
	</div>
</template>

<script>
	export default {
		name: 'process',
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
		margin: 0 auto;
		margin-top: 2rem;
	}
	
	.row{
		width: 100%;
		height: 11rem;
		text-align: center;
		background: url(../assets/web/微信图片_20180612165801.png) no-repeat center center;
	}
	.content-one{
		width: 100%;
		line-height: 1.7rem;
		text-align: center;
		font-size: 27px;
	}
	.svg{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 3rem;
	}
	.svg-one{
		text-align: center;
	}
	.yi{
		margin-left: 4.5rem;
	}
	.er{
		margin-right: 4.5rem;
	}
	.svg-one p{
		margin-top: 0.4rem;
		color: white;
	}
	.svg li{
		list-style: none;
		border-radius: 50%;
		border: 3px solid white;
	}
	.svg li img{
		width: 100%;
	}
	
	.word{
		color: white;
		line-height: 2rem;
	}
	.content-three{
		width: 100%;
		height: 18rem;
		background: url(../assets/web/京东.jpg) no-repeat center center;
		text-align: center;
	}
	.word-one{
		line-height: 1.5rem;
	}
	.word-img{
		width: 100%;
		position: relative;
	}
	.word-o{
		width: 100%;
		line-height: 1.5rem;
		position: absolute;
		top: 1rem;
		z-index: 1;
	}
	.content-four{
		width: 100%;
		height: 24rem;
		/*background: url(../assets/web/千城质量.jpg) no-repeat center center;*/
		text-align: center;
		position: relative;
	}
</style>