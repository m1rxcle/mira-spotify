import { motion } from 'framer-motion'
import { LayoutDashboard } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { useAdmin } from '@/shared/store/use-admin-store'

export const DashBoardButton: React.FC = () => {
	const isAdmin = useAdmin()
	return (
		<div className="flex flex-col gap-4 items-center justify-center ">
			{isAdmin && (
				<motion.div
					transition={{ type: 'spring', damping: 15, stiffness: 300 }}
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.9, y: 2 }}
					className="flex cursor-pointer group items-center bg-zinc-800/70 justify-center border-2 border-gray-500 rounded-2xl text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors ease-in-out duration-300"
				>
					<Link to={'/admin/dashboard'} className="flex items-center p-3">
						<LayoutDashboard className={'size-6 '} />
					</Link>
				</motion.div>
			)}
		</div>
	)
}
