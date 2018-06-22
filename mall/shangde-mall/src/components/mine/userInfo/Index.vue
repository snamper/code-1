<template>
  <div class="mainUserInfo">
    <ul class="infoBox">
      <li class="infoLis" @click="editorNameUrl(name)">
          <span class="lisLabel fl">昵称</span>
          <van-icon class="fr" name="arrow" />
          <span class="lisText fr">{{name}}</span>
      </li>
      <li class="infoLis" @click="showSetSexBox">
        <span class="lisLabel fl">性别</span>
        <van-icon class="fr" name="arrow" />
        <span class="lisText fr" v-if="sexText">{{sexText == '1' ? '男':'女'}}</span>
        <span class="lisText fr" v-else>请选择</span>
      </li>
    <van-popup v-model="setSex" class="popupSex">
        <span class="popupTitle">性别</span>
        <van-radio-group v-model="sexText" @change = "sexChange">
          <van-cell-group>
            <van-cell title="男" clickable @click="radio = '1'">
              <van-radio name="1" />
            </van-cell>
            <van-cell title="女" clickable @click="radio = '2'">
              <van-radio name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
      <li class="infoLis" @click="showSetBirthDate">
        <span class="lisLabel fl">出生日期</span>
        <van-icon class="fr" name="arrow" />
        <span class="lisText fr" v-if="birth">{{birth}}</span>
        <span class="lisText fr" v-else>请选择</span>
      </li>
      <van-popup v-model="setBirthDate" class="popupSexDate" >
          <span class="popupTitle">选择日期</span>
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            @confirm="confirmDate"
            @cancel="cancelDate"
            :minDate= "minDate"
          />
        </van-popup>
    </ul>
    <div class="logOutBox"><span class="logOut" @click="logOut">退出登录</span></div>
  </div>
</template>
<script>
import {Dialog, Toast} from 'vant'
import './index.less'
/* 个人中心修改 */
export default {
  name: 'userInfo',
  data () {
    return {
      setSex: false,//选择性别
      setBirthDate: false,//选择出生日期
      sexText: '',//初始化性别
      birthDate: '',//初始化出生日期
      radioSex: '1',//选择性别弹出层默认选择男
      birthDate: new Date(),//出生日期默认为当前时间
      currentDate: new Date(),
      name:'',
      birth:'',
      minDate: new Date(1890,12,31)
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    showSetSexBox: function (){
      this.setSex = true;
    },
    editorNameUrl(data){
      this.$router.replace({path:"/editorName",query:{name:data}})
    },
    showSetBirthDate: function (){
      this.setBirthDate = true
    },
    confirmDate(value){
      let that = this
      let str = String(value).split(" ")
      let mounth = ''
      console.log(str)
      switch (str[1]) {
        case "Jan" :  
             mounth = '-01-'
          break;
        case "Feb" :  
             mounth = '-02-'
          break;
          case "Mar" :  
              mounth = '-03-'
          break;
          case "Apr" :  
              mounth = '-04-'
          break;
          case "May" :  
              mounth = '-05-'
          break;
          case "Jun" :  
              mounth = '-06-'
          break;
          case "Jul" :  
              mounth = '-07-'
          break;
          case  "Aug":  
              mounth = '-08-'
          break;
          case "Sep" :  
              mounth = '-09-'
          break;
          case "Oct" :  
              mounth = '-10-'
          break;
          case "Nov" :  
             mounth = '-11-'
          break;
          case "Dec" :  
             mounth = '-12-'
          break;
          default:
             mouth = '--'
          break;
      }
      let birStr = str[3] + mounth + str[2]
      console.log(birStr)
      that.$store.dispatch('commonService',{"apid": 73,params: {
            birth:birStr
          }})
          .then((result) => {
             if(result.apidata.message == '成功'){
                  that.birth = birStr
                  that.setBirthDate = false
            }else {
              Toast(result.apidata.message)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      
    },
    cancelDate(){
      this.setBirthDate = false
    },
    logOut(){
       
       Dialog.confirm({
        title: '提示',
        message: '您确定退出登录？'
      }).then(() => {
        this.$store.dispatch('commonService',{"apid": 31,params: {}})
        .then((result) => {
           if(result.apidata.message == '成功'){
             this.$router.push({path:"/index"})
             sessionStorage.removeItem("token")
          }else that.tips = result.apidata.message
        })
        .catch((error) => {
          console.log(error)
        })
      }).catch(() => {
        // on cancel
      });

       
    },
    sexChange(value){
      let that = this
     console.log(value)
     that.$store.dispatch('commonService',{"apid": 73,params: {
            sex:value
          }})
          .then((result) => {
             if(result.apidata.message == '成功'){
                  that.sexText = value
            }else {
              Toast(result.apidata.message)
            }
          })
          .catch((error) => {
            console.log(error)
          })
    }
    
  },
  created() {
    let that = this
       this.$store.dispatch('commonService',{"apid": 53,params: {}})
        .then((result) => {
           if(result.apidata.message == '成功'){
              console.log(result)
              that.name = result.apidata.data.NAME
              that.sexText = result.apidata.data.sex
              that.birth = result.apidata.data.birth
          }else {
            that.tips = result.apidata.message
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
