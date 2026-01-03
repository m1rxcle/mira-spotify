import { create } from 'zustand'

import { axiosInstance } from '@/shared/lib/axios'
import type { Album, Song } from '@/types'

type UserStore = {
	token: string | null

	search: Song[]
	featuredSongs: Song[]
	featuredAlbums: Album[]
	history: Song[]
	message: string
	isLoading: boolean
	hasSearched: boolean

	setToken: (token: string | null) => void

	addSongToHistory: (songId: string) => void
	getSongsHistory: () => void

	setSearch: (query: string) => void

	getFeaturedSongs: () => void
	getFeaturedAlbums: () => void

	toggleFeaturedSongs: (songId: string) => void
	toggleFeaturedAlbums: (albumId: string) => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
	token: null,

	search: [],
	featuredSongs: [],
	featuredAlbums: [],
	message: '',
	history: [],
	isLoading: false,
	hasSearched: false,

	getSongsHistory: async () => {
		const token = get().token

		if (!token) {
			return
		}

		try {
			const response = await axiosInstance.get('/users/history', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			set({ history: response.data })
		} catch (error) {
			console.log('Error fetching songs in store', error)
		}
	},

	addSongToHistory: async (songId: string) => {
		const token = get().token

		if (!token) {
			return
		}

		try {
			await axiosInstance.post(
				'/users/history',
				{ songId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			await get().getSongsHistory()
		} catch (error) {
			console.log('Error fetching songs in store', error)
		}
	},

	setToken: (token: string | null) => {
		set({ token })
	},
	getFeaturedSongs: async () => {
		const token = get().token

		if (!token) {
			return
		}

		set({ isLoading: true })

		try {
			const response = await axiosInstance.get('/users/features', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			set({ featuredSongs: response.data })
		} catch (error) {
			console.log('Error fetching songs in store', error)
		} finally {
			set({ isLoading: false })
		}
	},

	getFeaturedAlbums: async () => {
		const token = get().token

		if (!token) {
			return
		}

		set({ isLoading: true })
		try {
			const response = await axiosInstance.get('/users/features-albums', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			set({ featuredAlbums: response.data })
		} catch (error) {
			console.log('Error fetching albums in store', error)
		} finally {
			set({ isLoading: false })
		}
	},

	toggleFeaturedAlbums: async (albumId: string) => {
		const token = get().token

		if (!token) {
			return
		}

		set({ isLoading: true })
		try {
			const response = await axiosInstance.post(
				'/users/features-albums',
				{ albumId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			set({ message: response.data.message })
			await get().getFeaturedAlbums()
		} catch (error) {
			console.log('Error fetching albums in store', error)
		} finally {
			set({ isLoading: false })
		}
	},

	toggleFeaturedSongs: async (songId: string) => {
		const token = get().token

		if (!token) {
			return
		}

		set({ isLoading: true })
		try {
			const response = await axiosInstance.post(
				'/users/features',
				{ songId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			set({ message: response.data.message })
			await get().getFeaturedSongs()
		} catch (error) {
			console.log('Error fetching songs in store', error)
		} finally {
			set({ isLoading: false })
		}
	},
	setSearch: async (query: string) => {
		if (!query.trim()) {
			set({ search: [], hasSearched: false, isLoading: false })
			return
		}
		set({ hasSearched: false, isLoading: true })

		try {
			const response = await axiosInstance.post('/search', { query })
			set({ search: response.data })
			set({ hasSearched: true })
		} catch (error: unknown) {
			console.log('Error fetching songs in store', error)
		} finally {
			set({ isLoading: false })
		}
	},
}))
