import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './common/App.vue'
import i18n from './common/locales/i18n'
import './common/base.css'

import router from './common/router'

import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(i18n)

app.use(Antd).mount('#app')
