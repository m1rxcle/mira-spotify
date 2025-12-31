import { RiHeart2Fill, RiHeart2Line, RiPauseMiniFill, RiPlayMiniFill } from '@remixicon/react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CurrentAlbumSkeleton from '@/components/skeletons/current-album-skeleton'
import RenderSongs from '@/components/songs/render-songs'
import { useMusicStore } from '@/store/use-music-store'
import { usePlayerStore } from '@/store/use-player-store'
import { useUserStore } from '@/store/use-user-store'


const AlbumPage = () => {
	const { albumId } = useParams()

	const { currentAlbum, isLoading, setFetchAlbumById } = useMusicStore()
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()
	const { token, featuredAlbums, toggleFeaturedAlbums, getFeaturedAlbums } = useUserStore()

	useEffect(() => {
		setFetchAlbumById(albumId || '')
	}, [setFetchAlbumById, albumId])

	useEffect(() => {
		if (!token) return
		getFeaturedAlbums()
	}, [getFeaturedAlbums, token])
	const handlePlayAlbumButton = () => {
		if (!currentAlbum) return
		const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id)
		if (isCurrentAlbumPlaying) togglePlay()
		else {
			playAlbum(currentAlbum?.songs)
		}
	}

	if (isLoading || !currentAlbum) return <CurrentAlbumSkeleton />

	const isFeaturedAlbum = featuredAlbums.some(
		(featuredAlbum) => featuredAlbum._id.toString() === currentAlbum?._id
	)

	console.log('FeaturedAlbums', featuredAlbums)

	return (
		<div className="h-full w-full ">
			<div className="relative min-h-full">
				<div className="absolute inset-0 bg-linear-to-b from-[#5c5c5c] via-transparent to-transparent pointer-events-none -z-10"></div>
				<div className="flex flex-col items-start gap-15 px-6 pt-5 md:pt-16">
					<div className="flex md:flex-row flex-col items-center w-full justify-start gap-5 ">
						<h3 className="text-gray-400 md:hidden">Album</h3>
						<img
							src={currentAlbum?.imageUrl}
							alt={currentAlbum?.title}
							className="w-55 h-55 rounded-lg object-cover"
						/>
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
								<div
									onClick={() => toggleFeaturedAlbums(currentAlbum._id)}
									className="bg-[#FFFFFF14] hover:bg-[#FFFFFF1A] p-2 cursor-pointer rounded-full flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-300"
								>
									{isFeaturedAlbum ? (
										<RiHeart2Fill
											size={40}
											className=" text-white transition-all ease-in-out duration-300"
										/>
									) : (
										<RiHeart2Line
											size={40}
											className="hover:text-white text-gray-400 transition-all ease-in-out duration-300"
										/>
									)}
								</div>
								<div
									onClick={handlePlayAlbumButton}
									className="bg-emerald-500 p-2 cursor-pointer rounded-full flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-300"
								>
									{currentAlbum && isPlaying ? (
										<RiPauseMiniFill
											size={40}
											className="text-black transition-all ease-in-out duration-300"
										/>
									) : (
										<RiPlayMiniFill
											size={40}
											className="text-black transition-all ease-in-out duration-300"
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full">
						<RenderSongs songs={currentAlbum.songs} className="flex flex-col" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlbumPage
