<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import roleLisr from '@/utils/role'
import { asyncRouterMap } from './router'
export default {
  name: 'App',
  created() {
    const res = sessionStorage.getItem('role')
    const arr = roleLisr[res]
    const authRouteList = asyncRouterMap.filter((item) => {
      if (arr.includes(item.path)) return true
      else return false
    })
    this.$router.addRoutes(authRouteList)
    const constRoutes = this.$router.options.routes
    this.$router.options.routes = [...constRoutes, ...authRouteList]
    console.log(this.$router.options.routes)
  }
}
</script>
