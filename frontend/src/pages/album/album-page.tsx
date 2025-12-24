import CurrentAlbumSkeleton from "@/components/skeletons/current-album-skeleton"
import AddToFavorite from "@/components/songs/add-to-favorite-button"
import InteractiveHoverPlay from "@/components/songs/interactive-hover-play"
import { formatDuration } from "@/lib/format-duration"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/store/use-music-store"
import { usePlayerStore } from "@/store/use-player-store"
import { RiHeart2Line, RiPauseMiniFill, RiPlayMiniFill } from "@remixicon/react"

import { useEffect } from "react"
import { useParams } from "react-router-dom"

const AlbumPage = () => {
	const { albumId } = useParams()

	const { currentAlbum, isLoading, setFetchAlbumById } = useMusicStore()
	const { currentSong, isPlaying, timeLeft, playAlbum, togglePlay } = usePlayerStore()

	useEffect(() => {
		setFetchAlbumById(albumId || "")
	}, [setFetchAlbumById, albumId])

	if (isLoading) return <CurrentAlbumSkeleton />

	const handlePlayAlbumButton = () => {
		if (!currentAlbum) return
		const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id)
		if (isCurrentAlbumPlaying) togglePlay()
		else {
			playAlbum(currentAlbum?.songs)
		}
	}

	const handlePlaySongInAlbum = (index: number) => {
		if (!currentAlbum) return
		if (isPlaying) {
			togglePlay()
		} else {
			playAlbum(currentAlbum?.songs, index)
		}
	}

	return (
		<div className="h-full w-full ">
			<div className="relative min-h-full">
				<div className="absolute inset-0 bg-linear-to-b from-[#5c5c5c] via-transparent to-transparent pointer-events-none -z-10"></div>
				<div className="flex flex-col items-start gap-15 px-6 pt-5 md:pt-16">
					<div className="flex md:flex-row flex-col items-center w-full justify-start gap-5 ">
						<h3 className="text-gray-400 md:hidden">Album</h3>
						<img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className="w-55 h-55 rounded-lg object-cover" />
						<div className="flex flex-col gap-8">
							<div className="flex flex-col items-start justify-start">
								<h3 className="text-gray-400 hidden md:inline">Album</h3>
								<h1 className="text-5xl font-extrabold">{currentAlbum?.title}</h1>
							</div>
							<div className="flex items-center md:items-start md:justify-start justify-center gap-2">
								<h2 className="text-gray-400">{currentAlbum?.artist}</h2>
								<p>●</p>
								<p className="text-gray-400">{currentAlbum?.releaseYear}</p>
							</div>
							<div className="flex items-center justify-center md:items-start md:justify-start gap-4 ">
								<div className="bg-[#FFFFFF14] hover:bg-[#FFFFFF1A] p-2 cursor-pointer rounded-full flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-300">
									<RiHeart2Line size={40} className="hover:text-white text-gray-400 transition-all ease-in-out duration-300" />
								</div>
								<div
									onClick={handlePlayAlbumButton}
									className="bg-emerald-500 p-2 cursor-pointer rounded-full flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-300"
								>
									{isPlaying && currentAlbum ? (
										<RiPauseMiniFill size={40} className="text-black transition-all ease-in-out duration-300" />
									) : (
										<RiPlayMiniFill size={40} className="text-black transition-all ease-in-out duration-300" />
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full">
						<ul className="space-y-2">
							{currentAlbum?.songs?.map((song, index) => {
								const isCurrentSong = currentSong?._id === song._id

								return (
									<div
										onClick={() => handlePlaySongInAlbum(index)}
										className={cn(
											isCurrentSong ? "bg-zinc-800 transition-colors ease-in-out duration-300" : "",
											"flex items-center justify-between gap-6 p-4 rounded-lg cursor-pointer hover:bg-zinc-800 transition-all ease-in-out duration-300 group"
										)}
										key={song._id}
									>
										<div className="flex items-center justify-start gap-4 relative">
											<span className="text-gray-400 text-lg  group-hover:opacity-0">{index + 1}</span>

											<InteractiveHoverPlay isPlayButtonClicked={isPlaying} pos="-translate-x-2" />
											<li className="text-white font-semibold text-lg">{song.title}</li>
										</div>
										<div className="flex items-center gap-4">
											<AddToFavorite />

											<p className="text-gray-400 font-semibold">{isCurrentSong ? formatDuration(timeLeft) : formatDuration(song.duration)}</p>
										</div>
									</div>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlbumPage
