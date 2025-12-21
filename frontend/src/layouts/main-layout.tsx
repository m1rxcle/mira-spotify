import React from "react"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
	return (
		<div className="h-screen bg-zinc-900/40  text-white flex flex-col">
			{/* Main content */}
			<Outlet />
		</div>
	)
}

export default MainLayout
