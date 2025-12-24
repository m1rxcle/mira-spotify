import InteractiveHoverPlay from "./interactive-hover-play"
import AddToFavorite from "./add-to-favorite-button"
import type { Song } from "@/types"
import { formatDuration } from "@/lib/format-duration"
import { cn } from "@/lib/utils"
import { usePlayerStore } from "@/store/use-player-store"

const RenderSongs = ({ songs }: { songs: Song[] }) => {
	const { currentSong, isPlaying, togglePlay, playAlbum } = usePlayerStore()

	const handlePlaySongs = (index: number) => {
		if (!songs) return
		if (isPlaying) togglePlay()
		else playAlbum(songs, index)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{songs.map((song, index) => {
				const isCurrentSong = song._id === currentSong?._id
				return (
					<div
						onClick={() => handlePlaySongs(index)}
						key={song._id}
						className={cn(
							isCurrentSong && "bg-zinc-800",
							`hover:bg-zinc-800 rounded-lg flex items-center justify-between gap-2 cursor-pointer p-2 pr-4 group`
						)}
					>
						<div className="flex items-center gap-2">
							<img loading="lazy" src={song.imageUrl} alt={song.title} className="w-12 h-12 rounded-md object-contain" />
							<InteractiveHoverPlay isPlayButtonClicked={isPlaying} isCurrentSong={isCurrentSong} />
							<div className="flex flex-col items-start justify-start">
								<h3 className="text-base font-semibold">{song.title}</h3>
								<p className="text-gray-400">{song.artist}</p>
							</div>
						</div>

						<div className="flex gap-4 items-center">
							<AddToFavorite />
							<p className="text-gray-400 font-semibold">{formatDuration(song.duration)}</p>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default RenderSongs
