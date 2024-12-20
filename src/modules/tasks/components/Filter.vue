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
          data-cy="openModalAddTask"
          @click="emit('open-add-task-modal')"
        >
          <template #icon>
            <PlusCircleOutlined />
          </template>

          {{ t('tasks.filter.addTask') }}
        </a-button>

        <a-tooltip
          placement="topRight"
          :title="t('tasks.filter.buttonFilterTooltip')"
        >
          <a-button
            :icon="h(FilterOutlined)"
            type="dashed"
            class="flex justify-center items-center"
            data-cy="openFilterButton"
            @click="handleOpenFilterModal"
          />
        </a-tooltip>

        <a-tooltip
          v-if="hasSelectedFilters"
          placement="topRight"
          :title="t('tasks.filter.buttonClearTooltip')"
        >
          <a-button
            :icon="h(ReloadOutlined)"
            class="flex justify-center items-center"
            data-cy="clearFilterButton"
            @click="handleClearFilter"
          />
        </a-tooltip>
      </div>
    </div>

    <div v-if="hasSelectedFilters" class="w-full flex flex-col gap-2 mt-4">
      <a-typography-title
        :content="t(`${searchResultsI18nKey}.title`)"
        :level="5"
        class="!text-gray-500"
      />

      <a-typography-text v-if="filter.title" class="!text-gray-700 !mb-0">
        <strong>{{ t(`${searchResultsI18nKey}.filters.title`) }}: </strong>
        {{ filter.title }}
      </a-typography-text>

      <a-typography-text v-if="buildDatePart" class="!text-gray-700 !mb-0">
        <strong>{{ t(`${searchResultsI18nKey}.filters.period`) }}: </strong>
        <span v-html="buildDatePart" />
      </a-typography-text>

      <a-typography-text class="!text-gray-700 !mb-0">
        <strong
          >{{ t(`${searchResultsI18nKey}.filters.status.title`) }}:
        </strong>
        {{ buildStatusPart }}
      </a-typography-text>

      <a-divider />
    </div>

    <FilterModal
      :open="isFilterModalOpen"
      @dismiss="handleCloseFilterModal"
      @apply-filter="handleSetFilterPayload"
    />
  </PageContainer>
</template>

<script lang="ts" setup>
import {
  PlusCircleOutlined,
  FilterOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { h, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import PageContainer from '@/common/components/PageContainer.vue'

import { TaskStatus } from '@/modules/tasks/tasks.enum'
import type { FilterTaskPayload } from '@/modules/tasks/tasks.service'

import FilterModal from './FilterModal.vue'

const emit = defineEmits<{
  (e: 'open-add-task-modal'): void
  (e: 'apply-filter', filterPayload: FilterTaskPayload): void
}>()

const searchResultsI18nKey = 'tasks.filter.searchResults'

const { t } = useI18n()

const isFilterModalOpen = ref(false)

const filter = ref<FilterTaskPayload>({})

const handleOpenFilterModal = () => {
  isFilterModalOpen.value = true
}

const handleCloseFilterModal = () => {
  isFilterModalOpen.value = false
}

const handleSetFilterPayload = (payload: FilterTaskPayload) => {
  filter.value = payload

  emit('apply-filter', payload)
}

const handleClearFilter = () => {
  filter.value = {}

  emit('apply-filter', {})
}

const buildDatePart = computed(() => {
  const { start, end } = filter.value

  const formatDate = (date: Date) => dayjs(date).format('DD/MM/YY')

  if (start && end) {
    return `<u>${formatDate(start)}</u> ${t(`${searchResultsI18nKey}.until`)} <u>${formatDate(end)}</u>`
  }

  return ''
})

const buildStatusPart = computed(() => {
  const statusMap: Record<TaskStatus, string> = {
    [TaskStatus.ALL]: t(`${searchResultsI18nKey}.filters.status.all`),
    [TaskStatus.ACTIVE]: t(`${searchResultsI18nKey}.filters.status.active`),
    [TaskStatus.INACTIVE]: t(`${searchResultsI18nKey}.filters.status.inactive`),
  }

  return statusMap[filter.value?.status ?? TaskStatus.ALL]
})

const hasSelectedFilters = computed(() => {
  return Object.keys(filter.value).length > 0
})
</script>
