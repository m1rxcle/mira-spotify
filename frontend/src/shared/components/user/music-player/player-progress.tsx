import React from 'react'

import { usePlayerProgress } from '@/shared/store/use-player-store'
import type { Song } from '@/types'

const PlayerProgressComponent = ({ currentSong }: { currentSong: Song }) => {
	const progress = usePlayerProgress()

	if (!currentSong) return null
	const progressPercent =
		currentSong.duration > 0
			? Math.min(100, Math.max(0, (progress[0] / currentSong.duration) * 100))
			: 0
	return (
		<div
			style={{
				width: `${progressPercent}%`,
			}}
			className={`-z-50 absolute -bottom-0.5 left-0 h-full bg-gray-500/50 rounded-xl rounded-tr-none rounded-br-none  pl-2 pr-6 py-2 md:py-2.5 pointer-events-none `}
		/>
	)
}

export const PlayerProgress = React.memo(PlayerProgressComponent)
