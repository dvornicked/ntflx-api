import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateActorDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name: string

	@IsString()
	@IsOptional()
	image: string
}
