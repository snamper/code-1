<template>
	<div style="padding-bottom:1.7rem">
		<header>商品详情</header>
		<div class="banner">
			<div class="swiper-container" v-bind:style="{height: lunboHeight}">
				<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="str in imgList" :key="str.imageUrl">
							<img v-bind:src="str.imageUrl" />
						</div>
				</div>
				<div class="swiper-pagination swiper-pagination-white"></div>
			</div>
		</div>
		<div class="content">
			<div class="goods_info">
				<div class="goods_info_box">
					<h2 class="goods_name">{{goods_name}}</h2>
					<div class="goods_info_main">
						<div class="point">
							<span class="goods_point">{{goods_point}}</span>&nbsp;积分	
						</div>
						<div class="sale">
							<span>已售:</span>
							<span class="goods_num">{{goods_num}}</span>
							<span>件</span>
						</div>
					</div>
				</div>
				<div class="goods_ensure">
					<div class="goods_icon goods_icon1"><img src="../images/goods/lightning.png"/></div>
					<div class="goods_icon_main">闪电发货</div>
					<div class="goods_icon"><img src="../images/goods/really.png"/></div>
					<div class="goods_icon_main">假一赔十</div>
					<div class="goods_icon"><img src="../images/goods/truely.png"/></div>
					<div class="goods_icon_main">正品保证</div>
				</div>
			</div>
			<div class="notice">
				<p class="get_notice">购买须知:</p>
			</div>
			<div class="productList">
				<div class="notice_common" v-for="item in detailList" :key="item.attrDicNameCN">
					<p class="name">{{item.attrDicNameCN}}</p>
					<div class="notice_common_main procedure">
						<p>{{item.detailDesc}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="appDownloadBox">
		    <router-link :to="{ path: 'register', query: { shareOwner: shareOwner, spreadId:'', spreadChannel:'', productId: productId, spreadType: 3,shareSign: shareSign}}">
		    	<img src="../images/goods/logo.png"/>
		    	<img src="../images/goods/word.png"/>
		    	<img src="../images/goods/button.png"/>
		    </router-link>
		</div>
	</div>
</template>
<script src="../controller/shareGoodsDetail.js"></script>
<style scoped lang="scss">
	@import '../css/shareGoodsDetail.css';
	.swiper-container {
	width: 100%;
	height: 3.2rem;
	.swiper-wrapper {
			width: 100%;
			height: 100%;
	}
	.swiper-slide {
			background-position: center;
			width: 100%;
			height: 100%;
			background: #f66;
			img {
					display: block;
					width: 100%;
					height: 100%;
			}
	}
	.swiper-pagination-bullet {
			width:0.833rem;
			height: 0.833rem;
			display: inline-block;
			background: #7c5e53;
	}
	.appDownloadBox img:nth-child(1){
		
	}
}
</style>

