import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

export const GlobalNotFound: React.FC = () => (
	<div className="flex flex-col items-center justify-center h-screen">
		<div className="flex flex-col gap-5 items-center justify-center pointer-events-none cursor-not-allowed">
			<img className="w-20 h-20" src="/spotify.png" alt="spoty" />
			<h1 className="font-bold  text-3xl bg-linear-to-r from-emerald-400 via-green-600 to-emerald-400 bg-clip-text text-transparent">
				Not found anything
			</h1>
		</div>

		<p className="mt-2 text-lg mb-10 text-gray-500">Try to find another page</p>
		<motion.div
			transition={{ type: 'spring', damping: 15, stiffness: 300 }}
			whileHover={{ scale: 1.05, y: -2 }}
			whileTap={{ scale: 0.9, y: 2 }}
			className="flex cursor-pointer items-center justify-center border-2 border-zinc-800 rounded-2xl hover:border-emerald-500 hover:text-emerald-500 transition-colors ease-in-out duration-300"
		>
			<Link to={'/'} className="flex items-center justify-center p-4 w-40 ">
				<span className="font-semibold text-center">Back to app</span>
			</Link>
		</motion.div>
	</div>
)
