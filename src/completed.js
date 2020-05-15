import React from 'react';

export default class Сompleted extends React.Component {

	static path = '/completed';

	render() {
		return (
			<div>
				{this.props.todos.length ? <div className='app_title'>{ this.props.state.titleCompleted }</div> : null}
				{<ul className='todo_copmleted'>
					{this.props.todos.map((todo) => {
			          return (
			             <li key={ todo.key }>
			             	<input type='checkbox' checked={ todo.status } onChange={ this.props.state.changeCheckboxHandler(todo.key) }/>
							<span className='todo_copmleted_name todo_copmleted_undrline'>{ todo.name }</span>
							
							<div className='todo_copmleted_controls'>
								<span className='todo_copmleted_recover' onClick={ this.props.state.changeCheckboxHandler(todo.key) }>Восстановить</span>
							</div>
						</li>
			          )
		        	})}
	        	</ul>}
			</div>
		)
	}
}