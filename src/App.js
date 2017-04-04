import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(){
		super();
		// Contains app data structure
		this.state = {
			todos: [
				{id: 1, name: 'Learn FP', isComplete: true},
				{id: 2, name: 'Walk on the Moon', isComplete: false},
				{id: 3, name: 'Swim in the Pacific', isComplete: false}
				]
		}
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
					<form>
						<input type="text" value={this.state.currentTodo} onChange={this.handleInputChange}/>
					</form>
					<div className="Todo-List">
						<ul>
							{
								this.state.todos.map(todo => <li key={todo.id}><input type="checkbox" defaultChecked={todo.isComplete}/>{todo.name}</li>)
							}
						</ul>
					</div>
				</div>
      </div>
    );
  }
}

export default App;