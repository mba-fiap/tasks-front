import { createI18n } from 'vue-i18n'

const messages: Record<string, any> = {}

export enum Locales {
  ptBR = 'pt-BR',
  enUS = 'en-US',
}

export const STORAGE_KEY = 'fiapTasks:UserLanguage'

const loadLocaleMessages = () => {
  const locales = import.meta.glob('./**/**/*.json', {
    eager: true,
  }) as Record<string, { default: Record<string, any> }>

  for (const path in locales) {
    const [, locale, context] = path.match(/\.\/(.*?)\/(.*?)\.json$/) || []

    if (locale && context) {
      if (!messages[locale]) {
        messages[locale] = {}
      }

      messages[locale][context] = locales[path].default
    }
  }
}

loadLocaleMessages()

const savedLocale = localStorage.getItem(STORAGE_KEY) || Locales.ptBR

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: Locales.ptBR,
  messages,
})

export default i18n
