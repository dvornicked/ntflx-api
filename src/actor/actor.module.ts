import { Module } from '@nestjs/common'
import { ActorService } from './actor.service'
import { ActorController } from './actor.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActorEntity } from './actor.entity'

@Module({
	imports: [TypeOrmModule.forFeature([ActorEntity])],
	controllers: [ActorController],
	providers: [ActorService],
})
export class ActorModule {}
