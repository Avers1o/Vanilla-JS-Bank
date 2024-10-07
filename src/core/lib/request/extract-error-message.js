export const extractErrorMessage = errorData =>
	typeof errorData.message === 'object'
		? errorData.message[0]
		: errorData.message
