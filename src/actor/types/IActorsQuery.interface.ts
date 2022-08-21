export interface IActorsQuery {
	limit?: number
	offset?: number
	order: 'ASC' | 'DESC'
	name: string
}
