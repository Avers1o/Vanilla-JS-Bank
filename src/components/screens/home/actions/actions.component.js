import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import { NotificationService } from '@/core/services/notification.service'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'
import { Store } from '@/core/store/store'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

import { CardService } from '@/api/card.service'

import * as styles from './actions.module.scss'
import template from './actions.template.html'

import { BALANCE_UPDATED } from '@/constants/event.constants'

export class Actions extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	/**
	 * @param {Event} event - The event object from the button click event.
	 * @param {'top-up' | 'withdrawal'} type - The type of the transaction, either, 'top-up' or 'withdrawal'
	 * @returns
	 */

	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need authorization!')
		}

		query(event.target).text('Sending...').attribute('disabled', true)

		const inputElement = query(this.element).find('input')
		const amount = inputElement.value()

		if (!amount) {
			validationService.showError(query(this.element).find('label'))
			return
		}

		this.cardService.updateBalance(amount, type, () => {
			inputElement.value('')

			const balanceUpdatedEvent = new Event(BALANCE_UPDATED)
			document.dispatchEvent(balanceUpdatedEvent)
		})

		query(event.target).text(type).removeAttribute('disabled')
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'amount',
					placeholder: 'Enter amount:',
					type: 'number'
				})
			],
			styles
		)

		query(this.element)
			.find('#action-buttons')
			.append(
				new Button({
					children: 'Top-up',
					variant: 'green',
					onClick: event => this.updateBalance(event, 'top-up')
				}).render()
			)
			.append(
				new Button({
					children: 'Withdrawal',
					variant: 'purple',
					onClick: event => this.updateBalance(event, 'withdrawal')
				}).render()
			)

		return this.element
	}
}
