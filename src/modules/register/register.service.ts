import type { AxiosInstance } from 'axios'

import { createApi } from '@/common/utils/api'

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  id: number
  name: string
  email: string
}

export interface UpdateResponse {
  id: number
  name: string
  email: string
}

class RegisterService {
  private api: AxiosInstance

  constructor() {
    this.api = createApi(import.meta.env.VITE_API_REGISTER)
  }

  async create(payload: RegisterPayload): Promise<RegisterResponse> {
    try {
      const { data } = await this.api.post<RegisterResponse>('/users', payload)

      return data
    } catch (error) {
      console.error('RegisterService/register Error:', error)

      throw error
    }
  }

  async update(payload: RegisterPayload): Promise<UpdateResponse> {
    try {
      const { data } = await this.api.put<UpdateResponse>('/users', payload)

      return data
    } catch (error) {
      console.error('RegisterService/update Error:', error)

      throw error
    }
  }

  async drop(): Promise<void> {
    try {
      await this.api.delete<UpdateResponse>('/users')
    } catch (error) {
      console.error('RegisterService/drop Error:', error)

      throw error
    }
  }
}

export const registerService = new RegisterService()
