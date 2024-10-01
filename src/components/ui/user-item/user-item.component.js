import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import renderService from '@/core/services/render.service'

import * as styles from './/user-item.module.scss'
import template from './user-item.template.html'

export class UserItem extends ChildComponent {
	constructor(user, isLiver = false, onClick) {
		super()

		if (!user) throw new Error('User should be passed!')
		if (!user?.name) throw new Error('User must have a "name"!')
		if (!user?.avatarPath) throw new Error('user must have a "avatarPath"!')

		this.user = user
		this.onClick = onClick
		this.isLiver = isLiver
	}

	#preventDefault(event) {
		event.preventDefault()
	}

	update({ avatarPath, name }) {
		if (avatarPath && name) {
			query(this.element)
				.find('img')
				.attribute('src', avatarPath)
				.attribute('alt', name)

			query(this.element).find('span').text(name)
		}
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		this.update(this.user)

		query(this.element).click(this.onClick || this.#preventDefault.bind(this))

		if (!this.onClick) query(this.element).attribute('disabled', '')
		if (this.isLiver) query(this.element).addClass(styles.liver)

		return this.element
	}
}
