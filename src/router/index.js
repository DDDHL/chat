import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/UserLogin'),
  },
  {
    path: '/index',
    component: () => import('@/pages/SystemIndex'),
    redirect: '/userList',
    children: [
      {
        path: '/userList',
        component: () => import('@/components/UserList'),
      },
      {
        path: '/chatPerson',
        component: () => import('@/components/ChatPerson'),
      },
    ],
  },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
