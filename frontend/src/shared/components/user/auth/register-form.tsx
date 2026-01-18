import { zodResolver } from '@hookform/resolvers/zod'
import React, { type Dispatch, type SetStateAction } from 'react'
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
import { RegisterSchema, type RegisterSchemaType } from '@/shared/schemas/register-schema'
import { useIsLoadingRegister, useSetRegisterValues } from '@/shared/store/use-auth-store'
interface Props {
	setTakeFirstName: Dispatch<SetStateAction<string>>
	setTakeLastName: Dispatch<SetStateAction<string>>
	setTakeEmail: Dispatch<SetStateAction<string>>
}

export const RegisterForm: React.FC<Props> = ({
	setTakeEmail,
	setTakeFirstName,
	setTakeLastName,
}) => {
	const [showPassword, setShowPassword] = React.useState(false)
	const [showRepeatPassword, setShowRepeatPassword] = React.useState(false)

	const router = useNavigate()
	const setRegisterValues = useSetRegisterValues()
	const isLoadingRegister = useIsLoadingRegister()

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
	})

	const onSubmit = async (values: RegisterSchemaType) => {
		const result = await setRegisterValues(values)

		if (result.success) {
			toast.success(result.message)
			router('/auth/login')
		} else {
			toast.error(result.message)
		}
	}
	return (
		<Form {...form}>
			<form className="grid gap-2 space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel htmlFor="firstName" className="text-xl">
									First Name
								</FormLabel>
								<FormControl>
									<Input
										disabled={isLoadingRegister}
										className="font-medium md:text-xl"
										id="firstName"
										type="text"
										placeholder="Alan"
										{...field}
										onInput={(e) => {
											e.preventDefault()
											setTakeFirstName(e.currentTarget.value)
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="lastName" className="text-xl">
								Last Name
							</FormLabel>
							<FormControl>
								<Input
									disabled={isLoadingRegister}
									className="font-medium md:text-xl"
									id="lastName"
									type="text"
									placeholder="Turing"
									{...field}
									onInput={(e) => {
										e.preventDefault()
										setTakeLastName(e.currentTarget.value)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
									disabled={isLoadingRegister}
									className="font-medium md:text-xl"
									id="name"
									type="text"
									placeholder="alan@turing.com"
									{...field}
									onInput={(e) => {
										e.preventDefault()
										setTakeEmail(e.currentTarget.value)
									}}
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
						<FormItem className="relative">
							<FormLabel htmlFor="password" className="text-xl">
								Password
							</FormLabel>
							<FormControl>
								<div className="relative flex items-center">
									<Input
										disabled={isLoadingRegister}
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

				<FormField
					control={form.control}
					name="repeatPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="repeatPassword" className="text-xl">
								Repeat Password
							</FormLabel>
							<FormControl>
								<div className="relative flex items-center">
									<Input
										disabled={isLoadingRegister}
										className="font-medium md:text-xl"
										id="repeatPassword"
										type={showRepeatPassword ? 'text' : 'password'}
										placeholder="***********"
										{...field}
									/>
									<ShowPasswordButton
										setShowPassword={setShowRepeatPassword}
										showPassword={showRepeatPassword}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<AnimationLoginOrRegisterButton disabled={isLoadingRegister} isLogin={false} />
			</form>
		</Form>
	)
}
