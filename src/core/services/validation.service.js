import * as styles from '@/components/ui/field/field.module.scss'

import { query } from '../lib/query/query.lib'

class ValidationService {
	constructor() {
		this.errorBorderTimeout = {}
	}

	showError(field, timeout = 2500) {
		field.addClass(styles['error'])

		const inputName = query(field.element).attribute('data-input-name')

		if (this.errorBorderTimeout[inputName]) {
			clearTimeout(this.errorBorderTimeout[inputName])
		}

		this.errorBorderTimeout[inputName] = setTimeout(() => {
			field.removeClass(styles['error'])
		}, timeout)
	}
}

export default new ValidationService()
