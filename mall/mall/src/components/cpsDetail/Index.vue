<template>
  <div class="cpsDetail">
    <iframe ref="iframe" :src="url" />
  </div>
</template>
<script>
import style from './index.less'
export default {
  name: 'cpsDetail',
  data() {
    return{
      url:''
    }
  },
  created() {
    this.url = this.$route.query.entranceUrl
  },
  mounted() {
    // console.log( this.$refs.iframe.title )
  }
}
</script>

