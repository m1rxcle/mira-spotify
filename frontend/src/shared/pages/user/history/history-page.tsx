import { useUser } from '@clerk/clerk-react'
import { RiPauseMiniFill, RiPlayMiniFill } from '@remixicon/react'
import { HistoryIcon } from 'lucide-react'
import { useEffect } from 'react'

import { NotFoundFeatures } from '@/shared/components/not-found/not-found-features'
import FeaturesSongsSkeleton from '@/shared/components/skeletons/features-songs-skeleton'
import { Footer } from '@/shared/components/user/footer'
import RenderSongs from '@/shared/components/user/songs/render-songs'
import { usePlayerStore } from '@/shared/store/use-player-store'
import { useUserStore } from '@/shared/store/use-user-store'

export const HistoryPage = () => {
	const { token, history, getSongsHistory } = useUserStore()
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

	const { user } = useUser()

	const handlePlayAlbumButton = () => {
		if (!history) return
		const isCurrentAlbumPlaying = history.some((song) => song._id === currentSong?._id)
		if (isCurrentAlbumPlaying) togglePlay()
		else {
			playAlbum(history)
		}
	}

	useEffect(() => {
		if (!token) return
		getSongsHistory()
	}, [getSongsHistory, token])

	if (!history || !token) return <FeaturesSongsSkeleton />

	if (history.length === 0) {
		return <NotFoundFeatures />
	}

	return (
		<div className="h-full w-full ">
			<div className="relative min-h-full">
				<div className="absolute inset-0 bg-linear-to-b from-[#333333] via-transparent to-transparent pointer-events-none -z-10"></div>
				<div className="flex flex-col items-start gap-15 px-6 pt-5 md:pt-16">
					<div className="flex md:flex-row flex-col items-center w-full justify-start gap-5 ">
						<h3 className="text-gray-400 md:hidden">Playlist</h3>
						<div className="bg-zinc-700/70 p-3 rounded-lg">
							<HistoryIcon className="object-cover w-55 h-55" />
						</div>
						<div className="flex flex-col gap-8">
							<div className="flex flex-col items-start justify-start ">
								<h3 className="text-gray-400 hidden md:inline">Playlist</h3>
								<h1 className="text-5xl font-extrabold text-center ">Your History</h1>
							</div>
							<div className="flex items-center md:items-start md:justify-start justify-center gap-2">
								<p className="text-gray-400">{user?.fullName}</p>
							</div>
							<div className="flex items-center justify-center md:items-start md:justify-start gap-4 ">
								<div
									onClick={handlePlayAlbumButton}
									className="bg-emerald-500 p-2 cursor-pointer rounded-full flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-300"
								>
									{isPlaying && history ? (
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
						<div className="w-full mt-10">
							<RenderSongs songs={history} className="flex flex-col" />
						</div>
					</div>
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default HistoryPage
