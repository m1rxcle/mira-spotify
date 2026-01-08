import { motion } from 'framer-motion'
import React from 'react'

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
		>
			{children}
		</motion.main>
	)
}
