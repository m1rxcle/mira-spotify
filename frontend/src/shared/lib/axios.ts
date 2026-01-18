import axios from 'axios'

import { useAuthStore } from '../store/use-auth-store'

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api',
	withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken
	if (token) config.headers.Authorization = `Bearer ${token}`

	return config
})

axiosInstance.interceptors.response.use(
	(res) => res,
	async (err) => {
		const originalRequest = err.config
		if (err.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			const success = await useAuthStore.getState().refreshAccessToken()

			if (success) {
				originalRequest.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`
				return axiosInstance(originalRequest)
			}
		}
		return Promise.reject(err)
	}
)
