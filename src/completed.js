import React from 'react';

export default class Сompleted extends React.Component {

	static path = '/completed';

	render() {
		return (
			<div>
				<h1>{ this.props.state.titleCompleted }</h1>
				{ 
					<ul className='todo_copmleted'>
					{this.props.todos.map((todo) => {
			          return (
			             <li key={ todo.key }>
			             	<input type='checkbox' checked={ todo.status } onChange={ this.props.state.changeCheckboxHandler(todo.key) }/>
							<span className='todo_copmleted_undrline'>{ todo.name }</span>
							<span className='todo_copmleted_recover' onClick={ this.props.state.changeCheckboxHandler(todo.key) }>Восстановить</span>
						</li>
			          )
		        	})}
		        	</ul>
				}
			</div>
		)
	}
}