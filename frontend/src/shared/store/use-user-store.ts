import { create } from 'zustand'

import { useAdminStore } from './use-admin-store'
import { useAuthStore } from './use-auth-store'

import { axiosInstance } from '@/shared/lib/axios'
import type { Album, Song, UserData } from '@/types'

type UserStore = {
	user: UserData | null
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

	setFetchUser: () => void
	clearUser: () => void

	clearMessage: () => void
	addSongToHistory: (songId: string) => void
	getSongsHistory: () => void
	setSearch: (query: string) => void
	getFeaturedSongs: () => void
	getFeaturedAlbums: () => void
	toggleFeaturedSongs: (songId: string) => void
	toggleFeaturedAlbums: (albumId: string) => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
	user: null,
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

	clearUser: () => {
		set({ user: null })
	},

	clearMessage: () => {
		set({ message: '' })
	},
	setFetchUser: async () => {
		const token = useAuthStore.getState().accessToken

		if (!token) return

		try {
			const { data } = await axiosInstance.get('/users/me')
			set({ user: data })
			await useAdminStore.getState().checkIsAdmin()
		} catch (error) {
			console.log('Error fetching user in store', error)
		}
	},

	getSongsHistory: async () => {
		try {
			const response = await axiosInstance.get('/users/history')
			set({ history: response.data })
		} catch (error) {
			console.log('Error fetching songs in store', error)
		}
	},
	addSongToHistory: async (songId: string) => {
		try {
			await axiosInstance.post('/users/history', { songId })
			await get().getSongsHistory()
		} catch (error) {
			console.log('Error fetching songs in store', error)
		}
	},

	getFeaturedSongs: async () => {
		set({ isLoadingForUserFeatured: true })

		try {
			const response = await axiosInstance.get('/users/features')
			set({ featuredSongs: response.data })
		} catch (error) {
			console.log('Error fetching songs in store', error)
		} finally {
			set({ isLoadingForUserFeatured: false })
		}
	},
	getFeaturedAlbums: async () => {
		set({ isLoadingForUserFeaturedAlbums: true })
		try {
			const response = await axiosInstance.get('/users/features-albums')
			set({ featuredAlbums: response.data })
		} catch (error) {
			console.log('Error fetching albums in store', error)
		} finally {
			set({ isLoadingForUserFeaturedAlbums: false })
		}
	},
	toggleFeaturedAlbums: async (albumId: string) => {
		set({ isLoadingForToggleAlbums: true })
		try {
			const response = await axiosInstance.post('/users/features-albums', { albumId })
			set({ message: response.data.message })
			await get().getFeaturedAlbums()
		} catch (error) {
			console.log('Error fetching albums in store', error)
		} finally {
			set({ isLoadingForToggleAlbums: false })
		}
	},
	toggleFeaturedSongs: async (songId: string) => {
		set({ isLoadingForToggleSongs: true })
		try {
			const response = await axiosInstance.post('/users/features', { songId })
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

export const useUser = () => useUserStore((state) => state.user)
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
export const useClearMessage = () => useUserStore((state) => state.clearMessage)
export const useSetUser = () => useUserStore((state) => state.setFetchUser)
export const useAddSongsToHistory = () => useUserStore((state) => state.addSongToHistory)
export const useGetSongsHistory = () => useUserStore((state) => state.getSongsHistory)
export const useSetSearch = () => useUserStore((state) => state.setSearch)
export const useGetFeaturedSongs = () => useUserStore((state) => state.getFeaturedSongs)
export const useGetFeaturedAlbums = () => useUserStore((state) => state.getFeaturedAlbums)
export const useToggleFeaturedSongs = () => useUserStore((state) => state.toggleFeaturedSongs)
export const useToggleFeaturedAlbums = () => useUserStore((state) => state.toggleFeaturedAlbums)
