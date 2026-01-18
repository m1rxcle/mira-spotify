import z from 'zod'

export const LoginSchema = z.object({
	email: z.email({
		error: 'Please enter a valid email address',
	}),
	password: z.string().min(6, {
		error: 'Password must be at least 6 characters',
	}),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
