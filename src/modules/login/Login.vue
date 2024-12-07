<template>
  <div class="flex flex-col md:flex-row w-screen h-screen">
    <div
      class="flex justify-center items-center w-full h-full flex-1 order-2 md:order-1"
    >
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
          name="login"
          autocomplete="off"
          class="w-full p-5 rounded-xl border border-pink-500"
          @finish="onFinish"
        >
          <a-form-item name="email" has-feedback>
            <a-input
              v-model:value="formState.email"
              data-cy="loginFieldEmail"
              :placeholder="t('login.form.email.placeholder')"
            >
              <template #prefix>
                <UserOutlined class="mr-1" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" has-feedback>
            <a-input-password
              v-model:value="formState.password"
              data-cy="loginFieldPassword"
              :placeholder="t('login.form.password.placeholder')"
            >
              <template #prefix>
                <LockOutlined class="mr-1" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="w-full flex flex-col gap-2">
            <a-button
              type="primary"
              html-type="submit"
              data-cy="loginButtonSubmit"
            >
              {{ t('login.form.submit') }}
            </a-button>

            <a-button
              type="link"
              class="p-0 h-auto"
              @click="handleGoToRegister"
            >
              {{ t('login.form.register') }}
            </a-button>
          </div>
        </a-form>
      </div>
    </div>

    <div :class="$style['image']" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import { useI18n } from 'vue-i18n'

import { useRouter } from 'vue-router'

import { validateEmail } from '@/common/utils/validate-email'

import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

import type { Rule } from 'ant-design-vue/es/form'

import { RouteNames } from '@/common/router/routes-names'

import { loginService } from './login.service'

const { t } = useI18n()

const router = useRouter()

interface FormState {
  email: string
  password: string
}

const formState = reactive<FormState>({
  email: '',
  password: '',
})

const rules: Record<string, Rule[]> = {
  email: [
    {
      required: true,
      validator: (_rule: Rule, email: string) =>
        validateEmail(email, {
          required: t('login.form.email.required'),
          invalid: t('login.form.email.invalid'),
        }),
    },
  ],
  password: [{ required: true, message: t('login.form.password.required') }],
}

const onFinish = async ({ email, password }: FormState) => {
  await loginService.login({
    email,
    password,
  })

  router.push({ name: RouteNames.TASKS })
}

const handleGoToRegister = () => {
  router.push({ name: RouteNames.REGISTER })
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
  @apply w-full md:w-1/2 xl:w-1/3 h-[15%] md:h-full order-1 md:order-2;
  animation: fade-in 0.2s ease-in-out;
  background: url('/images/background-login.png') no-repeat center center;
  background-size: cover;
}
</style>
