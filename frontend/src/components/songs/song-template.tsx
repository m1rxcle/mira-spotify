import React from 'react'

import AddToFavorite from './add-to-favorite-button'
import InteractiveHoverPlay from './interactive-hover-play'

import { formatDuration } from '@/lib/format-duration'
import { cn } from '@/lib/utils'
import type { Song } from '@/types'

interface Props {
	song: Song
	index: number
	isCurrentSong: boolean
	isPlaying: boolean
	timeLeft: number
	isFeatured: boolean
	className?: string
	handleSetCurrentSong: (song: Song) => void
	toggleFeaturedSongs: (songId: string) => void
	handlePlaySongs: (index: number) => void
}

export const SongTemplate: React.FC<Props> = ({
	song,
	index,
	isCurrentSong,
	isPlaying,
	timeLeft,
	className,
	isFeatured,
	handlePlaySongs,
	handleSetCurrentSong,
	toggleFeaturedSongs,
}) => {
	const handleToggleFeatured = (songId: Song['_id']) => toggleFeaturedSongs(songId)

	const makeCurrent = (song: Song) => {
		if (!song) return
		handleSetCurrentSong(song)
	}
	return (
		<div>
			<div
				onClick={() => makeCurrent(song)}
				key={song._id}
				className={cn(
					isCurrentSong && 'bg-zinc-800',
					`hover:bg-zinc-800 rounded-lg flex items-center justify-between gap-2 cursor-pointer p-2 pr-4 group relative ${className}`
				)}
			>
				<div className="flex items-center gap-2">
					<img
						loading="lazy"
						src={song.imageUrl}
						alt={song.title}
						className="w-12 h-12 rounded-md object-contain"
					/>
					<InteractiveHoverPlay
						onClick={() => handlePlaySongs(index)}
						isPlayButtonClicked={isPlaying}
						isCurrentSong={isCurrentSong}
					/>
					<div className="flex flex-col items-start justify-start">
						<h3 className="text-base font-semibold">{song.title}</h3>
						<p className="text-gray-400">{song.artist}</p>
					</div>
				</div>

				<div className="flex gap-4 items-center">
					<AddToFavorite
						isFeatured={isFeatured}
						handleToggleFeatured={handleToggleFeatured}
						songId={song._id}
					/>

					<p className="text-gray-400 font-semibold">
						{isCurrentSong ? formatDuration(timeLeft) : formatDuration(song.duration)}
					</p>
				</div>
			</div>
			{/* <div>{message && <p className="text-gray-400 font-semibold absolute top-0 right-0 border border-gray-400 rounded-full px-2">{message}</p>}</div> */}
		</div>
	)
}
