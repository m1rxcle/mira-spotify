import { useState } from 'react'

import { AuthTemplate } from '@/shared/components/user/auth/auth-template'
import { RegisterForm } from '@/shared/components/user/auth/register-form'

export const RegisterPage = () => {
	const [takeFirstName, setTakeFirstName] = useState<string>('')
	const [takeLastName, setTakeLastName] = useState<string>('')
	const [takeEmail, setTakeEmail] = useState<string>('')

	return (
		<div className="flex justify-center items-center min-h-screen ">
			<div className=" bg-zinc-800/50  rounded-2xl border border-gray-500/40 backdrop-blur-md shadow shadow-gray-500/30 py-10 px-3 lg:py-10 lg:px-20">
				<div className="flex flex-col justify-center items-center">
					<div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-start gap-10">
						<AuthTemplate firstName={takeFirstName} lastName={takeLastName} email={takeEmail} />
						<div>
							<RegisterForm
								setTakeFirstName={setTakeFirstName}
								setTakeLastName={setTakeLastName}
								setTakeEmail={setTakeEmail}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
