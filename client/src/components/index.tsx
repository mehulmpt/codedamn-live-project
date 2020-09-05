import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Chat from './Chat'

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/login" component={Login} exact />
				<Route path="/register" component={Register} exact />
				<Route path="/chat" component={Chat} exact />
			</Switch>
		</Router>
	)
}

export default App
