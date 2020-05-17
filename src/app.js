import'./less/index';
import React from 'react';
import ReactDOM from 'react-dom';
import Active from './active';
import Completed from './completed';
import {connect} from 'react-redux'

class App extends React.Component {

	showTodosActiveHandler() {

		const todos = []
		this.props.todos.map((todo, index) => {
			if(!todo.status && !todo.p_id) {
				todo['childs'] = this.getTodoChildsHandler.bind(this)(todo.index)
				todos.push(todo)
			}
		})
		return todos

	}

	getTodoChildsHandler(p_id) {

		const todos = this.props.todos.filter(todo => !todo.status && todo.p_id == p_id)
		return todos

	}

	showTodosCompletedHandler() {

		const todos = this.props.todos.filter(todo => todo.status && todo.p_id == 0)
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
		inputValue: state.inputValue,
		current_p_id: state.current_p_id

	}
}

function mapDispatchToProps(dispatch) {
	return {

		changeInputHandler: event => dispatch({type: 'changeInputHandler', event: event}),
		changeInputTodoHandler: index => dispatch({type: 'changeInputTodoHandler', event: event, index: index}),
		deleteTodoHandler: index => dispatch({type: 'deleteTodoHandler', index: index}),
		changeCheckboxHandler: index => dispatch({type: 'changeCheckboxHandler', index: index}),
		changeCheckboxChildHandler: index => dispatch({type: 'changeCheckboxChildHandler', index: index}),
		editTodoHandler: index => dispatch({type: 'editTodoHandler', index: index}),
		saveTodoHandler: index => dispatch({type: 'saveTodoHandler', index: index}),
		changeSelectHandler: event => dispatch({type: 'changeSelectHandler', event: event}),
		addTodoHandler: time => dispatch({type: 'addTodoHandler', time: time}),
		resetStore: () => dispatch({type: 'resetStore'})

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)