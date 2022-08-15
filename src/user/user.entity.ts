import { hash } from 'bcrypt'
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
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

	@Column()
	username: string

	@Column()
	password: string

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10)
	}

	@Column()
	email: string

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
	role: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
