import { Link } from 'react-router-dom'

import { Button } from '../ui/button'

const SingInOAuthButtons = () => {
	return (
		<Link to={'/auth/login'}>
			<Button variant={'secondary'} className="w-full text-white border-zinc-200 h-11">
				Create an account
			</Button>
		</Link>
	)
}

export default SingInOAuthButtons
