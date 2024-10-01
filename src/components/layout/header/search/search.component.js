import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import renderService from '@/core/services/render.service'

import * as styles from './search.module.scss'
import template from './search.template.html'

export class Search extends ChildComponent {
	constructor() {
		super()
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		query(this.element).find('input').input({
			type: 'search',
			name: 'search',
			placeholder: 'Search contacts...'
		})

		return this.element
	}
}
