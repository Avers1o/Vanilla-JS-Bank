import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import renderService from '@/core/services/render.service'

import * as styles from './button.module.scss'
import template from './button.template.html'

export class Button extends ChildComponent {
	constructor({ children, onClick, variant }) {
		super()

		if (!children) throw new Error('Children is empty!')

		this.children = children
		this.onClick = onClick
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		query(this.element).html(this.children).click(this.onClick)

		if (this.variant) {
			query(this.element).addClass(styles[this.variant])
		}

		return this.element
	}
}
