/* only page components */
import Layout from '@/pages/layout'

const routes = [
  {
    path: '/',
    redirect: '/platform',
    hidden: true
  },
  // { path: '*', component: () => import('@/pages/page404').then(m => m.default) },
  {
    path: '/platform',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/pages/home/index').then(m => m.default)
      },
      {
        path: '/page1',
        name: '页面1',
        component: () => import('@/pages/page1/index').then(m => m.default)
      },
      {
        path: '/page2',
        name: '页面2',
        component: () => import('@/pages/page2').then(m => m.default)
      }
    ]
  },
  {
    path: '/list',
    name: '列表页',
    component: () => import('@/pages/list').then(m => m.default)
  }
]
export default routes
