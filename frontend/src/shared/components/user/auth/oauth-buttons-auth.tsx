import { RiGithubFill, RiGoogleFill } from '@remixicon/react'

import { Button } from '../../ui/button'

const OAuthButtonsAuth = () => {
	return (
		<>
			<Button className="w-full lg:w-3/7 lg:text-lg">
				<RiGoogleFill />
				Continue with Google
			</Button>
			<Button className="w-full lg:w-3/7 lg:text-lg">
				<RiGithubFill />
				Continue with GitHub
			</Button>
		</>
	)
}

export default OAuthButtonsAuth
