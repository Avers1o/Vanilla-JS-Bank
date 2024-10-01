import { Request } from '@/core/lib/request/request.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	get(onSuccess) {
		return Request({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
