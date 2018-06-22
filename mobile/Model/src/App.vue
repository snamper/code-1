<template>
	<div id="app" class="container">
		<div class="head">
			<div class="head-one">
				<img src="./assets/logo.jpg" />
			</div>
			<div class="navbar navbar-default" role="navigation">
			<div class="navbar-header">
			  <a class="navbar-brand" >hello</a>
			</div>
			<ul class="head-two nav navbar-nav">			    
				<router-link to="/index">
					<li>首页</li>
				</router-link>
				<router-link to="two">
					<li>商业生态</li>
				</router-link>
				<router-link to="three">
					<li>产品价值</li>
				</router-link>
				<router-link to="one">
					<li>合作流程</li>
				</router-link>
				<router-link to="four">
					<li>赚动APP</li>
				</router-link>
				<li class="dropdown">
				  <a href="#" class="dropdown-toggle" data-toggle="dropdown">jhjhjj <span class="caret"></span></a>
				  <ul class="dropdown-menu">
				    <router-link to="/index">
					  <li>首页</li>
				    </router-link>
				    <router-link to="two">
					  <li>商业生态</li>
				    </router-link>
				    <router-link to="three">
					  <li>产品价值</li>
				    </router-link>
				    <router-link to="one">
					  <li>合作流程</li>
				    </router-link>
				    <router-link to="four">
					  <li>赚动APP</li>
				    </router-link>
				  </ul>
				</li>
			</ul>
			</div>
			<div style="width: 30%;"></div>
		</div>
		
		<router-view/>
		<div class="foot">
			<div class="foot-one">
				<li style="margin-bottom: 0.2rem;font-size: 18px;">北京天悦互动科技有限公司</li>
				<p>北京天悦互动科技有限公司(以下简称天悦)，是一家专注于做消费领域的互联网创新公司。天悦通过将积分，广告与商家的有机结合，打造出一个三方共赢的生态圈。与行业伙伴协作的互补，帮劣数亿消费者获取最大优惠，提供给广告主更为精准的投放数据。在创造社会价值的同时，让每个人都能享受到广告积分为消费带来的快乐。</p>
			</div>
			<div class="foot-two">
				<div class="two-one">
					<img src="./assets/1528366885.jpg" />
					<p>赚动APP</p>
				</div>
				<div class="two-two">
					<img src="./assets/微消费生活圈微信二维码.jpg" />
					<p>赚动A订阅号</p>
				</div>
			</div>
			<div class="foot-three">
				<li style="margin-bottom: 0.2rem;font-size: 18px;">联系我们</li>
				<p>北京总部：</p>
				<p>地址：北京朝阳区望京西路来广营诚盈中心3号楼4gh</p>
				<pre></pre>
				<p>客服电话：400-888-5275 周一到周五(9：00-18：00)</p>
				<p>商务合作：shentao@tianyuehudong.com</p>
				<p>品牌合作：shentao@tianyuehudong.com</p>
				<p>广告招商：shentao@tianyuehudong.com</p>
			</div>
			<div class="sidebar">
				<img src="./assets/1528366885.jpg" v-if="show" class="style"/>
				<div class="sidebar-one">
					<img src="./assets/图层9.jpg" />
					<p><img src="./assets/二维码-2.jpg" @click="showclick" /></p>
				</div>
				
			</div>
</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		name: 'App',
		data () {
			return {
				show:false
			}
		},
		methods:{
			showclick(){
				this.show=!this.show
			}
		}
		
	}
</script>

<style>
    @import './bootstrap.min.css';
	* {
		margin: 0;
		padding: 0;
	}
	#app{
		margin: 0 auto;
	}
	.head {
		width: 100%;
		min-width: 1200px;
		margin: 0 auto;
		height: 2rem;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		background-color: white;
		z-index: 4;
	}
	
	a {
		text-decoration: none;
	}
	
	.head-one {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2.2rem;
	}

	.head-two {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		font-size: 16px;
	}
	
	.two-one {
		text-align: center;
	}
	
	.two-two {
		text-align: center;
	}
	
	.head-two a {
		width: 20%;
		color: black;
	}
	
	.head-two li {
		width: 100%;
		height: 100%;
		line-height: 1.2rem;
		text-align: center;
	}
	
	.head-two a.router-link-active {
		background: #ff6767;
		color: white;
	}
	
	.foot {
		width: 91%;
		padding: 0 4.5%;
		height: 5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #383838;
		color: white;
		clear: both;
	}
	
	.foot-one {
		width: 22%;
		padding: 0 0.3rem;
		line-height: 0.5rem;
	}
	
	.foot-two {
		width: 30%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.foot-three {
		width: 20%;
		padding: 0 0.3rem;
		line-height: 0.5rem;
	}
	.sidebar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 40%;
		right:0;
		z-index: 6;
	}
	.sidebar-one{
		text-align: center;
		display: block;
		background: #eaeaea;
	}
</style>