import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query.lib'
import renderService from '@/core/services/render.service'

import * as styles from './logout-button.module.scss'
import template from './logout-button.template.html'

export class LogoutButton extends ChildComponent {
	constructor({ router }) {
		super()

		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		query(this.element)
			.find('button')
			.click(() => {
				this.router.navigate('/authorization')
			})

		return this.element
	}
}
