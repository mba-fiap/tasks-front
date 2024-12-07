import type { AxiosInstance } from 'axios'

import { createApi } from '@/common/utils/api'

enum TaskStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export interface Task {
  id: number
  title: string
  date: Date
  status: TaskStatus
  createdAt: Date
  completionDate: Date | ''
}

export interface CreateTaskPayload {
  title: string
  date: Date
}

export interface UpdateTaskPayload {
  title?: string
  date?: Date
  status?: boolean
}

export interface FilterTaskPayload {
  title?: string
  start?: Date
  end?: Date
  status?: TaskStatus
}

class TasksService {
  private api: AxiosInstance

  constructor() {
    this.api = createApi(import.meta.env.VITE_API_TASKS)
  }

  async create(payload: CreateTaskPayload): Promise<Task> {
    try {
      const { data } = await this.api.post<Task>('/tasks', payload)

      return data
    } catch (error) {
      console.error('TasksService/create Error:', error)

      throw error
    }
  }

  async update(id: string, payload: UpdateTaskPayload): Promise<Task> {
    try {
      const { data } = await this.api.put<Task>(`/tasks/${id}`, payload)

      return data
    } catch (error) {
      console.error('TasksService/update Error:', error)

      throw error
    }
  }

  async filter(payload: FilterTaskPayload): Promise<Task[]> {
    const params = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    )

    try {
      const { data } = await this.api.get<Task[]>('/tasks', { params })

      return data
    } catch (error) {
      console.error('TasksService/filter Error:', error)

      throw error
    }
  }

  async complete(id: string): Promise<void> {
    try {
      await this.api.put(`/tasks/${id}/complete`)
    } catch (error) {
      console.error('TasksService/complete Error:', error)

      throw error
    }
  }
}

export const tasksService = new TasksService()
