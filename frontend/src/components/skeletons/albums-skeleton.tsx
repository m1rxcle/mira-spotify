import { Skeleton } from "../ui/skeleton"

const AlbumsSkeleton = () => {
	return (
		<>
			<div className="sm:grid sm:grid-cols-1 gap-10  md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 w-full ">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="flex w-full flex-col items-start gap-2 ">
						<Skeleton className="w-full h-60 rounded-md object-cover " />
						<Skeleton className="w-40 h-5 rounded-md" />
						<Skeleton className="w-30 h-4 rounded-md mb-10" />
					</div>
				))}
			</div>
		</>
	)
}

export default AlbumsSkeleton
