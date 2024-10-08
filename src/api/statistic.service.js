import { Request } from '@/core/lib/request/request.lib'
import { NotificationService } from '@/core/services/notification.service'

export class StatisticService {
	#BASE_URL = '/statistics'

	constructor() {
		this.notificationService = new NotificationService()
	}

	get(onSuccess) {
		return Request({
			path: this.#BASE_URL,
			onSuccess,
			onError: errorMessage => {
				this.notificationService.show('error', errorMessage)
			}
		})
	}
}
