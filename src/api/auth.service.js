import { Request } from '@/core/lib/request/request.lib'
import { NotificationService } from '@/core/services/notification.service'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		// store

		this.notificationService = new NotificationService()
	}

	register(body) {
		return Request({
			path: `${this.#BASE_URL}/register`,
			method: 'POST',
			body,
			onSuccess: data => {
				// store login

				this.notificationService.show(
					'success',
					'You have successfully registered!'
				)
			}
		})
	}

	login(body) {
		return Request({
			path: `${this.#BASE_URL}/login`,
			method: 'POST',
			body,
			onSuccess: data => {
				// store login

				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			}
		})
	}
}
