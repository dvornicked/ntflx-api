export interface IUsersQuery {
	limit: number
	offset: number
	order: 'ASC' | 'DESC'
	username: string
}
