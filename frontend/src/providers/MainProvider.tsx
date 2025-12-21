import React from "react"
import { ClerkProvider } from "@clerk/clerk-react"
import { BrowserRouter } from "react-router-dom"
import AuthProvider from "./AuthProvider"

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error("Add your Clerk Publishable Key to the .env file")
}
const MainProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<AuthProvider>
				<BrowserRouter>{children}</BrowserRouter>
			</AuthProvider>
		</ClerkProvider>
	)
}

export default MainProvider
