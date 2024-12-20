import dayjs from 'dayjs'

import { RouteNames } from '@/common/router/routes-names'

import { usersService } from '@/common/services/user.service'

import { AUTH_TOKEN_KEY } from '@/common/utils/auth'

import type { Middleware } from './index'

export const auth: Middleware = (_, __, next) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  if (token) {
    const [, payload] = token.split('.')

    const { exp } = JSON.parse(atob(payload))

    if (dayjs().unix() > exp) {
      usersService.logout()

      next({ name: RouteNames.LOGIN })
    } else {
      next()
    }
  } else {
    usersService.logout()

    next({ name: RouteNames.LOGIN })
  }
}
