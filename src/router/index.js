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
  { path: '*', redirect: '/dashboard', name: 'NotMatch', hidden: true },
  // { path: '/parPort', component: () => import('@/views/parPort'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      },
      {
        path: '/teaEdit/:id',
        component: () => import('@/views/teacher/form'),
        hidden: true },
      {
        path: '/stuEdit/:id',
        component: () => import('@/views/student/form'),
        hidden: true },
      {
        path: '/comEdit/:id',
        component: () => import('@/views/company/form'),
        hidden: true },
      {
        path: '/parEdit/:id',
        component: () => import('@/views/parPort/form'),
        hidden: true }
    ]

  }]
export const asyncRouterMap = [
  // ???????????????
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: 'Teacher',
    meta: { title: '???????????????' },
    children: [
      {
        path: 'list',
        name: 'TeacherList',
        component: () => import('@/views/teacher/list'),
        meta: { title: '???????????????' }
      },
      {
        path: 'create',
        name: 'TeacherCreate',
        component: () => import('@/views/teacher/form'),
        meta: { title: '???????????????' }
      },
      {
        path: 'edit/:id',
        name: 'TeacherEdit',
        component: () => import('@/views/teacher/form'),
        meta: { title: '???????????????' },
        hidden: true
      }
    ]
  },

  // ????????????
  {
    path: '/student',
    component: Layout,
    redirect: '/student/list',
    name: 'Student',
    meta: { title: '????????????' },
    children: [
      {
        path: 'list',
        name: 'StudentList',
        component: () => import('@/views/student/list'),
        meta: { title: '????????????' }
      },
      {
        path: 'create',
        name: 'StudentCreate',
        component: () => import('@/views/student/form'),
        meta: { title: '????????????' }
      },
      {
        path: 'parentList',
        name: 'ParentList',
        component: () => import('@/views/student/parentList'),
        meta: { title: '??????????????????' }
      },
      {
        path: 'editStu/:id',
        name: 'StudentEdit',
        component: () => import('@/views/student/form'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'editPar/:id',
        name: 'ParentEdit',
        component: () => import('@/views/parPort/form'),
        meta: { title: '??????????????????' },
        hidden: true
      }
    ]
  },
  // ????????????
  {
    path: '/class',
    component: Layout,
    redirect: '/class/list',
    name: 'Class',
    meta: { title: '????????????', roles: ['0', '1'] },
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import('@/views/class/list'),
        meta: { title: '????????????' }
      },
      {
        path: 'create',
        name: 'ClassCreate',
        component: () => import('@/views/class/form'),
        meta: { title: '????????????' }
      },
      {
        path: 'edit/:id',
        name: 'ClassEdit',
        component: () => import('@/views/class/form'),
        meta: { title: '????????????' },
        hidden: true
      }
    ]
  },

  // ??????????????????
  {
    path: '/company',
    component: Layout,
    redirect: '/company/list',
    name: 'Company',
    meta: { title: '????????????', roles: ['0'] },
    children: [
      {
        path: 'list',
        name: 'CompanyList',
        component: () => import('@/views/company/list'),
        meta: { title: '????????????' }
      },
      {
        path: 'create',
        name: 'CompanyCreate',
        component: () => import('@/views/company/form'),
        meta: { title: '????????????' }
      },
      {
        path: 'edit/:id',
        name: 'CompanyEdit',
        component: () => import('@/views/company/form'),
        meta: { title: '????????????' },
        hidden: true
      }
    ]
  },

  // ??????????????????
  {
    path: '/internship',
    component: Layout,
    redirect: '/internship/list',
    name: 'Internship',
    meta: { title: '??????????????????' },
    children: [
      {
        path: 'list',
        name: 'InternshipList',
        component: () => import('@/views/internship/list'),
        meta: { title: '??????????????????' }
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
        meta: { title: '??????????????????' },
        hidden: true
      }
    ]
  },
  // ?????????????????????
  {
    path: '/stuinternship',
    component: Layout,
    redirect: '/stuinternship/list',
    name: 'stuInternship',
    meta: { title: '??????????????????' },
    children: [
      {
        path: 'list',
        name: 'stuInternshipList',
        component: () => import('@/views/internship/list'),
        meta: { title: '??????????????????' }
      },
      {
        path: 'create',
        name: 'stuInternshipCreate',
        component: () => import('@/views/internship/form'),
        meta: { title: '??????????????????' }
      },
      {
        path: 'edit/:id',
        name: 'stuInternshipEdit',
        component: () => import('@/views/internship/form'),
        meta: { title: '??????????????????' },
        hidden: true
      }
    ]
  },
  // ????????????????????????
  {
    path: '/teaInternship',
    component: Layout,
    redirect: '/teaInternship/listed',
    name: 'teaInternship',
    meta: { title: '????????????' },
    children: [
      {
        path: 'listed',
        name: 'teaInternshipList',
        component: () => import('@/views/teaPort/listed'),
        meta: { title: '??????????????????' }
      },
      {
        path: 'listing',
        name: 'teaInternshipCreate',
        component: () => import('@/views/teaPort/listing'),
        meta: { title: '??????????????????' }
      },
      {
        path: 'jouList/:stuId',
        name: 'JournaStudentList',
        component: () => import('@/views/teaPort/journalList'),
        hidden: true
      }
    ]
  },
  // ????????????  ????????????id????????????
  {
    path: '/journal',
    component: Layout,
    redirect: '/journal/list',
    name: 'Journal',
    meta: { title: '????????????' },
    children: [
      {
        path: 'list',
        name: 'JournalList',
        component: () => import('@/views/journal/list'),
        meta: { title: '????????????' }
      },
      {
        path: 'create',
        name: 'JournalCreate',
        component: () => import('@/views/journal/form'),
        meta: { title: '????????????'
        }
      },
      {
        path: 'edit/:id',
        name: 'JournalEdit',
        component: () => import('@/views/journal/form'),
        meta: { title: '????????????' },
        hidden: true
      }
    ]
  },
  // ?????????????????????
  {
    path: '/companyPortInternshipList',
    component: Layout,
    redirect: '',
    name: 'CompanyPort',
    meta: { title: '??????????????????' },
    children: [
      {
        path: 'list',
        name: 'JournalList',
        component: () => import('@/views/comPort/internshipList'),
        meta: { title: '????????????' }
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
  // ???????????????????????????
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
        meta: { title: '????????????????????????' }
      }
    ]
  },
  // ???????????????????????????
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
        meta: { title: '????????????????????????' }
      }
    ]
  },
  // ?????????????????????
  {
    path: '/parentPortInternshipList',
    component: Layout,
    redirect: '',
    name: 'ParentPort',
    meta: { title: '??????????????????' },
    children: [
      {
        path: 'list',
        name: 'internshipList',
        component: () => import('@/views/parPort/internshipList'),
        meta: { title: '????????????' }
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
  }
  // {
  //   path: '/myinternship',
  //   component: Layout,
  //   redirect: '/journal/list',
  //   name: 'Journal',
  //   meta: { title: '????????????' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'JournalList',
  //       component: () => import('@/views/journal/list'),
  //       meta: { title: '????????????' }
  //     }
  //   ]
  // },

]

console.log('token:', getToken())
const router = new Router({
  // mode: 'history', //??????????????????
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRouterMap]
})
// console.log('token:', sessionStorage.getItem('rolelist'))
export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // ????????????
}

export default router
