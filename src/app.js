import'./less/index';
import React from 'react';
import ReactDOM from 'react-dom';
import Active from './active';
import Completed from './completed';
import {connect} from 'react-redux'

class App extends React.Component {

	showTodosActiveHandler() {

		const todos = []
		this.props.todos.filter((todo, index) => {
			if(todo.status == 0) {
				todos[index] = todo
			}
		})
		return todos
		
	}

	showTodosCompletedHandler() {

		const todos = []
		this.props.todos.filter((todo, index) => {
			if(todo.status == 1) {
				todos[index] = todo
			}
		})
		return todos

	}

	render() {
		return (

			<div className='app_wrapper'>
    			<Active state = { this.props } todos={ this.showTodosActiveHandler.bind(this)() }/>
    			<Completed state = { this.props }  todos={ this.showTodosCompletedHandler.bind(this)() }/>
		    </div>

	    )
   	}
}

function mapStateToProps(state) {
	return {

		todos: state.todos,
		inputValue: state.inputValue

	}
}

function mapDispatchToProps(dispatch) {
	return {

		changeInputHandler: event => dispatch({type: 'changeInputHandler', event: event}),
		changeInputTodoHandler: index => dispatch({type: 'changeInputTodoHandler', event: event, index: index}),
		deleteTodoHandler: index => dispatch({type: 'deleteTodoHandler', index: index}),
		changeCheckboxHandler: index => dispatch({type: 'changeCheckboxHandler', index: index}),
		editTodoHandler: index => dispatch({type: 'editTodoHandler', index: index}),
		saveTodoHandler: index => dispatch({type: 'saveTodoHandler', index: index}),
		addTodoHandler: () => dispatch({type: 'addTodoHandler'}),
		resetStore: () => dispatch({type: 'resetStore'})

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)