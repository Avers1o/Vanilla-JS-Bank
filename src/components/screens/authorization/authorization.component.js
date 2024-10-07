import { BaseScreen } from '@/core/components/base-screen.component'
import { query } from '@/core/lib/query/query.lib'
import formService from '@/core/services/form.service'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

import { AuthService } from '@/api/auth.service'

import * as styles from './authorization.module.scss'
import template from './authorization.template.html'

export class Authorization extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({
			subtitle: 'Authorization'
		})

		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		for (let key in formValues) {
			const field = query(this.element).find(`[data-input-name=${key}]`)

			if (!formValues[key]) {
				validationService.showError(field)
			}
		}

		return formValues
	}

	#handleSubmit = event => {
		const formValues = formService.getFormValues(event.target)

		if (
			!Object.values(this.#validateFields(formValues)).every(value => !!value)
		)
			return

		if (this.#isTypeLogin === true) {
			this.authService.login(formValues)
		} else {
			this.authService.register(formValues)
		}
	}

	#changeFormType = event => {
		event.preventDefault()

		query(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign In')

		query(event.target).text(this.#isTypeLogin ? 'Sign In' : 'Register')

		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		)

		query(this.element)
			.find('#form-fields')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

		query(this.element)
			.find('#form-change-type')
			.click(event => this.#changeFormType(event))

		query(this.element).find('#form').submit(this.#handleSubmit)

		return this.element
	}
}
