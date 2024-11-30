<template>
  <PageContainer class="flex-none mb-4">
    <div
      class="w-full py-2 px-4 flex justify-between items-center rounded-lg bg-gray-100"
    >
      <a-typography-title
        :level="4"
        class="!mb-0 !text-red-500"
        :content="t('tasks.filter.title')"
      />

      <div class="flex justify-center items-center gap-1">
        <a-button
          class="flex justify-center items-center"
          type="primary"
          data-cy="OpenTaskButton"
          @click="emit('openAddTaskModal')"
        >
          <template #icon>
            <PlusCircleOutlined />
          </template>

          {{ t('tasks.filter.addTask') }}
        </a-button>

        <a-tooltip
          placement="topRight"
          :title="t('tasks.filter.buttonTooltip')"
        >
          <a-button
            :icon="h(FilterOutlined)"
            type="dashed"
            class="flex justify-center items-center"
            data-cy="OpenFilterButton"
            @click="handleOpenFilterModal"
          />
        </a-tooltip>
      </div>
    </div>

    <FilterModal :open="isFilterModalOpen" @dismiss="handleCloseFilterModal" />
  </PageContainer>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'

import { useI18n } from 'vue-i18n'

import { PlusCircleOutlined, FilterOutlined } from '@ant-design/icons-vue'

import PageContainer from '@/components/PageContainer.vue'

import FilterModal from './FilterModal.vue'

const emit = defineEmits(['openAddTaskModal'])

const { t } = useI18n()

const isFilterModalOpen = ref(false)

const handleOpenFilterModal = () => {
  isFilterModalOpen.value = true
}

const handleCloseFilterModal = () => {
  isFilterModalOpen.value = false
}
</script>
