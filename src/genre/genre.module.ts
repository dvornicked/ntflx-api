import { Module } from '@nestjs/common'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GenreEntity } from './genre.entity'

@Module({
	imports: [TypeOrmModule.forFeature([GenreEntity])],
	controllers: [GenreController],
	providers: [GenreService],
})
export class GenreModule {}
