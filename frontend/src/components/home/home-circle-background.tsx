const HomeCircleBackground = () => {
	return (
		<>
			<div className="absolute rounded-full w-1/2 h-1/2 -z-10 opacity-15 bg-emerald-700 blur-2xl backdrop-blur-lg animate-blur-first-circle"></div>
			<div className="absolute rounded-full w-1/2 h-1/2 -z-10 opacity-15 bg-purple-700 blur-2xl backdrop-blur-md animate-blur-second-circle"></div>
			<div className="absolute rounded-full w-2/8 h-2/8 -z-10 opacity-15 bg-amber-700 blur-2xl backdrop-blur-xl animate-blur-third-circle"></div>
			<div className="absolute rounded-full w-2/4 h-1/2 -z-10 opacity-15 bg-emerald-700 blur-2xl backdrop-blur-lg animate-blur-first-circle"></div>
			<div className="absolute rounded-full w-1/3 h-1/3 -z-10 opacity-15 bg-red-700 blur-2xl backdrop-blur-md animate-blur-second-circle"></div>
			<div className="absolute rounded-full w-1/4 h-1/4 -z-10 opacity-15 bg-emerald-700 blur-2xl backdrop-blur-xl animate-blur-third-circle"></div>
		</>
	)
}

export default HomeCircleBackground
