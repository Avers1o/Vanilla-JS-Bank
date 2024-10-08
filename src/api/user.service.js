import { Request } from '@/core/lib/request/request.lib'
import { NotificationService } from '@/core/services/notification.service'

export class UserService {
	#BASE_URL = '/users'

	constructor() {
		this.notificationService = new NotificationService()
	}

	getAll(searchTerm, onSuccess) {
		return Request({
			path: `${this.#BASE_URL}${searchTerm ? `?${new URLSearchParams({ searchTerm })}` : ''}`,
			onSuccess,
			onError: errorMessage => {
				this.notificationService.show('error', errorMessage)
			}
		})
	}
}
