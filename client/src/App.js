import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/lib/Button';
import AllTodos from './components/alltodos.js'
import AddTodo from './components/addtodo.js'



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container main-div">
          <h2> todo app</h2>
          <AddTodo />
          <br/>
          <AllTodos />
        </div>
      </div>
    );
  }
}

export default App;
