import { changeTitle } from '@/config/seo.config'

export class BaseScreen {
	/**
	 * Create a new BaseScreen instance.
	 * @param {Object} options - The options for the BaseScreen;
	 * @param {string} options.subtitle - The subtitle for the screen.
	 */

	constructor({ subtitle }) {
		changeTitle(subtitle)
	}

	/**
	 * @returns {HTMLElement}
	 */

	render() {
		throw new Error('Render method must be implemented in the child class!')
	}
}
