import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsNotEmpty()
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Password must be at least 8 characters long',
	})
	@IsString()
	password: string
}
