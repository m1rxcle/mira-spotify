import React from 'react'

import type { Song } from '@/types'

const PlayerInfoComponent = ({ currentSong }: { currentSong: Song }) => {
	return (
		<div className="flex items-center justify-center gap-4">
			<img
				loading="lazy"
				src={currentSong?.imageUrl}
				alt={currentSong?.title}
				className="w-12 h-12 md:w-16 md:h-16 rounded-md object-cover shadow-md shadow-black/50 "
			/>
			<div className="flex flex-col w-40  justify-center items-start">
				<h3 className="text-white line-clamp-1">{currentSong?.title}</h3>
				<p className="text-gray-400 line-clamp-1">{currentSong?.artist}</p>
			</div>
		</div>
	)
}

export const PlayerInfo = React.memo(PlayerInfoComponent)
