import { useUser } from '@clerk/clerk-react'
import { RiPauseMiniFill, RiPlayMiniFill } from '@remixicon/react'
import { useEffect } from 'react'

import { RenderFeaturedAlbums } from '@/components/albums/render-featured-albums'
import { Footer } from '@/components/footer'
import { NotFoundFeatures } from '@/components/not-found/not-found-features'
import FeaturesSongsSkeleton from '@/components/skeletons/features-songs-skeleton'
import RenderSongs from '@/components/songs/render-songs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePlayerStore } from '@/store/use-player-store'
import { useUserStore } from '@/store/use-user-store'

export const FeaturesPage = () => {
	const { token, featuredSongs, isLoading, featuredAlbums, getFeaturedSongs, getFeaturedAlbums } =
		useUserStore()
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

	const { user } = useUser()

	const handlePlayAlbumButton = () => {
		if (!featuredSongs) return
		const isCurrentAlbumPlaying = featuredSongs.some((song) => song._id === currentSong?._id)
		if (isCurrentAlbumPlaying) togglePlay()
		else {
			playAlbum(featuredSongs)
		}
	}

	useEffect(() => {
		if (!token) return
		getFeaturedSongs()
		getFeaturedAlbums()
	}, [getFeaturedSongs, getFeaturedAlbums, token])

	if (!featuredSongs || isLoading || !token) return <FeaturesSongsSkeleton />

	if (featuredSongs.length === 0) {
		return <NotFoundFeatures />
	}

	return (
		<div className="h-full w-full ">
			<div className="relative min-h-full">
				<div className="absolute inset-0 bg-linear-to-b from-[#333333] via-transparent to-transparent pointer-events-none -z-10"></div>
				<div className="flex flex-col items-start gap-15 px-6 pt-5 md:pt-16">
					<div className="flex md:flex-row flex-col items-center w-full justify-start gap-5 ">
						<h3 className="text-gray-400 md:hidden">Playlist</h3>
						<img
							src="/features-heart-big.png"
							alt="features"
							className="w-55 h-55 rounded-lg object-cover"
						/>
						<div className="flex flex-col gap-8">
							<div className="flex flex-col items-start justify-start ">
								<h3 className="text-gray-400 hidden md:inline">Playlist</h3>
								<h1 className="text-5xl font-extrabold text-center ">Featured Songs</h1>
							</div>
							<div className="flex items-center md:items-start md:justify-start justify-center gap-2">
								<p className="text-gray-400">{user?.fullName}</p>
							</div>
							<div className="flex items-center justify-center md:items-start md:justify-start gap-4 ">
								<div
									onClick={handlePlayAlbumButton}
									className="bg-emerald-500 p-2 cursor-pointer rounded-full flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-300"
								>
									{isPlaying && featuredSongs ? (
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
						<Tabs defaultValue="songs">
							<TabsList className="w-full md:w-100 transition-all ease-in-out duration-300">
								<TabsTrigger
									value="songs"
									className="border-none text-md font-semibold transition-all ease-in-out duration-300"
								>
									Songs
								</TabsTrigger>
								<TabsTrigger
									value="albums"
									className="border-none text-md font-semibold transition-all ease-in-out duration-300 "
								>
									Albums
								</TabsTrigger>
							</TabsList>
							<TabsContent value="songs">
								<div className="w-full mt-10">
									<RenderSongs songs={featuredSongs} className="flex flex-col" />
								</div>
							</TabsContent>
							<TabsContent value="albums">
								<div className="w-full mt-10">
									<RenderFeaturedAlbums albums={featuredAlbums} />
								</div>
							</TabsContent>
						</Tabs>
					</div>
					<Footer />
				</div>
			</div>
		</div>
	)
}
