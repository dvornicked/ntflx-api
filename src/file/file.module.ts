import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'uploads'),
			serveRoot: '/uploads',
		}),
	],
	controllers: [FileController],
	providers: [FileService],
})
export class FileModule {}
