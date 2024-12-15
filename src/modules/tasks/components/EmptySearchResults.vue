<template>
  <PageContainer class="flex justify-center items-center">
    <div class="w-full h-full flex justify-center items-center flex-col">
      <img src="/images/tasks/empty-list.svg" alt="" width="130" />

      <a-typography-paragraph
        :content="t('tasks.emptySearchResults.description')"
      />
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import PageContainer from '@/common/components/PageContainer.vue'

const { t } = useI18n()
</script>
