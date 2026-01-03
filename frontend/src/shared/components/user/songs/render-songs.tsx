import { SongTemplate } from './song-template'

import { cn } from '@/shared/lib/utils'
import { usePlayerStore } from '@/shared/store/use-player-store'
import { useUserStore } from '@/shared/store/use-user-store'
import type { Song } from '@/types'

const RenderSongs = ({ songs, className }: { songs: Song[]; className?: string }) => {
	const { currentSong, isPlaying, timeLeft, handleSetCurrentSong, togglePlay, playAlbum } =
		usePlayerStore()
	const { featuredSongs, toggleFeaturedSongs } = useUserStore()

	const handlePlaySongs = (index: number) => {
		if (!songs) return
		if (isPlaying) togglePlay()
		else playAlbum(songs, index)
	}

	return (
		<div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
			{songs.map((song, index) => {
				const isCurrentSong = song._id === currentSong?._id
				const isFeatured = featuredSongs.some((featuredSong) => featuredSong._id === song._id)
				return (
					<SongTemplate
						timeLeft={timeLeft}
						song={song}
						key={song._id}
						index={index}
						isCurrentSong={isCurrentSong}
						isPlaying={isPlaying}
						isFeatured={isFeatured}
						toggleFeaturedSongs={toggleFeaturedSongs}
						handlePlaySongs={handlePlaySongs}
						handleSetCurrentSong={handleSetCurrentSong}
					/>
				)
			})}
		</div>
	)
}

export default RenderSongs
