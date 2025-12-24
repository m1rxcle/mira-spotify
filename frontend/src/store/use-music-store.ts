import { axiosInstance } from "@/lib/axios"
import { COLORS } from "@/lib/data"
import type { Album, Song } from "@/types"
import { create } from "zustand"

type MusicStore = {
	trendingSongs: Song[]

	madeForYouSongs: Song[]

	featuredSongs: Song[]
	// Список всех альбомов
	albums: Album[]
	// Текущий альбом
	currentAlbum: Album | null
	// Состояние загрузки
	isLoading: boolean
	// Свернутый sidebar или нет
	collapsed: boolean

	// Меняем иконку стрелки sidebar
	changeArrow: boolean

	setFetchTrendingSongs: () => Promise<void>
	setFetchMadeForYouSongs: () => Promise<void>
	setFetchFeaturedSongs: () => Promise<void>
	setFetchAlbums: () => Promise<void>
	setFetchAlbumById: (albumId: string) => Promise<void>
	setChangeArrow: (arrow: boolean) => void

	setCollapsed: (collapsed: boolean) => void
}

export const useMusicStore = create<MusicStore>()((set) => ({
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	albums: [],
	currentAlbum: null,
	isLoading: false,
	collapsed: false,
	changeColors: COLORS[0],
	changeArrow: false,

	setFetchMadeForYouSongs: async () => {
		set({ isLoading: true })
		try {
			const response = await axiosInstance.get("/songs/made-for-you")
			set({ madeForYouSongs: response.data })
		} catch (error) {
			console.log("Error fetching songs", error)
		} finally {
			set({ isLoading: false })
		}
	},
	setFetchFeaturedSongs: async () => {
		set({ isLoading: true })
		try {
			const response = await axiosInstance.get("/songs/featured")
			set({ featuredSongs: response.data })
		} catch (error) {
			console.log("Error fetching songs", error)
		} finally {
			set({ isLoading: false })
		}
	},
	setFetchTrendingSongs: async () => {
		set({ isLoading: true })

		try {
			const response = await axiosInstance.get("/songs/trending")
			set({ trendingSongs: response.data })
		} catch (error) {
			console.log("Error fetching songs", error)
		} finally {
			set({ isLoading: false })
		}
	},
	setFetchAlbums: async () => {
		set({ isLoading: true })

		try {
			const response = await axiosInstance.get("/albums")
			set({ albums: response.data })
		} catch (error) {
			console.log("Error fetching albums", error)
		} finally {
			set({ isLoading: false })
		}
	},
	setFetchAlbumById: async (albumId: string) => {
		set({ isLoading: true })

		try {
			const response = await axiosInstance.get(`/albums/${albumId}`)
			set({ currentAlbum: response.data })
		} catch (error) {
			console.log("Fetch album by id error", error)
		} finally {
			set({ isLoading: false })
		}
	},

	setCollapsed: (collapsed: boolean) => set(() => ({ collapsed })),
	setChangeArrow: (arrow: boolean) => set(() => ({ changeArrow: arrow })),
}))
