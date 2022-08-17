import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdatePasswordDto } from './dto/updatePassword.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import { UserEntity } from './user.entity'
import { IUsersQuery } from './types/usersQuery.interface'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}
	async findById(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOneBy({ id })
		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		return user
	}

	async updateUser(id: number, dto: UpdateUserDto): Promise<UserEntity> {
		const user = await this.findById(id)
		const userByUsername = await this.userRepository.findOneBy({
			username: dto.username,
		})
		if (userByUsername && userByUsername.id !== id) {
			throw new HttpException('Username already in use', HttpStatus.BAD_REQUEST)
		}
		user.username = dto.username

		const userByEmail = await this.userRepository.findOneBy({
			email: dto.email,
		})
		if (userByEmail && userByEmail.id !== id) {
			throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST)
		}
		user.email = dto.email
		return this.userRepository.save(user)
	}

	async updatePassword(
		id: number,
		dto: UpdatePasswordDto,
	): Promise<UserEntity> {
		const user = await this.findById(id)
		user.password = dto.password
		return this.userRepository.save(user)
	}

	async updateRole(id: number, dto: UpdateRoleDto): Promise<UserEntity> {
		const user = await this.findById(id)
		user.role = dto.role
		return this.userRepository.save(user)
	}

	async getAll(query: IUsersQuery) {
		const queryBuilder = this.userRepository.createQueryBuilder('user')
		const count = await queryBuilder.getCount()
		if (query.limit) queryBuilder.limit(query.limit)
		if (query.offset) queryBuilder.offset(query.offset)
		if (query.order) queryBuilder.orderBy(query.order)
		if (query.username)
			queryBuilder.andWhere('user.username LIKE :username', {
				username: `%${query.username}%`,
			})
		const users = await queryBuilder.getMany()
		return { users, count }
	}

	async deleteUser(id: number) {
		const user = await this.findById(id)
		return this.userRepository.remove(user)
	}
}
