<template>
  <div>
  <router-view />
  <Footer />
  </div>
</template>
<script>
import Footer from './Footer'
export default {
  name: 'NoHeaderLayout',
  components: {
    Footer
  }
}
</script>
<style>
</style>
