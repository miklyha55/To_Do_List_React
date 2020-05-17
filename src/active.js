import React from 'react';
import PropTypes from 'prop-types';

export default class Active extends React.Component {

	static path = '/';

	constructor(props) {

		super(props)
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
			this.props.state.addTodoHandler.bind(this, time)()
		} 
	}

	keyPressEditHandler(index, event) {
		if(event.ctrlKey && event.keyCode == 13) {
			this.props.state.saveTodoHandler.bind(this, index)()
		} 
	}

	render() {
		return (

			<div className="app_active">
				<div className='app_header_wrapper unselectable'>
					<div className='app_header'>
						<div className='app_header_info'>
							<div className='app_header_title'>{ this.getDate('weekday') }, { this.getDate('day') }</div>
							<div className='app_header_month'>{ this.getDate('month') }</div>
						</div>
						<div className='app_header_count'>{ this.props.todos.length } зад.</div>
					</div>

					<div className='add_form'>
						<div className='add_form_select_wrapper'>
							<span className='add_form_title'>В какую задачу добавить: </span>
							<select className='add_form_select' value={ this.props.state.current_p_id } onChange={ this.props.state.changeSelectHandler.bind(this) }>
								<option value='0'>Нет</option>
								{this.props.todos.map((todo, index) => {
									return (
										<option key={ todo.index } value={ todo.index }>{ todo.name }</option>
									)
								})}
							</select>
						</div>
						<textarea className='add_form_textarea' onKeyDown={this.keyPressAddHandler.bind(this, this.getDate('time'))} value={ this.props.state.inputValue } onChange={ this.props.state.changeInputHandler.bind(this) }/>
						<p className='add_form_textarea_info'>Ctrl + Enter</p>
						<button className='add_form_button' onClick={ this.props.state.addTodoHandler.bind(this, this.getDate('time')) }>Добавить</button>
					</div>
				</div>

				{ this.props.todos.length ? <ul className='todos_active'>
					{this.props.todos.map(todo => {
			          return (
			            <li key={ todo.index } >
			            	<div className='todo_active'>
				            	<label htmlFor={ 'checkbox_active_' + todo.index }>
				            		<input id={ 'checkbox_active_' + todo.index } type='checkbox' checked={ todo.checked } onChange={ this.props.state.changeCheckboxHandler.bind(this, todo.index) }/>
				            		<div className='checkbox_custom'>
				            			<img src='/img/img_checkbox.png' alt='checkbox_custom'/>
				            		</div>
				            	</label>
								{!todo.edit ? <span className='todo_active_name'>{ todo.name }</span>
								:  <textarea type='text' onKeyDown={this.keyPressEditHandler.bind(this, todo.index)} className='todo_active_name' value={ todo.name } onChange={ this.props.state.changeInputTodoHandler.bind(this, todo.index) }/>}
								<div className='todo_active_controls unselectable'>
									{!todo.edit ? <span className='todo_active_edit' onClick={ this.props.state.editTodoHandler.bind(this, todo.index) }>Редактировать</span> 
									: <span className='todo_active_edit' onClick={ this.props.state.saveTodoHandler.bind(this, todo.index) }>Сохранить</span>}
									<span className='todo_active_delete' onClick={ this.props.state.deleteTodoHandler.bind(this, todo.index) }>Удалить</span>
									<span className='todo_active_time'>{ todo.time }</span>
								</div>
							</div>
							{todo.childs ?
							<ul className='todos_active'>
								{todo.childs.map((child) => {
									return (
									 	<li key={ child.index } >
									 		<div className='todo_active childs'>
								            	<label htmlFor={ 'checkbox_active_' + child.index }>
								            		<input id={ 'checkbox_active_' + child.index } type='checkbox' checked={ child.checked } onChange={ this.props.state.changeCheckboxChildHandler.bind(this, child.index) }/>
								            		<div className='checkbox_custom'>
								            			<img src='/img/img_checkbox.png' alt='checkbox_custom'/>
								            		</div>
								            	</label>
												{!child.edit ? <span className={ child.checked ? 'todo_active_name todo_copmleted_undrline' : 'todo_active_name' }>{ child.name }</span>
												:  <textarea type='text' onKeyDown={this.keyPressEditHandler.bind(this, child.index)} className='todo_active_name' value={ child.name } onChange={ this.props.state.changeInputTodoHandler.bind(this, child.index) }/>}
												
												<div className='todo_active_controls unselectable'>
													{!child.edit ? <span className='todo_active_edit' onClick={ this.props.state.editTodoHandler.bind(this, child.index) }>Редактировать</span> 
													: <span className='todo_active_edit' onClick={ this.props.state.saveTodoHandler.bind(this, child.index) }>Сохранить</span>}
													<span className='todo_active_delete' onClick={ this.props.state.deleteTodoHandler.bind(this, child.index) }>Удалить</span>
													<span className='todo_active_time'>{ child.time }</span>
												</div>
											</div>
										</li>
									)
								})}
							</ul>
							: null}
						</li>
			          )
		        	})}
	        	</ul>
	        	: null}
			</div>

		)
	}
}

Active.propTypes = {
	todos: PropTypes.array,
	parents: PropTypes.array
}