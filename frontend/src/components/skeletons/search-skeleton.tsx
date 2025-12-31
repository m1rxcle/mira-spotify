import React from 'react'

import { Skeleton } from '../ui/skeleton'

import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const SearchSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('mt-10 w-full', className)}>
			{Array.from({ length: 8 }).map(() => (
				<div className="flex justify-between items-center px-2 py-2 ">
					<div className="flex items-center gap-5">
						<Skeleton className="w-12 h-12 rounded-md" />
						<div className="flex flex-col justify-center gap-2 items-start">
							<Skeleton className="w-25 h-3" />
							<Skeleton className="w-10 h-3" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<Skeleton className="w-6 h-6" />
						</div>

						<div>
							<Skeleton className="w-6 h-6" />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
