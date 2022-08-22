import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateGenreDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name: string

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	desc: string
}
