import { Link } from 'react-router-dom'

import InteractiveButtonsOnAlbum from './interactive-buttons-on-album'
import AlbumsSkeleton from '../../skeletons/albums-skeleton'

import { useFeaturedAlbums, useToggleFeaturedAlbums } from '@/shared/store/use-user-store'
import type { Album } from '@/types'

const AlbumsSection = ({ albums, isLoading }: { albums: Album[]; isLoading: boolean }) => {
	const featuredAlbums = useFeaturedAlbums()
	const toggleFeaturedAlbums = useToggleFeaturedAlbums()

	if (!albums || isLoading) {
		return <AlbumsSkeleton />
	}
	return (
		<div className="sm:grid sm:grid-cols-2 gap-10 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 w-full ">
			{albums.map((album) => {
				const isFeaturedAlbum = featuredAlbums.some(
					(featuredAlbum) => featuredAlbum._id.toString() === album._id
				)
				return (
					<Link
						to={`/album/${album._id}`}
						key={album._id}
						className="flex w-full flex-col items-start cursor-pointer gap-4 relative group"
					>
						<img
							loading="lazy"
							src={album.imageUrl}
							alt={album.title}
							className="w-full h-60 lg:h-60 rounded-md object-cover hover:opacity-50 transition-opacity ease-in-out duration-300 "
						/>
						<div className="flex flex-col items-start justify-start ">
							<h3 className="text-base font-semibold">{album.title}</h3>
							<p className="text-gray-400 ">{album.artist}</p>
						</div>
						<div className="opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300">
							<InteractiveButtonsOnAlbum
								isFeaturedAlbum={isFeaturedAlbum}
								toggleFeaturedAlbums={toggleFeaturedAlbums}
								albumId={album._id}
							/>
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default AlbumsSection
