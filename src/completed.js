import React from 'react';
import PropTypes from 'prop-types';

export default class Сompleted extends React.Component {

	static path = '/completed';

	constructor(props) {

		super(props)

	}

	render() {
		return (

			<div>
				{this.props.todos.length ? <div className='app_title'>Завершенные задачи</div> : null}
				{<ul className='todo_copmleted'>
					{this.props.todos.map((todo, index) => {
			          return (
			             <li key={ index }>
			             	<input type='checkbox' checked={ todo.status } onChange={ this.props.state.changeCheckboxHandler.bind(this, index) }/>
							<span className='todo_copmleted_name todo_copmleted_undrline'>{ todo.name }</span>
							
							<div className='todo_copmleted_controls'>
								<span className='todo_copmleted_recover' onClick={ this.props.state.changeCheckboxHandler.bind(this, index) }>Восстановить</span>
							</div>
						</li>
			          )
		        	})}
	        	</ul>}
			</div>
			
		)
	}
}

Сompleted.propTypes = {
	todos: PropTypes.array
}