import { query } from '@/core/lib/query/query.lib'

import { Layout } from '@/components/layout/layout.component'
import { NotFound } from '@/components/screens/not-found/not-found.component'

export class Router {
	#routes = null
	#currentRoute = null
	#layout = null

	constructor(routes) {
		this.#routes = routes

		window.addEventListener('popstate', () => {
			this.#handleRouteChange()
		})

		this.#handleRouteChange()
		this.#handleLinks()
	}

	// Получение текущего URL-адреса

	getCurrentPath() {
		return window.location.pathname
	}

	// Создание записи истории браузера без загрузки URL-адреса

	navigate(path) {
		if (path !== this.getCurrentPath()) {
			window.history.pushState({}, '', path)
			this.#handleRouteChange()
		}
	}

	// Отмена стандартного поведения ссылок

	#handleLinks() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a')

			if (target) {
				event.preventDefault()
				this.navigate(target.href)
			}
		})
	}

	// Обработка содержимого на основе текущего URL-адреса

	#handleRouteChange() {
		const path = this.getCurrentPath()
		let route = this.#routes.find(route => route.path === path)

		if (!route) {
			route = {
				component: NotFound
			}
		}

		this.#currentRoute = route
		this.#render()
	}

	#render() {
		const component = new this.#currentRoute.component().render()

		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component
			}).render()

			query('#app').append(this.#layout)
		} else {
			query('#content').html('').append(component)
		}
	}
}
