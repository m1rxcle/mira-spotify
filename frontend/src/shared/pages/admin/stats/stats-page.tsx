import { useEffect } from 'react'

import { useAdminStore } from '@/shared/store/use-admin-store'
import { useUser } from '@/shared/store/use-user-store'

export const StatsPage = () => {
	const user = useUser()
	const { stats, getStats } = useAdminStore()

	useEffect(() => {
		getStats()
	}, [getStats])

	console.log(stats)

	return (
		<div className="px-6 py-6">
			<h1>Welcome back, {user?.fullName}</h1>
		</div>
	)
}
