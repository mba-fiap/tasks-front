<template>
  <PageContainer>
    <div class="w-full flex flex-col gap-2">
      <div :class="$style['task-item']">
        <div
          :class="[
            'w-6 h-6 p-2 flex justify-center items-center cursor-pointer',
            'rounded-full border-2 border-gray-600',
            {
              'hover:bg-gray-600': true,
            },
          ]"
        />

        <div class="w-full flex flex-col flex-1">
          <a-typography-title :level="4" class="!mb-0">
            Dentista
          </a-typography-title>

          <a-typography-paragraph class="!mb-0">
            Conclusão em: 14/09/2024
          </a-typography-paragraph>
        </div>
      </div>

      <div :class="$style['task-item']">
        <div
          :class="[
            'w-6 h-6 p-2 flex justify-center items-center cursor-pointer',
            'rounded-full border-2 border-gray-600',
            {
              'hover:bg-gray-600': true,
            },
          ]"
        />

        <div class="w-full flex flex-col flex-1">
          <a-typography-title :level="4" class="!mb-0">
            Tarefa 1
          </a-typography-title>

          <a-typography-paragraph class="!mb-0">
            Conclusão em: 14/09/2024
          </a-typography-paragraph>
        </div>
      </div>

      <div :class="$style['task-item']">
        <div
          :class="[
            'w-6 h-6 p-2 flex justify-center items-center cursor-pointer',
            'rounded-full border-2 border-gray-600 bg-gray-600',
          ]"
        >
          <CheckOutlined :style="{ fontSize: '14px' }" class="text-white" />
        </div>

        <div class="w-full flex flex-col flex-1">
          <a-typography-title :level="4" class="!mb-0" delete>
            Tarefa 2
          </a-typography-title>

          <a-typography-paragraph class="!mb-0" delete>
            Concluído em: 18/10/2021
          </a-typography-paragraph>
        </div>
      </div>

      <div :class="$style['task-item']">
        <div
          :class="[
            'w-6 h-6 p-2 flex justify-center items-center cursor-pointer',
            'rounded-full border-2 border-gray-600 bg-gray-600',
          ]"
        >
          <CheckOutlined :style="{ fontSize: '14px' }" class="text-white" />
        </div>

        <div class="w-full flex flex-col flex-1">
          <a-typography-title :level="4" class="!mb-0" delete>
            Tarefa 3
          </a-typography-title>

          <a-typography-paragraph class="!mb-0" delete>
            Concluído em: 18/10/2021
          </a-typography-paragraph>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import { CheckOutlined } from '@ant-design/icons-vue'

import PageContainer from '@/components/PageContainer.vue'
</script>

<style lang="scss" module>
.task-item {
  @apply w-full flex justify-between items-center p-4 gap-4 transition;
  @apply rounded-2xl border border-transparent;
  @apply bg-gray-200 hover:bg-gray-300 hover:border-gray-400;
}
</style>
