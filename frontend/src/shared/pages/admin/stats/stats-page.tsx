import { useUser } from '@clerk/clerk-react'

export const StatsPage = () => {
	const { user } = useUser()
	return (
		<div className="px-6 py-6">
			<h1>Welcome back, {user?.firstName}</h1>
		</div>
	)
}
