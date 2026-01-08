import React from 'react'

import type { Song } from '@/types'

const MobilePlayerInfoComponent = ({ currentSong }: { currentSong: Song }) => {
	return (
		<div className="flex items-center gap-5">
			<img className="w-12 h-12 rounded-md" src={currentSong?.imageUrl} />
			<div className="flex flex-col justify-center items-start w-40">
				<h3 className="text-white line-clamp-1">{currentSong?.title}</h3>
				<p className="text-gray-400 line-clamp-1">{currentSong?.artist}</p>
			</div>
		</div>
	)
}

export const MobilePlayerInfo = React.memo(MobilePlayerInfoComponent)
