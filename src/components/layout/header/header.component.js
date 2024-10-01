import { ChildComponent } from '@/core/components/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import * as styles from './header.module.scss'
import template from './header.template.html'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({
					router: this.router
				}),
				Search,
				new UserItem(
					{
						avatarPath:
							'https://img.icons8.com/?size=100&id=12437&format=png&color=fffafa',
						name: 'Test User'
					},
					false,
					() => alert('Test User Item')
				)
			],
			styles
		)

		return this.element
	}
}
