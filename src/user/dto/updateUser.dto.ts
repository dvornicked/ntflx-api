import { IsEmail, MinLength } from 'class-validator'

export class UpdateUserDto {
	@MinLength(3, { message: 'Username must be at least 3 characters long' })
	username: string

	@IsEmail()
	email: string
}
