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
	}
]
