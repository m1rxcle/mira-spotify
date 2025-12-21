import type { Album } from "@/types"
import { Link } from "react-router-dom"
import AlbumsSkeleton from "../skeletons/albums-skeleton"
import InteractiveButtonsOnAlbum from "./interactive-buttons-on-album"

const AlbumsSection = ({ albums, isLoading }: { albums: Album[]; isLoading: boolean }) => {
	if (!albums || isLoading) {
		return <AlbumsSkeleton />
	}
	return (
		<div className="flex items-center justify-start h-full w-full gap-6">
			{albums.map((album) => (
				<Link to={`/album/${album._id}`} key={album._id} className="flex flex-col items-start cursor-pointer gap-2 relative group">
					<img
						loading="lazy"
						src={album.imageUrl}
						alt={album.title}
						className="w-60 h-60 rounded-md object-cover hover:opacity-50 transition-opacity ease-in-out duration-300 "
					/>
					<div className="flex flex-col items-start justify-start ">
						<h3 className="text-base font-semibold">{album.title}</h3>
						<p className="text-gray-400">{album.artist}</p>
					</div>
					<div className="opacity-0 group-hover:opacity-100">
						<InteractiveButtonsOnAlbum />
					</div>
				</Link>
			))}
		</div>
	)
}

export default AlbumsSection
