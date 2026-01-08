import { RiPauseLargeFill, RiPlayFill } from '@remixicon/react'
import { useEffect } from 'react'

import AlbumsSection from '@/shared/components/user/albums/albums-section'
import { Footer } from '@/shared/components/user/footer'
import HomeCircleBackground from '@/shared/components/user/home/home-circle-background'
import FeaturesSongsAndHistorySection from '@/shared/components/user/songs/features-songs-and-history-section'
import MadeForYouSongsSection from '@/shared/components/user/songs/made-for-you-songs-sections'
import TrendingSongsSection from '@/shared/components/user/songs/trending-songs-section'
import {
	useAlbums,
	useIsLoadingAlbums,
	useMadeForYouSongs,
	useSetFetchAlbums,
	useSetFetchMadeForYouSongs,
	useSetFetchTrendingSongs,
	useTrendingSongs,
} from '@/shared/store/use-music-store'
import { usePlayerIsPlaying, usePlayerTogglePlay } from '@/shared/store/use-player-store'
import {
	useGetFeaturedAlbums,
	useGetFeaturedSongs,
	useGetSongsHistory,
	useToken,
} from '@/shared/store/use-user-store'

const HomePage = () => {
	const trendingSongs = useTrendingSongs()
	const madeForYouSongs = useMadeForYouSongs()
	const albums = useAlbums()
	const isLoadingAlbums = useIsLoadingAlbums()
	const isLoadingMadeForYou = useIsLoadingAlbums()
	const isLoadingTrendingSongs = useIsLoadingAlbums()
	const isPlaying = usePlayerIsPlaying()
	const token = useToken()

	const setFetchAlbums = useSetFetchAlbums()
	const setFetchTrendingSongs = useSetFetchTrendingSongs()
	const setFetchMadeForYouSongs = useSetFetchMadeForYouSongs()
	const togglePlay = usePlayerTogglePlay()
	const getFeaturedSongs = useGetFeaturedSongs()
	const getSongsHistory = useGetSongsHistory()
	const getFeaturedAlbums = useGetFeaturedAlbums()

	const handlePlayMusic = () => {
		// Logic to play music
		togglePlay()
	}

	useEffect(() => {
		if (!token) return
		getFeaturedSongs()
		getFeaturedAlbums()
		getSongsHistory()
	}, [token, getFeaturedSongs, getFeaturedAlbums, getSongsHistory])

	useEffect(() => {
		setFetchTrendingSongs()
		setFetchMadeForYouSongs()

		setFetchAlbums()
	}, [setFetchTrendingSongs, setFetchAlbums, setFetchMadeForYouSongs])

	return (
		<section className="h-screen w-full px-6">
			<div className="h-[70%] relative flex justify-start items-center gap-20">
				<div className="flex flex-col items-center justify-between  mx-auto text-center ">
					<div
						className="flex justify-center  items-start cursor-pointer hover:scale-110"
						onClick={handlePlayMusic}
					>
						{isPlaying ? (
							<RiPauseLargeFill className="size-14 font-bold" />
						) : (
							<RiPlayFill className="size-14 font-bold" />
						)}
						<h1 className="text-5xl font-extrabold">My music</h1>
					</div>
					<HomeCircleBackground />
				</div>
			</div>
			<div className="flex flex-col gap-10 mb-20">
				<FeaturesSongsAndHistorySection />
				<h2 className="text-4xl font-bold ">New Albums</h2>
				<AlbumsSection albums={albums} isLoading={isLoadingAlbums} />
				<h2 className="text-4xl font-bold ">Trends</h2>
				<TrendingSongsSection trendingSongs={trendingSongs} isLoading={isLoadingTrendingSongs} />
				<h2 className="text-4xl font-bold ">Made For you</h2>
				<MadeForYouSongsSection madeForYouSongs={madeForYouSongs} isLoading={isLoadingMadeForYou} />
			</div>
			<Footer />
		</section>
	)
}

export default HomePage
