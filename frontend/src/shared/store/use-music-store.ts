import { create } from 'zustand'

import { axiosInstance } from '@/shared/lib/axios'
import { COLORS } from '@/shared/lib/data'
import type { Album, Song } from '@/types'

type MusicStore = {
	albums: Album[]
	currentAlbum: Album | null
	trendingSongs: Song[]
	madeForYouSongs: Song[]
	collapsed: boolean
	changeArrow: boolean
	isLoadingMadeForYou: boolean
	isLoadingTrendingSongs: boolean
	isLoadingAlbums: boolean
	isLoadingCurrentAlbum: boolean

	setFetchTrendingSongs: () => Promise<void>
	setFetchMadeForYouSongs: () => Promise<void>
	setFetchAlbums: () => Promise<void>
	setFetchAlbumById: (albumId: string) => Promise<void>
	setChangeArrow: (arrow: boolean) => void
	setCollapsed: (collapsed: boolean) => void
}

export const useMusicStore = create<MusicStore>()((set) => ({
	madeForYouSongs: [],
	trendingSongs: [],
	albums: [],
	currentAlbum: null,
	isLoadingMadeForYou: false,
	isLoadingTrendingSongs: false,
	isLoadingAlbums: false,
	isLoadingCurrentAlbum: false,
	collapsed: false,
	changeColors: COLORS[0],
	changeArrow: false,

	setFetchMadeForYouSongs: async () => {
		set({ isLoadingMadeForYou: true })
		try {
			const response = await axiosInstance.get('/songs/made-for-you')
			set({ madeForYouSongs: response.data })
		} catch (error) {
			console.log('Error fetching songs', error)
		} finally {
			set({ isLoadingMadeForYou: false })
		}
	},
	setFetchTrendingSongs: async () => {
		set({ isLoadingTrendingSongs: true })

		try {
			const response = await axiosInstance.get('/songs/trending')
			set({ trendingSongs: response.data })
		} catch (error) {
			console.log('Error fetching songs', error)
		} finally {
			set({ isLoadingTrendingSongs: false })
		}
	},
	setFetchAlbums: async () => {
		set({ isLoadingAlbums: true })

		try {
			const response = await axiosInstance.get('/albums')
			set({ albums: response.data })
		} catch (error) {
			console.log('Error fetching albums', error)
		} finally {
			set({ isLoadingAlbums: false })
		}
	},
	setFetchAlbumById: async (albumId: string) => {
		set({ isLoadingCurrentAlbum: true })

		try {
			const response = await axiosInstance.get(`/albums/${albumId}`)
			set({ currentAlbum: response.data })
		} catch (error) {
			console.log('Fetch album by id error', error)
		} finally {
			set({ isLoadingCurrentAlbum: false })
		}
	},
	setCollapsed: (collapsed: boolean) => set(() => ({ collapsed })),
	setChangeArrow: (arrow: boolean) => set(() => ({ changeArrow: arrow })),
}))

export const useMadeForYouSongs = () => useMusicStore((state) => state.madeForYouSongs)
export const useTrendingSongs = () => useMusicStore((state) => state.trendingSongs)
export const useAlbums = () => useMusicStore((state) => state.albums)
export const useCurrentAlbum = () => useMusicStore((state) => state.currentAlbum)
export const useCollapsed = () => useMusicStore((state) => state.collapsed)
export const useChangeArrow = () => useMusicStore((state) => state.changeArrow)
export const useIsLoadingMadeForYou = () => useMusicStore((state) => state.isLoadingMadeForYou)
export const useIsLoadingTrendingSongs = () =>
	useMusicStore((state) => state.isLoadingTrendingSongs)
export const useIsLoadingAlbums = () => useMusicStore((state) => state.isLoadingAlbums)
export const useIsLoadingCurrentAlbum = () => useMusicStore((state) => state.isLoadingCurrentAlbum)

//setters
export const useSetFetchMadeForYouSongs = () =>
	useMusicStore((state) => state.setFetchMadeForYouSongs)
export const useSetFetchTrendingSongs = () => useMusicStore((state) => state.setFetchTrendingSongs)
export const useSetFetchAlbums = () => useMusicStore((state) => state.setFetchAlbums)
export const useSetFetchAlbumById = () => useMusicStore((state) => state.setFetchAlbumById)
export const useSetCollapsed = () => useMusicStore((state) => state.setCollapsed)
export const useSetChangeArrow = () => useMusicStore((state) => state.setChangeArrow)
