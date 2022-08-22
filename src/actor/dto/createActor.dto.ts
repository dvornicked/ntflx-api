import { IsNotEmpty, IsString } from 'class-validator'

export class CreateActorDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	image: string
}
