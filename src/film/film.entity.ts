import { ActorEntity } from 'src/actor/actor.entity'
import { GenreEntity } from 'src/genre/genre.entity'
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('film')
export class FilmEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	desc: string

	@Column()
	image: string

	@Column()
	video: string

	@Column({ default: 0 })
	views: number

	@Column({ type: 'date' })
	releaseDate: Date

	@Column({ default: 0 })
	rating: number

	@Column({ default: 0 })
	ratingCount: number

	@Column()
	duration: number

	@ManyToMany(() => ActorEntity)
	@JoinTable()
	actors: ActorEntity[]

	@ManyToMany(() => GenreEntity)
	@JoinTable()
	genres: GenreEntity[]
}
