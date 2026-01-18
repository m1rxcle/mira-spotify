import { create } from 'zustand'

import { useUserStore } from './use-user-store'
import { axiosInstance } from '../lib/axios'

import type { LoginDTO, RegisterDTO } from '@/types'

type AuthStore = {
	isLoggedIn: boolean
	accessToken: string
	message: string
	isLoadingRegister: boolean
	isLoadingLogin: boolean
	setRegisterValues: (values: RegisterDTO) => Promise<{ success: boolean; message: string }>
	setLoginValues: (values: LoginDTO) => Promise<{ success: boolean; message: string }>
	refreshAccessToken: () => Promise<boolean>
	logout: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
	isLoggedIn: false,
	accessToken: '',
	message: '',
	isLoadingRegister: false,
	isLoadingLogin: false,

	setLoginValues: async (values: LoginDTO): Promise<{ success: boolean; message: string }> => {
		set({ isLoadingLogin: true, message: '' })
		try {
			const { data } = await axiosInstance.post('/auth/login', values, { withCredentials: true })
			if (!data) return { success: false, message: 'Error logging in' }
			set({ accessToken: data.accessToken, message: data.message, isLoggedIn: true })
			await useUserStore.getState().setFetchUser()
			return data
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message
			set({ message: errorMessage })
			return { success: false, message: errorMessage }
		} finally {
			set({ isLoadingLogin: false })
		}
	},

	setRegisterValues: async (
		values: RegisterDTO
	): Promise<{ success: boolean; message: string }> => {
		set({ isLoadingRegister: true, message: '' })

		try {
			const { data } = await axiosInstance.post('/auth/register', values, { withCredentials: true })
			set({ accessToken: data.accessToken, message: data.message })
			return data
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message
			set({ message: errorMessage })
			return { success: false, message: errorMessage }
		} finally {
			set({ isLoadingRegister: false })
		}
	},
	refreshAccessToken: async () => {
		try {
			const { data } = await axiosInstance.get('/auth/refresh', { withCredentials: true })
			console.log('Token just refreshed:', data.accessToken)
			if (!data.accessToken) return false
			set({ accessToken: data.accessToken })
			return true
		} catch (error) {
			set({ accessToken: '' })
			console.log(error)
			return false
		}
	},
	logout: async () => {
		try {
			const { data } = await axiosInstance.get('/auth/logout', { withCredentials: true })
			console.log('logout', data)
			set({ accessToken: '', isLoggedIn: false })
			useUserStore.getState().clearUser()
		} catch (error) {
			console.log(error)
		}
	},
}))

// Selectors
export const useIsLoggingIn = () => useAuthStore((state) => state.isLoadingLogin)
export const useAccessToken = () => useAuthStore((state) => state.accessToken)
export const useMessage = () => useAuthStore((state) => state.message)
export const useIsLoadingRegister = () => useAuthStore((state) => state.isLoadingRegister)
export const useIsLoadingLogin = () => useAuthStore((state) => state.isLoadingLogin)

// Actions
export const useSetRegisterValues = () => useAuthStore((state) => state.setRegisterValues)
export const useSetLoginValues = () => useAuthStore((state) => state.setLoginValues)
export const useRefreshAccessToken = () => useAuthStore((state) => state.refreshAccessToken)
export const useLogout = () => useAuthStore((state) => state.logout)
