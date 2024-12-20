import type { AxiosInstance } from 'axios'

import { createApi } from '@/common/utils/api'
import { AUTH_TOKEN_KEY } from '@/common/utils/auth'

export interface ProfileResponse {
  id: number
  name: string
  email: string
}

class UsersService {
  private api: AxiosInstance

  constructor() {
    this.api = createApi(import.meta.env.VITE_API_REGISTER)
  }

  async profile(): Promise<ProfileResponse> {
    try {
      const { data } = await this.api.get<ProfileResponse>('/users')

      return data
    } catch (error) {
      console.error('UsersService/profile Error:', error)

      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      this.removeToken()
    } catch (error) {
      console.error('LoginService/logout Error:', error)

      throw error
    }
  }

  private removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

export const usersService = new UsersService()
