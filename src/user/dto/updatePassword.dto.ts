import { IsString, MinLength } from 'class-validator'

export class UpdatePasswordDto {
	@MinLength(8, {
		message: 'Password must be at least 8 characters long',
	})
	@IsString()
	password: string
}
