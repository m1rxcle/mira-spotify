import React from "react"
import { Skeleton } from "../ui/skeleton"

const FeaturesSongsSkeleton = () => {
	return (
		<div className="grid grid-cols-2 gap-4">
			{Array.from({ length: 8 }).map((_, index) => (
				<Skeleton key={index} className=" rounded-lg flex items-center justify-between gap-2  p-2 pr-4">
					<Skeleton className="flex items-center gap-2">
						<Skeleton className="w-12 h-12 rounded-md object-contain" />
						<Skeleton className="flex flex-col items-start justify-start">
							<Skeleton />
							<Skeleton />
						</Skeleton>
					</Skeleton>

					<Skeleton />
				</Skeleton>
			))}
		</div>
	)
}

export default FeaturesSongsSkeleton
