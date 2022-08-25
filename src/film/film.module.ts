import { Module } from '@nestjs/common'
import { FilmService } from './film.service'
import { FilmController } from './film.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmEntity } from './film.entity'
import { ActorEntity } from 'src/actor/actor.entity'
import { GenreEntity } from 'src/genre/genre.entity'
import { RatingEntity } from 'src/user/user.rating.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			FilmEntity,
			ActorEntity,
			GenreEntity,
			RatingEntity,
		]),
	],
	controllers: [FilmController],
	providers: [FilmService],
})
export class FilmModule {}
