import { Eye, EyeClosed } from 'lucide-react'
import React from 'react'

interface Props {
	showPassword: boolean
	setShowPassword: (value: boolean) => void
}

export const ShowPasswordButton: React.FC<Props> = ({ showPassword, setShowPassword }) => {
	return (
		<>
			{showPassword ? (
				<EyeClosed
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-3 cursor-pointer text-gray-400 hover:text-gray-500"
				/>
			) : (
				<Eye
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-3 cursor-pointer text-gray-400 hover:text-gray-500"
				/>
			)}
		</>
	)
}
