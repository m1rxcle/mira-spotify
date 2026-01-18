import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, CardContent } from '@/shared/components/ui/card'
import { ProfileImage } from '@/shared/components/user/profile/profile-image'
import { UnauthorizedUser } from '@/shared/components/user/profile/unauthorized-user'
import { cn } from '@/shared/lib/utils'
import { useLogout } from '@/shared/store/use-auth-store'
import { useUser } from '@/shared/store/use-user-store'

interface Props {
	className?: string
}

export const ProfilePage: React.FC<Props> = ({ className }) => {
	const user = useUser()
	const logout = useLogout()
	const router = useNavigate()
	if (!user) return <UnauthorizedUser />

	const handleLogOut = async () => {
		await logout()
		router('/auth/login')
	}

	return (
		<div className={cn('relative h-screen w-full', className)}>
			<div className="w-full h-full">
				<div className="flex flex-col justify-center items-center pt-10 gap-10 px-4">
					<div className="flex flex-col  justify-center items-center">
						<ProfileImage size={100} imageUrl={user.imageUrl || ''} />
						<h1 className="text-xl font-semibold mb-5">{user.fullName}</h1>
						<motion.div
							transition={{ type: 'spring', damping: 15, stiffness: 300 }}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.9, y: 2 }}
							className="flex cursor-pointer items-center justify-center border-2 border-zinc-800 rounded-2xl hover:border-red-500/50 hover:bg-red-500/50 transition-colors ease-in-out duration-300"
						>
							<div
								onClick={() => handleLogOut()}
								className="flex gap-2 items-center px-4 py-3 cursor-pointer"
							>
								<LogOut className={'size-4 lg:mr-2'} />

								<span className="font-semibold">Log out</span>
							</div>
						</motion.div>
					</div>
					<Card className="bg-zinc-700/40 backdrop-blur-md rounded-xl w-full md:w-2/3 lg:w-1/2 shadow-xs shadow-gray-500/30">
						<CardContent className="flex flex-col justify-start items-start gap-3">
							<h1 className="text-center mx-auto text-2xl font-semibold">Your profile data</h1>
							<div>
								<p className="text-lg font-semibold">
									Your name: <span className="font-bold">{user?.fullName || '-'}</span>
								</p>
								<p className="text-lg font-semibold">
									Email: <span className="font-bold">{user.email}</span>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
				<video
					src="/video/bg3.mp4"
					autoPlay
					loop
					muted
					playsInline
					className="absolute top-0 w-full h-full object-fill opacity-30 -z-10 pointer-events-none drop-shadow-background drop-shadow-2xl blur-md"
				/>
			</div>
		</div>
	)
}
