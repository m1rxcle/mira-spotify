import { axiosInstance } from "@/lib/axios"
import { useAdminStore } from "@/store/use-admin-store"
import { useAuth } from "@clerk/clerk-react"
import React from "react"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { getToken } = useAuth()

	const updateApiToken = (token: string | null) => {
		if (token) {
			axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
		} else {
			delete axiosInstance.defaults.headers.common["Authorization"]
		}
	}

	const { checkIsAdmin } = useAdminStore()

	React.useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await getToken()
				updateApiToken(token)
				if (token) {
					await checkIsAdmin()
				}
			} catch (error) {
				updateApiToken(null)
				console.log("Error in AuthProvider", error)
			}
		}

		initAuth()
	}, [getToken, checkIsAdmin])

	return <div>{children}</div>
}

export default AuthProvider
