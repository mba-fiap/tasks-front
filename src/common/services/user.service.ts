import type { AxiosInstance } from 'axios'

import { createApi } from '@/common/utils/api'

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
      const { data } = await this.api.post<ProfileResponse>('/users')

      return data
    } catch (error) {
      console.error('UsersService/profile Error:', error)

      throw error
    }
  }
}

export const usersService = new UsersService()
