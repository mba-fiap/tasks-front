import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import App from './common/App.vue'
import i18n from './common/locales/i18n'
import './common/base.css'

import router from './common/router'

import Antd from 'ant-design-vue'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(i18n)

app.use(Antd)

app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
