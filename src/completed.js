import React from 'react';
import PropTypes from 'prop-types';

export default class Сompleted extends React.Component {

	static path = '/completed';

	constructor(props) {

		super(props)

	}

	render() {
		return (

			<div className="app_completed">
				<div className='app_header unselectable'>
					<div className='app_header_info'>
						<div className='app_header_title'>Завершенные задачи</div> 
					</div>
					<div className='app_header_count'>{ this.props.todos.length } зад.</div>
				</div>
				<ul className='todos_copmleted'>
					{this.props.todos.map(todo => {
			          return (
			             <li key={ todo.index }>
			             	<div className='todo_copmleted'>
				             	<label htmlFor={ 'checkbox_active_' + todo.index }>
				            		<input id={ 'checkbox_active_' + todo.index } type='checkbox' checked={ todo.checked } onChange={ this.props.state.changeCheckboxHandler.bind(this, todo.index) }/>
				            		<div className='checkbox_custom'>
				            			<img src='/img/img_checkbox.png' alt='checkbox_custom'/>
				            		</div>
				            	</label>
								<span className='todo_copmleted_name todo_copmleted_undrline'>{ todo.name }</span>
								
								<div className='todo_copmleted_controls unselectable'>
									<span className='todo_copmleted_recover' onClick={ this.props.state.changeCheckboxHandler.bind(this, todo.index) }>Восстановить</span>
									<span className='todo_active_time'>{ todo.time }</span>
								</div>
							</div>
						</li>
			          )
		        	})}
	        	</ul>
			</div>

		)
	}
}

Сompleted.propTypes = {
	todos: PropTypes.array
}