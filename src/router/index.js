import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/HelloWorld'),
  },
  {
    path: '/test',
    component: () => import('@/components/TestCom'),
  },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
