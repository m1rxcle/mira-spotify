import { Skeleton } from '../ui/skeleton'

const TrendingSongsSkeleton = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{Array.from({ length: 8 }).map((_, index) => (
				<div key={index} className="flex justify-between items-center px-2 py-2 ">
					<div className="flex items-center gap-5">
						<Skeleton className="w-12 h-12 rounded-md" />
						<div className="flex flex-col justify-center gap-2 items-start">
							<Skeleton className="w-25 h-3" />
							<Skeleton className="w-10 h-3" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<div className="hover:text-white transition-colors ease-in-out duration-300">
							<Skeleton className="w-6 h-6" />
						</div>

						<div>
							<Skeleton className="w-6 h-6" />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default TrendingSongsSkeleton
