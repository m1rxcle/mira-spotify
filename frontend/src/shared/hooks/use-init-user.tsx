import { useEffect } from 'react'

import { useAccessToken, useAuthStore } from '../store/use-auth-store'
import { useUserStore } from '../store/use-user-store'

export const useInitUser = () => {
	const accessToken = useAccessToken()

	console.log('refreshing access token', accessToken)

	useEffect(() => {
		const fetchUser = async () => {
			const success = await useAuthStore.getState().refreshAccessToken()
			if (success) {
				await useUserStore.getState().setFetchUser()
			}
		}

		fetchUser()
	}, [])
}
