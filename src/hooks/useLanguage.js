import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectLanguage } from 'redux/selectors/i18nSelector'
import { changeLanguage } from 'redux/slices/i18nSlice'

const languages = [
	{
		flag: 'US',
		label: 'English',
		locale: 'en',
		currency: 'USD'
	},
	{
		flag: 'VN',
		label: 'Vietnamese',
		locale: 'vi',
		currency: 'VND'
	}
]

const useLanguage = () => {
	const dispatch = useDispatch()
	const language = useSelector(selectLanguage)
	const { i18n } = useTranslation()

	const setLanguage = useCallback(
		newLanguage => {
			dispatch(changeLanguage(newLanguage))
		},
		[dispatch]
	)

	useEffect(() => {
		setTimeout(() => {
			i18n.changeLanguage(language.locale)
		}, 100)
	}, [i18n, language.locale])

	return {
		languages,

		language,
		setLanguage
	}
}

export default useLanguage
