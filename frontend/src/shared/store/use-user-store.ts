import { create } from 'zustand'

import { axiosInstance } from '@/shared/lib/axios'
import type { Album, Song } from '@/types'

type UserStore = {
	token: string | null
	search: Song[]
	hasSearched: boolean
	featuredSongs: Song[]
	featuredAlbums: Album[]
	history: Song[]
	message: string
	isLoadingForUserFeatured: boolean
	isLoadingForUserFeaturedAlbums: boolean
	isLoadingForToggleAlbums: boolean
	isLoadingForToggleSongs: boolean
	isLoadingForSearchSong: boolean

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
	hasSearched: false,
	isLoadingForUserFeatured: false,
	isLoadingForUserFeaturedAlbums: false,
	isLoadingForToggleAlbums: false,
	isLoadingForToggleSongs: false,
	isLoadingForSearchSong: false,

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

		set({ isLoadingForUserFeatured: true })

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
			set({ isLoadingForUserFeatured: false })
		}
	},
	getFeaturedAlbums: async () => {
		const token = get().token

		if (!token) {
			return
		}

		set({ isLoadingForUserFeaturedAlbums: true })
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
			set({ isLoadingForUserFeaturedAlbums: false })
		}
	},
	toggleFeaturedAlbums: async (albumId: string) => {
		const token = get().token

		if (!token) {
			return
		}

		set({ isLoadingForToggleAlbums: true })
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
			set({ isLoadingForToggleAlbums: false })
		}
	},
	toggleFeaturedSongs: async (songId: string) => {
		const token = get().token

		if (!token) {
			return
		}

		set({ isLoadingForToggleSongs: true })
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
			set({ isLoadingForToggleSongs: false })
		}
	},
	setSearch: async (query: string) => {
		if (!query.trim()) {
			set({ search: [], hasSearched: false, isLoadingForSearchSong: false })
			return
		}
		set({ hasSearched: false, isLoadingForSearchSong: true })

		try {
			const response = await axiosInstance.post('/search', { query })
			set({ search: response.data })
			set({ hasSearched: true })
		} catch (error: unknown) {
			console.log('Error fetching songs in store', error)
		} finally {
			set({ isLoadingForSearchSong: false })
		}
	},
}))

export const useToken = () => useUserStore((state) => state.token)
export const useSearch = () => useUserStore((state) => state.search)
export const useHasSearched = () => useUserStore((state) => state.hasSearched)
export const useFeaturedSongs = () => useUserStore((state) => state.featuredSongs)
export const useFeaturedAlbums = () => useUserStore((state) => state.featuredAlbums)
export const useHistory = () => useUserStore((state) => state.history)
export const useMessage = () => useUserStore((state) => state.message)
export const useIsLoadingForUserFeaturedSongs = () =>
	useUserStore((state) => state.isLoadingForUserFeatured)
export const useIsLoadingForUserFeaturedAlbums = () =>
	useUserStore((state) => state.isLoadingForUserFeaturedAlbums)
export const useIsLoadingForToggleAlbums = () =>
	useUserStore((state) => state.isLoadingForToggleAlbums)
export const useIsLoadingForToggleSongs = () =>
	useUserStore((state) => state.isLoadingForToggleSongs)
export const useIsLoadingForSearchSong = () => useUserStore((state) => state.isLoadingForSearchSong)

//setters
export const useSetToken = () => useUserStore((state) => state.setToken)
export const useAddSongsToHistory = () => useUserStore((state) => state.addSongToHistory)
export const useGetSongsHistory = () => useUserStore((state) => state.getSongsHistory)
export const useSetSearch = () => useUserStore((state) => state.setSearch)
export const useGetFeaturedSongs = () => useUserStore((state) => state.getFeaturedSongs)
export const useGetFeaturedAlbums = () => useUserStore((state) => state.getFeaturedAlbums)
export const useToggleFeaturedSongs = () => useUserStore((state) => state.toggleFeaturedSongs)
export const useToggleFeaturedAlbums = () => useUserStore((state) => state.toggleFeaturedAlbums)
