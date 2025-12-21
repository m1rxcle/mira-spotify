import { axiosInstance } from "@/lib/axios"
import { create } from "zustand"

type AdminStore = {
	isAdmin: boolean
	isLoading: boolean
	checkIsAdmin: () => Promise<void>
}

export const useAdminStore = create<AdminStore>()((set) => ({
	isAdmin: false,
	isLoading: false,
	checkIsAdmin: async () => {
		set({ isLoading: true })
		try {
			const response = await axiosInstance.get("/admin/checkAdmin")
			set({ isAdmin: response.data.admin })
		} catch (error) {
			set({ isAdmin: false })
			console.log("Error checking admin status", error)
		} finally {
			set({ isLoading: false })
		}
	},
}))
