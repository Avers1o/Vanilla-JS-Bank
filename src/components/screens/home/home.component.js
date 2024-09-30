import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'

import * as styles from './home.module.scss'
import template from './home.template.html'

export class Home extends BaseScreen {
	element

	constructor() {
		super({
			subtitle: 'Home'
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		return this.element
	}
}
