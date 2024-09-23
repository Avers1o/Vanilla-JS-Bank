import { BaseScreen } from '@/core/components/base-screen.component'

export class Home extends BaseScreen {
	constructor() {
		super({
			subtitle: 'Home'
		})
	}

	render() {
		return '<h1>Home</h1>'
	}
}
