import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList} from './components/todo/';
import { addTodo, generateId, findById, toggleTodo, updateTodo } from './lib/TodoHelpers';

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
		const todo = findById(id, this.state.todos);
		const toggled = toggleTodo(todo);
		const updatedTodos = updateTodo(this.state.todos, toggled);
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
					<TodoList todos={this.state.todos} handleToggle={this.handleToggle}/>
				</div>
      </div>
    );
  }
}

export default App;