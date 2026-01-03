import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

import { useUserStore } from '@/shared/store/use-user-store'

export const useInitUseR = () => {
	const { isLoaded, isSignedIn, getToken } = useAuth()
	const { setToken } = useUserStore()

	useEffect(() => {
		if (!isLoaded || !isSignedIn) return

		const init = async () => {
			const token = await getToken()
			setToken(token)
		}

		init()
	}, [isLoaded, isSignedIn, getToken, setToken])
}
