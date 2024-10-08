import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import renderService from '@/core/services/render.service'

import { formatToCurrency } from '@/components/utils/format/format-to-currency.util'
import { formatDate } from '@/components/utils/format/format-to-date.util'

import * as styles from './transaction-item.module.scss'
import template from './transaction-item.template.html'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()

		this.transaction = transaction
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			query(this.element).addClass(styles.income)
		}

		query(this.element).find('#transaction-name').text(name)

		query(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))

		query(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}
