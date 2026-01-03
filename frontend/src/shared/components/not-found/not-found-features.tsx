import { RiDislikeFill } from '@remixicon/react'
import React from 'react'

interface Props {
	className?: string
}

export const NotFoundFeatures: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<div className="flex flex-col justify-center items-center mt-20">
				<RiDislikeFill size={100} className="mb-10 text-emerald-500" />

				<h1 className="font-bold  mb-5 text-xl md:text-3xl bg-linear-to-r from-emerald-400 via-green-600 to-emerald-400 bg-clip-text text-transparent">
					You don&apos;t have any features yet
				</h1>
				<p className="text-gray-500">Search for a song to add it to your features</p>
			</div>
		</div>
	)
}
