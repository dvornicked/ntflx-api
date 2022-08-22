import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('actor')
export class ActorEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	image: string
}
