<template>
  <PageContainer>
    <div class="w-full flex flex-col gap-2">
      <div v-for="task in tasks" :key="task.id" :class="$style['task-item']">
        <div
          data-cy="tasksListCompleteTask"
          :class="[
            'w-6 h-6 p-2 flex justify-center items-center',
            'rounded-full border-2 border-gray-600',
            {
              'bg-gray-600': task.completionDate,
              'cursor-pointer hover:bg-gray-600': !task.completionDate,
            },
          ]"
          @click="handleCompleteTask(task.id)"
        >
          <CheckOutlined
            v-if="task.completionDate"
            :style="{ fontSize: '14px' }"
            class="text-white"
          />
        </div>

        <div class="w-full flex flex-col flex-1 gap-1">
          <a-typography-title
            :level="5"
            class="!mb-0 !font-normal"
            :delete="!!task.completionDate"
          >
            {{ task.title }}
          </a-typography-title>

          <a-typography-paragraph
            v-if="!task.completionDate"
            class="!mb-0 text-sm"
          >
            {{ t('tasks.list.completedAt') }}:
            {{ dayjs(task.date).format('DD/MM/YYYY') }}
          </a-typography-paragraph>

          <a-typography-paragraph v-else class="!mb-0 text-sm" delete>
            {{ t('tasks.list.completed') }}:
            {{ dayjs(task.completionDate).format('DD/MM/YYYY') }}
          </a-typography-paragraph>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

import { useI18n } from 'vue-i18n'

import { useQueryClient, useMutation } from '@tanstack/vue-query'

import { CheckOutlined } from '@ant-design/icons-vue'

import PageContainer from '@/common/components/PageContainer.vue'

import type { Task } from '@/modules/tasks/tasks.service'

import { tasksService } from '@/modules/tasks/tasks.service'

defineProps<{
  tasks: Task[]
}>()

const { t } = useI18n()

const queryClient = useQueryClient()

const completeTaskMutation = useMutation({
  mutationFn: (taskId: string) => tasksService.complete(taskId),
  onSuccess: () => {
    queryClient.invalidateQueries(['tasks'])
  },
  onError: error => {
    console.error('Error completing task:', error)
  },
})

const handleCompleteTask = async (id: string) => {
  try {
    await completeTaskMutation.mutateAsync(id)
  } catch (error) {
    console.error('Error completing task:', error)
  }
}
</script>

<style lang="scss" module>
.task-item {
  @apply w-full flex justify-between items-center p-4 gap-4 transition;
  @apply rounded-2xl border border-transparent;
  @apply bg-gray-200 hover:bg-gray-300 hover:border-gray-400;
}
</style>
