import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { AdminLayout } from './layouts/admin-layout'
import { UserLayout } from './layouts/user-layout'
import { PageTransition } from './shared/animations/page-transition'
import { GlobalNotFound } from './shared/components/not-found/global-not-found'
import { useInitUseR } from './shared/hooks/use-init-user'
import { CreateAlbumPage } from './shared/pages/admin/create-album/create-album-page'
import { CreateSongPage } from './shared/pages/admin/create-song/create-song-page'
import { StatsPage } from './shared/pages/admin/stats/stats-page'
import { UsersPage } from './shared/pages/admin/users/users-page'
import AlbumPage from './shared/pages/user/album/album-page'
import AuthCallbackPage from './shared/pages/user/auth-callback/auth-callback-page'
import HistoryPage from './shared/pages/user/history/history-page'
import HomePage from './shared/pages/user/home-page'
import { FeaturesPage } from './shared/pages/user/library/features-page'
import SearchPage from './shared/pages/user/search/search-page'

function App() {
	const location = useLocation()

	useInitUseR()
	return (
		<Routes location={location} key={location.pathname}>
			<Route element={<UserLayout />}>
				<Route
					path="/sso-callback"
					element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={'/auth-callback'} />}
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
				<Route
					path="/history"
					element={
						<PageTransition>
							<HistoryPage />
						</PageTransition>
					}
				/>
			</Route>
			<Route element={<AdminLayout />}>
				<Route path="/admin" element={<StatsPage />} />
				<Route path="/admin/songs" element={<CreateSongPage />} />
				<Route path="/admin/albums" element={<CreateAlbumPage />} />
				<Route path="/admin/users" element={<UsersPage />} />
			</Route>
		</Routes>
	)
}

export default App
