import { Request } from '@/core/lib/request/request.lib'

export class TransactionService {
	#BASE_URL = '/transactions'

	constructor() {
		this.notificationService = new NotificationService()
	}

	getAll(onSuccess) {
		return Request({
			path: `${this.#BASE_URL}?${new URLSearchParams({ orderBy: 'desc' })}`,
			onSuccess,
			onError: errorMessage => {
				this.notificationService.show('error', errorMessage)
			}
		})
	}
}
