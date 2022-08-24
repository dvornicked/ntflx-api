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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserRole } from 'src/user/user.entity'
import { CreateGenreDto } from './dto/createGenre.dto'
import { UpdateGenreDto } from './dto/updateGenre.dto'
import { GenreService } from './genre.service'
import { IGenreQuery } from './types/IActorsQuery.interface'

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	async getAll(@Query() query: IGenreQuery) {
		return await this.genreService.findAll(query)
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		return await this.genreService.findById(id)
	}

	@Post('create')
	@UsePipes(new ValidationPipe())
	@Auth(UserRole.ADMIN)
	async create(@Body() dto: CreateGenreDto) {
		return await this.genreService.create(dto)
	}

	@Put('update/:id')
	@UsePipes(new ValidationPipe())
	@Auth(UserRole.ADMIN)
	async update(@Param('id') id: number, @Body() dto: UpdateGenreDto) {
		return await this.genreService.update(id, dto)
	}

	@Delete('delete/:id')
	@Auth(UserRole.ADMIN)
	async delete(@Param('id') id: number) {
		return await this.genreService.delete(id)
	}
}
