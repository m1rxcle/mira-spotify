import { AuthTemplate } from '@/shared/components/user/auth/auth-template'
import { LoginForm } from '@/shared/components/user/auth/login-form'

export const LoginPage = () => {
	return (
		<div className="flex justify-center items-center h-screen ">
			<div className=" bg-zinc-800/30 h-full rounded-none md:h-auto md:rounded-2xl border border-gray-500/40 backdrop-blur-md shadow shadow-gray-500/30 py-10 px-3 lg:py-20 lg:px-20">
				<div className="flex flex-col justify-center items-center">
					<div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-start gap-10">
						<AuthTemplate isLogin />
						<div>
							<LoginForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
