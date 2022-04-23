import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/stuPort', component: () => import('@/views/stuPort'), hidden: true },
  // { path: '/parPort', component: () => import('@/views/parPort'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]

  }]
export const asyncRouterMap = [
  // 辅导员管理
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: 'Teacher',
    meta: { title: '辅导员管理', roles: ['0'] },
    children: [
      {
        path: 'list',
        name: 'TeacherList',
        component: () => import('@/views/teacher/list'),
        meta: { title: '辅导员列表' }
      },
      {
        path: 'create',
        name: 'TeacherCreate',
        component: () => import('@/views/teacher/form'),
        meta: { title: '添加辅导员' }
      },
      {
        path: 'edit/:id',
        name: 'TeacherEdit',
        component: () => import('@/views/teacher/form'),
        meta: { title: '编辑辅导员' },
        hidden: true
      }
    ]
  },

  // 学生管理
  {
    path: '/student',
    component: Layout,
    redirect: '/student/list',
    name: 'Student',
    meta: { title: '学生管理', roles: ['0', '1'] },
    children: [
      {
        path: 'list',
        name: 'StudentList',
        component: () => import('@/views/student/list'),
        meta: { title: '学生列表' }
      },
      {
        path: 'create',
        name: 'StudentCreate',
        component: () => import('@/views/student/form'),
        meta: { title: '添加学生' }
      },
      {
        path: 'parentList',
        name: 'ParentList',
        component: () => import('@/views/student/parentList'),
        meta: { title: '学生家长列表' }
      },
      {
        path: 'edit/:id',
        name: 'StudentEdit',
        component: () => import('@/views/student/form'),
        meta: { title: '编辑学生' },
        hidden: true
      }
    ]
  },
  // 班级管理
  {
    path: '/class',
    component: Layout,
    redirect: '/class/list',
    name: 'Class',
    meta: { title: '班级管理', roles: ['0', '1'] },
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import('@/views/class/list'),
        meta: { title: '班级列表' }
      },
      {
        path: 'create',
        name: 'ClassCreate',
        component: () => import('@/views/class/form'),
        meta: { title: '添加班级' }
      },
      {
        path: 'edit/:id',
        name: 'ClassEdit',
        component: () => import('@/views/class/form'),
        meta: { title: '编辑班级' },
        hidden: true
      }
    ]
  },

  // 实习公司管理
  {
    path: '/company',
    component: Layout,
    redirect: '/company/list',
    name: 'Company',
    meta: { title: '公司管理', roles: ['0'] },
    children: [
      {
        path: 'list',
        name: 'CompanyList',
        component: () => import('@/views/company/list'),
        meta: { title: '公司列表' }
      },
      {
        path: 'create',
        name: 'CompanyCreate',
        component: () => import('@/views/company/form'),
        meta: { title: '添加公司' }
      },
      {
        path: 'edit/:id',
        name: 'CompanyEdit',
        component: () => import('@/views/company/form'),
        meta: { title: '编辑公司' },
        hidden: true
      }
    ]
  },

  // 实习记录管理
  {
    path: '/internship',
    component: Layout,
    redirect: '/internship/list',
    name: 'Internship',
    meta: { title: '实习记录管理' },
    children: [
      {
        path: 'list',
        name: 'InternshipList',
        component: () => import('@/views/internship/list'),
        meta: { title: '实习记录列表' }
      },
      {
        path: 'todo',
        name: 'todoList',
        component: () => import('@/views/internship/todo'),
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'InternshipEdit',
        component: () => import('@/views/internship/form'),
        meta: { title: '编辑实习记录' },
        hidden: true
      }
    ]
  },
  // 学生端实习记录
  {
    path: '/stuinternship',
    component: Layout,
    redirect: '/stuinternship/list',
    name: 'stuInternship',
    meta: { title: '实习记录管理' },
    children: [
      {
        path: 'list',
        name: 'stuInternshipList',
        component: () => import('@/views/internship/list'),
        meta: { title: '实习记录列表' }
      },
      {
        path: 'create',
        name: 'stuInternshipCreate',
        component: () => import('@/views/internship/form'),
        meta: { title: '发起实习申请' }
      },
      {
        path: 'edit/:id',
        name: 'stuInternshipEdit',
        component: () => import('@/views/internship/form'),
        meta: { title: '编辑实习记录' },
        hidden: true
      }
    ]
  },
  // 辅导员端实习记录
  {
    path: '/teaInternship',
    component: Layout,
    redirect: '/teaInternship/listed',
    name: 'teaInternship',
    meta: { title: '实习统计' },
    children: [
      {
        path: 'listed',
        name: 'teaInternshipList',
        component: () => import('@/views/teaPort/listed'),
        meta: { title: '已完成的实习' }
      },
      {
        path: 'listing',
        name: 'teaInternshipCreate',
        component: () => import('@/views/teaPort/listing'),
        meta: { title: '进行中的实习' }
      },
      {
        path: 'jouList/:stuId',
        name: 'JournaStudentList',
        component: () => import('@/views/teaPort/journalList'),
        hidden: true
      }
    ]
  },
  // 周报管理  根据学生id查询周报
  {
    path: '/journal',
    component: Layout,
    redirect: '/journal/list',
    name: 'Journal',
    meta: { title: '周报管理' },
    children: [
      {
        path: 'list',
        name: 'JournalList',
        component: () => import('@/views/journal/list'),
        meta: { title: '周报列表' }
      },
      {
        path: 'create',
        name: 'JournalCreate',
        component: () => import('@/views/journal/form'),
        meta: { title: '添加周记'
        }
      },
      {
        path: 'edit/:id',
        name: 'JournalEdit',
        component: () => import('@/views/journal/form'),
        meta: { title: '编辑周记' },
        hidden: true
      }
    ]
  },
  // 公司端实习记录
  {
    path: '/companyPortInternshipList',
    component: Layout,
    redirect: '',
    name: 'CompanyPort',
    meta: { title: '查看实习记录' },
    children: [
      {
        path: 'list',
        name: 'JournalList',
        component: () => import('@/views/comPort/internshipList'),
        meta: { title: '实习记录' }
      },
      {
        path: 'todo',
        name: 'todoList',
        component: () => import('@/views/comPort/todo'),
        hidden: true
      },
      {
        path: 'jouList/:stuId',
        name: 'JournaStudentList',
        component: () => import('@/views/comPort/journalList'),
        hidden: true
      }
    ]
  },
  // 公司端已完成的实习
  {
    path: '/companyPortInternshipListed',
    component: Layout,
    redirect: '',
    name: 'CompanyPort',
    meta: { },
    children: [
      {
        path: 'list',
        name: 'InternshipListed',
        component: () => import('@/views/comPort/internshipListed'),
        meta: { title: '已完成的实习记录' }
      }
    ]
  },
  // 公司端进行中的实习
  {
    path: '/companyPortInternshipListIng',
    component: Layout,
    redirect: '',
    name: 'CompanyPort',
    meta: { },
    children: [
      {
        path: 'list',
        name: 'InternshipListing',
        component: () => import('@/views/comPort/internshipListIng'),
        meta: { title: '实习中的实习记录' }
      }
    ]
  },
  // 家长端实习记录
  {
    path: '/parentPortInternshipList',
    component: Layout,
    redirect: '',
    name: 'ParentPort',
    meta: { title: '查看实习记录' },
    children: [
      {
        path: 'list',
        name: 'internshipList',
        component: () => import('@/views/parPort/internshipList'),
        meta: { title: '实习记录' }
      },
      {
        path: 'todo',
        name: 'todoList',
        component: () => import('@/views/parPort/todo'),
        hidden: true
      },
      {
        path: 'jouList/:stuId',
        name: 'JournaStudentList',
        component: () => import('@/views/parPort/journalList'),
        hidden: true
      }
    ]
  },
  // {
  //   path: '/myinternship',
  //   component: Layout,
  //   redirect: '/journal/list',
  //   name: 'Journal',
  //   meta: { title: '周报管理' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'JournalList',
  //       component: () => import('@/views/journal/list'),
  //       meta: { title: '周报列表' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/dashboard', name: 'NotMatch', hidden: true }
]

console.log('token:', getToken())
const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRouterMap]
})
// console.log('token:', sessionStorage.getItem('rolelist'))
export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // 重置路由
}

export default router
