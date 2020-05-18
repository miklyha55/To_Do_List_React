import React from 'react';
import PropTypes from 'prop-types';

export default class Active extends React.Component {

	constructor(props) {
		super(props)
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

			<div className={`app_active ${ this.props.stateTransition }`}>
				<div className='app_header unselectable'>
					<div className='app_header_info'>
						<a href='' className="app_link" onClick={ this.props.state.changePageHandler.bind(this) }>Завершенные задачи ({ this.props.completedcount })</a>
						<div className='app_header_title'>Актиные задачи </div> 
					</div>
					<div className='app_header_count'>{ this.props.todos.length } зад.</div>
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