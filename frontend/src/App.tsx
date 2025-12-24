import { Route, Routes } from "react-router-dom"
import AuthCallbackPage from "./pages/auth-callback/auth-callback-page"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import SideBar from "./components/side-bar"
import AlbumPage from "./pages/album/album-page"
import MusicPlayer from "./components/music-player/music-player"
import AudioPlayer from "./components/audio-player"
import HomePage from "./pages/home-page"

function App() {
	return (
		<div className="h-screen flex md:flex-row flex-col-reverse">
			<SideBar />

			<div className="bg-black flex-1 flex flex-col min-h-0 md:gap-6 gap-1 md:pt-4 pb-4 md:px-4 px-1 ">
				<main className="flex-1 md:rounded-3xl rounded-lg min-h-0 overflow-y-auto scrollbar bg-zinc-900/60 border border-gray-400/15 z-50 relative">
					<Routes>
						<Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"} />} />
						<Route path="/auth-callback" element={<AuthCallbackPage />} />

						<Route path="/" element={<HomePage />} />
						<Route path="/album/:albumId" element={<AlbumPage />} />
					</Routes>
				</main>
				<div>
					<AudioPlayer />
					<MusicPlayer />
				</div>
			</div>
		</div>
	)
}

export default App
