import { useUser } from '@clerk/clerk-react'
import { RiPauseMiniFill, RiPlayMiniFill } from '@remixicon/react'
import { useEffect } from 'react'

import { NotFoundFeatures } from '@/shared/components/not-found/not-found-features'
import FeaturesSongsSkeleton from '@/shared/components/skeletons/features-songs-skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { RenderFeaturedAlbums } from '@/shared/components/user/albums/render-featured-albums'
import { Footer } from '@/shared/components/user/footer'
import { UnauthorizedUser } from '@/shared/components/user/profile/unauthorized-user'
import RenderSongs from '@/shared/components/user/songs/render-songs'
import {
	usePlayerCurrentSong,
	usePlayerIsPlaying,
	usePlayerPlayAlbum,
	usePlayerTogglePlay,
} from '@/shared/store/use-player-store'
import {
	useFeaturedAlbums,
	useFeaturedSongs,
	useGetFeaturedAlbums,
	useGetFeaturedSongs,
	useIsLoadingForUserFeaturedSongs,
	useToken,
} from '@/shared/store/use-user-store'

export const FeaturesPage = () => {
	const { user } = useUser()

	if (!user) return <UnauthorizedUser />

	const token = useToken()
	const featuredSongs = useFeaturedSongs()
	const isLoadingForUserFeatured = useIsLoadingForUserFeaturedSongs()
	const featuredAlbums = useFeaturedAlbums()
	const isPlaying = usePlayerIsPlaying()
	const currentSong = usePlayerCurrentSong()

	const getFeaturedSongs = useGetFeaturedSongs()
	const getFeaturedAlbums = useGetFeaturedAlbums()
	const togglePlay = usePlayerTogglePlay()
	const playAlbum = usePlayerPlayAlbum()

	useEffect(() => {
		if (!token) return
		getFeaturedSongs()
		getFeaturedAlbums()
	}, [getFeaturedSongs, getFeaturedAlbums, token])

	if (!featuredSongs || isLoadingForUserFeatured || !token || !featuredAlbums)
		return <FeaturesSongsSkeleton />

	if (featuredSongs.length === 0) {
		return <NotFoundFeatures />
	}

	const handlePlayAlbumButton = () => {
		if (!featuredSongs) return
		const isCurrentAlbumPlaying = featuredSongs.some((song) => song._id === currentSong?._id)
		if (isCurrentAlbumPlaying) togglePlay()
		else {
			playAlbum(featuredSongs)
		}
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
							<TabsList className="w-full md:w-100 transition-all ease-in-out duration-300 ">
								<TabsTrigger
									value="songs"
									className="border-none text-md font-semibold transition-all ease-in-out duration-300 cursor-pointer"
								>
									Songs
								</TabsTrigger>
								<TabsTrigger
									value="albums"
									className="border-none text-md font-semibold transition-all ease-in-out duration-300  cursor-pointer"
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
