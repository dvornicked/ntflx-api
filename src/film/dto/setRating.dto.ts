import { IsNumber, Max, Min } from 'class-validator'

export class SetRatingDto {
	@IsNumber()
	@Min(0)
	@Max(5)
	value: number
}
