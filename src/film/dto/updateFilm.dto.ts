import {
	IsDate,
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
	video: string

	@IsOptional()
	@IsDate()
	releaseDate: Date

	@IsOptional()
	@IsDate()
	duration: number

	@IsOptional()
	@IsNumber()
	actors?: number[]

	@IsOptional()
	@IsNumber()
	genres?: number[]
}
