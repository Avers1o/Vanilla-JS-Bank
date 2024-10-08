import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import { NotificationService } from '@/core/services/notification.service'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'
import { Store } from '@/core/store/store'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

import { CardService } from '@/api/card.service'

import * as styles from './transfer-field.module.scss'
import template from './transfer-field.template.html'

import {
	BALANCE_UPDATED,
	TRANSACTION_COMPLETED
} from '@/constants/event.constants'

export const TRANSFER_FIELD_SELECTOR = '[name="card-number"]'

export class TransferField extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	handleTransfer = event => {
		event.preventDefault()

		if (!this.store.state.user) {
			this.notificationService.show('error', 'You need authorization')
		}

		query(event.target).text('Sending...').attribute('disabled', true)

		const inputElement = query(this.element).find('input')
		const toCardNumber = inputElement.value().replaceAll('-', '')

		const reset = () => {
			query(event.target).removeAttribute('disabled').text('Send')
		}

		if (!toCardNumber) {
			validationService.showError(query(this.element).find('label'))

			reset()

			return
		}

		let amount = prompt('Transfer amount')

		this.cardService.transfer({ amount, toCardNumber }, () => {
			inputElement.value('')
			amount = ''

			document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
			document.dispatchEvent(new Event(BALANCE_UPDATED))
		})

		reset()
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'card-number',
					placeholder: 'xxxx-xxxx-xxxx-xxxx',
					variant: 'credit-card'
				}),
				new Button({
					children: 'Send',
					variant: 'purple',
					onClick: this.handleTransfer
				})
			],
			styles
		)

		return this.element
	}
}
