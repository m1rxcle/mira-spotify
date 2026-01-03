import { useClickAway } from '@reactuses/core'
import { MusicIcon, Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SearchSkeleton } from '@/shared/components/skeletons/search-skeleton'
import { Input } from '@/shared/components/ui/input'
import RenderSongs from '@/shared/components/user/songs/render-songs'
import { cn } from '@/shared/lib/utils'
import { useUserStore } from '@/shared/store/use-user-store'

const SearchPage = () => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const [focused, setFocused] = React.useState(false)

	const { search, isLoading, hasSearched, setSearch } = useUserStore()
	const [, setSearchParams] = useSearchParams()
	const searchRef = React.useRef(null)

	useClickAway(searchRef, () => {
		setFocused(false)
	})

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!searchQuery.trim()) {
				setSearch('')
				setSearchParams({})
				return
			}
			setSearchParams({ text: searchQuery })
			setSearch(searchQuery)
		}, 250)

		return () => clearTimeout(timer)
	}, [searchQuery])

	const handleFocus = () => {
		setFocused(true)
	}

	return (
		<div className="w-full h-full px-6 py-6 ">
			<div
				ref={searchRef}
				className={cn(
					focused
						? 'bg-white/5 border-2 border-white '
						: 'bg-transparent border-2 border-transparent',
					'relative rounded-full transition-colors ease-in-out duration-300 '
				)}
			>
				<Search
					className={cn(focused ? 'text-white' : 'text-gray-500', 'absolute top-2 left-3 ')}
					size={20}
				/>
				<Input
					onFocus={handleFocus}
					className="rounded-full pl-11 py-2 placeholder:text-[15px] placeholder:text-gray-500 text-[15px]"
					type="text"
					value={searchQuery}
					placeholder="Search for a songs or artists"
					onChange={(e) => {
						setSearchQuery(e.target.value)
					}}
				/>
			</div>

			<div className="mb-20">
				{isLoading && <SearchSkeleton />}
				{!isLoading && search.length > 0 && (
					<RenderSongs className="mt-10 flex flex-col gap-2" songs={search} />
				)}
				{!isLoading && hasSearched && search.length === 0 && (
					<div className="flex flex-col justify-center items-center mt-20">
						<Search size={40} className="mb-10 text-gray-500" />

						<h1 className="font-bold text-3xl mb-5">No results</h1>
						<p className="text-gray-500">Try searching for something else</p>
					</div>
				)}
			</div>
			<div>
				{!isLoading && !hasSearched && (
					<div className="flex flex-col justify-center items-center mt-20">
						<h1 className="text-xl md:text-3xl font-bold bg-linear-to-r from-emerald-400 via-green-600 to-emerald-400 bg-clip-text text-transparent">
							Try to search for a song or artist{' '}
						</h1>
						<p className="text-gray-500 mb-15">by typing in the search bar above</p>
						<MusicIcon size={100} className="text-emerald-500" />
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchPage
