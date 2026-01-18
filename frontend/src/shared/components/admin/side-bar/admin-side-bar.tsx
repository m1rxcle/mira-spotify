import { RiMusic2Line, RiUser6Line } from '@remixicon/react'
import { motion } from 'framer-motion'
import { AppWindow, DiscAlbum, LayoutDashboard } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { ProfileImage } from '../../user/profile/profile-image'
import { HoverPopoverSideBar } from '../../user/side-bar/hover-popover-side-bar'

import ChangeSizeSideBar from '@/shared/lib/change-size-sidebar'
import { cn } from '@/shared/lib/utils'
import { useAdminStore } from '@/shared/store/use-admin-store'
import { useCollapsed } from '@/shared/store/use-music-store'
import { useUser } from '@/shared/store/use-user-store'

const NAV_ITEMS = [
	{
		label: 'Dashboard',
		href: '/admin/dashboard',
		icon: LayoutDashboard,
	},
	{
		label: 'Create Song',
		href: '/admin/songs',
		icon: RiMusic2Line,
	},
	{
		label: 'Create Album',
		href: '/admin/albums',
		icon: DiscAlbum,
	},
	{
		label: 'Users',
		href: '/admin/users',
		icon: RiUser6Line,
	},
]

const AdminSideBar = () => {
	const collapsed = useCollapsed()

	const { isAdmin } = useAdminStore()

	const user = useUser()

	return (
		<>
			{/*  Desktop sidebar */}
			<aside
				className={cn(
					collapsed ? 'w-24' : 'md:w-24 lg:w-56',
					`hidden md:flex md:flex-col md:items-center md:py-8 md:px-4 md:justify-between md:h-screen md:bg-black md:backdrop-blur-md md:z-10 transition-all duration-300 ease-in-out`
				)}
			>
				<div className="flex flex-col gap-2 items-end w-full group relative mb-20">
					<div className="w-full">
						<Link to="/admin/dashboard" className="flex flex-row justify-center gap-2 items-center">
							<div className="w-12 h-12">
								<img src="/spotify.png" className="w-full h-full" />
							</div>
							<div
								className={cn(
									collapsed
										? 'lg:opacity-0 lg:scale-x-0 lg:w-0 lg:overflow-hidden'
										: 'lg:opacity-100 lg:scale-100 lg:scale-x-100 lg:w-auto ',
									'transition-transform ease-in-out duration-500 origin-left opacity-0 scale-0 scale-x-0 w-0 '
								)}
							>
								<div className="flex flex-col  items-start">
									<h1 className="text-emerald-500 font-medium text-md leading-none">React</h1>
									<h2 className="font-extrabold text-emerald-500 w-full text-3xl leading-none">
										Spotify
									</h2>
								</div>
							</div>
						</Link>
					</div>
					<div
						className={cn(
							collapsed
								? 'opacity-0 scale-x-0 w-0 overflow-hidden mb-0'
								: 'lg:opacity-100 lg:scale-100 lg:scale-x-100 lg:w-auto ',
							'transition-transform ease-in-out duration-500 origin-left opacity-0 scale-0 scale-x-0 w-0 px-2'
						)}
					>
						<p className="text-sm font-semibold text-gray-400">Admin Dashboard</p>
					</div>
					<ChangeSizeSideBar />
				</div>

				<div className="flex flex-col justify-between h-full items-center mb-10">
					<div className="flex flex-col gap-10">
						{NAV_ITEMS.map((item) => (
							<NavLink
								key={item.href}
								to={item.href}
								className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
							>
								<div className="flex gap-2 relative group">
									<item.icon className="hover:text-emerald-500 transition-colors ease-in-out duration-700" />
									<div
										className={cn(
											collapsed ? 'opacity-0  w-0 ' : 'lg:opacity-100 lg:scale-100  lg:w-auto',
											` hover:text-emerald-500 transition-all ease-in-out duration-300 w-0 opacity-0`
										)}
									>
										<span>{item.label}</span>
									</div>
									<HoverPopoverSideBar item={item} collapsed={collapsed} />
								</div>
							</NavLink>
						))}
					</div>
					<div className="flex flex-col gap-4 items-center justify-center ">
						{isAdmin && (
							<motion.div
								transition={{ type: 'spring', damping: 15, stiffness: 300 }}
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.9, y: 2 }}
								className="flex cursor-pointer items-center justify-center border-2 border-zinc-800 rounded-2xl hover:border-emerald-500 hover:text-emerald-500 transition-colors ease-in-out duration-300"
							>
								<Link to={'/'} className="flex items-center p-4">
									<AppWindow
										className={collapsed ? 'size-4 mr-2 translate-x-1' : 'size-4 lg:mr-2'}
									/>
									<span className={collapsed ? 'hidden' : 'md:hidden md:translate-x-1 lg:block '}>
										Back to App
									</span>
								</Link>
							</motion.div>
						)}
					</div>
				</div>

				<ProfileImage size={50} imageUrl={user?.imageUrl} />
			</aside>

			{/*  Mobile sidebar */}
			<aside className="md:hidden sticky bottom-4 w-full h-10 bg-black mt-6">
				<div className="px-4 flex items-center gap-4 justify-between">
					<NavLink
						to="/admin/dashboard"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<LayoutDashboard />
						</div>
					</NavLink>
					<NavLink
						to="/admin/songs"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<RiMusic2Line />
						</div>
					</NavLink>
					<NavLink
						to="/admin/albums"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<DiscAlbum />
						</div>
					</NavLink>
					<NavLink
						to="/admin/users"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<RiUser6Line />
						</div>
					</NavLink>
				</div>
			</aside>
		</>
	)
}

export default AdminSideBar
