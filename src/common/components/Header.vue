<template>
  <header class="w-full py-8 mb-8 border-b border-gray-200">
    <PageContainer class="flex justify-between items-center">
      <img src="/images/fiap.svg" alt="FIAP" title="FIAP" class="w-44 h-auto" />

      <div class="flex items-center gap-4">
        <a-typography-paragraph
          :content="userName"
          strong
          class="!mb-0 text-red-500"
        />

        <a-tooltip :title="t('header.exitBtnTooltip')">
          <a-button
            type="primary"
            :icon="h(LogoutOutlined)"
            class="flex justify-center items-center"
            @click="handleLogout"
          />
        </a-tooltip>
      </div>
    </PageContainer>
  </header>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'

import { useI18n } from 'vue-i18n'

import { useRouter } from 'vue-router'

import { RouteNames } from '@/common/router/routes-names'

import { LogoutOutlined } from '@ant-design/icons-vue'

import PageContainer from './PageContainer.vue'

import { usersService } from '@/common/services/user.service'

const userName = ref<string>('Lucas Cordeiro')

const { t } = useI18n()

const router = useRouter()

const handleLogout = () => {
  usersService.logout()

  router.push({ name: RouteNames.LOGIN })
}
</script>
