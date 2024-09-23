import { BaseScreen } from '@/core/components/base-screen.component'

export class NotFound extends BaseScreen {
	constructor() {
		super({
			subtitle: 'Not Found'
		})
	}

	render() {
		return '<h1>Not found</h1>'
	}
}
