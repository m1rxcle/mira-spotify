import { motion } from 'framer-motion'
import { AppWindow } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { useAdminStore } from '@/shared/store/use-admin-store'

export const BackToAppButton: React.FC = () => {
	const { isAdmin } = useAdminStore()
	return (
		<div className="flex flex-col gap-4 items-center justify-center ">
			{isAdmin && (
				<motion.div
					transition={{ type: 'spring', damping: 15, stiffness: 300 }}
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.9, y: 2 }}
					className="flex cursor-pointer items-center justify-center bg-zinc-800/70 border-2 border-gray-500 rounded-2xl text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors ease-in-out duration-300"
				>
					<Link to={'/'} className="flex items-center p-3">
						<AppWindow className={'size-6 '} />
					</Link>
				</motion.div>
			)}
		</div>
	)
}
