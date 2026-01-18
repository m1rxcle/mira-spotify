import { useEffect } from 'react'

import { MobilePlayerControls } from './mobile-player-controls'
import { MobilePlayerInfo } from './mobile-player-info'
import { MobilePlayerProgress } from './mobile-player-progress'
import { PlayerControls } from './player-controls'
import { PlayerInfo } from './player-info'
import { PlayerProgress } from './player-progress'
import { PlayerSlider } from './player-slider'
import { PlayerToggleFeaturesMessage } from './player-toggle-features-message'
import { PlayerVolume } from './player-volume'
import MusicPlayerSkeleton from '../../skeletons/music-player-skeleton'

import { cn } from '@/shared/lib/utils'
import { useIsLoadingAlbums } from '@/shared/store/use-music-store'
import {
	usePlayerChangeColors,
	usePlayerCurrentSong,
	usePlayerHandleSetCurrentSong,
} from '@/shared/store/use-player-store'
import { useGetSongsHistory, useHistory, useUser } from '@/shared/store/use-user-store'

const MusicPlayer = () => {
	const history = useHistory()
	const isLoadingAlbums = useIsLoadingAlbums()
	const currentSong = usePlayerCurrentSong()
	const changeColors = usePlayerChangeColors()
	const user = useUser()

	const getSongsHistory = useGetSongsHistory()
	const handleSetCurrentSong = usePlayerHandleSetCurrentSong()

	useEffect(() => {
		if (!user) return

		if (history && history.length === 0) {
			getSongsHistory()
			return
		}

		if (!currentSong && history.length > 0) {
			handleSetCurrentSong(history[0])
		}
	}, [user, history, currentSong, getSongsHistory, handleSetCurrentSong])

	if (isLoadingAlbums || !currentSong) {
		return <MusicPlayerSkeleton />
	}

	return (
		<div
			className={cn(
				changeColors === 'red' && 'bg-red-500/50',
				changeColors === 'green' && 'bg-green-500/50',
				changeColors === 'blue' && 'bg-blue-500/50',
				changeColors === 'yellow' && 'bg-yellow-500/50',
				changeColors === 'orange' && 'bg-orange-500/50',
				changeColors === 'gray' && 'bg-gray-500/50',
				changeColors === 'cyan' && 'bg-cyan-500/50',
				changeColors === 'indigo' && 'bg-indigo-500/50',
				changeColors === 'pink' && 'bg-pink-500/50',
				changeColors === 'teal' && 'bg-teal-500/50',
				changeColors === 'amber' && 'bg-amber-500/50',
				'md:rounded-2xl rounded-lg md:h-22 h-16  relative group cursor-pointer'
			)}
		>
			<div className="absolute left-0 -top-3  w-full -z-10 h-full bg-transparent rounded-full overflow-hidden hidden md:block">
				<PlayerSlider currentSong={currentSong} />
			</div>

			<div className="hidden md:flex justify-between items-center  pl-2 pr-6 py-2 md:py-2.5 text-white/50  relative z-20">
				<PlayerToggleFeaturesMessage />
				<PlayerInfo currentSong={currentSong} />
				<PlayerControls currentSong={currentSong} />
				<PlayerProgress currentSong={currentSong} />
				<PlayerVolume />
			</div>

			{/* mobile */}

			<div className="relative flex justify-between items-center px-2 py-2 md:hidden z-50 ">
				<PlayerToggleFeaturesMessage />
				<MobilePlayerInfo currentSong={currentSong} />
				<MobilePlayerControls currentSong={currentSong} />
				<MobilePlayerProgress currentSong={currentSong} />
			</div>
		</div>
	)
}

export default MusicPlayer
