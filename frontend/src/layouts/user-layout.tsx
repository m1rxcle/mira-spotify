import { AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'

import { PageTransition } from '@/shared/animations/page-transition'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import AudioPlayer from '@/shared/components/user/audio-player'
import { DashBoardButton } from '@/shared/components/user/dashboard-button'
import MusicPlayer from '@/shared/components/user/music-player/music-player'
import SideBar from '@/shared/components/user/side-bar/side-bar'
import { useAdminStore } from '@/shared/store/use-admin-store'

export const UserLayout = () => {
	const { isAdmin } = useAdminStore()
	return (
		<div className="h-screen flex md:flex-row flex-col-reverse">
			<SideBar />

			<div className="bg-black flex-1 flex flex-col min-h-0 md:gap-6 gap-1 md:pt-4 pb-4 md:px-4 px-1 ">
				<ScrollArea className="flex-1 md:rounded-3xl rounded-lg min-h-0  overflow-x-hidden  bg-zinc-900/60 border border-gray-400/15 z-0 relative">
					<AnimatePresence mode="wait">
						<PageTransition>
							<Outlet key={location.pathname} />
						</PageTransition>
					</AnimatePresence>
				</ScrollArea>
				{isAdmin && (
					<div className="absolute bottom-40 right-5 md:hidden">
						<DashBoardButton />
					</div>
				)}
				<div className="z-50">
					<AudioPlayer />
					<MusicPlayer />
				</div>
			</div>
		</div>
	)
}
