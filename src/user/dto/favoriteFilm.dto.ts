import { IsInt } from 'class-validator'

export class favoriteFilmDto {
	@IsInt()
	filmId: number
}
