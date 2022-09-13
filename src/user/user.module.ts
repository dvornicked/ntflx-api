import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { FilmEntity } from 'src/film/film.entity'
import { GenreEntity } from 'src/genre/genre.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, FilmEntity, GenreEntity])],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
