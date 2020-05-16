import React from 'react';
import PropTypes from 'prop-types';

export default class Active extends React.Component {

	static path = '/';

	constructor(props) {

		super(props)
		
	}

	render() {
		return (

			<div>
				<button onClick={ this.props.state.resetStore.bind(this) }>Очистить стор</button>
				<div className='app_title'>Активные задачи</div>
				<div className='add_form'>
					<textarea className='add_form_textarea' value={ this.props.state.inputValue } onChange={ this.props.state.changeInputHandler.bind(this) }/>
					<button className='add_form_button' onClick={ this.props.state.addTodoHandler }>Добавить</button>
				</div>

				{<ul className='todo_active'>
					{this.props.todos.map((todo, index) => {
			          return (
			            <li key={ index } >
			            	<input type='checkbox' checked={ todo.status } onChange={ this.props.state.changeCheckboxHandler.bind(this, index) }/>
							{!todo.edit ? <span className='todo_active_name'>{ todo.name }</span>
							:  <textarea type='text' className='todo_active_name' value={ todo.name } onChange={ this.props.state.changeInputTodoHandler.bind(this, index) }/>}
							
							<div className='todo_active_controls'>
								{!todo.edit ? <span className='todo_active_edit' onClick={ this.props.state.editTodoHandler.bind(this, index) }>Редактировать</span> 
								: <span className='todo_active_edit' onClick={ this.props.state.saveTodoHandler.bind(this, index) }>Сохранить</span>}
								<span className='todo_active_delete' onClick={ this.props.state.deleteTodoHandler.bind(this, index) }>Удалить</span>
							</div>
						</li>
			          )
		        	})}
		        	</ul>}
			</div>

		)
	}
}

Active.propTypes = {
	todos: PropTypes.array
}