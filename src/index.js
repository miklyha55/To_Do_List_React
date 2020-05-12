require('./less/index.js');
import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import NewComponent from './new';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			text: "state_text"
		}
	}

	inputChange(event) {
		const text = event.target.value; 
		this.setState({text: text});
	}

	render() {
		return (
			<div>
				<h1>I am working!</h1>
				<input type='text' value={ this.state.text } onChange={ this.inputChange.bind(this) }/>
			</div>
		)
	}
}

ReactDom.render (
	<Router>
		<Switch>
			<Route exact path={'/'} component={App}/>
			<Route path={'/new'} component={NewComponent}/>
		</Switch>
	</Router>,
	document.getElementById('app')
)