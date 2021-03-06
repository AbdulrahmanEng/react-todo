import React from 'react';

export const TodoForm = (props) => {
	return (
  <form onSubmit={props.handleSubmit}>
		<input type="text" value={props.currentTodo} onChange={props.handleInputChange}/>
	</form>
	);
};
// Property type enforcement
TodoForm.propTypes = {
	currentTodo: React.PropTypes.string.isRequired,
	handleInputChange: React.PropTypes.func.isRequired,
	handleSubmit: React.PropTypes.func.isRequired
};