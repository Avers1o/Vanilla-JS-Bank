import { ChildComponent } from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './notification.module.scss'
import template from './notification.template.html'

export class Notification extends ChildComponent {
	constructor() {
		super()
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		return this.element
	}
}
