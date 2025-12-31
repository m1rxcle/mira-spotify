import { motion } from 'framer-motion'
import React from 'react'

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.main
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.35, ease: 'easeOut' }}
		>
			{children}
		</motion.main>
	)
}
