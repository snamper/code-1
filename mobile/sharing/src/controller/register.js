/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
export default({
    name:'registerConponent',
    mounted() {
    	var num = document.documentElement.clientHeight/document.documentElement.clientWidth/1.77
        document.documentElement.style.fontSize = document.documentElement.clientWidth/7*num + 'px';
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://castatic.fengkongcloud.com/pr/v1/smcp.min.js';
        document.body.appendChild(s);
        // $('body').height($('body')[0].clientHeight);
    },
    data () {
        return {
            imgList : [
                require('../images/register1/goods1.png'),
                require('../images/register1/goods2.png'),
                require('../images/register1/goods3.png'),
                require('../images/register1/goods4.png'),
                require('../images/register1/goods5.png'),
                require('../images/register1/goods6.png'),
                require('../images/register1/goods7.png'),
                require('../images/register1/goods8.png'),
                require('../images/register1/goods9.png')
            ],
            register_height:document.body.clientHeight,
            register_relative:document.body.clientWidth > 1024?true : false,
            telNum : '',
            btnMessage:'发送验证码',
            getCodeAllow: false,
            rid:'',
            confirmPhone: '',
            code: '',
            registerAllow: false,
            tips:'',
            timer:'',
            timeIndex: 59,
            imgCodeShow: false
        }
    },
    
    methods: {
        phoneChange: function() {
            this.tips = '';
            if(this.telNum.length == 11 && this.phoneCheck()){   // 长度达到11位
                this.ifRegister();
                this.getCodeAllow = true;
            }else{
                this.getCodeAllow = false;
                this.registerAllow = false;
            }
        },
        codeChange: function() {
            this.tips = '';
            if(this.code.length >= 4 && this.code.length <= 8){   
                this.ifRegister();
            }else{
                this.registerAllow = false;
            }
        },
        ifRegister: function() {
            if(this.rid && this.telNum == this.confirmPhone && this.code.length >= 4 && this.code.length < 8){
                this.registerAllow = true;
            } else{
               this.registerAllow = false;
            }
        },
        phoneCheck: function() {
            var regExp = /^1(3|4|5|7|8|6|9)\d{9}$/;
            if(!this.telNum){
                this.tips = '请输入手机号'
                return false
            }else{
                if(!regExp.test(this.telNum)){
                    this.tips = '请输入正确的手机号'
                    return false
                }
                return true;
            }
        },
        getCode: function() {
            const that = this;
            if(this.phoneCheck()){
                axios.get('/share/user/h5/register.do', {
                    params: {
                        telNum: this.telNum,
                        type:1
                    }
                })
                .then(function (result) {
                    if(result.data.message == '成功'){
                        that.getCodeImg();
                        that.imgCodeShow = true;
                    }else that.tips = result.data.message
                })
                .catch(function (error) {
                    console.log(error)
                });
            }
        },
        getSysCode: function() {
            const that = this;
            axios.get('/tyuehd/user/phonecode.do', {
                params: {
                    phoenNum: this.telNum
                }
            })
            .then(function (result) {
                if(result.data.message == '成功'){
                    that.getCodeAllow = false;
                    that.confirmPhone = that.telNum;
                    that.timer = setInterval(function(){
                        that.btnMessage = that.timeIndex + 'S';
                        that.timeIndex --;
                        if(that.timeIndex < 0){
                            that.timer = window.clearInterval(that.timer);
                            that.btnMessage = '发送验证码';
                            that.getCodeAllow = true;
                        }
                    },1000)
                }else that.tips = result.data.message
            })
            .catch(function (error) {
                console.log(error)
            });
        },
        getCodeImg:function(){
            const that = this;
            initSMCaptcha({
                organization:'UPLdPizkPMmRZklBqqit',
                appId:'tyhd',
                appendTo:'imgCode',
                onError:function(errType, errMsg) {
                    console.log(errMsg)
                }
            },function(SMCaptcha){
                SMCaptcha.onSuccess(function(data){
                    if(data.pass){
                        that.getSysCode();
                        that.rid = data.rid;
                        that.imgCodeShow = false;
                        if(that.tips == '图形验证码验证错误')
                            that.tips = '';
                    }else if(!data.pass){
                        that.tips = '图形验证码验证错误';
                    }
                }); 
                SMCaptcha.onError(function (errType,errMsg) {
                    console.log('onError , errType, errMsg');
                });
            })
        },
        toRegister: function() {
            const that = this;
            const data = {
            	spreadId: this.$route.query.spreadId,
                spreadChannel: this.$route.query.spreadChannel,
                spreadType: this.$route.query.spreadType,
                shareOwner: this.$route.query.shareOwner,
                telNum: this.telNum,
                vildCode: this.code,
                type: "2",
                rid: this.rid,
                productId: this.$route.query.productId,
                shareSign:this.$route.query.shareSign
            }
            axios({
                method: 'post',
                url: '/share/user/h5/register.do',
                data:qs.stringify(data),
				headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function (json) {
                if(json.data.message == '成功'){
                    if( that.$route.query.productId ) {
                    	that.$router.push({ name: 'registerSucc', query: { type: 2, shareOwner:that.$route.query.shareOwner,productId:that.$route.query.productId,shareSign:that.$route.query.shareSign }})
//                      window.location.href = '#/registerSucc?&type=2&shareOwner='+that.$route.query.shareOwner+'&productId='+that.$route.query.productId+'&shareSign='+that.$route.query.shareSign; //修改
                    } else{
                    	that.$router.push({ name: 'registerSucc', query: { type: 2, shareOwner:that.$route.query.shareOwner }})
//                      window.location.href = '#/registerSucc?&type=2&shareOwner='+that.$route.query.shareOwner; 
                    }
                }else that.tips = json.data.message
            })
            .catch(function (error) {
                console.log(error)
            });
        }
        
    }
})