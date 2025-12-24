import { Skeleton } from "../ui/skeleton"

const CurrentAlbumSkeleton = () => {
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
								<Skeleton className="w-50 h-10" />
							</div>
							<div className="flex items-center  gap-2">
								<Skeleton className="w-20 h-10" />
								<p>●</p>
								<Skeleton className="w-50 h-10" />
							</div>
						</div>
					</div>
					<div className="w-full">
						<ul>
							{Array.from({ length: 10 }).map((_, index) => (
								<Skeleton
									className="flex items-center justify-between mt-4 p-4 rounded-lg cursor-pointer hover:bg-zinc-800 transition-all ease-in-out duration-300 group"
									key={index}
								>
									<Skeleton className="flex items-center justify-start gap-4 relative">
										<Skeleton className="text-gray-400 text-lg  " />
										<Skeleton className="absolute -translate-x-2 text-black bg-gray-400 rounded-full hidden group-hover:block " />
										<Skeleton className="text-white font-semibold text-lg" />
									</Skeleton>
									<Skeleton className="flex items-center gap-4">
										<Skeleton className="hover:text-white text-gray-400 transition-all ease-in-out duration-300" />
										<Skeleton className="text-gray-400 font-semibold" />
									</Skeleton>
								</Skeleton>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CurrentAlbumSkeleton
