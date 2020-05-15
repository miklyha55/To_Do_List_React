import React from 'react';

export default class Active extends React.Component {

	static path = '/';

	render() {
		return (
			<div>
			
				<div className='app_title'>{ this.props.state.titleActive }</div>
				<div className='add_form'>
					<textarea className='add_form_textarea' value={ this.props.state.inputValue } onChange={ this.props.state.changeInputHandler }/>
					<button className='add_form_button' onClick={ this.props.state.addTodoHandler }>Добавить</button>
				</div>

				{<ul className='todo_active'>
					{this.props.todos.map((todo, index) => {
			          return (
			            <li key={ todo.key} onDragStart={ this.props.state.drag }>
			            	<input type='checkbox' checked={ todo.status } onChange={ this.props.state.changeCheckboxHandler(todo.key) }/>
							{!todo.edit ? <span className='todo_active_name'>{ todo.name }</span>
							:  <textarea type='text' className='todo_active_name' value={ todo.name } onChange={ this.props.state.changeInputTodoHandler( todo.key ) }/>}
							
							<div className='todo_active_controls'>
								{!todo.edit ? <span className='todo_active_edit' onClick={ this.props.state.editTodoHandler(todo.key) }>Редактировать</span> 
								: <span className='todo_active_edit' onClick={ this.props.state.saveTodoHandler(todo.key) }>Сохранить</span>}
								<span className='todo_active_delete' onClick={ this.props.state.deleteTodoHandler(todo.key) }>Удалить</span>
							</div>
						</li>
			          )
		        	})}
		        	</ul>}
			</div>
		)
	}
}