import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {

	render() {
		return (
			<div className="head">
				<ul>
					<li><NavLink to="/">{ this.props.titleActive } ( { this.props.lengthActive } )</NavLink></li>
					<li><NavLink to="/completed">{ this.props.titleCompleted } ( { this.props.lengthCompleted } )</NavLink></li>
				</ul>
			</div>
		)
	}
}