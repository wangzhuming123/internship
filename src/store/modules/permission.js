// 导入router.js下的静态路由、动态获取的路由映射
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 判断是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 过滤出有权限的路由
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  getters: {
    routes: state => state.routes,
    addRoutes: state => state.addRoutes
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes) // 把之前的路由和后过滤出来的路由拼接起来一个新数组
    }
  },
  actions: {
    // 构建路由的函数
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        let accessedRoutes
        if (roles.includes('ADMIN')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission
