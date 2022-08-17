import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { UserEntity } from '../user.entity'

@Injectable()
export class UserInterceptor implements NestInterceptor {
	intercept(_: ExecutionContext, next: CallHandler): Observable<UserEntity> {
		return next.handle().pipe(
			map(user => {
				delete user.password
				return user
			}),
		)
	}
}

@Injectable()
export class UsersInterceptor implements NestInterceptor {
	intercept(_: ExecutionContext, next: CallHandler): Observable<UserEntity> {
		return next.handle().pipe(
			map(data => {
				data.users.forEach((user: UserEntity) => {
					delete user.password
				})
				return data
			}),
		)
	}
}
