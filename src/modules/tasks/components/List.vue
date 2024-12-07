<template>
  <PageContainer>
    <div class="w-full flex flex-col gap-2">
      <div :class="$style['task-item']">
        <div
          data-cy="FinishTaskButton"
          :class="[
            'w-6 h-6 p-2 flex justify-center items-center cursor-pointer',
            'rounded-full border-2 border-gray-600',
            {
              'hover:bg-gray-600': true,
            },
          ]"
        />

        <div class="w-full flex flex-col flex-1 gap-1">
          <a-typography-title :level="5" class="!mb-0 !font-normal">
            Dentista
          </a-typography-title>

          <a-typography-paragraph class="!mb-0 text-sm">
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

        <div class="w-full flex flex-col flex-1 gap-1">
          <a-typography-title :level="5" class="!mb-0 !font-normal">
            Tarefa 1
          </a-typography-title>

          <a-typography-paragraph class="!mb-0 text-sm">
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

        <div class="w-full flex flex-col flex-1 gap-1">
          <a-typography-title :level="5" class="!mb-0 !font-normal" delete>
            Tarefa 2
          </a-typography-title>

          <a-typography-paragraph class="!mb-0 text-sm" delete>
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

        <div class="w-full flex flex-col flex-1 gap-1">
          <a-typography-title :level="5" class="!mb-0 !font-normal" delete>
            Tarefa 3
          </a-typography-title>

          <a-typography-paragraph class="!mb-0 text-sm" delete>
            Concluído em: 18/10/2021
          </a-typography-paragraph>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import { CheckOutlined } from '@ant-design/icons-vue'

import PageContainer from '@/common/components/PageContainer.vue'
</script>

<style lang="scss" module>
.task-item {
  @apply w-full flex justify-between items-center p-4 gap-4 transition;
  @apply rounded-2xl border border-transparent;
  @apply bg-gray-200 hover:bg-gray-300 hover:border-gray-400;
}
</style>
