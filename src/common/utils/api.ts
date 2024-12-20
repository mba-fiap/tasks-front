import { notification } from 'ant-design-vue'
import axios from 'axios'

import i18n from '@/common/locales/i18n'

import { AUTH_TOKEN_KEY } from '@/common/utils/auth'

const t = (i18n as any)?.global?.t

const te = (i18n as any)?.global?.te

interface IResponseData {
  message: string
  issues: Array<{
    instancePath: string
    schemaPath: string
    keyword: string
    params: {
      limit: number
    }
    message: string
  }>
}

export const createApi = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.request.use(config => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        const { data } = error.response

        const errorMessage = 'An unexpected error occurred'

        const apiErrorMessage = data?.message

        const i18nKey = `common.errors.messages.${apiErrorMessage}`

        const hasI18nKey = te(`${i18nKey}.title`)

        notification.error({
          message: hasI18nKey ? t(`${i18nKey}.title`) : 'Ocorreu um erro',
          description: hasI18nKey
            ? t(`${i18nKey}.message`, {
                fields: transformValidationError(data),
              })
            : apiErrorMessage,
          placement: 'top',
          duration: 8.5,
          class: apiErrorMessage,
        })

        return Promise.reject(new Error(errorMessage))
      }

      return Promise.reject(new Error('Network or server error'))
    },
  )

  return api
}

const getFieldName = (instancePath: string) => instancePath.replace('/', '')

const transformValidationError = (apiError: IResponseData) => {
  if (!Array.isArray(apiError.issues)) return ''

  const issueMessages = apiError.issues.map(issue => {
    switch (issue.keyword) {
      case 'minLength':
        return t('common.errors.fields.minLength', {
          field: getFieldName(issue.instancePath),
          limit: issue.params.limit,
        })
      case 'required':
        return t('common.errors.fields.required', {
          field: getFieldName(issue.instancePath),
        })
      case 'pattern':
        return t('common.errors.fields.pattern', {
          field: getFieldName(issue.instancePath),
        })
      case 'maximum':
        return t('common.errors.fields.maximum', {
          field: getFieldName(issue.instancePath),
          limit: issue.params.limit,
        })
      case 'minimum':
        return t('common.errors.fields.minimum', {
          field: getFieldName(issue.instancePath),
          limit: issue.params.limit,
        })
      case 'format':
        return t('common.errors.fields.format', {
          field: getFieldName(issue.instancePath),
        })
      default:
        return t('common.errors.fields.default', {
          field: getFieldName(issue.instancePath),
          message: issue.message,
        })
    }
  })

  return issueMessages.join(' ')
}
