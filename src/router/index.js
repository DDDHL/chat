import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/UserLogin'),
  },
  {
    path: '/index',
    component: () => import('@/pages/SystemIndex'),
    redirect: '/leftCenter',
    children: [
      {
        path: '/leftCenter',
        component: () => import('@/components/LeftCenter'),
        children: [
          {
            path: '/chatFrame',
            component: () => import('@/components/ChatFrame'),
          },
        ],
      },
      {
        path: '/friendGroup',
        component: () => import('@/components/FriendGroup'),
      },
      {
        path: '/chatPerson',
        component: () => import('@/components/ChatPerson'),
      },
      {
        path: '/SystemSetting',
        component: () => import('@/components/SystemSetting'),
      },
    ],
  },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
