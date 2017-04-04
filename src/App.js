import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList} from './components/todo/';

class App extends Component {
	constructor(){
		super();
		// Contains app data structure
		this.state = {
			todos: [
				{id: 1, name: 'Learn FP', isComplete: true},
				{id: 2, name: 'Walk on the Moon', isComplete: false},
				{id: 3, name: 'Swim in the Pacific', isComplete: false}
				],
				currentTodo: ''
		};
		// Ensures this.setState referes to correct context
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	// Handles input change
	handleInputChange(e){
		this.setState({
			currentTodo: e.target.value
		});
	}
	// Renders view
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
				<div className="Todo-App">
					<TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo}/>
					<TodoList todos={this.state.todos}/>
				</div>
      </div>
    );
  }
}

export default App;