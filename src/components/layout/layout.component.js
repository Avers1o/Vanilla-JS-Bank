export class Layout {
	constructor({ router, children }) {
		this.router = router
		this.children = children
	}

	render() {
		const headerHTML = `
			<header>Header</header>
			<nav>
				<a href='/'>
					Home
				</a>
				<a href='/about-us'>
					About Us
				</a>
				<a href='/authorization'>
					Authorization
				</a>
				<a href='/not-found'>
					Not Found
				</a>
			</nav>
		`

		return `
			${headerHTML}
			<main>
				${this.children}
			</main>
		`
	}
}
