import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList, Footer } from './components/todo';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/TodoHelpers';
import { pipe, partial } from './lib/utils';
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService';

class App extends Component {
	state = {
			todos: [],
			currentTodo: ''
		};
	
	componentDidMount() {
		loadTodos().then(todos => this.setState({todos}));
	}
	
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
		createTodo(newTodo)
		.then(() => this.showTempMessage('Todo Added'));
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
		const getToggledTodo = pipe(findById, toggleTodo);
		const updated = getToggledTodo(id, this.state.todos);
		const getUpdatedTodos = partial(updateTodo, this.state.todos);
		const updatedTodos = getUpdatedTodos(updated);
		this.setState({todos: updatedTodos});
		saveTodo(updated)
		.then(()=> this.showTempMessage('Todo Updated'));
	}
	
	// Handles removal of items
	handleRemove = (id, e) => {
		e.preventDefault();
		const updatedTodos = removeTodo(id, this.state.todos);
		this.setState({
			todos: updatedTodos
		});
		destroyTodo(id)
		.then(()=> this.showTempMessage('Todo Removed'));
	}
	
	static contextTypes = {
		route: React.PropTypes.string
	}
	
	showTempMessage = (msg) =>{
		this.setState({message: msg});
		setTimeout(()=>this.setState({message:''}), 3000);
	}
	// Renders view
  render() {
  	const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
  	const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TODOs</h2>
        </div>
				<div className="Todo-App">
					{this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
					{this.state.message && <span className="success">{this.state.message}</span>}
					<TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler}/>
					<TodoList todos={displayTodos} handleToggle={this.handleToggle} handleRemove={this.handleRemove}/>
					<Footer/>
				</div>
      </div>
    );
  }
}

export default App;