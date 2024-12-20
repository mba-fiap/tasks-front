<template>
  <a-modal
    width="350px"
    :open="open"
    :title="t('tasks.addTask.title')"
    :ok-text="t('tasks.addTask.footer.submit')"
    :ok-button-props="{
      'data-cy': 'addTaskModalAddBtn',
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
      data-cy="addTasksModal"
    >
      <a-typography-paragraph :content="t('tasks.addTask.description')" />

      <a-form-item name="title" has-feedback>
        <a-input
          v-model:value="formState.title"
          data-cy="addTaskModalTitleInput"
          :placeholder="t('tasks.addTask.fields.title.placeholder')"
        />
      </a-form-item>

      <div class="w-full rounded-md border border-gray-300">
        <a-calendar
          v-model:value="formState.date"
          :fullscreen="false"
          :locale="calendarLocale"
        />
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { FormInstance } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/date-picker/locale/en_US'
import ptBR from 'ant-design-vue/es/date-picker/locale/pt_BR'
import type { Rule } from 'ant-design-vue/es/form'
import dayjs, { Dayjs } from 'dayjs'
import { ref, type Ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { tasksService } from '@/modules/tasks/tasks.service'

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

const queryClient = useQueryClient()

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

const createTaskMutation = useMutation({
  mutationFn: (newTask: any) => tasksService.create(newTask),
  onSuccess: () => {
    queryClient.invalidateQueries(['tasks'])
  },
  onError: error => {
    console.error('Error creating task:', error)
  },
})

const handleCreateTask = async () => {
  if (formRef.value) {
    try {
      await formRef.value.validate()

      await createTaskMutation.mutateAsync(formState)

      emit('dismiss')
    } catch (error) {
      console.error('Validation error:', error)
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
