import React from 'react';

export default class Active extends React.Component {

	static path = '/';

	render() {
		return (
			<div>
				<h1>{ this.props.state.titleActive }</h1>
				<input type="text" value={ this.props.state.inputValue } onChange={ this.props.state.changeInputHandler }/>
				<button onClick={ this.props.state.addTodoHandler }>Добавить</button>

				{ 
					<ul className='todo_active'>
					{this.props.todos.map((todo) => {
			          return (
			            <li key={ todo.key }>
			            	<input type='checkbox' checked={ todo.status } onChange={ this.props.state.changeCheckboxHandler(todo.key) }/>

							{!todo.edit ? todo.name :  <input type="text" value={ todo.name } onChange={ this.props.state.changeInputTodoHandler( todo.key ) }/>}

							{!todo.edit ? <span className='todo_active_edit' onClick={ this.props.state.editTodoHandler(todo.key) }>Редактировать</span> 
							: <span className='todo_active_edit' onClick={ this.props.state.saveTodoHandler(todo.key) }>Сохранить</span>}

							<span className='todo_active_delete' onClick={ this.props.state.deleteTodoHandler(todo.key) }>Удалить</span>
						</li>
			          )
		        	})}
		        	</ul>
				}
			</div>
		)
	}
}