import { BaseScreen } from '@/core/components/base-screen.component'

export class Authorization extends BaseScreen {
	constructor() {
		super({
			subtitle: 'Authorization'
		})
	}

	render() {
		return '<h1>Authorization</h1>'
	}
}
