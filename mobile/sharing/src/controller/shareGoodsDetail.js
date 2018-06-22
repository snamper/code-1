/* eslint-disable */
import axios from 'axios'
// import bottom from '../components/bottom'
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css';

export default ({
	name:'shareGoodsDetail',
	// components: {
	// 	bottom
	// },
	mounted () {
		var num = document.documentElement.clientHeight/document.documentElement.clientWidth/1.77
        document.documentElement.style.fontSize = document.documentElement.clientWidth/7*num + 'px';
		this.initData()
	},
	data () {
		return {
			imgList:[],
			goods_name:'',
			goods_point:'',
			goods_num:'',
			detailList:[],
			shareOwner: this.$route.query.shareUserId,
			productId: this.$route.query.productId,
			shareSign: this.$route.query.shareSign,
			lunboHeight: document.documentElement.clientWidth / 2.3 +'px'
		}
	},methods:{
		initData: function() {
			const that = this;
			console.log("ininin")
			axios.get('/share/app/product/share/detail.do', {
				params: {
					productId: that.productId,
					shareUserId: that.shareOwner,
					shareSign: that.shareSign
				}
			})
			.then(function (result) {
				console.log(result)
				that.imgList = result.data.data.detailImages;
				that.goods_name = result.data.data.fullName;
				that.goods_point =  result.data.data.productRule.exchangePoints;
				that.goods_num =  result.data.data.soldNumber;
				that.detailList = result.data.data.productExtendedDetailList;
				that.$nextTick(function(){	// 渲染完成
					let mySwiper = new Swiper('.swiper-container', {
						loop: true,
						speed: 1000,
						autoplay: {
							delay: 4000,
							disableOnInteraction: false
						},
						pagination: {
							el: '.swiper-pagination',
							clickable: true
						}
					})
				})
			})
			.catch(function (error) {
				console.log(error)
			});
		}
	}
})