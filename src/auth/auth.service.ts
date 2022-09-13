import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly authRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
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
		return {
			user: this.userTransform(user),
			...(await this.iTokens(user)),
		}
	}

	async login(dto: AuthDto) {
		const user = await this.authRepository.findOneBy({
			email: dto.email,
		})
		if (!user) throw new HttpException('User with this email not found', 404)
		const isPasswordValid = await compare(dto.password, user.password)
		if (!isPasswordValid) throw new HttpException('Invalid password', 401)
		return {
			user: this.userTransform(user),
			...(await this.iTokens(user)),
		}
	}

	async iTokens(user: UserEntity) {
		const payload = { id: user.id }
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: '1h',
		})
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: '7d',
		})

		return { accessToken, refreshToken }
	}

	async refreshToken(dto: RefreshTokenDto) {
		if (!dto.refreshToken) throw new HttpException('Invalid refresh token', 401)
		try {
			const payload = await this.jwtService.verifyAsync(dto.refreshToken)
			if (!payload)
				throw new HttpException('Refresh token invalid or expired', 401)
			const user = await this.authRepository.findOneBy({
				id: payload.id,
			})
			return {
				user: this.userTransform(user),
				...(await this.iTokens(user)),
			}
		} catch {
			throw new HttpException('Invalid refresh token', 401)
		}
	}

	userTransform(user: UserEntity) {
		delete user.password
		return user
	}
}
