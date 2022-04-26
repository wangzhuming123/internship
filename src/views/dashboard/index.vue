<template>
  <div class="dashboard-container">
    <div class="info-box-style" style="width:250px;">
      <el-divider style="margin:0"/>
      <p>名称: {{ name }}</p >
      <el-divider style="margin:0"/>
      <p>账号ID: {{ number }}</p >
      <el-divider style="margin:0"/>
      <p>邮箱: {{ email }}</p >
      <el-divider style="margin:0"/>
      <el-button @click="edit()">编辑</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const stuId = sessionStorage.getItem('stuId')
const teaId = sessionStorage.getItem('teaId')
const parId = sessionStorage.getItem('parId')
const comId = sessionStorage.getItem('comId')
export default {
  name: 'Dashboard',
  components: {

  },

  data() {
    return {
      name: '',
      number: '',
      email: ''

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (stuId) {
        this.name = JSON.parse(sessionStorage.getItem('obj')).stuName
        this.number = JSON.parse(sessionStorage.getItem('obj')).stuNumber
        this.email = JSON.parse(sessionStorage.getItem('obj')).stuEmail
      } else if (teaId) {
        this.name = JSON.parse(sessionStorage.getItem('obj')).teaName
        this.number = JSON.parse(sessionStorage.getItem('obj')).teaNumber
        this.email = JSON.parse(sessionStorage.getItem('obj')).teaEmail
      } else if (parId) {
        this.name = JSON.parse(sessionStorage.getItem('obj')).parName
        this.number = JSON.parse(sessionStorage.getItem('obj')).parCode
        this.email = JSON.parse(sessionStorage.getItem('obj')).parEmail
      } else if (comId) {
        this.name = JSON.parse(sessionStorage.getItem('obj')).comName
        this.number = JSON.parse(sessionStorage.getItem('obj')).comCode
        this.email = JSON.parse(sessionStorage.getItem('obj')).comEmail
      }
    },
    edit() {
      const obj = JSON.parse(sessionStorage.getItem('obj'))
      let id = null
      if (stuId) {
        id = obj.stuId
        this.$router.push(`/stuEdit/${id}`)
      } else if (teaId) {
        id = obj.teaId
        this.$router.push(`/teaEdit/${id}`)
      } else if (parId) {
        id = obj.parId
        this.$router.push(`/parEdit/${id}`)
      } else if (comId) {
        id = obj.comId
        this.$router.push(`/comEdit/${id}`)
      }
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.info-box-style{
display: flex;
flex-flow: column nowrap;
position: relative;
left: 70px;
top: 30px;
}
.info-box-style>p{
  margin:0;
padding-left: 10px;
padding-right: 10px;
border-left: solid 2px #ccc;
border-right: solid 2px #ccc;
height:23px;
width:250px;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
