import CurrentAlbumSkeleton from "@/components/skeletons/current-album-skeleton"
import AddToFavorite from "@/components/songs/add-to-favorite-button"
import InteractiveHoverPlay from "@/components/songs/interactive-hover-play"
import { formatDuration } from "@/lib/format-duration"
import { useMusicStore } from "@/store/use-music-store"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const AlbumPage = () => {
	const { albumId } = useParams()

	const { currentAlbum, isLoading, setFetchAlbumById } = useMusicStore()

	useEffect(() => {
		setFetchAlbumById(albumId || "")
	}, [setFetchAlbumById, albumId])

	if (isLoading) return <CurrentAlbumSkeleton />

	return (
		<div className="h-full w-full ">
			<div className="relative min-h-full">
				<div className="absolute inset-0 bg-linear-to-b from-[#5c5c5c] via-transparent to-transparent pointer-events-none -z-10"></div>
				<div className="flex flex-col items-start gap-15 px-6 pt-16">
					<div className="flex items-start justify-start gap-5 ">
						<img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className="w-60 h-60 rounded-lg object-cover" />
						<div className="flex flex-col gap-5">
							<div className="flex flex-col items-start justify-start">
								<h3 className="text-gray-400">Album</h3>
								<h1 className="text-5xl font-extrabold">{currentAlbum?.title}</h1>
							</div>
							<div className="flex items-center gap-2">
								<h2 className="text-gray-400">{currentAlbum?.artist}</h2>
								<p>●</p>
								<p className="text-gray-400">{currentAlbum?.releaseYear}</p>
							</div>
						</div>
					</div>
					<div className="w-full">
						<ul>
							{currentAlbum?.songs.map((song, index) => (
								<div
									className="flex items-center justify-between gap-4 p-4 rounded-lg cursor-pointer hover:bg-zinc-800 transition-all ease-in-out duration-300 group"
									key={song._id}
								>
									<div className="flex items-center justify-start gap-4 relative">
										<span className="text-gray-400 text-lg  group-hover:opacity-0">{index + 1}</span>
										<InteractiveHoverPlay pos="-translate-x-2" />
										<li className="text-white font-semibold text-lg">{song.title}</li>
									</div>
									<div className="flex items-center gap-4">
										<AddToFavorite />
										<p className="text-gray-400 font-semibold">{formatDuration(song.duration)}</p>
									</div>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlbumPage
