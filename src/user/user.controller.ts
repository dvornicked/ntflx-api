import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { User } from './decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserInterceptor } from './interceptors/user.interceptor'

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get('profile')
	@Auth()
	@UseInterceptors(UserInterceptor)
	async findById(@User('id') id: number): Promise<UserEntity> {
		return this.userService.findById(id)
	}
}
