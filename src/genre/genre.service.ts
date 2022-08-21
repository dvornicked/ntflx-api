import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateGenreDto } from './dto/createGenre.dto'
import { UpdateGenreDto } from './dto/updateGenre.dto'
import { GenreEntity } from './genre.entity'
import { IGenreQuery } from './types/IActorsQuery.interface'

@Injectable()
export class GenreService {
	constructor(
		@InjectRepository(GenreEntity)
		private readonly genreRepository: Repository<GenreEntity>,
	) {}

	async findAll(query: IGenreQuery) {
		const queryBuilder = this.genreRepository.createQueryBuilder('actor')
		const count = await queryBuilder.getCount()
		if (query.limit) queryBuilder.limit(query.limit)
		if (query.offset) queryBuilder.offset(query.offset)
		if (query.order) queryBuilder.orderBy(query.order)
		if (query.name)
			queryBuilder.andWhere('LOWER(actor.name) LIKE :name', {
				name: `%${query.name.toLowerCase()}%`,
			})
		const genres = await queryBuilder.getMany()
		return { genres, count }
	}

	async findById(id: number) {
		const genre = await this.genreRepository.findOneBy({ id })
		if (!genre) throw new HttpException('Genre not found', HttpStatus.NOT_FOUND)
		return genre
	}

	async create(dto: CreateGenreDto) {
		const genreByName = await this.genreRepository.findOneBy({ name: dto.name })
		if (genreByName)
			throw new HttpException('Genre already exists', HttpStatus.CONFLICT)
		const genre = this.genreRepository.create(dto)
		return this.genreRepository.save(genre)
	}

	async update(id: number, dto: UpdateGenreDto) {
		const genre = await this.findById(id)
		Object.assign(genre, dto)
		return this.genreRepository.save(genre)
	}

	async delete(id: number) {
		const genre = await this.findById(id)
		return this.genreRepository.remove(genre)
	}
}
