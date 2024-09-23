import { AboutUs } from '@/components/screens/about-us/about-us.component'
import { Authorization } from '@/components/screens/authorization/authorization.component'
import { Home } from '@/components/screens/home/home.component'

export const ROUTES = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/authorization',
		component: Authorization
	},
	{
		path: '/about-us',
		component: AboutUs
	}
]
