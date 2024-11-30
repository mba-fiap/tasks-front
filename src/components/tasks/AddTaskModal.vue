<template>
  <a-modal
    data-cy="TaskModal"
    width="350px"
    :open="open"
    :title="t('tasks.addTask.title')"
    :ok-text="t('tasks.addTask.footer.submit')"
    :ok-button-props="{
      'data-cy': 'AddTaskButton',
    }"
    :cancel-button-props="{
      'data-cy': 'CancelTaskButton',
    }"
    :cancel-text="t('tasks.addTask.footer.cancel')"
    @ok="handleCreateTask"
    @cancel="emit('dismiss')"
  >
    <a-form
      ref="formRef"
      name="basic"
      autocomplete="off"
      :model="formState"
      :rules="rules"
    >
      <a-typography-paragraph :content="t('tasks.addTask.description')" />

      <a-form-item name="title" has-feedback>
        <a-input
          v-model:value="formState.title"
          data-cy="InputTitleTask"
          :placeholder="t('tasks.addTask.fields.title.placeholder')"
        />
      </a-form-item>

      <div class="w-full rounded-md border border-gray-300">
        <a-calendar
          v-model:value="formState.date"
          data-cy="AddTaskCalendar"
          :fullscreen="false"
          :locale="calendarLocale"
          @panelChange="onPanelChange"
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
})

const rules: Record<string, Rule[]> = {
  title: [
    { required: true, message: t('tasks.addTask.fields.title.required') },
  ],
}

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode)
}

const handleCreateTask = async () => {
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
