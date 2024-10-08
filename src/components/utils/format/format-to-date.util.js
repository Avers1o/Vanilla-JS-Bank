/**
 * Formats a date in the "MMM DD, YYYY" format.
 * @param {string} dateString dateString - The date string in the format "YYYY-MM-DDTHH:mm:SS.sssZ".
 * @returns {string} - The formatted date string in the format "MMM DD, YYYY".
 */

export function formatDate(dateString) {
	const date = new Date(dateString)
	const options = { month: 'short', day: 'numeric', year: 'numeric' }

	return date.toLocaleDateString('en-US', options)
}
