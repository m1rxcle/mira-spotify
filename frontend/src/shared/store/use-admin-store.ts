import { create } from 'zustand'

import { axiosInstance } from '@/shared/lib/axios'
import type { Stats } from '@/types'

type AdminStore = {
	isAdmin: boolean
	stats: Stats | null
	isLoading: boolean
	getStats: () => Promise<void>
	checkIsAdmin: () => Promise<void>
}

export const useAdminStore = create<AdminStore>()((set) => ({
	isAdmin: false,
	stats: null,

	isLoading: false,

	checkIsAdmin: async () => {
		set({ isLoading: true })
		try {
			const response = await axiosInstance.get('/admin/checkAdmin')
			set({ isAdmin: response.data.admin })
		} catch (error) {
			set({ isAdmin: false })
			console.log('Error checking admin status', error)
		} finally {
			set({ isLoading: false })
		}
	},
	getStats: async () => {
		set({ isLoading: true })
		try {
			const response = await axiosInstance.get('/stats')
			set({ stats: response.data })
		} catch (error) {
			console.log('Error getting stats', error)
		} finally {
			set({ isLoading: false })
		}
	},
}))

export const useAdmin = () => useAdminStore((state) => state.isAdmin)
