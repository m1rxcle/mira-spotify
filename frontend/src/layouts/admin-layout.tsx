import { Navigate, Outlet } from 'react-router-dom'

import AdminSideBar from '@/shared/components/admin/side-bar/admin-side-bar'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { useAdminStore } from '@/shared/store/use-admin-store'

export const AdminLayout = () => {
	const { isAdmin } = useAdminStore()

	if (!isAdmin) return <Navigate to="/" />

	return (
		<div className="h-screen flex md:flex-row flex-col-reverse">
			<AdminSideBar />

			<div className="bg-black flex-1 flex flex-col min-h-0 md:gap-6 gap-1 md:pt-4 pb-4 md:px-4 px-1 ">
				<ScrollArea className="flex-1 md:rounded-3xl rounded-lg min-h-0  overflow-x-hidden  bg-zinc-900/60 border border-gray-400/15 z-50 relative">
					<Outlet key={location.pathname} />
				</ScrollArea>
			</div>
		</div>
	)
}
