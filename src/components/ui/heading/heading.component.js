import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query.lib'
import renderService from '@/core/services/render.service'

import * as styles from './heading.module.scss'
import template from './heading.template.html'

export class Heading extends ChildComponent {
	constructor({ title = '' }) {
		super()

		this.title = title
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		query(this.element).text(this.title)

		return this.element
	}
}
