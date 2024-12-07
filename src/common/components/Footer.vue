<template>
  <footer class="w-full py-8 border-b border-gray-200">
    <PageContainer class="flex justify-center items-center">
      <a-typography-paragraph
        :content="
          t('footer.description', {
            year: new Date().getFullYear(),
          })
        "
        strong
        class="!mb-0 text-red-500"
      />
    </PageContainer>
  </footer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import PageContainer from './PageContainer.vue'

const { t } = useI18n()
</script>
