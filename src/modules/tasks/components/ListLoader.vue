<template>
  <PageContainer class="flex flex-col gap-2">
    <div
      v-for="line in 4"
      :key="line"
      class="w-full rounded-2xl p-4 bg-gray-200"
    >
      <a-skeleton avatar :active="line % 2 !== 0" :paragraph="{ rows: 1 }" />
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import PageContainer from '@/common/components/PageContainer.vue'
</script>
