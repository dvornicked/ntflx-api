import { hash } from 'bcrypt'
import { FilmEntity } from 'src/film/film.entity'
import { GenreEntity } from 'src/genre/genre.entity'
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	username: string

	@Column()
	password: string

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		this.password = await hash(this.password, 10)
	}

	@Column({ unique: true })
	email: string

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
	role: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToMany(() => FilmEntity)
	@JoinTable()
	favoriteFilms: FilmEntity[]

	@ManyToMany(() => GenreEntity)
	@JoinTable()
	favoriteGenres: GenreEntity[]
}
