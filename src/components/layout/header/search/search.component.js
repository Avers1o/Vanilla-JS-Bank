import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import renderService from '@/core/services/render.service'

import { TRANSFER_FIELD_SELECTOR } from '@/components/screens/home/contacts/transfer-field/transfer-field.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { debounce } from '@/components/utils/debounce/debounce.util'
import { formatCardNumberWithDashes } from '@/components/utils/format/format-card-number.util'

import { UserService } from '@/api/user.service'

import * as styles from './search.module.scss'
import template from './search.template.html'

export class Search extends ChildComponent {
	constructor() {
		super()

		this.userService = new UserService()
	}

	#handleSearch = async event => {
		const searchTerm = event.target.value
		const searchResultElement = query(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				console.log(user)
				const userItem = new UserItem(user, true, () => {
					query(TRANSFER_FIELD_SELECTOR).value(
						formatCardNumberWithDashes(user.card.number)
					)

					searchResultElement.html('')
				}).render()

				query(userItem)
					.addClass(styles.item)
					.style('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					query(userItem).addClass(styles.visible)
				}, 100)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debouncedHandleSearch = debounce(this.#handleSearch, 300)

		query(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debouncedHandleSearch)

		return this.element
	}
}
