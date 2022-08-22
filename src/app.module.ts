import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './config/typeorm.config'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'
import { ActorModule } from './actor/actor.module'
import { GenreModule } from './genre/genre.module'
import { FilmModule } from './film/film.module'

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		FileModule,
		ActorModule,
		GenreModule,
		FilmModule,
	],
})
export class AppModule {}
