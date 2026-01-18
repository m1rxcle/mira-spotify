import React from 'react'
import { Outlet } from 'react-router-dom'

import { cn } from '@/shared/lib/utils'

interface Props {
	className?: string
}

export const AuthLayout: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('w-full min-h-screen ', className)}>
			<div className="flex justify-center items-center h-full backdrop-blur-3xl">
				<Outlet />
			</div>
			<video
				className="absolute top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none blur-2xl opacity-70 "
				autoPlay
				loop
				muted
				playsInline
				src="/video/auth.webm"
			/>
		</div>
	)
}
