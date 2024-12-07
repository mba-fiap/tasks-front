import { createRouter, createWebHistory } from 'vue-router'

import { RouteNames } from './routes-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: RouteNames.LOGIN },
    },
    {
      path: '/login',
      name: RouteNames.LOGIN,
      component: () => import('@/modules/login/Login.vue'),
    },
    {
      path: '/register',
      name: RouteNames.REGISTER,
      component: () => import('@/modules/register/Register.vue'),
    },
    {
      path: '/tasks',
      name: RouteNames.TASKS,
      component: () => import('@/modules/tasks/Tasks.vue'),
    },
  ],
})

export default router
