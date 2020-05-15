import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import DevTools from './utils/index';
import Header from './components/header/index';

import Active from './active';
import Completed from './completed';

const store = configureStore();

export default class App extends React.Component {

	state = {

		todos: [],
		inputValue: 'Задача 1',
		titleActive: 'Активные задачи',
		titleCompleted: 'Завершенные задачи',

		changeInputHandler: (event) => {
			this.setState({
				inputValue: event.target.value
			});
		},

		changeInputTodoHandler: (key) => {
			return((events) => {
				const todos = [...this.state.todos]
				todos.filter((todo, index) => {
					if(todo.key == key) {
						todos[index].name = event.target.value
					}
				})
				this.setState({todos})
			})
		},

		changeCheckboxHandler: (key) =>  {
			return(() => {
				const todos = [...this.state.todos]
				todos.filter((todo, index) => {
					if(todo.key == key) {
						todos[index].status = !todos[index].status
					}
				})
				this.setState({todos})
			})
		},

		addTodoHandler: () => {
			const todos = [...this.state.todos]
			todos.push({key: todos.length || 0, name: this.state.inputValue, status: false, edit: false})
			this.setState({todos, inputValue: 'Задача ' + (todos.length + 1)})
		},

		deleteTodoHandler: (key) =>  {
			return(() => {
				const todos = [...this.state.todos]
				todos.filter((todo, index) => {
					if(todo.key == key) {
						todos.splice(index, 1)
					}
				})
				todos.filter((todo, index) => {
					if(todo.key > key) {
						todos[index].key--;
					}
				})
				this.setState({todos, inputValue: 'Задача ' + (todos.length + 1)})
			}) 
		},

		editTodoHandler: (key) =>  {
			return(() => {
				const todos = [...this.state.todos]
				todos.filter((todo, index) => {
					if(todo.key == key) {
						todos[index].edit = true;
					}
				})
				this.setState({todos})
			})
		},

		saveTodoHandler: (key) => {
			return(() => {
				const todos = [...this.state.todos]
				todos.filter((todo, index) => {
					if(todo.key == key) {
						todos[index].edit = false;
					}
				})
				this.setState({todos})
			})
		},

	}

	showTodosActiveHandler() {
		const todos = []
		this.state.todos.filter((todo) => {
			if(todo.status == 0) {
				todos.push(todo)
			}
		})
		return todos
	}

	showTodosCompletedHandler() {
		const todos = []
		this.state.todos.filter((todo) => {
			if(todo.status == 1) {
				todos.push(todo)
			}
		})
		return todos
	}

	render() {
		return (
    		<Provider store={ store }>
    			<Active state = { this.state } todos={ this.showTodosActiveHandler.bind(this)() }/>
    			<hr/>
    			<Completed state = { this.state }  todos={ this.showTodosCompletedHandler.bind(this)() }/>
		    </Provider>
	    )
   	}

}