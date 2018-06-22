<template>
	<div class="hello">
		<div class="content">
			<div class="word-one">
	    		<p style="font-size: 40px;">合作案例-千城智联</p>
	    		<p style="font-size: 25px;">赚动积分商城服务为“千城智联”的各APP带来的价值</p>
	    	</div>
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
		width: 100%;
		height: 17.5rem;
		background: url(../assets/web1/合作伙伴.jpg) no-repeat center center;
		text-align: center;
	}
	.word-one{
		width: 100%;
		line-height: 1.5rem;
	}
</style>