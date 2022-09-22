import {
	IsISO8601,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'

export class UpdateFilmDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	title: string

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	desc: string

	@IsOptional()
	@IsString()
	image: string

	@IsOptional()
	@IsString()
	wideImage: string

	@IsOptional()
	@IsString()
	video: string

	@IsOptional()
	@IsISO8601()
	releaseDate: string

	@IsOptional()
	@IsNumber()
	duration: number

	@IsOptional()
	@IsNumber({}, { each: true })
	actors: number[]

	@IsOptional()
	@IsNumber({}, { each: true })
	genres: number[]
}
