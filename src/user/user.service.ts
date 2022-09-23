import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdatePasswordDto } from './dto/updatePassword.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import { UserEntity } from './user.entity'
import { IUsersQuery } from './types/usersQuery.interface'
import { FilmEntity } from 'src/film/film.entity'
import { IFavoriteQuery } from './types/favoriteQuery.interface'
import { favoriteFilmDto } from './dto/favoriteFilm.dto'
import { GenreEntity } from 'src/genre/genre.entity'
import { favoriteGenreDto } from './dto/favoriteGenre.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(FilmEntity)
		private readonly filmRepository: Repository<FilmEntity>,
		@InjectRepository(GenreEntity)
		private readonly genreRepository: Repository<GenreEntity>,
	) {}
	async findById(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['favoriteFilms', 'favoriteGenres'],
		})
		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		return user
	}

	async updateUser(id: number, dto: UpdateUserDto): Promise<UserEntity> {
		const user = await this.findById(id)
		const userByUsername = await this.userRepository.findOneBy({
			username: dto.username,
		})
		user.desc = dto.desc

		if (dto.username) {
			if (userByUsername && userByUsername.id !== id) {
				throw new HttpException(
					'Username already in use',
					HttpStatus.BAD_REQUEST,
				)
			}
			user.username = dto.username
		}

		if (dto.email) {
			const userByEmail = await this.userRepository.findOneBy({
				email: dto.email,
			})
			if (userByEmail && userByEmail.id !== id) {
				throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST)
			}
			user.email = dto.email
		}

		if (dto.image) {
			user.image = dto.image
		}

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
			queryBuilder.andWhere('LOWER(user.username) LIKE :username', {
				username: `%${query.username.toLowerCase()}%`,
			})
		const users = await queryBuilder.getMany()
		return { users, count }
	}

	async deleteUser(id: number) {
		const user = await this.findById(id)
		return this.userRepository.remove(user)
	}

	async toggleFavoriteFilm(id: number, dto: favoriteFilmDto) {
		const user = await this.findById(id)
		const film = await this.filmRepository.findOneBy({ id: dto.filmId })
		if (!film) throw new HttpException('Film not found', HttpStatus.NOT_FOUND)
		if (user.favoriteFilms.find(film => film.id === dto.filmId)) {
			user.favoriteFilms = user.favoriteFilms.filter(f => f.id !== film.id)
		} else {
			user.favoriteFilms.push(film)
		}
		return this.userRepository.save(user)
	}

	async getFavoriteFilms(id: number, query: IFavoriteQuery) {
		const user = await this.findById(id)
		const count = user.favoriteFilms.length
		if (query.offset)
			user.favoriteFilms = user.favoriteFilms.slice(query.offset)
		query.order === 'ASC'
			? user.favoriteFilms.sort()
			: user.favoriteFilms.sort().reverse()
		if (query.limit)
			user.favoriteFilms = user.favoriteFilms.slice(0, query.limit)
		return { films: user.favoriteFilms, count }
	}

	async toggleFavoriteGenre(id: number, dto: favoriteGenreDto) {
		const user = await this.findById(id)
		const genre = await this.genreRepository.findOneBy({ id: dto.genreId })
		if (!genre) throw new HttpException('Genre not found', HttpStatus.NOT_FOUND)
		if (user.favoriteGenres.includes(genre)) {
			user.favoriteGenres = user.favoriteGenres.filter(g => g.id !== genre.id)
		} else {
			user.favoriteGenres.push(genre)
		}
		return this.userRepository.save(user)
	}

	async getFavoriteGenres(id: number, query: IFavoriteQuery) {
		const user = await this.findById(id)
		const count = user.favoriteGenres.length
		if (query.offset)
			user.favoriteGenres = user.favoriteGenres.slice(query.offset)
		query.order === 'ASC'
			? user.favoriteGenres.sort()
			: user.favoriteGenres.sort().reverse()
		if (query.limit)
			user.favoriteGenres = user.favoriteGenres.slice(0, query.limit)
		return { genres: user.favoriteGenres, count }
	}
}
