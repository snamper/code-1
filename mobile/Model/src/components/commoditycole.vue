<template>
	<div class="hello">
		<div class="content">
			<div class="word-one">
	    		<p style="font-size: 40px;">合作案例-千城智联</p>
	    		<p style="font-size: 25px;">赚动积分商城服务为“千城智联”的各APP带来的价值</p>
	    	</div>
	    	<!--<div class="content-img">-->
	    		<!--<img src="../assets/web1/我们的价值_03.jpg" class="img-one"/>
	    		<img src="../assets/web1/图形.jpg" />
	    		<img src="../assets/web1/我们的价值_05.jpg" class="img-two"/>-->
	    	<!--</div>-->
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
		min-width: 1200px;
		margin: 0 auto;
		margin-top: 2rem;
	}
	.content{
		min-width: 1200px;
		width: 100%;
		height: 17.5rem;
		background: url(../assets/web1/合作伙伴.jpg) no-repeat center center;
		text-align: center;
		position: relative;
	}
	.word-one{
		width: 100%;
		line-height: 1.5rem;
	}
	/*.content-img{
		width: 100%;
		margin: 0 auto;
		position: relative;
	}*/
	/*.img-one{
		position: absolute;
		left: 5rem;
		bottom: 3rem;
	}
	.img-two{
		position: absolute;
		right: 5rem;
		bottom: 3rem;
	}*/
</style>