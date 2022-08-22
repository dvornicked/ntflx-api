import { Injectable } from '@nestjs/common'
import { ensureDir, writeFile } from 'fs-extra'
import { join } from 'path'

@Injectable()
export class FileService {
	async uploadFile(file: Express.Multer.File, folder: string) {
		const pathFolder = join(__dirname, '..', '..', 'uploads', folder)
		await ensureDir(pathFolder)
		const slug = ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
		const filename = `${slug}-${file.originalname.toLowerCase()}`
		const path = join(pathFolder, filename)
		await writeFile(path, file.buffer)
		return { url: `/uploads/${folder}/${filename}` }
	}
}
