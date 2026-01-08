import React from 'react'

import { usePlayerProgress } from '@/shared/store/use-player-store'
import type { Song } from '@/types'

const MobilePlayerProgressComponent = ({ currentSong }: { currentSong: Song }) => {
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
			className={`rounded-md rounded-tr-none rounded-br-none -z-50 absolute bottom-0 left-0  h-full bg-gray-500/50 flex justify-between items-center px-2 py-2 md:hidden pointer-events-none `}
		/>
	)
}

export const MobilePlayerProgress = React.memo(MobilePlayerProgressComponent)
