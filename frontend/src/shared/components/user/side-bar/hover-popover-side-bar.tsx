import React from 'react'

import { cn } from '@/shared/lib/utils'

interface Props {
	item: { label: string }
	collapsed?: boolean
}

export const HoverPopoverSideBar: React.FC<Props> = ({ collapsed, item }) => {
	return (
		<div
			className={cn(
				collapsed
					? 'group-hover:opacity-100 group-hover:w-auto'
					: 'group-hover:opacity-0 group-hover:w-0  lg:group-hover:opacity-0 lg:group-hover:w-0 w-0 opacity-0 ',

				'w-0 opacity-0  group-hover:opacity-100 group-hover:w-auto absolute -top-1 left-10 py-1 px-4 bg-zinc-800/90 text-white text-base font-semibold rounded-md'
			)}
		>
			<span>{item.label}</span>
		</div>
	)
}
