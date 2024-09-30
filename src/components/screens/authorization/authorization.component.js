import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'

import { Heading } from '@/components/ui/heading/heading.component'

import * as styles from './authorization.module.scss'
import template from './authorization.template.html'

export class Authorization extends BaseScreen {
	constructor() {
		super({
			subtitle: 'Authorization'
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading({ title: 'Авторизация' })],
			styles
		)

		return this.element
	}
}
