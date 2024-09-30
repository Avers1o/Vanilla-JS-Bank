import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query.lib'
import renderService from '@/core/services/render.service'

import template from './loader.template.html'

export const LOADER_SELECTOR = '[data-component="loader"]'

export class Loader extends ChildComponent {
	constructor({ width = 100, height = 100 }) {
		super()

		this.width = width
		this.height = height
	}

	render() {
		this.element = renderService.htmlToElement(template, [])

		query(this.element)
			.style('width', `${this.width}px`)
			.style('height', `${this.height}px`)
			.addClass('bounce')

		return this.element
	}
}