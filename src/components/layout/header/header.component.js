import { ChildComponent } from '@/core/components/child.component'
import { query } from '@/core/lib/query/query.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import * as styles from './header.module.scss'
import template from './header.template.html'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.router = router
	}

	update() {
		console.log(this.store.state.user)

		this.user = this.store.state.user

		const authSideElement = query(this.element).find('#auth-side')

		if (this.user) {
			this.router.navigate('/')
			authSideElement.show()
		} else {
			authSideElement.hide()
		}
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
					false
				)
			],
			styles
		)

		this.update()

		return this.element
	}
}
