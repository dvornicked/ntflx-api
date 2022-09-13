import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@MinLength(3, { message: 'Username must be at least 3 characters long' })
	username: string

	@IsOptional()
	@IsString()
	desc: string

	@IsOptional()
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	image: string
}
