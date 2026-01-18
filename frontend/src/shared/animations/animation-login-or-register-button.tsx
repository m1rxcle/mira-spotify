import { motion } from 'framer-motion'
import React from 'react'

interface Props {
	isLogin?: boolean
	disabled?: boolean
	className?: string
}

export const AnimationLoginOrRegisterButton: React.FC<Props> = ({ disabled, isLogin }) => {
	return (
		<motion.button
			disabled={disabled}
			type="submit"
			transition={{ type: 'spring', damping: 15, stiffness: 300 }}
			whileHover={{ scale: 1.01, y: -2 }}
			whileTap={{ scale: 1, y: 2 }}
			className="flex cursor-pointer items-center justify-center border-2 border-zinc-800 rounded-lg hover:border-emerald-500 hover:text-emerald-500 transition-colors ease-in-out duration-300"
		>
			<span className="font-semibold text-md p-1">{isLogin ? 'Login' : 'Register'}</span>
		</motion.button>
	)
}
