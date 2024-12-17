import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export type Middleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => void
