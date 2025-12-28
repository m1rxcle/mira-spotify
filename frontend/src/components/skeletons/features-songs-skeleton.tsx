import { Skeleton } from "../ui/skeleton"

const FeaturesSongsSkeleton = () => {
	return (
		<div className="h-full w-full ">
			<div className="relative min-h-full">
				<div className="absolute inset-0 bg-linear-to-b from-[#5c5c5c] via-transparent to-transparent pointer-events-none -z-10"></div>
				<div className="flex flex-col items-start gap-15 px-6 pt-5 md:pt-16">
					<div className="flex md:flex-row flex-col md:items-start md:justify-start w-full items-center  gap-5 ">
						<Skeleton className="w-20 h-10 md:hidden inline" />

						<Skeleton className="w-60 h-60 rounded-lg object-cover" />
						<div className="flex flex-col md:items-start md:justify-start items-center justify-center gap-5">
							<div className="flex flex-col gap-2 items-start justify-start">
								<Skeleton className="w-20 h-10 hidden md:inline" />
								<Skeleton className="w-100 h-10" />
							</div>
							<div className="flex items-center  gap-2">
								<Skeleton className="w-50 h-10" />
							</div>
						</div>
					</div>
					<div className="w-full">
						<ul>
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
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeaturesSongsSkeleton
