import React from 'react'

import { Slider } from '../../ui/slider'

import {
	usePlayerChangeProgress,
	usePlayerProgress,
	usePlayerSetIsSeeking,
	usePlayerSetSeekTime,
} from '@/shared/store/use-player-store'
import type { Song } from '@/types'

const PlayerSliderComponent = ({ currentSong }: { currentSong: Song }) => {
	const progress = usePlayerProgress()
	const setIsSeeking = usePlayerSetIsSeeking()
	const setSeekTime = usePlayerSetSeekTime()
	const setChangeProgress = usePlayerChangeProgress()

	if (!currentSong) return null

	return (
		<Slider
			className="my-music-slider cursor-pointer h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
			min={0}
			max={currentSong.duration || 100}
			step={0.1}
			value={progress}
			onValueChange={(v) => {
				setIsSeeking(true)
				setChangeProgress(v)
			}}
			onValueCommit={(v) => {
				setSeekTime(v[0])
				setIsSeeking(false)
			}}
		/>
	)
}

export const PlayerSlider = React.memo(PlayerSliderComponent)
