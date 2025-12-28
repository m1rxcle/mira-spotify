import { axiosInstance } from "@/lib/axios"
import type { Song } from "@/types"
import { create } from "zustand"

type UserStore = {
	token: string | null

	search: Song[]
	featuredSongs: Song[]
	message: string
	isLoading: boolean
	hasSearched: boolean

	setToken: (token: string | null) => void

	setSearch: (query: string) => void

	getFeaturedSongs: () => void
	toggleFeaturedSongs: (songId: string) => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
	token: null,

	search: [],
	featuredSongs: [],
	message: "",

	isLoading: false,
	hasSearched: false,

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
			const response = await axiosInstance.get("/users/features", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log("TOKEN:", token)
			console.log("RESPONSE:", response.data)
			set({ featuredSongs: response.data })
		} catch (error) {
			console.log("Error fetching songs in store", error)
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
				"/users/features",
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
			console.log("Error fetching songs in store", error)
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
			const response = await axiosInstance.post("/search", { query })
			set({ search: response.data })
			set({ hasSearched: true })
		} catch (error: unknown) {
			console.log("Error fetching songs in store", error)
		} finally {
			set({ isLoading: false })
		}
	},
}))
