import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.fileService.uploadFile(file, 'files')
	}
}
