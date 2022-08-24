import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { CreateActorDto } from './dto/createActor.dto'
import { ActorService } from './actor.service'
import { IActorsQuery } from './types/IActorsQuery.interface'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserRole } from 'src/user/user.entity'
import { UpdateActorDto } from './dto/updateActor.dto'

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get()
	async getAll(@Query() query: IActorsQuery) {
		return await this.actorService.findAll(query)
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		return await this.actorService.findById(id)
	}

	@Post('create')
	@UsePipes(new ValidationPipe())
	@Auth(UserRole.ADMIN)
	async create(@Body() dto: CreateActorDto) {
		return await this.actorService.create(dto)
	}

	@Put('update/:id')
	@UsePipes(new ValidationPipe())
	@Auth(UserRole.ADMIN)
	async update(@Param('id') id: number, @Body() dto: UpdateActorDto) {
		return await this.actorService.update(id, dto)
	}

	@Delete('delete/:id')
	@Auth(UserRole.ADMIN)
	async delete(@Param('id') id: number) {
		return await this.actorService.delete(id)
	}
}
