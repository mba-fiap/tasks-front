<template>
  <PageContainer class="flex justify-center items-center">
    <div class="w-full h-full flex justify-center items-center flex-col">
      <img src="/images/tasks/empty-list.svg" alt="" width="130" />

      <a-typography-paragraph :content="t('tasks.emptyList.description')" />

      <a-button
        type="primary"
        class="flex justify-center items-center"
        data-cy="emptyStateAddTaskButton"
        @click="emit('open-add-task-modal')"
      >
        <template #icon>
          <PlusCircleOutlined />
        </template>

        {{ t('tasks.emptyList.buttonCreate') }}
      </a-button>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

import PageContainer from '@/common/components/PageContainer.vue'

const emit = defineEmits(['open-add-task-modal'])

const { t } = useI18n()
</script>
