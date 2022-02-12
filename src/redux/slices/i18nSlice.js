import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
	language: {
		flag: 'GB',
		label: 'English',
		locale: 'en',
		currency: 'USD'
	}
}

const i18nSlice = createSlice({
	name: 'i18n',
	initialState,

	reducers: {
		changeLanguage: (state, { payload }) => {
			state.language = payload
		}
	}
})

const persistConfig = {
	keyPrefix: 'cra-',
	key: 'i18n',
	storage
}

const i18nReducer = persistReducer(persistConfig, i18nSlice.reducer)

export const { changeLanguage } = i18nSlice.actions
export default i18nReducer
