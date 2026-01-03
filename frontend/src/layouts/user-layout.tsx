import { AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import AudioPlayer from '@/shared/components/user/audio-player'
import MusicPlayer from '@/shared/components/user/music-player/music-player'
import SideBar from '@/shared/components/user/side-bar/side-bar'

export const UserLayout = () => {
	return (
		<div className="h-screen flex md:flex-row flex-col-reverse">
			<SideBar />

			<div className="bg-black flex-1 flex flex-col min-h-0 md:gap-6 gap-1 md:pt-4 pb-4 md:px-4 px-1 ">
				<ScrollArea className="flex-1 md:rounded-3xl rounded-lg min-h-0  overflow-x-hidden  bg-zinc-900/60 border border-gray-400/15 z-50 relative">
					<AnimatePresence mode="wait">
						<Outlet key={location.pathname} />
					</AnimatePresence>
				</ScrollArea>
				<div>
					<AudioPlayer />
					<MusicPlayer />
				</div>
			</div>
		</div>
	)
}
