import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateFilmDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	desc: string

	@IsString()
	image: string

	@IsString()
	video: string

	@IsISO8601()
	releaseDate: string

	@IsNumber()
	duration: number

	@IsNumber({}, { each: true })
	actors: number[]

	@IsNumber({}, { each: true })
	genres: number[]
}
