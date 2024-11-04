<template>
  <div class="flex flex-col md:flex-row w-screen h-screen">
    <div :class="$style['image']" />

    <div class="flex justify-center items-center w-full h-full flex-1">
      <div class="flex flex-col w-full max-w-[440px] p-5">
        <img
          src="/images/fiap.svg"
          alt="FIAP"
          title="FIAP"
          class="w-44 h-auto mb-10"
        />

        <a-form
          :model="formState"
          :rules="rules"
          name="register"
          autocomplete="off"
          class="w-full p-5 rounded-xl border border-pink-500"
          @finish="onFinish"
        >
          <a-form-item name="name" has-feedback>
            <a-input
              v-model:value="formState.name"
              :placeholder="$t('register.form.name.placeholder')"
            >
              <template #prefix>
                <IdcardOutlined class="mr-1" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="email" has-feedback>
            <a-input
              v-model:value="formState.email"
              :placeholder="$t('register.form.email.placeholder')"
            >
              <template #prefix>
                <UserOutlined class="mr-1" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" has-feedback>
            <a-input-password
              v-model:value="formState.password"
              :placeholder="$t('register.form.password.placeholder')"
            >
              <template #prefix>
                <LockOutlined class="mr-1" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="w-full flex flex-col gap-2">
            <a-button type="primary" html-type="submit">
              {{ $t('register.form.submit') }}
            </a-button>

            <a-button
              type="link"
              class="p-0 h-auto flex justify-center items-center"
              @click="handleGoToLogin"
            >
              <ArrowLeftOutlined />

              {{ $t('register.form.login') }}
            </a-button>

            <div
              class="w-full flex justify-center items-center flex-col text-center mt-4"
            >
              <a-typography-paragraph
                class="!mb-0"
                :content="$t('register.form.terms.0')"
              />

              <div class="flex justify-center items-center gap-1.5">
                <a-typography-link
                  :content="$t('register.form.terms.1')"
                  href="https://fiap.com.br"
                  target="_blank"
                  underline
                />

                <a-typography-paragraph
                  class="!mb-0"
                  :content="$t('register.form.terms.2')"
                />

                <a-typography-link
                  :content="$t('register.form.terms.3')"
                  href="https://fiap.com.br"
                  target="_blank"
                  underline
                />
              </div>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { validateEmail } from '@/utils/validate-email'
import {
  IdcardOutlined,
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons-vue'

import { RouteNames } from '@/router/routes-names'

import type { Rule } from 'ant-design-vue/es/form'

const { t } = useI18n()

const router = useRouter()

interface FormState {
  name: string
  email: string
  password: string
}

const formState = reactive<FormState>({
  name: '',
  email: '',
  password: '',
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: t('register.form.name.required') }],
  email: [
    {
      required: true,
      validator: (_rule: Rule, email: string) =>
        validateEmail(email, {
          required: t('register.form.email.required'),
          invalid: t('register.form.email.invalid'),
        }),
    },
  ],
  password: [{ required: true, message: t('register.form.password.required') }],
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const handleGoToLogin = () => {
  router.push({ name: RouteNames.LOGIN })
}
</script>

<style lang="scss" module>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.image {
  @apply w-full md:w-1/2 xl:w-1/3 h-[15%] md:h-full;
  animation: fade-in 0.2s ease-in-out;
  background: url('/images/background-register.png') no-repeat center center;
  background-size: cover;
}
</style>
