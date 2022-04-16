<template>
  <div class="stu">
    <div class="header">
      woshi xuesheng
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  components: {
    Footer
  },
  data() {
    return {

    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
    height: 400px;
    width: 100vw;
    background-color: pink;
}
</style>
