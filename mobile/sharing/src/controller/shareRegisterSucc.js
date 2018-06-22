/* eslint-disable */
import axios from 'axios'
export default {
	name:'registerSucc',
	data () {
		return {
			downFlag:false
		}
	},
	methods: {
		downloadApp: function() {
			const ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == "micromessenger") {
				this.downFlag = true;
			}else{
				const u = navigator.userAgent;
				const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if ( this.$route.query.productId ) {	//从商品分享的注册
						axios.post('/share/app/product/download/log.do', {
							productId: this.$route.query.productId,
							shareUserId: this.$route.query.shareOwner,
							shareSign: this.$route.query.shareSign
						})
						.then(function (result) {
								if(isAndroid)
									window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.tyhd.jifen";
								else if(isiOS) 	window.location.href = "https://itunes.apple.com/cn/app/id1286643034";
								else 	alert('请用手机设备下载app!')
						})
						.catch(function (error) {
								console.log(error)
						});
				}else{
					if(isiOS) {
						window.location.href="https://itunes.apple.com/cn/app/id1286643034";
					} else if(isAndroid) {
						window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.tyhd.jifen";
					}else {
						alert('请用手机设备下载app!')
					}
				}
			}
		},
		closeTips: function() {
			this.downFlag = false;
		}
	},
	mounted() {
		var num = document.documentElement.clientHeight/document.documentElement.clientWidth/1.77
        document.documentElement.style.fontSize = document.documentElement.clientWidth/7*num + 'px';
	}
}