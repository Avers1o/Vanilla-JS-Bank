import { BaseScreen } from '@/core/components/base-screen.component'
import { query } from '@/core/query/query.lib'
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
		console.log(query(this.element).find('h1').style('color', 'red'))

		return this.element.outerHTML
	}
}
