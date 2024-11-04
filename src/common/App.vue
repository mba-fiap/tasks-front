<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#ED1164',
        colorInfo: '#91A3AD',
      },
    }"
  >
    <div class="absolute top-1 right-1 flex gap-2">
      <a-tooltip
        placement="topLeft"
        title="Alterar idioma para Português (pt-BR)"
      >
        <button @click="changeLanguage(Locales.ptBR)">
          <img
            src="/images/flags/pt-BR.svg"
            alt="Bandeira do Brasil"
            width="25"
            height="17"
          />
        </button>
      </a-tooltip>

      <a-tooltip placement="topLeft" title="Change language to English (en-us)">
        <button @click="changeLanguage(Locales.enUS)">
          <img
            src="/images/flags/en-US.svg"
            alt="Flag of the United States of America"
            width="31"
            height="15"
          />
        </button>
      </a-tooltip>
    </div>

    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { Locales, STORAGE_KEY } from '@/locales/i18n'

const { locale } = useI18n()

const changeLanguage = (lang: string) => {
  locale.value = lang

  localStorage.setItem(STORAGE_KEY, lang)
}
</script>
