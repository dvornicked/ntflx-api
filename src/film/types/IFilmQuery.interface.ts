export interface IFilmQuery {
	limit?: number
	offset?: number
	order: 'ASC' | 'DESC'
	title: string
}
