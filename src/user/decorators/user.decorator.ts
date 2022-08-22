import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from '../user.entity'

export const User = createParamDecorator(
	(data: keyof UserEntity, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		return data ? request.user[data] : request.user
	},
)
