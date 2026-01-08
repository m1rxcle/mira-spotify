import { RiPauseMiniLine, RiPlayFill, RiSkipRightLine } from '@remixicon/react'
import React from 'react'

import AddToFavorite from '../songs/add-to-favorite-button'

import {
	usePlayerIsPlaying,
	usePlayerPlayNextSong,
	usePlayerTogglePlay,
} from '@/shared/store/use-player-store'
import { useFeaturedSongs, useToggleFeaturedSongs } from '@/shared/store/use-user-store'
import type { Song } from '@/types'

const MobilePlayerControlsComponent = ({ currentSong }: { currentSong: Song }) => {
	const featuredSongs = useFeaturedSongs()
	const isPlaying = usePlayerIsPlaying()

	const toggleFeaturedSongs = useToggleFeaturedSongs()
	const handlePlayNextSong = usePlayerPlayNextSong()
	const togglePlay = usePlayerTogglePlay()

	if (!currentSong) return null

	const isFeatured = featuredSongs.some((featuredSong) => featuredSong._id === currentSong._id)
	return (
		<div className="flex items-center gap-2">
			<div className="hover:text-white transition-colors ease-in-out duration-300">
				<AddToFavorite
					handleToggleFeatured={() => {
						if (!currentSong) return
						toggleFeaturedSongs(currentSong._id)
					}}
					isFeatured={isFeatured}
					songId={currentSong?._id}
				/>
			</div>
			<div
				onClick={togglePlay}
				className="cursor-pointer p-1.5 hover:scale-110  transition-all  ease-in-out duration-300"
			>
				{isPlaying ? (
					<RiPauseMiniLine className="text-gray-400 hover:text-black" size={30} />
				) : (
					<RiPlayFill className=" hover:text-black text-gray-400" size={30} />
				)}
			</div>
			<div onClick={handlePlayNextSong}>
				<RiSkipRightLine
					size={30}
					className="cursor-pointer text-gray-500 hover:text-white hover:scale-110 transition-all  ease-in-out duration-300"
				/>
			</div>
		</div>
	)
}

export const MobilePlayerControls = React.memo(MobilePlayerControlsComponent)
