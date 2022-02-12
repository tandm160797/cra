import axios from 'axios'

const StorageKeys = {
	Token: 'token',
	RefreshToken: 'refreshToken'
}

const storeToken = (token, refreshToken) => {
	localStorage.setItem(StorageKeys.Token, token)
	localStorage.setItem(StorageKeys.RefreshToken, refreshToken)
}

const destroyToken = () => {
	localStorage.removeItem(StorageKeys.Token)
	localStorage.removeItem(StorageKeys.RefreshToken)
}

const axiosOptions = {
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem(StorageKeys.Token)}`
	}
}

const axiosClient = axios.create(axiosOptions)

let refreshTokenRequesting = null
const refreshToken = async () => {
	const res = await axiosClient.post('auth/refreshToken', {
		refreshToken: localStorage.getItem(StorageKeys.RefreshToken)
	})

	storeToken(res.token, res.refreshToken)
}

axiosClient.interceptors.request.use(
	req => req,
	err => Promise.reject(err)
)

axiosClient.interceptors.response.use(
	res => res.data,
	async err => {
		const { status, data, config } = err.response

		if (status === 401 && data.message === 'jwt expired') {
			try {
				refreshTokenRequesting = refreshTokenRequesting || refreshToken()
				await refreshTokenRequesting
				config.headers.Authorization = `Bearer ${localStorage.getItem(StorageKeys.Token)}`
				refreshTokenRequesting = null
				return axiosClient.request(config)
			} catch {
				destroyToken()
				window.location = 'login'
			}
		}

		return Promise.reject(err)
	}
)

export default axiosClient
