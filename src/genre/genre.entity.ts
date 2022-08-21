import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('genre')
export class GenreEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	name: string

	@Column()
	desc: string
}
