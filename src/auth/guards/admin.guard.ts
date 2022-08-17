import {
	CanActivate,
	ExecutionContext,
	HttpException,
	Injectable,
} from '@nestjs/common'
import { UserEntity, UserRole } from 'src/user/user.entity'

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: UserEntity }>()
		if (request.user.role !== UserRole.ADMIN)
			throw new HttpException('Forbidden', 403)
		else return true
	}
}
