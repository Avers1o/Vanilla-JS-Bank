import { BaseScreen } from '@/core/components/base-screen.component'
import renderService from '@/core/services/render.service'

import * as styles from './home.module.scss'
import template from './home.template.html'

import { Actions } from './actions/actions.component'
import { CardInfo } from './card-info/card-info.component'
import { Contacts } from './contacts/contacts.component'

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
			[CardInfo, Actions, Contacts],
			styles
		)

		return this.element
	}
}
