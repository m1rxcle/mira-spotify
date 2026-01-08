import { SignedOut } from '@clerk/clerk-react'
import { UserRoundX } from 'lucide-react'
import React from 'react'

import SingInOAuthButtons from '../sign-in-OAuth-buttons'

import { cn } from '@/shared/lib/utils'

interface Props {
	className?: string
}

export const UnauthorizedUser: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('px-6 py-6', className)}>
			<div className="flex flex-col justify-center items-center mt-20">
				<h1 className="text-xl md:text-3xl font-bold bg-linear-to-r from-emerald-400 via-green-600 to-emerald-400 bg-clip-text text-transparent">
					You are not authorized
				</h1>
				<p className="text-gray-500 mb-15">Please sign in or sign up to continue</p>
				<UserRoundX size={100} className="mb-10 text-emerald-500" />
				<div>
					<SignedOut>
						<SingInOAuthButtons />
					</SignedOut>
				</div>
			</div>
		</div>
	)
}
