import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

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
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Send',
					onClick: () => alert('Hey'),
					variant: 'green'
				}),
				new Field({
					placeholder: 'Test',
					name: 'test',
					variant: 'credit-card'
				})
			],
			styles
		)

		return this.element
	}
}
