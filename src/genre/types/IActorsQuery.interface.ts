export interface IGenreQuery {
	limit?: number
	offset?: number
	order: 'ASC' | 'DESC'
	name: string
}
