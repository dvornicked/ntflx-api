import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { AuthDto } from './dto/auth.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly authRepository: Repository<UserEntity>,
	) {}
	async register(dto: RegisterDto) {
		const userByUsername = await this.authRepository.findOneBy({
			username: dto.username,
		})
		if (userByUsername) throw new HttpException('Username already exists', 400)

		const userByEmail = await this.authRepository.findOneBy({
			email: dto.email,
		})
		if (userByEmail) throw new HttpException('Email already exists', 400)

		const newUser = new UserEntity()
		Object.assign(newUser, dto)
		const user = await this.authRepository.save(newUser)
		delete user.password
		return user
	}

	async login(dto: AuthDto) {
		const user = await this.authRepository.findOneBy({
			email: dto.email,
		})
		if (!user) throw new HttpException('User with this email not found', 400)
		const isPasswordValid = await compare(dto.password, user.password)
		if (!isPasswordValid) throw new HttpException('Invalid password', 400)
		delete user.password
		return user
	}
}
