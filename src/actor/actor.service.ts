import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateActorDto } from './dto/createActor.dto'
import { ActorEntity } from './actor.entity'
import { IActorsQuery } from './types/IActorsQuery.interface'
import { UpdateActorDto } from './dto/updateActor.dto'

@Injectable()
export class ActorService {
	constructor(
		@InjectRepository(ActorEntity)
		private readonly actorRepository: Repository<ActorEntity>,
	) {}

	async findAll(query: IActorsQuery) {
		const queryBuilder = this.actorRepository.createQueryBuilder('actor')
		const count = await queryBuilder.getCount()
		if (query.limit) queryBuilder.limit(query.limit)
		if (query.offset) queryBuilder.offset(query.offset)
		if (query.order) queryBuilder.orderBy(query.order)
		if (query.name)
			queryBuilder.andWhere('LOWER(actor.name) LIKE :name', {
				name: `%${query.name.toLowerCase()}%`,
			})
		const actors = await queryBuilder.getMany()
		return { actors, count }
	}

	async findById(id: number) {
		const actor = await this.actorRepository.findOneBy({ id })
		if (!actor) throw new HttpException('Actor not found', HttpStatus.NOT_FOUND)
		return actor
	}

	async create(dto: CreateActorDto) {
		const actor = this.actorRepository.create(dto)
		return this.actorRepository.save(actor)
	}

	async update(id: number, dto: UpdateActorDto) {
		const actor = await this.findById(id)
		Object.assign(actor, dto)
		return this.actorRepository.save(actor)
	}

	async delete(id: number) {
		const actor = await this.findById(id)
		return this.actorRepository.remove(actor)
	}
}
