import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { ShowPasswordButton } from './show-password-button'

import { AnimationLoginOrRegisterButton } from '@/shared/animations/animation-login-or-register-button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { LoginSchema, type LoginSchemaType } from '@/shared/schemas/login-schema'
import { useIsLoadingLogin, useSetLoginValues } from '@/shared/store/use-auth-store'

export const LoginForm = () => {
	const [showPassword, setShowPassword] = React.useState(false)

	const router = useNavigate()
	const setLoginValues = useSetLoginValues()
	const isLoadingLogin = useIsLoadingLogin()

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: LoginSchemaType) => {
		const result = await setLoginValues(values)
		if (result.success) {
			toast.success(result.message)
			router('/')
		} else {
			toast.error(result.message)
		}
	}

	return (
		<Form {...form}>
			<form className="grid gap-2 space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="name" className="text-xl">
								Email
							</FormLabel>
							<FormControl>
								<Input
									disabled={isLoadingLogin}
									className="h-12 font-medium md:text-xl"
									id="name"
									type="text"
									placeholder="alan@turing.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="password" className="text-xl">
								Password
							</FormLabel>
							<FormControl>
								<div className="relative flex items-center">
									<Input
										disabled={isLoadingLogin}
										className="font-medium md:text-xl "
										id="password"
										type={showPassword ? 'text' : 'password'}
										placeholder="***********"
										{...field}
									/>
									<ShowPasswordButton
										setShowPassword={setShowPassword}
										showPassword={showPassword}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<AnimationLoginOrRegisterButton disabled={isLoadingLogin} isLogin={true} />
			</form>
		</Form>
	)
}
