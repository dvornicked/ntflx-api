import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './config/typeorm.config'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		ConfigModule.forRoot(),
		AuthModule,
	],
})
export class AppModule {}
