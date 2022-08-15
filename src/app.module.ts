import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './config/typeorm.config'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule],
})
export class AppModule {}
