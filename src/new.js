require('./less/index.js');
import React from 'react';

export default class NewComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>NewComponent are working!</h1>
			</div>
		)
	}
}