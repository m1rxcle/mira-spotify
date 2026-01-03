import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/clerk-react'
import { RiHeart2Line, RiMusic2Line, RiSearch2Line, RiUser6Line } from '@remixicon/react'
import { DiscAlbum, LayoutDashboard } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import SingInOAuthButtons from '../../user/sign-in-OAuth-buttons'

import ChangeSizeSideBar from '@/shared/lib/change-size-sidebar'
import { cn } from '@/shared/lib/utils'
import { useMusicStore } from '@/shared/store/use-music-store'

const NAV_ITEMS = [
	{
		label: 'Dashboard',
		href: '/admin',
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
	const { collapsed } = useMusicStore()

	const data = useUser()

	return (
		<>
			{/*  Desktop sidebar */}
			<aside
				className={cn(
					collapsed ? 'w-24' : 'md:w-24 lg:w-56',
					`hidden md:flex md:flex-col md:items-center md:py-8 md:px-4 md:justify-between md:h-screen md:bg-black md:backdrop-blur-md md:z-10 transition-all duration-300 ease-in-out`
				)}
			>
				<div className="flex flex-col gap-2 items-center w-full group relative ">
					<div className="w-full">
						<Link to="/admin" className="flex flex-row justify-center gap-2 items-center">
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
								: 'lg:opacity-100 lg:scale-100 lg:scale-x-100 lg:w-auto mb-20',
							'transition-transform ease-in-out duration-500 origin-left opacity-0 scale-0 scale-x-0 w-0 '
						)}
					>
						<p className="text-sm font-medium text-emerald-500">Admin Dashboard</p>
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
								<div className="flex gap-2">
									<item.icon className="hover:text-emerald-500 transition-colors ease-in-out duration-700" />
									<div
										className={cn(
											collapsed ? 'opacity-0  w-0 ' : 'lg:opacity-100 lg:scale-100  lg:w-auto',
											` hover:text-emerald-500 transition-all ease-in-out duration-300 w-0 opacity-0`
										)}
									>
										<span>{item.label}</span>
									</div>
								</div>
							</NavLink>
						))}
					</div>
				</div>

				<div className="flex flex-col">
					<div className={cn(!collapsed && 'lg:flex-row', 'flex flex-col  items-center gap-2')}>
						<img
							className={`${data.user ? 'w-12 h-12 border-2 border-gray-400 rounded-full' : 'hidden'} `}
							src={data.user?.imageUrl}
						/>
						<div className="flex flex-col gap-1 items-center">
							<h1 className={collapsed ? 'hidden' : 'lg:block '}>{data.user?.firstName}</h1>
							<div className="w-full border  rounded-2xl text-center">
								<SignedIn>
									<SignOutButton />
								</SignedIn>
							</div>
						</div>
					</div>
				</div>

				<SignedOut>
					<SingInOAuthButtons />
				</SignedOut>
			</aside>

			{/*  Mobile sidebar */}
			<aside className="md:hidden sticky bottom-4 w-full h-10 bg-black mt-6">
				<div className="px-4 flex items-center gap-4 justify-between">
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<RiMusic2Line />
							<div
								id="nav-text"
								className="hidden lg:block hover:text-white transition-colors ease-in-out duration-300"
							>
								<span>Главная</span>
							</div>
						</div>
					</NavLink>
					<NavLink
						to="/search"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<RiSearch2Line />
							<div
								id="nav-text"
								className="hidden lg:block hover:text-white transition-colors ease-in-out duration-300"
							>
								<span>Search</span>
							</div>
						</div>
					</NavLink>
					<NavLink
						to="/library"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<RiHeart2Line />
							<div
								id="nav-text"
								className="hidden lg:block hover:text-white transition-colors ease-in-out duration-300"
							>
								<span>Your Library</span>
							</div>
						</div>
					</NavLink>
					<NavLink
						to="/profile"
						className={({ isActive }) => (isActive ? 'text-emerald-500' : 'text-white/70')}
					>
						<div className="flex gap-2 ">
							<RiUser6Line />
							<div
								id="nav-text"
								className="hidden lg:block hover:text-white transition-colors ease-in-out duration-300"
							>
								<span>Account</span>
							</div>
						</div>
					</NavLink>
				</div>
			</aside>
		</>
	)
}

export default AdminSideBar
