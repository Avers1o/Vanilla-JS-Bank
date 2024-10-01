export class TransactionService {
	#BASE_URL = '/transactions'

	getAll(onSuccess) {
		return Request({
			path: `${this.#BASE_URL}?${new URLSearchParams({ orderBy: 'desc' })}`
		})
	}
}
