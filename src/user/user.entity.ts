import { hash } from 'bcrypt'
import {
	BeforeInsert,
	BeforeUpdate,
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
}