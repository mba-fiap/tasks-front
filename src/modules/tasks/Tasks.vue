<template>
  <div class="w-full flex flex-col min-h-screen">
    <Header />

    <ListLoader v-if="isLoading" />

    <EmptyState
      v-else-if="showEmptyState"
      @open-add-task-modal="handleOpenAddTaskModal"
    />

    <template v-else>
      <Filter
        @open-add-task-modal="handleOpenAddTaskModal"
        @apply-filter="handleApplyFilter"
      />

      <EmptySearchResults v-if="showEmptySearchResults" />

      <List v-else :tasks="tasks" />
    </template>

    <Footer />

    <AddTaskModal :open="addTaskModalOpen" @dismiss="handleCloseAddTaskModal" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'

import { useI18n } from 'vue-i18n'

import { useMutation, useQuery } from '@tanstack/vue-query'

import { type Task, tasksService } from './tasks.service'

import Header from '@/common/components/Header.vue'

import EmptyState from './components/EmptyState.vue'

import EmptySearchResults from './components/EmptySearchResults.vue'

import AddTaskModal from './components/AddTaskModal.vue'

import Filter from './components/Filter.vue'

import ListLoader from './components/ListLoader.vue'

import List from './components/List.vue'

import Footer from '@/common/components/Footer.vue'

import { notification } from 'ant-design-vue'

import type { FilterTaskPayload } from '@/modules/tasks/tasks.service'

const { t } = useI18n()

const { data, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => tasksService.filter({}),
})

const tasks = ref<Task[]>([])

const filterPayload = ref<FilterTaskPayload>({})

const addTaskModalOpen = ref(false)

const handleOpenAddTaskModal = () => {
  addTaskModalOpen.value = true
}

const handleCloseAddTaskModal = () => {
  addTaskModalOpen.value = false
}

const applyFilterMutation = useMutation({
  mutationFn: () => tasksService.filter(filterPayload.value),
  onSuccess: data => {
    tasks.value = data
  },
  onError: error => {
    console.error('Error filtering tasks:', error)

    notification.error({
      message: t('tasks.filter.alerts.error'),
      placement: 'top',
      duration: 8.5,
    })
  },
})

const handleApplyFilter = (payload: FilterTaskPayload) => {
  filterPayload.value = payload

  applyFilterMutation.mutate()
}

const hasTasks = computed(() => tasks.value?.length > 0)

const hasSomeFIlter = computed(
  () => Object.keys(filterPayload.value).length > 0,
)

const showEmptyState = computed(() => !hasSomeFIlter.value && !hasTasks.value)

const showEmptySearchResults = computed(
  () => hasSomeFIlter.value && !hasTasks.value,
)

watchEffect(() => {
  if (data.value) {
    tasks.value = data.value
  }
})
</script>
