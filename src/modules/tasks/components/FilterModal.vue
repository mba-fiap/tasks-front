<template>
  <a-modal
    width="350px"
    :open="open"
    :title="t('tasks.filter.modal.title')"
    :ok-button-props="{
      'data-cy': 'filterTaskBtn',
    }"
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
          data-cy="filterModalInputTitle"
          :placeholder="t('tasks.filter.modal.fields.title.placeholder')"
        />
      </a-form-item>

      <a-range-picker
        v-model:value="formState.date"
        :locale="calendarLocale"
        class="w-full mb-4"
      />

      <div class="w-full flex items-center gap-4 mb-4">
        <a-select ref="select" v-model:value="formState.status" class="w-full">
          <a-select-option :value="TaskStatus.ALL">
            {{ t('tasks.filter.modal.fields.status.all') }}
          </a-select-option>

          <a-select-option :value="TaskStatus.ACTIVE">
            {{ t('tasks.filter.modal.fields.status.active') }}
          </a-select-option>

          <a-select-option :value="TaskStatus.INACTIVE">
            {{ t('tasks.filter.modal.fields.status.completed') }}
          </a-select-option>
        </a-select>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/date-picker/locale/en_US'
import ptBR from 'ant-design-vue/es/date-picker/locale/pt_BR'
import type { Rule } from 'ant-design-vue/es/form'
import dayjs, { Dayjs } from 'dayjs'
import { ref, type Ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { TaskStatus } from '@/modules/tasks/tasks.enum'
import type { FilterTaskPayload } from '@/modules/tasks/tasks.service'

interface FormState {
  title: string
  date: Dayjs[]
  status: TaskStatus
}

type SupportedLocales = 'pt-BR' | 'en-US'

const emit = defineEmits<{
  (e: 'dismiss'): void
  (e: 'apply-filter', filterPayload: FilterTaskPayload): void
}>()

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
  date: [dayjs(), dayjs().add(-7, 'd')],
  status: TaskStatus.ALL,
})

const rules: Record<string, Rule[]> = {
  status: [{ required: true }],
}

const handleFilterTasks = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    const { title = '', date = [], status } = formState

    const start =
      Array.isArray(date) && date[0]
        ? date[0].startOf('day').toDate()
        : undefined

    const end =
      Array.isArray(date) && date[1] ? date[1].endOf('day').toDate() : undefined

    const filterPayload: FilterTaskPayload = {
      title: title || undefined,
      start,
      end,
      status: status === TaskStatus.ALL ? undefined : status,
    }

    emit('apply-filter', filterPayload)

    emit('dismiss')
  } catch (error) {
    console.error('Validation error:', error)
  }
}

const calendarLocale = computed(() => {
  if (locale.value in localeMap) {
    return localeMap[locale.value as SupportedLocales]
  }

  return ptBR
})
</script>
