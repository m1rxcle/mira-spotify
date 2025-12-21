import InteractiveHoverPlay from "./interactive-hover-play"
import AddToFavorite from "./add-to-favorite-button"
import type { Song } from "@/types"

const RenderSongs = ({ songs }: { songs: Song[] }) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			{songs.map((song) => (
				<div key={song._id} className="hover:bg-zinc-800 rounded-lg flex items-center justify-between gap-2 cursor-pointer p-2 pr-4 group">
					<div className="flex items-center gap-2">
						<img loading="lazy" src={song.imageUrl} alt={song.title} className="w-12 h-12 rounded-md object-contain" />
						<InteractiveHoverPlay />
						<div className="flex flex-col items-start justify-start">
							<h3 className="text-base font-semibold">{song.title}</h3>
							<p className="text-gray-400">{song.artist}</p>
						</div>
					</div>

					<div className="flex gap-4 items-center">
						<AddToFavorite />
						<p className="text-gray-400 font-semibold">0:{song.duration || 0}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default RenderSongs
