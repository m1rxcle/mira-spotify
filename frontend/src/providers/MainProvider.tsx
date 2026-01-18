import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

const MainProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<BrowserRouter>
			{children}
			<Toaster />
		</BrowserRouter>
	)
}

export default MainProvider
