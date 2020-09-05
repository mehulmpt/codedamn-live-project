import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/login" component={Home} exact />
				<Route path="/register" component={Home} exact />
			</Switch>
		</Router>
	)
}

export default App
