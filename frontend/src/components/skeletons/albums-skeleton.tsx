import React from "react"
import { Skeleton } from "../ui/skeleton"

const AlbumsSkeleton = () => {
	return (
		<div className="flex items-center justify-start h-full w-full gap-6">
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index} className="flex flex-col items-start gap-2 ">
					<Skeleton className="w-60 h-60 rounded-md object-cover " />
					<Skeleton className="w-40 h-5 rounded-md" />
					<Skeleton className="w-30 h-4 rounded-md" />
				</div>
			))}
		</div>
	)
}

export default AlbumsSkeleton
