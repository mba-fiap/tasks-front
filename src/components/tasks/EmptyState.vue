<template>
  <PageContainer class="flex justify-center items-center">
    <div class="w-full h-full flex justify-center items-center flex-col">
      <img src="/images/tasks/empty-list.svg" alt="" width="130" />

      <a-typography-paragraph :content="t('tasks.emptyList.description')" />

      <a-button
        type="primary"
        class="flex justify-center items-center"
        @click="handleOpenAddTaskModal"
      >
        <template #icon>
          <PlusCircleOutlined />
        </template>

        {{ t('tasks.emptyList.buttonCreate') }}
      </a-button>

      <AddTaskModal
        :open="addTaskModalOpen"
        @dismiss="handleCloseAddTaskModal"
      />
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useI18n } from 'vue-i18n'

import { PlusCircleOutlined } from '@ant-design/icons-vue'

import PageContainer from '@/components/PageContainer.vue'

import AddTaskModal from './AddTaskModal.vue'

const { t } = useI18n()

const addTaskModalOpen = ref(false)

const handleOpenAddTaskModal = () => {
  addTaskModalOpen.value = true
}

const handleCloseAddTaskModal = () => {
  addTaskModalOpen.value = false
}
</script>
