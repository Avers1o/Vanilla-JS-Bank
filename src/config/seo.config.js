const TITLE = 'Vanilla JS Bank'

const getTitle = subtitle => {
	return subtitle ? `${TITLE} | ${subtitle}` : TITLE
}

export const changeTitle = subtitle => {
	document.title = getTitle(subtitle)
}
