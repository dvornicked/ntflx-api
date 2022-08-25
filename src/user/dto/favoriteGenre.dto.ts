import { IsInt } from 'class-validator'

export class favoriteGenreDto {
	@IsInt()
	genreId: number
}
