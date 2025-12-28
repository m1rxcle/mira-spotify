import { Footer } from "@/components/footer"
import { NotFoundFeatures } from "@/components/not-found/not-found-features"
import FeaturesSongsSkeleton from "@/components/skeletons/features-songs-skeleton"
import RenderSongs from "@/components/songs/render-songs"
import { usePlayerStore } from "@/store/use-player-store"
import { useUserStore } from "@/store/use-user-store"
import { useUser } from "@clerk/clerk-react"
import { RiPauseMiniFill, RiPlayMiniFill } from "@remixicon/react"
import { useEffect } from "react"

export const FeaturesPage = () => {
	const { token, featuredSongs, isLoading, getFeaturedSongs } = useUserStore()
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
	}, [getFeaturedSongs, token])

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
						<img src="/features-heart-big.png" alt="features" className="w-55 h-55 rounded-lg object-cover" />
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
										<RiPauseMiniFill size={40} className="text-black transition-all ease-in-out duration-300" />
									) : (
										<RiPlayMiniFill size={40} className="text-black transition-all ease-in-out duration-300" />
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full">
						<RenderSongs songs={featuredSongs} className="flex flex-col" />
					</div>
					<Footer />
				</div>
			</div>
		</div>
	)
}
