import type { AxiosInstance } from 'axios'

import { createApi } from '@/common/utils/api'
import { AUTH_TOKEN_KEY } from '@/common/utils/auth'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

class LoginService {
  private api: AxiosInstance

  constructor() {
    this.api = createApi(import.meta.env.VITE_API_REGISTER)
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const { data } = await this.api.post<LoginResponse>('/sessions', payload)

      this.setToken(data.token)

      return data
    } catch (error) {
      console.error('LoginService/login Error:', error)

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

  private setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  }

  private removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

export const loginService = new LoginService()
