import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Put,
	Query,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserEntity, UserRole } from './user.entity'
import { UserService } from './user.service'
import { User } from './decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import {
	UserInterceptor,
	UsersInterceptor,
} from './interceptors/user.interceptor'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import { UpdatePasswordDto } from './dto/updatePassword.dto'
import { IUsersQuery } from './types/usersQuery.interface'
import { IFavoriteQuery } from './types/favoriteQuery.interface'
import { favoriteFilmDto } from './dto/favoriteFilm.dto'

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('users')
	@UseInterceptors(UsersInterceptor)
	async getAll(@Query() query: IUsersQuery) {
		return await this.userService.getAll(query)
	}

	@Get('profile')
	@Auth()
	@UseInterceptors(UserInterceptor)
	async getProfile(@User('id') id: number): Promise<UserEntity> {
		return this.userService.findById(id)
	}

	@Put('profile')
	@Auth()
	@UseInterceptors(UserInterceptor)
	@UsePipes(new ValidationPipe())
	async updateUser(@User('id') id: number, @Body() dto: UpdateUserDto) {
		return this.userService.updateUser(id, dto)
	}

	@Get('favorite/films')
	@Auth()
	async getFavoriteFilms(
		@User('id') id: number,
		@Query() query: IFavoriteQuery,
	) {
		return this.userService.getFavoriteFilms(id, query)
	}

	@Put('favorite/film')
	@Auth()
	@UsePipes(new ValidationPipe())
	async toggleFavorite(@User('id') id: number, @Body() dto: favoriteFilmDto) {
		return this.userService.toggleFavoriteFilm(id, dto)
	}

	@Get('profile/:id')
	@UseInterceptors(UserInterceptor)
	async getUserById(@Param('id') id: number): Promise<UserEntity> {
		return this.userService.findById(id)
	}

	@Put('profile/:id')
	@Auth(UserRole.ADMIN)
	@UseInterceptors(UserInterceptor)
	@UsePipes(new ValidationPipe())
	async updateUserById(@Param('id') id: number, @Body() dto: UpdateUserDto) {
		return this.userService.updateUser(id, dto)
	}

	@Delete('profile/:id')
	@Auth(UserRole.ADMIN)
	@UseInterceptors(UserInterceptor)
	async deleteUser(@Param('id') id: number) {
		return this.userService.deleteUser(id)
	}

	@Put('password')
	@Auth()
	@UseInterceptors(UserInterceptor)
	@UsePipes(new ValidationPipe())
	async updatePassword(@User('id') id: number, @Body() dto: UpdatePasswordDto) {
		return this.userService.updatePassword(id, dto)
	}

	@Put('password/:id')
	@Auth(UserRole.ADMIN)
	@UseInterceptors(UserInterceptor)
	@UsePipes(new ValidationPipe())
	async updatePasswordById(
		@Param('id') id: number,
		@Body() dto: UpdatePasswordDto,
	) {
		return this.userService.updatePassword(id, dto)
	}

	@Put('role/:id')
	@Auth(UserRole.ADMIN)
	@UseInterceptors(UserInterceptor)
	@UsePipes(new ValidationPipe())
	async updateRole(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
		return this.userService.updateRole(id, dto)
	}
}
