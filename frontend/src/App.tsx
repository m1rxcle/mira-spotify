import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import { PageTransition } from './animations/page-transition'
import AudioPlayer from './components/audio-player'
import MusicPlayer from './components/music-player/music-player'
import { GlobalNotFound } from './components/not-found/global-not-found'
import SideBar from './components/side-bar'
import { ScrollArea } from './components/ui/scroll-area'
import { useInitUseR } from './hooks/use-init-user'
import AlbumPage from './pages/album/album-page'
import AuthCallbackPage from './pages/auth-callback/auth-callback-page'
import HomePage from './pages/home-page'
import { FeaturesPage } from './pages/library/features-page'
import SearchPage from './pages/search/search-page'

function App() {
	const location = useLocation()

	useInitUseR()
	return (
		<div className="h-screen flex md:flex-row flex-col-reverse">
			<SideBar />

			<div className="bg-black flex-1 flex flex-col min-h-0 md:gap-6 gap-1 md:pt-4 pb-4 md:px-4 px-1 ">
				<ScrollArea className="flex-1 md:rounded-3xl rounded-lg min-h-0  overflow-x-hidden  bg-zinc-900/60 border border-gray-400/15 z-50 relative">
					<AnimatePresence mode="wait">
						<Routes location={location} key={location.pathname}>
							<Route
								path="/sso-callback"
								element={
									<AuthenticateWithRedirectCallback signInForceRedirectUrl={'/auth-callback'} />
								}
							/>
							<Route path="/auth-callback" element={<AuthCallbackPage />} />
							<Route path="*" element={<GlobalNotFound />} />
							<Route
								path="/"
								element={
									<PageTransition>
										<HomePage />
									</PageTransition>
								}
							/>
							<Route
								path="/album/:albumId"
								element={
									<PageTransition>
										<AlbumPage />
									</PageTransition>
								}
							/>
							<Route
								path="/search"
								element={
									<PageTransition>
										<SearchPage />
									</PageTransition>
								}
							/>
							<Route
								path="/library"
								element={
									<PageTransition>
										<FeaturesPage />
									</PageTransition>
								}
							/>
						</Routes>
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

export default App
