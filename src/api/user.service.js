export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return Request({
			path: `${this.#BASE_URL}${searchTerm ? `?${new URLSearchParams({ searchTerm })}` : ''}`,
			onSuccess
		})
	}
}
