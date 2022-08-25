import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ActorEntity } from 'src/actor/actor.entity'
import { GenreEntity } from 'src/genre/genre.entity'
import { RatingEntity, ResourseType } from 'src/user/user.rating.entity'
import { Repository } from 'typeorm'
import { CreateFilmDto } from './dto/createFilm.dto'
import { SetRatingDto } from './dto/setRating.dto'
import { UpdateFilmDto } from './dto/updateFilm.dto'
import { FilmEntity } from './film.entity'
import { IFilmQuery } from './types/IFilmQuery.interface'

@Injectable()
export class FilmService {
	constructor(
		@InjectRepository(FilmEntity)
		private readonly filmRepository: Repository<FilmEntity>,
		@InjectRepository(ActorEntity)
		private readonly actorRepository: Repository<ActorEntity>,
		@InjectRepository(GenreEntity)
		private readonly genreRepository: Repository<GenreEntity>,
		@InjectRepository(RatingEntity)
		private readonly ratingRepository: Repository<RatingEntity>,
	) {}

	async findAll(query: IFilmQuery) {
		const queryBuilder = this.filmRepository.createQueryBuilder('film')
		const count = await queryBuilder.getCount()
		queryBuilder.leftJoinAndSelect('film.actors', 'actors')
		queryBuilder.leftJoinAndSelect('film.genres', 'genres')
		if (query.limit) queryBuilder.limit(query.limit)
		if (query.offset) queryBuilder.offset(query.offset)
		if (query.order) queryBuilder.orderBy(query.order)
		if (query.title)
			queryBuilder.andWhere('LOWER(film.title) LIKE :title', {
				title: `%${query.title.toLowerCase()}%`,
			})
		const films = await queryBuilder.getMany()
		return { films, count }
	}

	async findById(id: number) {
		const film = await this.filmRepository.findOne({
			where: {
				id,
			},
			relations: {
				actors: true,
				genres: true,
			},
		})
		if (!film) throw new HttpException('Film not found', HttpStatus.NOT_FOUND)
		await this.filmRepository.update({ id }, { views: film.views + 1 })
		return film
	}

	async create(createFilmDto: CreateFilmDto) {
		const actors = createFilmDto.actors.map(async (actorId: number) => {
			const actor = await this.actorRepository.findOneBy({ id: actorId })
			if (!actor)
				throw new HttpException('Actor not found', HttpStatus.NOT_FOUND)
			return actor
		})
		const genres = createFilmDto.genres.map(async (genreId: number) => {
			const genre = await this.genreRepository.findOneBy({ id: genreId })
			if (!genre)
				throw new HttpException('Genre not found', HttpStatus.NOT_FOUND)
			return genre
		})

		const film = this.filmRepository.create({
			...createFilmDto,
			actors: await Promise.all(actors),
			genres: await Promise.all(genres),
		})
		return await this.filmRepository.save(film)
	}

	async update(id: number, updateFilmDto: UpdateFilmDto) {
		const film = await this.findById(id)
		Object.assign(film, updateFilmDto)
		if (updateFilmDto.actors) {
			const actors = updateFilmDto.actors.map(async (actorId: number) => {
				const actor = await this.actorRepository.findOneBy({ id: actorId })
				if (!actor)
					throw new HttpException('Actor not found', HttpStatus.NOT_FOUND)
				return actor
			})
			film.actors = await Promise.all(actors)
		}

		if (updateFilmDto.genres) {
			const genres = updateFilmDto.genres.map(async (genreId: number) => {
				const genre = await this.genreRepository.findOneBy({ id: genreId })
				if (!genre)
					throw new HttpException('Genre not found', HttpStatus.NOT_FOUND)
				return genre
			})
			film.genres = await Promise.all(genres)
		}

		return await this.filmRepository.save(film)
	}

	async delete(id: number) {
		const film = await this.findById(id)
		return await this.filmRepository.remove(film)
	}

	async setRating(id: number, userId: number, dto: SetRatingDto) {
		const film = await this.findById(id)
		const condition = {
			userId,
			resourseId: id,
			resourseType: ResourseType.FILM,
		}

		const rate = await this.ratingRepository.findOne({
			where: condition,
		})

		if (rate) {
			film.rating -= rate.value
			film.ratingCount--

			if (dto.value === 0) {
				await this.ratingRepository.remove(rate)
				return this.filmRepository.save(film)
			}
		} else if (dto.value === 0) {
			return await this.filmRepository.save(film)
		}

		const newRate = {
			userId,
			resourseId: id,
			resourseType: ResourseType.FILM,
			value: dto.value,
		}
		film.rating += dto.value
		film.ratingCount++

		rate
			? await this.ratingRepository.update(condition, newRate)
			: await this.ratingRepository.save(newRate)
		return await this.filmRepository.save(film)
	}
}
