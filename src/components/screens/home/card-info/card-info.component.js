import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { formatCardNumber } from '@/components/utils/format/format-card-number.util'
import { formatToCurrency } from '@/components/utils/format/format-to-currency.util'

import { CardService } from '@/api/card.service'

import * as styles from './card-info.module.scss'
import template from './card-info.template.html'

import { BALANCE_UPDATED } from '@/constants/event.constants'

export class CardInfo extends ChildComponent {
	#CODE = '*****'

	constructor() {
		super()

		this.store = Store.getInstance()
		this.cardService = new CardService()

		this.element = renderService.htmlToElement(template, [], styles)
		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(BALANCE_UPDATED, this.#onUpdateBalance)
	}

	#removeListeners() {
		document.removeEventListener(BALANCE_UPDATED, this.#onUpdateBalance)
	}

	#onUpdateBalance = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	#copyCardNumber(event) {
		navigator.clipboard.writeText(event.target.innerText).then(() => {
			event.target.innerText = 'Card number copied'

			setTimeout(() => {
				event.target.innerText = formatCardNumber(this.card.number)
			}, 2000)
		})
	}

	#toggleCvc(cardCvcElement) {
		const text = cardCvcElement.text()

		text === this.#CODE
			? cardCvcElement.text(this.card.cvc)
			: cardCvcElement.text(this.#CODE)
	}

	fillElements() {
		query(this.element).html(
			renderService.htmlToElement(template, [], styles).innerHTML
		)

		query(this.element)
			.findAll(':scope > div')
			.forEach(child => {
				child.addClass('fade-in')
			})

		query(this.element)
			.find('#card-number')
			.text(formatCardNumber(this.card.number))
			.click(this.#copyCardNumber.bind(this))

		query(this.element).find('#card-expire-date').text(this.card.expireDate)

		const cardCvcElement = query(this.element).find('#card-cvc')
		cardCvcElement.text(this.#CODE).style('width', '44px')

		query(this.element)
			.find('#toggle-cvc')
			.click(this.#toggleCvc.bind(this, cardCvcElement))

		query(this.element)
			.find('#card-balance')
			.text(formatToCurrency(this.card.balance))
	}

	fetchData() {
		this.cardService.getByUser(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	render() {
		if (this.store.state.user) this.fetchData()

		return this.element
	}
}
