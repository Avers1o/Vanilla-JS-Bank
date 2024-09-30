import { ChildComponent } from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './logo.module.scss'
import template from './logo.template.html'

export class Logo extends ChildComponent {
	constructor() {
		super()
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		return this.element
	}
}
