/**
 * Represents the Query class for working with DOM elements.
 */
import { formatCardNumberWithDashes } from '@/components/utils/format/format-card-number.util'

class Query {
	constructor(selector) {
		/**
		 * Create a new Query instance.
		 * @param {string|HTMLElement} selector - A CSS selector string or HTMLElement.
		 */

		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			console.log(selector)
			throw new Error('Invalid selector type!')
		}
	}

	/* FIND */

	/**
	 * Find the first element that matches the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {Query} - A new Query instance for the found element.
	 */

	find(selector) {
		const element = new Query(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found!`)
		}
	}

	/**
	 * Find all elements that matches the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {Query} - An array of new Query instances for the found elements.
	 */

	findAll(selector) {
		const elements = this.element.querySelectorAll(selector)

		if (elements) {
			return Array.from(elements).map(element => new Query(element))
		} else {
			throw new Error(`Elements ${selector} not found!`)
		}
	}

	/* INSERT */

	/**
	 * Append a new element as a child of the selected element.
	 * @param {HTMLElement} childElement - The new child element to append.
	 * @returns {Query} - The current Query instance for chaining.
	 */

	append(childElement) {
		this.element.appendChild(childElement)

		return this
	}

	/**
	 * Insert a new element before the selected element.
	 * @param {HTMLElement} newElement - The new element to insert before the selected element.
	 * @returns {Query} - The current Query instance for chaining.
	 */

	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be an HTMLElement!')
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error('Element does not have a parent element!')
		}
	}

	/**
	 * Get or Set the inner HTML of the selected element.
	 * @param {string} [htmlContent] - Optional HTML content to set. If not provided, the current inner HTML will be returned.
	 * @returns {Query|string} The current Query instance for chaining when setting HTML content, or the current inner HTML when getting.
	 */

	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent

			return this
		}
	}

	/**
	 * Get or Set the text content of the selected element.
	 * @param {string} [textContent] - Optional text content to set. If not provided, the current inner HTML will be returned.
	 * @returns {Query|string} The current Query instance for chaining when setting text content, or the current text content when getting.
	 */

	text(textContent) {
		if (typeof textContent === 'undefined') {
			return this.element.textContent
		} else {
			this.element.textContent = textContent

			return this
		}
	}

	/* EVENTS */

	/**
	 * Add a event listener to the selected element for the specified event type.
	 * @param {string} eventType - The type of the event to listen for (e.g., 'click', 'input', etc.)
	 * @param {function(Event): void } callback - The event listener function to execute when the event is triggered. The function will receive the event object as its argument.
	 * @returns {Query} - The current Query instance for chaining.
	 */

	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function') {
			throw new Error(
				'eventType must be a string and callback must be a function'
			)
		}

		this.element.addEventListener(eventType, callback)

		return this
	}

	/**
	 * Attach a click event listener to the selected element.
	 * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its argument.
	 * @returns {Query} The current instance for chaining.
	 */

	click(callback) {
		this.element.addEventListener('click', callback)

		return this
	}

	/* FORM */

	/**
	 * Set an event listener for the submit event of a form element.
	 * @param {function(Event): void} onSubmit - The event listener for the form's submit event.
	 * @returns {Query} - The current Query instance for chaining.
	 */

	submit(onSubmit) {
		if (this.element.tagName.toLowerCase() === 'form') {
			this.element.addEventListener('submit', event => {
				event.preventDefault()
				onSubmit(event)
			})
		} else {
			throw new Error('Element must be a form')
		}

		return this
	}

	/**
	 * Gets or sets the value of a input element.
	 * @param {string} [newValue] - The new value to set for the input element. If not provided, the method returns the current value.
	 * @returns {string|Query} - If newValue is provided, returns the Query instance. Otherwise returns the current value of the input element.
	 */

	value(newValue) {
		if (typeof newValue === 'undefined') {
			return this.element.value
		} else {
			this.element.value = newValue
			return this
		}
	}

	/**
	 * Set attributes and event listeners for an input element.
	 * @param {object} options - An object containing input options.
	 * @param {function(Event): void} {options.onInput} - The event listener for the input's input event.
	 * @param {object} {options.rest} - Optional attributes to set on the input element.
	 * @returns {Query} The current Query instance for chaining.
	 */

	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input') {
			throw new Error('Element must be an input!')
		}

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}

		if (onInput) {
			this.element.addEventListener('input', onInput)
		}

		return this
	}

	/**
	 * Set attributes and event listeners for a number input element.
	 * @param {number} [limit] - The maximum length of input value.
	 * @return {Query} The current Query instance for chaining
	 */

	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'number'
		) {
			throw new Error('Element must be an input with type "number"!')
		}

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')

			if (limit) {
				value = value.substring(0, limit)
			}

			event.target.value = value

			return this
		})
	}

	/**
	 * Set attributes and event listeners for a credit card input element.
	 * @returns {Query} The current Query instance for chaining
	 */

	creditCardInput() {
		const limit = 16

		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'text'
		) {
			throw new Error('Element must be an input with type "text"!')
		}

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			value = value.substring(0, limit)

			event.target.value = formatCardNumberWithDashes(value)

			return this
		})
	}

	/* ATTRIBUTES */

	/**
	 * Set or get te value of an attribute on the selected element.
	 * @param {string} attributeName - The name of the attribute to set or get param.
	 * @param {string} [value] - The value to set for the attribute. If not provided, the current value of the attribute will be returned.
	 * @returns {Query|string} - The current Query instance for chaining (if setting) or he attribute value (if getting).
	 */

	attribute(attributeName, value) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string!')
		}

		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName)
		} else {
			this.element.setAttribute(attributeName, value)

			return this
		}
	}

	/**
	 * Removes an attribute from the current element.
	 * @param {strimg} attributeName - The name of the attribute to remove.
	 * @returns {Query} - Returns the Query instance.
	 */

	removeAttribute(attributeName) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string!')
		}

		this.element.removeAttribute(attributeName)

		return this
	}

	/* STYLES */

	/**
	 * Set the CSS style of the selected element.
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 * @returns {Query} - The currentQuery instance for chaining.
	 */

	style(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Property and value must be strings!')
		}

		this.element.style[property] = value

		return this
	}

	/**
	 * Adds a class or a list of classes to the current element.
	 * @param {string|string[]} classNames - A single class name or an array of class names to add to the element.
	 * @returns {Query} The current Query instance for chaining.
	 */

	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}

		return this
	}

	/**
	 * Removes a class or a list of classes to the current element.
	 * @param {string|string[]} classNames - A single class name or an array of class names to remove to the element.
	 * @returns {Query} The current Query instance for chaining.
	 */

	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}

		return this
	}

	/**
	 * Shows the selected element by removing the 'display' style property.
	 * @returns {Query} The current Query instance for chaining.
	 */

	show() {
		this.element.style.removeProperty('display')

		return this
	}

	/**
	 * Shows the selected element by removing the 'display' style property.
	 * @returns {Query} The current Query instance for chaining.
	 */

	hide() {
		this.element.style.display = 'none'

		return this
	}
}

/**
 * Create a new Query instance for the selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {Query} A new Query instance for the selector
 */

export function query(selector) {
	return new Query(selector)
}
