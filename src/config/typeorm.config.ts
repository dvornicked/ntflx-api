import { config } from 'dotenv'
import { ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'

config({ path: '.typeorm.env' })
const configService = new ConfigService()

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	username: configService.get('TYPEORM_USERNAME'),
	password: configService.get('TYPEORM_PASSWORD'),
	host: configService.get('TYPEORM_HOST'),
	port: +configService.get('TYPEORM_PORT'),
	database: configService.get('TYPEORM_DB'),
	synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
}

export const dataSource = new DataSource(dataSourceOptions)
