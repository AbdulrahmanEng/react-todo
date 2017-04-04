import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList} from './components/todo/';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo } from './lib/TodoHelpers';
import { pipe, partial } from './lib/utils';

class App extends Component {
	state = {
			todos: [
				{id: 1, name: 'Learn FP', isComplete: true},
				{id: 2, name: 'Walk on the Moon', isComplete: false},
				{id: 3, name: 'Swim in the Pacific', isComplete: false}
				],
				currentTodo: ''
		};
	// Handles input change
	handleInputChange = (e) => {
		this.setState({
			currentTodo: e.target.value
		});
	}
	
	// Handles input submissions
	handleSubmit = (e) => {
		e.preventDefault();
		const newId = generateId();
		const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false};
		const updatedTodos = addTodo(this.state.todos, newTodo);
		this.setState({
			todos: updatedTodos,
			currentTodo: '',
			errorMessage: ''
		});
	}
	
	// Handles empty input
	handleEmptySubmit = (e) => {
		e.preventDefault();
		this.setState({
			errorMessage: 'Todo name cannot be empty'
		});
	}
	
	// Handles check toggles
	handleToggle = (id) => {
		const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo,this.state.todos));
		const updatedTodos = getUpdatedTodos(id, this.state.todos);
		this.setState({
			todos: updatedTodos
		});
	}
	
	// Handles removal of items
	handleRemove = (id, e) => {
		e.preventDefault();
		const updatedTodos = removeTodo(id, this.state.todos);
		this.setState({
			todos: updatedTodos
		});
	}
	// Renders view
  render() {
  	const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TODOs</h2>
        </div>
				<div className="Todo-App">
					{this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
					<TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler}/>
					<TodoList todos={this.state.todos} handleToggle={this.handleToggle} handleRemove={this.handleRemove}/>
				</div>
      </div>
    );
  }
}

export default App;