import {
	RiArrowGoBackLine,
	RiArrowUpDownLine,
	RiPauseMiniLine,
	RiPlayFill,
	RiSkipLeftLine,
	RiSkipRightLine,
} from '@remixicon/react'
import React from 'react'

import AddToFavorite from '../songs/add-to-favorite-button'

import {
	usePlayerIsPlaying,
	usePlayerPlayNextSong,
	usePlayerPlayPreviousSong,
	usePlayerTogglePlay,
} from '@/shared/store/use-player-store'
import { useFeaturedSongs, useToggleFeaturedSongs } from '@/shared/store/use-user-store'
import type { Song } from '@/types'

const PlayerControlsComponent = ({ currentSong }: { currentSong: Song }) => {
	const featuredSongs = useFeaturedSongs()
	const isPlaying = usePlayerIsPlaying()

	const toggleFeaturedSongs = useToggleFeaturedSongs()
	const handlePlayNextSong = usePlayerPlayNextSong()
	const handlePlayPreviousSong = usePlayerPlayPreviousSong()
	const togglePlay = usePlayerTogglePlay()

	if (!currentSong) return null

	const isFeatured = featuredSongs.some((featuredSong) => featuredSong._id === currentSong._id)

	return (
		<div className="flex items-center gap-10 justify-between ">
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
			<div className="flex items-center gap-4 pr-20 justify-between cursor-pointer">
				<div className="hover:text-white transition-colors ease-in-out duration-300">
					<RiArrowUpDownLine size={25} />
				</div>
				<div
					onClick={handlePlayPreviousSong}
					className="hover:text-white hover:scale-110 transition-all  ease-in-out duration-300"
				>
					<RiSkipLeftLine size={25} />
				</div>
				<div
					onClick={togglePlay}
					className="bg-[#12c74b] rounded-full p-1.5 hover:scale-105 transition-all  ease-in-out duration-300"
				>
					{isPlaying ? (
						<RiPauseMiniLine className="text-black/70" size={30} />
					) : (
						<RiPlayFill className="text-black/70" size={30} />
					)}
				</div>
				<div
					onClick={handlePlayNextSong}
					className="hover:text-white hover:scale-110 transition-all  ease-in-out duration-300"
				>
					<RiSkipRightLine size={25} />
				</div>
				<div className="hover:text-white transition-colors ease-in-out duration-300">
					<RiArrowGoBackLine size={25} />
				</div>
			</div>
		</div>
	)
}

export const PlayerControls = React.memo(PlayerControlsComponent)
