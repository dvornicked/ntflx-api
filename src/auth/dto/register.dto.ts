import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterDto {
	@IsNotEmpty()
	@MinLength(3, { message: 'Username must be at least 3 characters long' })
	username: string

	@IsNotEmpty()
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Password must be at least 8 characters long',
	})
	@IsString()
	password: string
}
