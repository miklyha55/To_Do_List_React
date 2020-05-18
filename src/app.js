import'./less/index';
import React from 'react';
import ReactDOM from 'react-dom';
import Active from './active';
import Completed from './completed';
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

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

	getDate(props) {
		switch(props) {
			case 'year':
				return new Date().toLocaleString('ru', { year: 'numeric'})
			case 'month':
				return new Date().toLocaleString('ru', { month: 'long'})
			case 'day':
				return new Date().toLocaleString('ru', { day: 'numeric' })
			case 'weekday':
				return new Date().toLocaleString('ru', { weekday: 'long' })
			case 'time':
				return new Date().toLocaleTimeString()
			default:
				return new Date().toLocaleString('ru', { year: 'numeric',month: 'long',day: 'numeric' })
		}
	}

	keyPressAddHandler(time, event) {
		if(event.ctrlKey && event.keyCode == 13) {
			this.props.addTodoHandler.bind(this, time)()
		} 
	}

	keyPressEditHandler(index, event) {
		if(event.ctrlKey && event.keyCode == 13) {
			this.props.saveTodoHandler.bind(this, index)()
		} 
	}

	render() {
		return (

			<div className='app_wrapper'>
				<div className='app_header_wrapper unselectable'>
					{/*<button onClick={ this.props.resetStore.bind(this) } >Очисить</button>*/}
					<div className='app_header'>
						<div className='app_header_info'>
							<div className='app_header_month'>{ this.getDate('month') }</div>
							<div className='app_header_title'>{ this.getDate('weekday') }, { this.getDate('day') }</div>
						</div>
						<div className='app_header_count'>Всего: { this.props.todos.length } зад.</div>
					</div>

					<div className='add_form'>
						<div className='add_form_select_wrapper'>
							<span className='add_form_title'>В какую задачу добавить: </span>
							<select className='add_form_select' value={ this.props.current_p_id } onChange={ this.props.changeSelectHandler.bind(this) }>
								<option value='0'>Нет</option>
								{this.showTodosActiveHandler.bind(this)().map((todo, index) => {
									return (
										<option key={ todo.index } value={ todo.index }>{ todo.name }</option>
									)
								})}
							</select>
						</div>
						<textarea className='add_form_textarea' onKeyDown={this.keyPressAddHandler.bind(this, this.getDate('time'))} value={ this.props.inputValue } onChange={ this.props.changeInputHandler.bind(this) }/>
						<p className='add_form_textarea_info'>Ctrl + Enter</p>
						<button className='add_form_button' onClick={ this.props.addTodoHandler.bind(this, this.getDate('time')) }>Добавить</button>
					</div>
				</div>
				<div className='app_todos_wrapper'>
					<Transition in={ this.props.page_state } timeout={{ enter: 10, exit: 0 }} mountOnEnter unmountOnExit>
	    				{state=> <Active stateTransition={ state } state = { this.props } completedcount={ this.showTodosCompletedHandler.bind(this)().length } todos={ this.showTodosActiveHandler.bind(this)() }/>}
					</Transition>
					<Transition in={ !this.props.page_state } timeout={{ enter: 10, exit: 0  }}  mountOnEnter unmountOnExit>
	    				{state=> <Completed stateTransition={ state } state = { this.props } activecount={ this.showTodosActiveHandler.bind(this)().length }  todos={ this.showTodosCompletedHandler.bind(this)() }/>}
	    			</Transition>
    			</div>
		    </div>

	    )
   	}
}

function mapStateToProps(state) {
	return {

		todos: state.todos,
		inputValue: state.inputValue,
		current_p_id: state.current_p_id,
		page_state: state.page_state

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
		changePageHandler: event => dispatch({type: 'changePageHandler', event: event}),
		resetStore: () => dispatch({type: 'resetStore'})

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)