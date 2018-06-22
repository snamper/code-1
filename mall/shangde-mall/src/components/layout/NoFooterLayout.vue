<template>
  <div>
  <router-view />
  <Header />
  </div>
</template>
<script>
import Header from './Header'
export default {
  name: 'NoFooterLayout',
  components: {
    Header
  }
}
</script>
<style>
</style>
