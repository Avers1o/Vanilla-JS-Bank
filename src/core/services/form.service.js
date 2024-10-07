class FormService {
	#values = {}

	/**
	 * Retrieves the values of input elements within a form element.
	 * @param {HTMLFormElement} formElement - The form element containing input elements.
	 * @returns {object} An object containing the input element's name as key and its value as value.
	 */

	getFormValues(formElement) {
		const formData = new FormData(formElement)

		formData.forEach((value, key) => (this.#values[key] = value))

		return this.#values
	}
}

export default new FormService()
