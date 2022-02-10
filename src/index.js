import App from 'components/App'
import React from 'react'
import ReactDOM from 'react-dom'

const Root = () => (
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
