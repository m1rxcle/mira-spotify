import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Carousel, CarouselContent, CarouselItem } from '../../ui/carousel'

import type { Album } from '@/types'

interface Props {
	albums: Album[]
}

export const RenderFeaturedAlbums: React.FC<Props> = ({ albums }) => {
	const navigate = useNavigate()
	return (
		<Carousel
			className="w-full relative"
			opts={{
				align: 'start',
				loop: false,
				containScroll: 'trimSnaps',
			}}
		>
			<CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
				{albums.map((album) => (
					<CarouselItem
						key={album._id}
						className="
    pl-2 md:pl-4 lg:pl-6
    basis-1/2 sm:basis-1/3 md:basis-auto 
  "
					>
						<div
							onClick={() => navigate(`/album/${album._id}`)}
							className="group flex flex-col items-center gap-1 cursor-pointer select-none"
						>
							<div className="relative aspect-square w-full max-w-[176px] sm:max-w-[192px] md:max-w-[208px] rounded-full overflow-hidden">
								<img
									src={album.imageUrl}
									alt={album.title}
									loading="lazy"
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>

							<div className="text-center">
								<h3 className="text-sm font-semibold truncate max-w-35 sm:max-w-40">
									{album.title}
								</h3>
								<p className="text-xs text-gray-400 truncate">{album.artist}</p>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}
