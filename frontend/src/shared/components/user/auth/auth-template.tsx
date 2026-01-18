import React from 'react'
import { Link } from 'react-router-dom'

import { EmailPreview } from './email-preview'
import { NamePreview } from './name-preview'
import { ProfileImage } from '../profile/profile-image'

import { cn } from '@/shared/lib/utils'

interface Props {
	firstName?: string
	lastName?: string
	email?: string
	isLogin?: boolean
	className?: string
}

const OAuthButtonsAuth = React.lazy(() => import('./oauth-buttons-auth'))

export const AuthTemplateComponent: React.FC<Props> = ({ isLogin, firstName, lastName, email }) => {
	console.log('Rerender AuthTemplate')

	return (
		<div className={cn(`${isLogin && 'justify-start h-full'}`, 'flex flex-col ')}>
			<div>
				<h1 className="text-center mb-5 lg:mb-0 text-5xl lg:text-5xl font-semibold ">
					Welcome {isLogin && <span>back </span>}
					to <br className="md:hidden" />
					<span className=" leading-[1.3] animate-gradient bg-size-[300%_300%] bg-radial  from-emerald-400 via-green-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_0_20px_#008000] font-bold">
						React Spotify
					</span>
				</h1>
				<h3 className=" text-md lg:text-xl font-semibold mb-1 lg:mb-4 text-center ">
					{isLogin ? (
						<span>Continue listen your favorite music after logging in your account.</span>
					) : (
						<span>Its a place where you can find the best music for your favorite artists</span>
					)}
				</h3>

				<p className="text-gray-400 text-center">
					{isLogin ? (
						<>
							<span>If you don&apos;t have an account, you can </span>
							<Link className="text-md" to={'/auth/register'}>
								<span className="leading-[1.3] animate-gradient bg-size-[300%_300%] bg-radial  from-emerald-400 via-green-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_0_20px_#008000] font-bold">
									register
								</span>
							</Link>
						</>
					) : (
						<>
							<span>If you already have an account, you can </span>
							<Link className="text-md " to={'/auth/login'}>
								<span className="leading-[1.3] animate-gradient bg-size-[300%_300%] bg-radial  from-emerald-400 via-green-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_0_20px_#008000] font-bold">
									login
								</span>
							</Link>
						</>
					)}
				</p>
			</div>

			<div className="flex flex-col justify-between h-full">
				<div className="relative my-4">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="text-muted-foreground bg-transparent px-4">or</span>
					</div>
				</div>
				<div
					className={cn(
						`${!isLogin && 'lg:mb-21'}`,
						'flex flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-around'
					)}
				>
					<OAuthButtonsAuth />
				</div>
			</div>

			<div className="hidden lg:block">
				{!isLogin && (
					<div className="flex flex-col   items-center">
						<div className="mb-5">
							<ProfileImage size={100} />
						</div>
						<NamePreview firstName={firstName} lastName={lastName} />
						<EmailPreview email={email} />
					</div>
				)}
			</div>
		</div>
	)
}

export const AuthTemplate = React.memo(AuthTemplateComponent)
