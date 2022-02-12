import { useRoutes } from 'react-router-dom'

const routes = [
	{
		path: '',
		element: null,
		children: [
			{
				path: '',
				element: null
			}
		]
	}
]

const Routes = () => {
	const routing = useRoutes(routes)

	return routing
}

export default Routes
