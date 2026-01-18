import z from 'zod'

export const RegisterSchema = z
	.object({
		firstName: z
			.string({
				error: 'Please enter your first name',
			})
			.min(2, {
				error: 'First name must be at least 2 characters',
			}),
		lastName: z
			.string({
				error: 'Please enter your last name',
			})
			.min(2, {
				error: 'Last name must be at least 2 characters',
			}),

		email: z.email({
			error: 'Please enter a valid email address',
		}),
		password: z
			.string({
				error: 'Please enter a password',
			})
			.min(6, {
				error: 'Password must be at least 6 characters',
			}),
		repeatPassword: z
			.string({
				error: 'Please enter a password',
			})
			.min(6, {
				error: 'Password must be at least 6 characters',
			}),
	})
	.refine((data) => data.password === data.repeatPassword, {
		error: 'Passwords do not match',
		path: ['repeatPassword'],
	})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
