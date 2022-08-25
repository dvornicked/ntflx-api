import { Column, Entity, PrimaryColumn } from 'typeorm'

export enum ResourseType {
	FILM = 'FILM',
	SERIES = 'SERIES',
}

@Entity('rating')
export class RatingEntity {
	@PrimaryColumn()
	userId: number

	@PrimaryColumn()
	resourseId: number

	@PrimaryColumn({ type: 'enum', enum: ResourseType })
	resourseType: ResourseType

	@Column()
	value: number
}
