<template>
  <a-modal
    width="350px"
    :open="open"
    :title="t('tasks.filter.modal.title')"
    :ok-text="t('tasks.filter.modal.footer.submit')"
    :cancel-text="t('tasks.filter.modal.footer.cancel')"
    @ok="handleFilterTasks"
    @cancel="emit('dismiss')"
  >
    <a-form
      ref="formRef"
      name="basic"
      autocomplete="off"
      :model="formState"
      :rules="rules"
    >
      <a-form-item name="title" has-feedback>
        <a-input
          v-model:value="formState.title"
          :placeholder="t('tasks.filter.modal.fields.title.placeholder')"
        />
      </a-form-item>

      <div class="w-full rounded-md border border-gray-300 mb-4">
        <a-calendar
          v-model:value="formState.date"
          :fullscreen="false"
          :locale="calendarLocale"
          @panelChange="onPanelChange"
        />
      </div>

      <div class="w-full flex items-center gap-4 mb-4">
        <a-switch v-model:checked="formState.status" size="small" />

        <a-typography-paragraph
          v-if="formState.status"
          :content="t('tasks.filter.modal.fields.status.completed')"
          class="!mb-0"
        />

        <a-typography-paragraph
          v-else
          :content="t('tasks.filter.modal.fields.status.pending')"
          class="!mb-0"
        />
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, type Ref, reactive, computed } from 'vue'

import type { FormInstance } from 'ant-design-vue'

import dayjs, { Dayjs } from 'dayjs'

import { useI18n } from 'vue-i18n'

import ptBR from 'ant-design-vue/es/date-picker/locale/pt_BR'
import enUS from 'ant-design-vue/es/date-picker/locale/en_US'

import type { Rule } from 'ant-design-vue/es/form'

interface FormState {
  title: string
  date: Dayjs
  status: 'todo' | 'done'
}

type SupportedLocales = 'pt-BR' | 'en-US'

const emit = defineEmits(['dismiss'])

defineProps({
  open: Boolean,
})

const localeMap: Record<SupportedLocales, typeof ptBR> = {
  'pt-BR': ptBR,
  'en-US': enUS,
}

const { t, locale } = useI18n()

const formRef: Ref<FormInstance | null> = ref(null)

const formState = reactive<FormState>({
  title: '',
  date: dayjs(),
  status: 'todo',
})

const rules: Record<string, Rule[]> = {
  title: [
    { required: true, message: t('tasks.filter.modal.fields.title.required') },
  ],
  status: [{ required: true }],
}

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode)
}

const handleFilterTasks = async () => {
  if (formRef.value) {
    try {
      await formRef.value.validate()

      console.log('Formulário validado com sucesso!')
    } catch (error) {
      console.error('Erro de validação:', error)
    }
  }
}

const calendarLocale = computed(() => {
  if (locale.value in localeMap) {
    return localeMap[locale.value as SupportedLocales]
  }

  return ptBR
})
</script>
