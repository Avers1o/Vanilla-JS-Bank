import { ChildComponent } from '../components/child.component'

class RenderService {
	/**
	 * @param {string} html
	 * @param {Array} components
	 * @param {Object} [styles]
	 * @returns {HTMLElement}
	 */

	// Формирование HTML-элементов

	htmlToElement(html, components = [], styles) {
		const parser = new DOMParser()
		const document = parser.parseFromString(html, 'text/html')
		const element = document.body.firstChild

		if (styles) {
			this.#applyModuleStyles(element, styles)
		}

		this.#replaceComponentTags(element, components)

		return element
	}

	/**
	 * @param {HTMLElement} parentElement
	 * @param {Array} components
	 */

	// Обработка компонентов

	#replaceComponentTags(parentElement, components) {
		// Паттерн наименования тегов компонентов
		const componentTagNamePattern = /^component-/
		const allElements = parentElement.getElementsByTagName('*')

		for (const element of allElements) {
			// Наименование тега элемента
			const elementTagName = element.tagName.toLowerCase()

			// Соответствие наименования тега элемента паттерну наименования тегов компонентов
			if (componentTagNamePattern.test(elementTagName)) {
				// Наименование компонента
				const componentName = elementTagName
					.replace(componentTagNamePattern, '')
					.replace(/-/g, '')

				// Поиск соответствующего компонента
				const foundComponent = components.find(Component => {
					const instance =
						Component instanceof ChildComponent ? Component : new Component()

					return instance.constructor.name.toLowerCase() === componentName
				})

				if (foundComponent) {
					// Содержимое соответствующего компонента
					const componentContent =
						foundComponent instanceof ChildComponent
							? foundComponent.render()
							: new foundComponent().render()
					// Замена элемента на содержимое соответствующего компонента
					element.replaceWith(componentContent)
				} else {
					console.error(
						`Component ${componentName} not found in the provided components array.`
					)
				}
			}
		}
	}

	/**
	 * @param {Object} moduleStyles
	 * @param {string} element
	 * @returns {void}
	 */

	// Обработка стилей

	#applyModuleStyles(element, moduleStyles) {
		if (!element) return

		const applyStyles = element => {
			for (const [key, value] of Object.entries(moduleStyles)) {
				if (element.classList.contains(key)) {
					element.classList.remove(key)
					element.classList.add(value)
				}
			}
		}

		if (element.getAttribute('class')) {
			applyStyles(element)
		}

		const items = element.querySelectorAll('*')
		items.forEach(applyStyles)
	}
}

export default new RenderService()
