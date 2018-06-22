<template>
  <div class="userInfoEditor">
    <div class="header">
      <van-nav-bar title="修改昵称"  left-arrow @click-left="routergo" right-text="保存" @click-right="onClickRight" />
    </div>
    <van-cell-group>
      <van-field v-model="value" placeholder="请输入昵称" class="inputBorder" />
    </van-cell-group>
    <span class="hintMes">昵称仅支持数字、字母、汉字</span>
  </div>
</template>
<script>
import {Dialog, Toast} from 'vant'
import './index.less'
/* 个人中心昵称修改 */
export default {
  name: 'userInfoEditor',
  data () {
    return {
      userName: '',//用户名称
      value: '',//修改的昵称
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    onClickRight () {//保存昵称
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;// 字母/数字/汉字
      let that = this
      if(!this.value){//空
        Toast('请输入昵称')
        return;
      }else{
        if(reg.test(this.value)){
          that.$store.dispatch('commonService',{"apid": 76,params: {
            nickName:that.value
          }})
          .then((result) => {
             if(result.apidata.message == '成功'){
                  Toast('昵称保存成功')
                  this.$router.replace({path:'/userInfo'})
            }else {
              Toast(result.apidata.message)
            }
          })
          .catch((error) => {
            console.log(error)
          })
        }else{
          Toast('昵称仅支持数字、字母、汉字')
          return;
        }
      }
    },
	},
  mounted() {
   this.value = this.$route.query.name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
