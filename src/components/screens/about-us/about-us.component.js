import { BaseScreen } from '../../../core/components/base-screen.component'

export class AboutUs extends BaseScreen {
	constructor() {
		super({
			subtitle: 'About Us'
		})
	}

	render() {
		return '<h1>About Us</h1>'
	}
}
