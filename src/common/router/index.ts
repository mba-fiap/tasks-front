import { createRouter, createWebHistory } from 'vue-router'

import type { Middleware } from './middleware'
import { auth } from './middleware/auth'
import { RouteNames } from './routes-names'

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: Array<Middleware>
  }
}

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
      meta: { middleware: [auth] },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middleware as Middleware[] | undefined

  if (!middlewares || middlewares.length === 0) {
    next()

    return
  }

  const context = { to, from, next }

  const executeMiddleware = (index: number) => {
    if (index >= middlewares.length) {
      next()

      return
    }

    const currentMiddleware = middlewares[index]

    currentMiddleware(context.to, context.from, (location?: any) => {
      if (
        typeof location === 'string' ||
        typeof location === 'object' ||
        location === false
      ) {
        next(location)
      } else {
        executeMiddleware(index + 1)
      }
    })
  }

  executeMiddleware(0)
})

export default router
