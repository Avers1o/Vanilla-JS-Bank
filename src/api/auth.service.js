import { Request } from '@/core/lib/request/request.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		this.store = Store.getInstance()

		this.notificationService = new NotificationService()
	}

	register(body) {
		return Request({
			path: `${this.#BASE_URL}/register`,
			method: 'POST',
			body,
			onSuccess: data => {
				this.store.login(data.user, data.accessToken)

				this.notificationService.show(
					'success',
					'You have successfully registered!'
				)
			},
			onError: errorMessage => {
				this.notificationService.show('error', errorMessage)
			}
		})
	}

	login(body) {
		return Request({
			path: `${this.#BASE_URL}/login`,
			method: 'POST',
			body,
			onSuccess: data => {
				this.store.login(data.user, data.accessToken)

				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			},
			onError: errorMessage => {
				this.notificationService.show('error', errorMessage)
			}
		})
	}
}
