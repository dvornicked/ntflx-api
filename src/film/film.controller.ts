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
import { User } from 'src/user/decorators/user.decorator'
import { UserRole } from 'src/user/user.entity'
import { CreateFilmDto } from './dto/createFilm.dto'
import { SetRatingDto } from './dto/setRating.dto'
import { UpdateFilmDto } from './dto/updateFilm.dto'
import { FilmService } from './film.service'
import { IFilmQuery } from './types/IFilmQuery.interface'

@Controller('films')
export class FilmController {
	constructor(private readonly filmService: FilmService) {}

	@Get()
	findAll(@Query() query: IFilmQuery) {
		return this.filmService.findAll(query)
	}

	@Get('rated')
	@Auth(UserRole.USER)
	getRatings(@User('id') id: number) {
		return this.filmService.getAllRatedFilms(id)
	}

	@Get(':id')
	findById(@Param('id') id: number) {
		return this.filmService.findById(id)
	}

	@Post('create')
	@UsePipes(new ValidationPipe())
	@Auth(UserRole.ADMIN)
	create(@Body() createFilmDto: CreateFilmDto) {
		return this.filmService.create(createFilmDto)
	}

	@Put('update/:id')
	@UsePipes(new ValidationPipe())
	@Auth(UserRole.ADMIN)
	update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDto) {
		return this.filmService.update(id, updateFilmDto)
	}

	@Delete('delete/:id')
	@Auth(UserRole.ADMIN)
	delete(@Param('id') id: number) {
		return this.filmService.delete(id)
	}

	@Post('rating/:id')
	@UsePipes(new ValidationPipe())
	@Auth()
	setRating(
		@Param('id') id: number,
		@User('id') userId: number,
		@Body() setRatingDto: SetRatingDto,
	) {
		return this.filmService.setRating(id, userId, setRatingDto)
	}
}
