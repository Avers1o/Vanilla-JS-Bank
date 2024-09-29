/**
 * Formats a credit card number string by adding dashes (-) after every 4th character.
 * @param {string} cardNumber - The credit card number string to format.
 * @return {string} - Returns the formatted credit card number string.
 */

export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}
