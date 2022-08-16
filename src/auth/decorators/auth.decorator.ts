import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRole } from 'src/user/user.entity'
import { AdminGuard } from '../guards/admin.guard'

export const Auth = (role?: UserRole) =>
	role && role === UserRole.ADMIN
		? UseGuards(AuthGuard('jwt'), AdminGuard)
		: UseGuards(AuthGuard('jwt'))
