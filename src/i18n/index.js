import en from 'i18n/en'
import vi from 'i18n/vi'
import yupLocale from 'i18n/yupLocale'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { setLocale } from 'yup'

export const resources = {
	en: {
		translation: en
	},

	vi: {
		translation: vi
	}
}

setLocale(yupLocale)

i18n.use(initReactI18next).init({
	lng: 'en',
	resources
})
